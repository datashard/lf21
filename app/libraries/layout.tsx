'use client'
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="grid min-h-[90vh] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <Sidebar />
                {children}
            </div>
        </>
    );
}