import { getUser } from "@/lib/supabase/server"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar email={user?.email ?? ""} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
