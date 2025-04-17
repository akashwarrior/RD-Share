import Link from "next/link"
import { ArrowRight, Calendar, Lock, MessageSquare, Shield, Users, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Professional Video Conferencing for Everyone
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Connect securely with end-to-end encryption. Host video meetings, share your screen, and collaborate
                  with just a few clicks.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/meetings/join">
                  <Button size="lg" className="gap-1.5">
                    Join Meeting
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/meetings/host">
                  <Button size="lg" variant="outline">
                    Host Meeting
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-video rounded-xl overflow-hidden border shadow-lg">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-background flex items-center justify-center">
                  <Video className="h-16 w-16 text-primary/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Powerful Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need for seamless video meetings and collaboration
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  HD Video Meetings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Crystal clear video and audio with support for up to 100 participants in a single meeting.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  End-to-End Encryption
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All meetings are secured with industry-standard encryption protocols for your privacy.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Meeting Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Host controls, waiting rooms, and password protection for secure meetings.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Breakout Rooms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Split your meeting into smaller groups for focused discussions and collaboration.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Chat & Reactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Communicate effectively with built-in text chat, reactions, and hand raising.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Meeting Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Schedule meetings in advance and integrate with your calendar for easy access.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, Transparent Pricing</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that works best for you or your team
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">$0</span> / month
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Unlimited 1:1 meetings</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Group meetings up to 40 minutes</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Up to 100 participants</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Screen sharing</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href="/auth/login">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
            </Card>
            <Card className="flex flex-col relative border-primary before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-primary/5 before:backdrop-blur-xs">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Popular
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">$0</span> / month
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Unlimited group meetings</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Cloud recording (1GB)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Breakout rooms</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Polls and Q&A</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Virtual backgrounds</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href="/auth/login">
                  <Button className="w-full">Subscribe</Button>
                </Link>
              </div>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Business</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">$0</span> / month per user
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Up to 300 participants</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>10GB cloud recording</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Managed domains</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>Company branding</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span>SSO authentication</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href="/auth/login">
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="security" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Security First Approach</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Your privacy and security are our top priorities. We implement industry-leading security measures to
                  protect your meetings and data.
                </p>
              </div>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>End-to-end encryption for all meetings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Waiting room and meeting passwords</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Host controls and participant management</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Secure WebRTC with DTLS-SRTP</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Regular security audits</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden border">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-background flex items-center justify-center">
                  <div className="p-8 rounded-full bg-background/80 backdrop-blur-xs">
                    <Shield className="h-20 w-20 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="get-started" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get Started Today</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up or log in to start using MeetSync directly from your browser. No downloads required.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link href="/auth/register">
                <Button size="lg" className="gap-1.5">
                  Sign Up
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="gap-1.5">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}