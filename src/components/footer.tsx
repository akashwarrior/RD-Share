import Link from "next/link";

export default async function Footer() {
    return <footer className="w-full border-t py-6 md:px-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">© 2025 MeetSync. All rights reserved.</p>
        <nav className="flex gap-4">
            <Link href="https://github.com/akashwarrior/MeetSync" target="_blank" className="text-sm text-muted-foreground hover:underline">
                Github
            </Link>
            <Link href="https://x.com/akash2cs" target="_blank" className="text-sm text-muted-foreground hover:underline">
                Twitter
            </Link>
            <Link href="https://x.com/akash2cs" target="_blank" className="text-sm text-muted-foreground hover:underline">
                Contact
            </Link>
        </nav>
    </footer>
}