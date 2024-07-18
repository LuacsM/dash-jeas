import Link from "next/link";

export const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20"> {/* Define a altura do header */}
            <nav className="bg-[#0c142c] p-4 shadow-lg relative md:px-8 h-full">
                <div className="container mx-auto flex justify-between items-center h-full">
                    <div>
                        <Link href="/" className="text-white text-2xl md:text-4xl font-bold">JEAS</Link>
                    </div>
                    <div className="flex items-center">
                        <picture>
                            <source srcSet="/logo.svg" type="image/svg+xml" />
                            <source srcSet="/logo@2x.png 2x, /logo.png 1x" type="image/png" />
                            <img src="/logo.png" alt="Amazonas Logo" className="h-8 md:h-12" />
                        </picture>
                    </div>
                </div>
            </nav>
        </header>
    );
};