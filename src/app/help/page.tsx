"use client"

import { useState } from "react"
import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Search, Wifi, Shield, Monitor, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="space-y-6 p-6">
      <DashboardHeader heading="Help & Support" text="Find answers to common questions and get support." />
      <div className="relative w-full max-w-2xl mx-auto mb-8">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for help topics..."
          className="w-full pl-10 py-6 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="faq" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to the most common questions about ScreenConnect.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How secure is ScreenConnect?</AccordionTrigger>
                  <AccordionContent >
                    <p className="mb-2">
                      ScreenConnect uses end-to-end encryption for all connections. This means that all data transmitted
                      during your session is encrypted and can only be decrypted by the participants in the session.
                    </p>
                    <p className="mb-2">
                      We use industry-standard AES-256 encryption and secure WebRTC protocols with DTLS-SRTP for all
                      audio, video, and data transmissions.
                    </p>
                    <p>
                      Additionally, all sessions require explicit permission for remote control, and you can revoke
                      access at any time during a session.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I start a screen sharing session?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To start a screen sharing session:</p>
                    <ol className="list-decimal pl-5 space-y-2 mb-2">
                      <li>Navigate to the "Connect" page from the dashboard</li>
                      <li>Select the "Host Session" tab</li>
                      <li>Choose your screen sharing options (entire screen, application, etc.)</li>
                      <li>Configure quality settings and permissions as needed</li>
                      <li>Click "Start Sharing" to generate a connection ID</li>
                      <li>Share the connection ID with others to let them join your session</li>
                    </ol>
                    <p>
                      You can also create a scheduled session by clicking "Schedule" on the dashboard and setting a
                      future date and time.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I join someone else's session?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To join someone else's screen sharing session:</p>
                    <ol className="list-decimal pl-5 space-y-2 mb-2">
                      <li>Navigate to the "Connect" page from the dashboard</li>
                      <li>Select the "Join Session" tab</li>
                      <li>Enter the connection ID provided by the host</li>
                      <li>Select your connection type (view only or remote control)</li>
                      <li>Click "Connect" to join the session</li>
                    </ol>
                    <p>
                      If you received an invitation link, simply click on it and you'll be taken directly to the
                      session.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What are the system requirements?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">ScreenConnect works on most modern devices and browsers:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-2">
                      <li>
                        <strong>Windows:</strong> Windows 10 or later
                      </li>
                      <li>
                        <strong>macOS:</strong> macOS 10.15 (Catalina) or later
                      </li>
                      <li>
                        <strong>Linux:</strong> Ubuntu 18.04+, Debian 10+, or other modern distributions
                      </li>
                      <li>
                        <strong>Browsers:</strong> Chrome 80+, Firefox 75+, Edge 80+, Safari 13+
                      </li>
                      <li>
                        <strong>Mobile:</strong> iOS 13+ or Android 9+
                      </li>
                    </ul>
                    <p>
                      For optimal performance, we recommend at least 4GB of RAM and a broadband internet connection with
                      at least 5 Mbps download and 2 Mbps upload speeds.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I record a session?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">To record a screen sharing session:</p>
                    <ol className="list-decimal pl-5 space-y-2 mb-2">
                      <li>Start or join a session</li>
                      <li>
                        Click the Settings icon in the top toolbar and select "Recording Settings" or "Start Recording"
                      </li>
                      <li>Configure recording options if needed (quality, format, etc.)</li>
                      <li>Click "Start Recording" to begin</li>
                      <li>Use the recording controls to pause or stop the recording as needed</li>
                      <li>When finished, the recording will be saved to your recordings library</li>
                    </ol>
                    <p>
                      You can access your recordings from the "Recordings" page in the dashboard. From there, you can
                      play, download, or share your recordings.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">View All FAQs</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Quick Start Guide
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Setting Up Your Account
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Creating Your First Session
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Joining a Session
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Understanding End-to-End Encryption
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Setting Up Two-Factor Authentication
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Managing Permissions
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Data Privacy Guide
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-primary" />
                  Connection Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Optimizing for Low Bandwidth
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Quality vs. Performance Settings
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Network Troubleshooting
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Advanced Connection Settings
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Recording & File Sharing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Recording Sessions
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Managing Recordings
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Transferring Files
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      Sharing Recordings
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="troubleshooting" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting</CardTitle>
              <CardDescription>
                Find solutions to common issues and learn how to resolve connection problems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="trouble-1">
                  <AccordionTrigger>I can't connect to a session</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">If you're having trouble connecting to a session, try these steps:</p>
                    <ol className="list-decimal pl-5 space-y-2 mb-2">
                      <li>Verify that you have the correct connection ID</li>
                      <li>Check your internet connection and try refreshing the page</li>
                      <li>
                        Make sure your browser is up to date and has permissions for camera, microphone, and screen
                        sharing
                      </li>
                      <li>Disable any VPN or proxy services that might be interfering with the connection</li>
                      <li>Try using a different browser or device</li>
                      <li>Check if your firewall is blocking WebRTC connections</li>
                    </ol>
                    <p>
                      If you're still having issues, try our{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Connection Diagnostic Tool
                      </Link>{" "}
                      or contact support.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="trouble-2">
                  <AccordionTrigger>The video quality is poor or laggy</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">If you're experiencing poor video quality or lag:</p>
                    <ol className="list-decimal pl-5 space-y-2 mb-2">
                      <li>Check your internet connection speed using a service like speedtest.net</li>
                      <li>
                        Reduce the quality settings in the session by clicking the Settings icon and adjusting the
                        quality slider
                      </li>
                      <li>Close other applications that might be using bandwidth or system resources</li>
                      <li>If possible, connect to a wired network instead of using Wi-Fi</li>
                      <li>Try lowering the frame rate in the quality settings</li>
                      <li>If you're on mobile, try switching to a Wi-Fi connection</li>
                    </ol>
                    <p>
                      For optimal performance, we recommend at least 5 Mbps download and 2 Mbps upload speeds for HD
                      quality.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="trouble-3">
                  <AccordionTrigger>Remote control isn't working</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">If remote control functionality isn't working:</p>
                    <ol className="list-decimal pl-5 space-y-2 mb-2">
                      <li>
                        Make sure remote control is enabled by the host (check the permissions section in the session)
                      </li>
                      <li>
                        The host may need to approve the remote control request - look for a permission prompt on their
                        screen
                      </li>
                      <li>Try refreshing the page on both the host and client side</li>
                      <li>
                        Some applications may block remote control - try controlling a different application or the
                        desktop
                      </li>
                      <li>
                        On macOS, ensure that Screen Recording and Accessibility permissions are granted to your browser
                      </li>
                      <li>
                        On Windows, make sure you're not in a restricted environment (like some corporate networks)
                      </li>
                    </ol>
                    <p>
                      Note that some system dialogs and secure input fields cannot be controlled remotely due to
                      operating system restrictions.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="trouble-4">
                  <AccordionTrigger>Audio or microphone issues</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">If you're having audio or microphone issues:</p>
                    <ol className="list-decimal pl-5 space-y-2 mb-2">
                      <li>
                        Check if your microphone is muted in the session (look for the microphone icon in the toolbar)
                      </li>
                      <li>
                        Verify that your browser has permission to access your microphone (check browser settings)
                      </li>
                      <li>Try selecting a different microphone if you have multiple devices connected</li>
                      <li>Check your system sound settings to ensure the correct input/output devices are selected</li>
                      <li>Restart your browser or device if audio issues persist</li>
                      <li>On Windows, check that the correct audio device is set as default in Sound settings</li>
                    </ol>
                    <p>
                      If others can't hear you, try speaking louder or moving closer to your microphone. Background
                      noise can also affect audio quality, so try to find a quiet environment.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="trouble-5">
                  <AccordionTrigger>Recording issues</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">If you're having issues with session recording:</p>
                    <ol className="list-decimal pl-5 space-y-2 mb-2">
                      <li>Make sure you have sufficient storage space available</li>
                      <li>Check that you have the necessary permissions to record the session</li>
                      <li>If recording fails to start, try refreshing the page and starting the recording again</li>
                      <li>For high-quality recordings, ensure you have a stable internet connection</li>
                      <li>
                        If the recording file is corrupted, try using a lower quality setting for future recordings
                      </li>
                      <li>
                        Some browsers may have limitations with recording long sessions - consider breaking long
                        sessions into shorter segments
                      </li>
                    </ol>
                    <p>
                      Recordings are automatically saved to your account and can be accessed from the Recordings page.
                      If a recording is missing, please contact support.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Run Connection Diagnostics</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get in touch with our support team for personalized assistance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Brief description of your issue" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[150px]`}
                    placeholder="Please describe your issue in detail"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High - Critical Issue</SelectItem>
                      <SelectItem value="medium">Medium - Important Issue</SelectItem>
                      <SelectItem value="low">Low - General Question</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit Support Request</Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Support Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">Our support team is available during the following hours:</p>
                  <ul className="space-y-1">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 8:00 PM ET</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 6:00 PM ET</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Emergency support is available 24/7 for Enterprise customers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Alternative Contact Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">
                      <Link href="mailto:support@screenconnect.com" className="text-primary hover:underline">
                        support@screenconnect.com
                      </Link>
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">
                      <Link href="tel:+18005551234" className="text-primary hover:underline">
                        +1 (800) 555-1234
                      </Link>{" "}
                      (Enterprise customers only)
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">
                      Available in the bottom right corner of this page during support hours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}

function Label({ htmlFor, className, children }: { htmlFor?: string; className?: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  )
}