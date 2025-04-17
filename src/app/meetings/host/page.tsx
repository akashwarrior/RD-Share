"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Copy, Loader2, Mic, Share2, Shield, Video } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HostMeetingPage() {
  const router = useRouter()
  const [isStarting, setIsStarting] = useState(false)
  const [isWaitingRoom, setIsWaitingRoom] = useState(true)
  const [isMeetingPassword, setIsMeetingPassword] = useState(false)
  const [meetingPassword, setMeetingPassword] = useState("")
  const [generatedId, setGeneratedId] = useState("")
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)

  const handleStartMeeting = () => {
    setIsStarting(true)

    // Generate a random meeting ID
    const randomId = Math.random().toString(36).substring(2, 10)
    setGeneratedId(randomId)

    // Simulate meeting setup
    setTimeout(() => {
      setIsStarting(false)

      // If we have a meeting ID, redirect to the meeting room
      if (generatedId) {
        router.push(`/meeting/${generatedId}`)
      }
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedId)
  }

  return (
    <main className="flex-1 space-y-6 p-6 md:p-8 lg:p-10">
      <DashboardHeader heading="Host a Meeting" text="Start a new meeting or schedule for later." />

      <Tabs defaultValue="instant" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="instant">Instant Meeting</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Meeting</TabsTrigger>
        </TabsList>

        <TabsContent value="instant" className="mt-6">
          <Card className="border-primary/10 hover:border-primary/20 transition-colors">
            <CardHeader>
              <CardTitle>Start an Instant Meeting</CardTitle>
              <CardDescription>Start a meeting now and invite others to join.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!generatedId ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Meeting Topic (Optional)</Label>
                      <Input placeholder="Quick Meeting" />
                    </div>
                    <div className="space-y-2">
                      <Label>Meeting ID</Label>
                      <Select defaultValue="generate">
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="generate">Generate Automatically</SelectItem>
                          <SelectItem value="personal">Use Personal Meeting ID</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                          <Video className="h-3 w-3 mr-1" />
                          Video
                        </Badge>
                        <span className="text-sm">{videoEnabled ? "On" : "Off"}</span>
                      </div>
                      <Switch checked={videoEnabled} onCheckedChange={setVideoEnabled} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                          <Mic className="h-3 w-3 mr-1" />
                          Audio
                        </Badge>
                        <span className="text-sm">{audioEnabled ? "On" : "Off"}</span>
                      </div>
                      <Switch checked={audioEnabled} onCheckedChange={setAudioEnabled} />
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="space-y-4">
                    <Label className="text-base">Security Options</Label>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="waiting-room">Enable Waiting Room</Label>
                        <p className="text-sm text-muted-foreground">Admit participants manually</p>
                      </div>
                      <Switch id="waiting-room" checked={isWaitingRoom} onCheckedChange={setIsWaitingRoom} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="meeting-password">Require Meeting Password</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Switch
                        id="meeting-password"
                        checked={isMeetingPassword}
                        onCheckedChange={setIsMeetingPassword}
                      />
                    </div>

                    {isMeetingPassword && (
                      <div className="space-y-2 pl-6 border-l-2 border-primary/10">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="text"
                          value={meetingPassword}
                          onChange={(e) => setMeetingPassword(e.target.value)}
                          placeholder="Enter meeting password"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-lg border bg-muted/50 p-6 text-center">
                    <h3 className="mb-2 text-sm font-medium">Your Meeting is Ready</h3>
                    <div className="flex items-center justify-center gap-2">
                      <code className="relative rounded bg-primary/10 px-[0.5rem] py-[0.2rem] font-mono text-lg font-semibold">
                        {generatedId}
                      </code>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={copyToClipboard} className="h-8 w-8">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Copy Meeting ID</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Share this ID with others to let them join your meeting
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Invite via Email
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Copy className="h-4 w-4" />
                      Copy Invitation Link
                    </Button>
                  </div>

                  <div className="rounded-md bg-primary/5 p-4 border border-primary/10">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Your meeting is secure and encrypted</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {!generatedId ? (
                <Button className="w-full" onClick={handleStartMeeting} disabled={isStarting}>
                  {isStarting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Starting meeting...
                    </>
                  ) : (
                    <>
                      <Video className="mr-2 h-4 w-4" />
                      Start Meeting
                    </>
                  )}
                </Button>
              ) : (
                <div className="flex w-full gap-4">
                  <Button variant="outline" className="w-1/2" onClick={() => setGeneratedId("")}>
                    Cancel
                  </Button>
                  <Button className="w-1/2" onClick={() => router.push(`/meeting/${generatedId}`)}>
                    <Video className="mr-2 h-4 w-4" />
                    Join Now
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="mt-6">
          <Card className="border-primary/10 hover:border-primary/20 transition-colors">
            <CardHeader>
              <CardTitle>Schedule a Meeting</CardTitle>
              <CardDescription>Plan a meeting for a future date and time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Meeting Topic</Label>
                <Input id="topic" placeholder="Weekly Team Meeting" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select defaultValue="60">
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1 hour 30 minutes</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select defaultValue="et">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="et">Eastern Time (ET)</SelectItem>
                      <SelectItem value="ct">Central Time (CT)</SelectItem>
                      <SelectItem value="mt">Mountain Time (MT)</SelectItem>
                      <SelectItem value="pt">Pacific Time (PT)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input id="description" placeholder="Meeting agenda and details" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="participants">Participants</Label>
                <Input id="participants" placeholder="Enter email addresses separated by commas" />
              </div>

              <Separator className="my-2" />

              <div className="space-y-4">
                <Label className="text-base">Meeting Options</Label>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="recurring">Recurring Meeting</Label>
                    <p className="text-sm text-muted-foreground">Repeat this meeting on a schedule</p>
                  </div>
                  <Switch id="recurring" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="waiting-room-schedule">Enable Waiting Room</Label>
                    <p className="text-sm text-muted-foreground">Admit participants manually</p>
                  </div>
                  <Switch id="waiting-room-schedule" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-password">Require Meeting Password</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch id="require-password" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-record">Automatically Record Meeting</Label>
                    <p className="text-sm text-muted-foreground">Start recording when the meeting begins</p>
                  </div>
                  <Switch id="auto-record" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
