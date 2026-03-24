import OpenAI from "openai"
import type { ProjectInput } from "@/types"
import type { ReportSections } from "./schema"
import { buildSystemPrompt, buildUserPrompt } from "./prompt"

// Instantiated once per module — Next.js caches module scope server-side
const openai = new OpenAI({
  apiKey:  process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
})

export async function generateReportSections(
  intake: ProjectInput
): Promise<ReportSections> {
  const completion = await openai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.4,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: buildSystemPrompt() },
      { role: "user",   content: buildUserPrompt(intake) },
    ],
  })

  const content = completion.choices[0]?.message?.content
  if (!content) throw new Error("Empty response from Groq")

  const parsed = JSON.parse(content) as ReportSections
  return parsed
}
