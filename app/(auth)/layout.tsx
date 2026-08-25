import { Navbar } from "@/components/shared/Navbar";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Navbar></Navbar>
            {children}

        </div>
    );
}