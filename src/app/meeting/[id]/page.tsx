"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Hand,
  Mic,
  MicOff,
  Monitor,
  MoreHorizontal,
  Phone,
  PictureInPicture,
  RepeatIcon,
  Settings,
  Shield,
  Users,
  Video,
  VideoOff,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Participant, WebRTCService } from "@/lib/webrtc-service"

const useWebRTC = () => {
  const [webRTCService, setWebRTCService] = useState<WebRTCService | null>(null)

  useEffect(() => {
    const webRTCService = WebRTCService.getInstance();
    webRTCService.connect("")
      .then(() => {
        setWebRTCService(webRTCService);
      })
      .catch((error) => {
        console.error("Error connecting to WebRTC:", error);
        setWebRTCService(null);
      });

    return () => {
      webRTCService.leave();
      setWebRTCService(null);
    }
  }, [])

  return webRTCService;
}

export default function MeetingPage() {
  const webRTCService = useWebRTC();
  const params = useParams();
  const [isConnecting, setIsConnecting] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (!webRTCService) return;
    setIsConnecting(false);

    webRTCService.getMediaStreams((id, stream) => {
      setParticipants(prev => {
        const participant = prev?.find(p => p.id === id);
        if (participant) {
          console.log("Participant already exists, updating stream");
          participant.video = stream.getVideoTracks()[0];
          participant.audio = stream.getAudioTracks()[0];
          return [...prev];
        }
        return prev;
      });
    });

    webRTCService.getParticipants((participants) => {
      setParticipants(prev => prev ? [...prev, participants] : [participants]);
    });
  }, [webRTCService]);

  useEffect(() => {
    if (!webRTCService) return;

    if (isVideoOn) {
      webRTCService.sendMediaStream();
    } else {
      setParticipants(prev => {
        const participant = prev?.find(p => p.id === -1);
        if (participant) {
          participant.video = null;
          participant.audio = null;
          return [...prev];
        }
        return prev;
      });
      webRTCService.stopMediaStream();
    }
  }, [isVideoOn, webRTCService]);


  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showWaitingRoom, setShowWaitingRoom] = useState(false);
  const [waitingRoomCount, setWaitingRoomCount] = useState(2);
  const [messages, setMessages] = useState<{
    id: string
    sender: string
    text: string
    time: string
    isHost?: boolean
  }[]>([])
  const [showRecordingUnavailable, setShowRecordingUnavailable] = useState(false)
  const meetingContainerRef = useRef<HTMLDivElement>(null)
  const chatScrollRef = useRef<HTMLDivElement>(null)

  // Handle sending a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
  }

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatScrollRef.current && messages.length > 0) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }, [messages]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (meetingContainerRef.current?.requestFullscreen) {
        meetingContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Handle admitting participants from waiting room
  const admitFromWaitingRoom = (admitAll = false) => {
    if (admitAll) {
      setWaitingRoomCount(0)
      setShowWaitingRoom(false)
    } else {
      setWaitingRoomCount((prev) => Math.max(0, prev - 1))
      if (waitingRoomCount <= 1) {
        setShowWaitingRoom(false)
      }
    }
  }

  // Toggle screen sharing
  const toggleScreenSharing = () => {
    setIsScreenSharing(!isScreenSharing)
    if (!isScreenSharing) {
    } else {
    }
  }

  return (
    <div ref={meetingContainerRef} className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Meeting header */}
      <div className="flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 py-2 z-10">
        <div className="flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          <span className="font-medium">
            Meeting ID: <span className="font-mono">{params.id}</span>
          </span>
          {!isConnecting ? (
            <Badge
              variant="outline"
              className="ml-2 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
            >
              <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
              Connected
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="ml-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
            >
              <span className="mr-1 h-2 w-2 animate-pulse rounded-full bg-amber-500"></span>
              Connecting...
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1">
            <Users className="h-4 w-4" />
            <span>{participants.length}</span>
          </Button>

          {showWaitingRoom && (
            <Button variant="outline" size="sm" className="gap-1 animate-pulse" onClick={() => admitFromWaitingRoom()}>
              <Users className="h-4 w-4 text-primary" />
              <span>{waitingRoomCount} in waiting room</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleFullscreen}>
                <PictureInPicture className="mr-2 h-4 w-4" />
                {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Badge
                  variant="outline"
                  className="mr-2 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                >
                  Coming Soon
                </Badge>
                <RepeatIcon className="mr-2 h-4 w-4" />
                Recording
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Meeting Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main meeting area */}
        <div className="relative flex-1 bg-secondary/10 overflow-hidden">
          {isConnecting ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                <p>Connecting to meeting...</p>
                <p className="mt-2 text-sm text-muted-foreground">This may take a few moments</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 h-full">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  // TODO: ADD BLUE BORDER WHEN AUDIO IS CURRENTLY PLAYING border-2 border-primary
                  className={`relative rounded-lg overflow-hidden bg-muted border max-h-1/2 aspect-square lg:aspect-auto`}
                >
                  {participant.video ? (
                    <div className="h-full w-full bg-gradient-to-br from-primary/5 to-transparent flex items-center justify-center">
                      <video
                        autoPlay
                        playsInline
                        muted
                        ref={(video) => {
                          if (video) {
                            const stream = new MediaStream();
                            stream.addTrack(participant.video!);
                            video.srcObject = stream;
                          }
                        }}
                        className="h-full w-full object-cover"
                      />
                      <Avatar className="absolute top-2 left-2 right-2 h-10 w-10 bg-white/90">
                        <AvatarImage src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${participant.name!}`} />
                        <AvatarFallback>{participant?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <Avatar className="h-20 w-20 bg-white/90">
                        <AvatarImage src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${participant.name!}`} />
                        <AvatarFallback>{participant?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <div className="bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs flex items-center gap-1">
                      {!participant.audio && <MicOff className="h-3 w-3" />}
                      <span>{participant.name!}</span>
                      {/* {participant.isHost && <Badge className="ml-1 text-[10px] py-0">Host</Badge>} */}
                    </div>
                    {participant.screen && (
                      <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary text-[10px]">
                        <Monitor className="h-3 w-3 mr-1" />
                        Sharing
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="w-80 border-l bg-background flex flex-col overflow-hidden">
          <Tabs defaultValue="participants" className="flex flex-col h-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="participants" className="relative">
                Participants
                {showWaitingRoom && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground">
                    {waitingRoomCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="chat" className="relative">
                Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="participants" className="flex-1 overflow-hidden flex flex-col">
              {showWaitingRoom && (
                <div className="p-3 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{waitingRoomCount} in waiting room</p>
                    <p className="text-xs text-muted-foreground">Waiting for admission</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => admitFromWaitingRoom()}>
                      Admit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => admitFromWaitingRoom(true)}>
                      Admit All
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Host</h3>
                    <Button variant="ghost" size="sm">
                      Mute All
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {<div
                      key={participants[0]?.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{participants[0]?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{participants[0]?.name}</p>
                          <p className="text-xs text-muted-foreground">Host</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {participants[0]?.audio ? (
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                            <MicOff className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Mic className="h-4 w-4" />
                          </Button>
                        )}
                        {participants[0]?.video ? (
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Video className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                            <VideoOff className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    }
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">
                      Participants ({participants.length > 1 ? participants.length - 1 : 0})
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {participants.map((participant, idx) => idx !== 0 && (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{participant?.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{participant.name!}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {participant.audio ? (
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                              <MicOff className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Mic className="h-4 w-4" />
                            </Button>
                          )}
                          {participant.video ? (
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Video className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                              <VideoOff className="h-4 w-4" />
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Make Host</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t p-4">
                <Button variant="outline" className="w-full" onClick={() => setShowLeaveDialog(true)}>
                  Invite Participants
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 p-4 overflow-y-auto" ref={chatScrollRef}>
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                    <MessageSquareIcon className="mb-2 h-12 w-12" />
                    <p>No messages yet</p>
                    <p className="text-sm">Start the conversation</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex gap-2 ${message.sender === "You" ? "justify-end" : ""}`}>
                        {message.sender !== "You" && message.sender !== "System" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${message.sender === "You"
                            ? "bg-primary text-primary-foreground"
                            : message.sender === "System"
                              ? "bg-muted/50 text-muted-foreground text-xs"
                              : "bg-muted"
                            }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-medium">
                              {message.sender}
                              {message.isHost && <Badge className="ml-1 text-[10px] py-0">Host</Badge>}
                            </span>
                            <span className="text-xs opacity-70">{message.time}</span>
                          </div>
                          <p className="mt-1 text-sm">{message.text}</p>
                        </div>
                        {message.sender === "You" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Textarea
                    placeholder="Type a message..."
                    className="min-h-[60px] flex-1 resize-none"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Meeting controls */}
      <div className="flex items-center justify-center bg-background/95 backdrop-blur border-t px-4 py-3 z-10 relative">
        {/* Security indicator */}
        <div className="absolute left-4 flex items-center gap-2 rounded-md bg-background/80 px-3 py-1.5 text-sm backdrop-blur-sm">
          <Shield className="h-4 w-4 text-primary" />
          <span>Encrypted</span>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isMuted ? "secondary" : "outline"}
                  size="icon"
                  className="rounded-full h-12 w-12"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isMuted ? "Unmute" : "Mute"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isVideoOn ? "outline" : "secondary"}
                  size="icon"
                  className="rounded-full h-12 w-12"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isVideoOn ? "Stop" : "Start"}  Video</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isScreenSharing ? "default" : "outline"}
                  size="icon"
                  className="rounded-full h-12 w-12"
                  onClick={toggleScreenSharing}
                >
                  <Monitor className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isScreenSharing ? "Stop Sharing" : "Share Screen"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                  <Hand className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Raise Hand</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 relative"
                  onClick={() => setShowRecordingUnavailable(true)}
                >
                  <RepeatIcon className="h-5 w-5" />
                  <Badge
                    variant="outline"
                    className="absolute -top-2 -right-2 text-[10px] bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                  >
                    Soon
                  </Badge>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Recording (Coming Soon)</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="destructive"
            size="lg"
            className="rounded-full h-12 px-6"
            onClick={() => setShowLeaveDialog(true)}
          >
            <Phone className="h-5 w-5 rotate-135" />
            <span className="ml-2 hidden sm:inline">Leave</span>
          </Button>
        </div>
      </div>

      {/* Leave meeting dialog */}
      <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Meeting</DialogTitle>
            <DialogDescription>Are you sure you want to leave this meeting?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLeaveDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => router.push("/dashboard")}>
              Leave Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Recording unavailable dialog */}
      <Dialog open={showRecordingUnavailable} onOpenChange={setShowRecordingUnavailable}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recording Coming Soon</DialogTitle>
            <DialogDescription>
              Meeting recording functionality is currently in development and will be available in a future update.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Our team is working hard to bring you high-quality meeting recording capabilities. Stay tuned for updates!
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowRecordingUnavailable(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}