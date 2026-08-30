import { Navbar } from "@/components/shared/Navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
