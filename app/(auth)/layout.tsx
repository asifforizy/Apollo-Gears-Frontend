import { AuthNavbar } from "@/components/shared/AuthNavbar"

export default function AuthLayout({
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
