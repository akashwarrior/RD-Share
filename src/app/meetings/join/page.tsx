"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Mic, MicOff, Shield, Video, VideoOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard-header"
import { Switch } from "@/components/ui/switch"

export default function JoinMeetingPage() {
  const router = useRouter()
  const [isJoining, setIsJoining] = useState(false)
  const [meetingId, setMeetingId] = useState("")
  const [displayName, setDisplayName] = useState("John Doe")
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [password, setPassword] = useState("")

  const handleJoinMeeting = () => {
    if (!meetingId) return

    setIsJoining(true)

    // Simulate joining process
    setTimeout(() => {
      setIsJoining(false)
      router.push(`/meeting/${meetingId}`)
    }, 2000);
  }

  return (
    <main className="flex-1 space-y-6 p-6 md:p-8 lg:p-10">
      <DashboardHeader heading="Join a Meeting" text="Enter a meeting ID to join an existing meeting." />

      <div className="max-w-md mx-auto">
        <Card className="border-primary/10 hover:border-primary/20 transition-colors">
          <CardHeader>
            <CardTitle>Join Meeting</CardTitle>
            <CardDescription>Enter the meeting ID provided by the host.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="meeting-id">Meeting ID</Label>
              <Input
                id="meeting-id"
                placeholder="Enter meeting ID"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display-name">Your Name</Label>
              <Input
                id="display-name"
                placeholder="Enter your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Meeting Password (if required)</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter meeting password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-4 pt-2">
              <Label className="text-base">Join Options</Label>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                      {videoEnabled ? (
                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                          <Video className="h-6 w-6 text-primary" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-muted flex items-center justify-center">
                          <VideoOff className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Video</p>
                      <p className="text-xs text-muted-foreground">{videoEnabled ? "On" : "Off"}</p>
                    </div>
                  </div>
                  <Switch checked={videoEnabled} onCheckedChange={setVideoEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                      {audioEnabled ? (
                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                          <Mic className="h-6 w-6 text-primary" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-muted flex items-center justify-center">
                          <MicOff className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Audio</p>
                      <p className="text-xs text-muted-foreground">{audioEnabled ? "On" : "Off"}</p>
                    </div>
                  </div>
                  <Switch checked={audioEnabled} onCheckedChange={setAudioEnabled} />
                </div>
              </div>
            </div>

            <div className="rounded-md bg-primary/5 p-4 border border-primary/10">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>All meetings are secured with end-to-end encryption</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleJoinMeeting} disabled={!meetingId || isJoining}>
              {isJoining ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                <>Join Meeting</>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
