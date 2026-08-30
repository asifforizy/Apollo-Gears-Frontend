import { AuthNavbar } from "@/components/shared/AuthNavbar"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <AuthNavbar />
      {children}
    </div>
  )
}
