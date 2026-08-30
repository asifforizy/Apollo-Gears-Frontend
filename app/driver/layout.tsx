import { Navbar } from "@/components/shared/Navbar"

export default function DriverLayout({
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
