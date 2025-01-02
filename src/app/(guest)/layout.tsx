export default function GuestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="flex justify-center items-center h-screen overflow-hidden w-full bg-[url('/img/pattern-bg.jpg')]">
            {children}
        </section>
    );
}
