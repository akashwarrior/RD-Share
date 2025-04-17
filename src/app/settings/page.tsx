"use client"

import { useState } from "react"
import { Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { DashboardHeader } from "@/components/dashboard-header"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [showSavedMessage, setShowSavedMessage] = useState(false)

  const handleSave = () => {
    setIsSaving(true)

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      setShowSavedMessage(true)

      // Hide the saved message after 3 seconds
      setTimeout(() => {
        setShowSavedMessage(false)
      }, 3000)
    }, 1000)
  }

  return (
    <main className="flex-1 space-y-6 p-6 md:p-8 lg:p-10">
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences." />

      {showSavedMessage && (
        <Alert className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 mb-6">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your settings have been saved successfully.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="recording">Recording</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general application settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notifications">Notifications</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="notifications">
                    <SelectValue placeholder="Select notification preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notifications</SelectItem>
                    <SelectItem value="important">Important Only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-updates">Automatic Updates</Label>
                    <p className="text-sm text-muted-foreground">Keep the application up to date automatically</p>
                  </div>
                  <Switch id="auto-updates" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="startup">Start on System Boot</Label>
                    <p className="text-sm text-muted-foreground">Launch ScreenConnect when your system starts</p>
                  </div>
                  <Switch id="startup" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="minimize-tray">Minimize to System Tray</Label>
                    <p className="text-sm text-muted-foreground">Keep running in the background when closed</p>
                  </div>
                  <Switch id="minimize-tray" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Change Password</Label>
                <div className="grid gap-2">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Subscription Plan</Label>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pro Plan</p>
                      <p className="text-sm text-muted-foreground">$9.99/month • Renews on May 15, 2025</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-destructive">
                Delete Account
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="connection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connection Settings</CardTitle>
              <CardDescription>Configure network and connection preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Connection Quality</Label>
                <RadioGroup defaultValue="auto">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="auto" id="quality-auto" />
                    <Label htmlFor="quality-auto">Automatic (Recommended)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="quality-high" />
                    <Label htmlFor="quality-high">High Quality</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="balanced" id="quality-balanced" />
                    <Label htmlFor="quality-balanced">Balanced</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="quality-low" />
                    <Label htmlFor="quality-low">Low Bandwidth</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Default Frame Rate</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">30 FPS</span>
                  <Slider defaultValue={[30]} min={15} max={60} step={5} className="w-[60%]" />
                  <span className="text-sm">60 FPS</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Higher frame rates provide smoother video but require more bandwidth.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Network Adapter</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue placeholder="Select network adapter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="ethernet">Ethernet</SelectItem>
                    <SelectItem value="wifi">Wi-Fi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="upnp">UPnP Port Forwarding</Label>
                    <p className="text-sm text-muted-foreground">Automatically configure your router for connections</p>
                  </div>
                  <Switch id="upnp" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="relay">Use Relay Servers</Label>
                    <p className="text-sm text-muted-foreground">
                      Connect through our servers when direct connection is not possible
                    </p>
                  </div>
                  <Switch id="relay" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Advanced Network Settings</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="port" className="text-sm">
                      Custom Port
                    </Label>
                    <Input id="port" placeholder="e.g. 8080" />
                  </div>
                  <div>
                    <Label htmlFor="stun" className="text-sm">
                      STUN Server
                    </Label>
                    <Input id="stun" defaultValue="stun.l.google.com:19302" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="recording" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recording Settings</CardTitle>
              <CardDescription>Configure session recording preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Default Recording Quality</Label>
                <RadioGroup defaultValue="medium">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="rec-high" />
                    <Label htmlFor="rec-high">High (1080p, 60fps)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="rec-medium" />
                    <Label htmlFor="rec-medium">Medium (720p, 30fps)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="rec-low" />
                    <Label htmlFor="rec-low">Low (480p, 30fps)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>File Format</Label>
                <Select defaultValue="mp4">
                  <SelectTrigger>
                    <SelectValue placeholder="Select file format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp4">MP4</SelectItem>
                    <SelectItem value="webm">WebM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Storage Location</Label>
                <div className="flex gap-2">
                  <Input defaultValue="C:\Users\John\Documents\ScreenConnect\Recordings" className="flex-1" />
                  <Button variant="outline">Browse</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Storage Management</Label>
                <Select defaultValue="30days">
                  <SelectTrigger>
                    <SelectValue placeholder="Select storage policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forever">Keep Forever</SelectItem>
                    <SelectItem value="30days">Delete After 30 Days</SelectItem>
                    <SelectItem value="7days">Delete After 7 Days</SelectItem>
                    <SelectItem value="manual">Manual Cleanup</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-record">Auto-Record Sessions</Label>
                    <p className="text-sm text-muted-foreground">Automatically record all sessions</p>
                  </div>
                  <Switch id="auto-record" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="include-audio">Include Audio</Label>
                    <p className="text-sm text-muted-foreground">Record audio during sessions</p>
                  </div>
                  <Switch id="include-audio" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="include-chat">Include Chat</Label>
                    <p className="text-sm text-muted-foreground">Save chat messages with recordings</p>
                  </div>
                  <Switch id="include-chat" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Manage privacy and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-primary/10 border-primary/20">
                <Info className="h-4 w-4" />
                <AlertTitle>End-to-End Encryption</AlertTitle>
                <AlertDescription>
                  All sessions are secured with end-to-end encryption. No one, including us, can access your session
                  content.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label>Encryption Strength</Label>
                <Select defaultValue="aes256">
                  <SelectTrigger>
                    <SelectValue placeholder="Select encryption level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aes256">AES-256 (Recommended)</SelectItem>
                    <SelectItem value="aes128">AES-128</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="permission-prompt">Permission Prompt</Label>
                    <p className="text-sm text-muted-foreground">Ask for confirmation before allowing remote control</p>
                  </div>
                  <Switch id="permission-prompt" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-disconnect">Auto-Disconnect</Label>
                    <p className="text-sm text-muted-foreground">Automatically disconnect after period of inactivity</p>
                  </div>
                  <Switch id="auto-disconnect" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Inactivity Timeout</Label>
                <Select defaultValue="30min">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeout period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15min">15 minutes</SelectItem>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Data Collection</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Usage Statistics</p>
                      <p className="text-sm text-muted-foreground">Help us improve by sending anonymous usage data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Crash Reports</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically send crash reports to help fix issues
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="privacy-policy">Privacy Policy</Label>
                <Textarea
                  id="privacy-policy"
                  readOnly
                  className="h-24 resize-none bg-muted/50"
                  value="Your privacy is important to us. We do not sell or share your personal information with third parties. All session data is encrypted and not accessible to us. For more information, please visit our website."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
