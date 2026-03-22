import OpenAI from "openai"
import type { ProjectInput } from "@/types"
import type { ReportSections } from "./schema"
import { buildSystemPrompt, buildUserPrompt } from "./prompt"

// Instantiated once per module — Next.js caches module scope server-side
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function generateReportSections(
  intake: ProjectInput
): Promise<ReportSections> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: buildSystemPrompt() },
      { role: "user",   content: buildUserPrompt(intake) },
    ],
  })

  const content = completion.choices[0]?.message?.content
  if (!content) throw new Error("Empty response from OpenAI")

  const parsed = JSON.parse(content) as ReportSections
  return parsed
}
