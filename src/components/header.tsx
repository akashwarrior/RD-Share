import Link from "next/link"
import { getSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { CreditCard, LogOut, Settings, User, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function Header() {
    const session = await getSession() ?? true;

    return <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Video className="h-6 w-6 text-primary" />
            <span>MeetSync</span>
        </Link>
        <div className="container flex h-16 items-center justify-between">
            {session ? (
                <nav className="hidden flex-1 md:flex">
                    <ul className="flex gap-6 px-4">
                        <li>
                            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/meetings" className="text-sm font-medium transition-colors hover:text-primary">
                                Meetings
                            </Link>
                        </li>
                        <li>
                            <Link href="/settings" className="text-sm font-medium transition-colors hover:text-primary">
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav className="hidden md:flex gap-6 mx-auto">
                    <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
                        Pricing
                    </Link>
                    <Link href="#security" className="text-sm font-medium transition-colors hover:text-primary">
                        Security
                    </Link>
                    <Link href="#get-started" className="text-sm font-medium transition-colors hover:text-primary">
                        Get Started
                    </Link>
                </nav>
            )}
        </div>
        <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            {session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" alt="User" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">John Doe</p>
                                <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <>
                    <Link href="/auth/login" className="hidden md:block">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/auth/register" className="hidden md:block">
                        <Button size="sm">Sign up</Button>
                    </Link>
                </>
            )}
        </div>
    </header>
}