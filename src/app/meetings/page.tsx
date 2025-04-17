"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Edit, MoreHorizontal, Search, Trash2, Users, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardHeader } from "@/components/dashboard-header"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import Link from "next/link"

export default function MeetingsPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [selectedMeeting, setSelectedMeeting] = useState<any>(null)
    const [isRecurring, setIsRecurring] = useState(false)
    const [isPasswordProtected, setIsPasswordProtected] = useState(false)
    const [isWaitingRoomEnabled, setIsWaitingRoomEnabled] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [meetings, setMeetings] = useState<{
        hostedMeetings: any[]
        participatedMeetings: any[]
    }>({
        hostedMeetings: [],
        participatedMeetings: [],
    })
    const [contacts, setContacts] = useState<any[]>([])
    const [selectedContacts, setSelectedContacts] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState("upcoming")

    // Fetch meetings
    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`/api/meetings?type=${activeTab}`)
                if (!response.ok) throw new Error("Failed to fetch meetings")
                const data = await response.json();
                setMeetings(data)
            } catch (error) {
                console.log("Error fetching meetings:", error)
                toast.error("Error", {
                    description: "Failed to load meetings. Please try again.",
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchMeetings()
    }, [activeTab, toast])

    // Fetch contacts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("/api/contacts")
                if (!response.ok) throw new Error("Failed to fetch contacts")
                const data = await response.json()
                setContacts(
                    data.map((contact: any) => ({
                        ...contact.contact,
                        selected: false,
                    })),
                )
            } catch (error) {
                console.log("Error fetching contacts:", error)
            }
        }

        fetchContacts()
    }, [])

    // Format date to readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    // Handle meeting deletion
    const handleDeleteMeeting = async () => {
        if (!selectedMeeting) return

        try {
            const response = await fetch(`/api/meetings/${selectedMeeting.id}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete meeting")

            toast.success("Success", {
                description: "Meeting deleted successfully",
            })

            // Refresh meetings
            const updatedMeetings = {
                hostedMeetings: meetings.hostedMeetings.filter((m) => m.id !== selectedMeeting.id),
                participatedMeetings: meetings.participatedMeetings,
            }
            setMeetings(updatedMeetings)
        } catch (error) {
            console.error("Error deleting meeting:", error)
            toast.error("Error", {
                description: "Failed to delete meeting. Please try again.",
            })
        } finally {
            setShowDeleteDialog(false)
            setSelectedMeeting(null)
        }
    }

    // Handle meeting edit
    const handleEditMeeting = async () => {
        if (!selectedMeeting) return

        try {
            const participantIds = selectedContacts.filter((contact) => contact.selected).map((contact) => contact.id)

            const updatedMeeting = {
                title: selectedMeeting.title,
                description: selectedMeeting.description,
                startTime: selectedMeeting.startTime,
                endTime: selectedMeeting.endTime,
                isRecurring,
                recurrencePattern: selectedMeeting.recurrencePattern,
                password: isPasswordProtected ? selectedMeeting.password : null,
                waitingRoomEnabled: isWaitingRoomEnabled,
                participants: participantIds,
            }

            const response = await fetch(`/api/meetings/${selectedMeeting.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedMeeting),
            })

            if (!response.ok) throw new Error("Failed to update meeting")

            toast.success("Success", {
                description: "Meeting updated successfully",
            })

            // Refresh meetings
            const meetingsResponse = await fetch(`/api/meetings?type=${activeTab}`)
            if (meetingsResponse.ok) {
                const data = await meetingsResponse.json()
                setMeetings(data)
            }
        } catch (error) {
            console.error("Error updating meeting:", error)
            toast.error("Error", {
                description: "Failed to update meeting. Please try again.",
            })
        } finally {
            setShowEditDialog(false)
            setSelectedMeeting(null)
        }
    }

    // Toggle contact selection
    const toggleContactSelection = (contactId: string) => {
        setSelectedContacts(
            selectedContacts.map((contact) =>
                contact.id === contactId ? { ...contact, selected: !contact.selected } : contact,
            ),
        )
    }

    // Prepare for editing a meeting
    const prepareEditMeeting = (meeting: any) => {
        setSelectedMeeting(meeting)
        setIsRecurring(meeting.isRecurring)
        setIsPasswordProtected(!!meeting.password)
        setIsWaitingRoomEnabled(meeting.waitingRoomEnabled)

        // Prepare contacts with selection state based on meeting participants
        const participantIds = meeting.participants.map((p: any) => p.userId)
        setSelectedContacts(
            contacts.map((contact) => ({
                ...contact,
                selected: participantIds.includes(contact.id),
            })),
        )

        setShowEditDialog(true)
    }

    // Filter meetings based on search query
    const filteredMeetings = {
        hostedMeetings: meetings.hostedMeetings.filter((meeting) =>
            meeting.title.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
        participatedMeetings: meetings.participatedMeetings.filter((meeting) =>
            meeting.title.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    }

    // All meetings to display
    const allMeetings = [...filteredMeetings.hostedMeetings, ...filteredMeetings.participatedMeetings]

    return (
        <main className="p-6 space-y-6">
            <DashboardHeader heading="Meetings" text="View, schedule, and manage your meetings.">
                <div className="flex gap-2">
                    <Link href="/meetings/schedule">
                        <Button variant="outline">
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule
                        </Button>
                    </Link>
                    <Link href="/meetings/host">
                        <Button>
                            <Video className="mr-2 h-4 w-4" />
                            New Meeting
                        </Button>
                    </Link>
                </div>
            </DashboardHeader>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search meetings..."
                        className="w-full pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Meetings</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="recurring">Recurring</SelectItem>
                            <SelectItem value="past">Past</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="recurring">Recurring</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Meetings</CardTitle>
                            <CardDescription>View and manage your scheduled meetings.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex justify-center py-8">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                                </div>
                            ) : allMeetings.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                                    <p className="text-muted-foreground">No upcoming meetings</p>
                                    <Link href="/meetings/schedule">
                                        <Button variant="outline" size="sm" className="mt-4">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            Schedule a Meeting
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[300px]">Title</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Date & Time</TableHead>
                                                <TableHead>Host</TableHead>
                                                <TableHead>Participants</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {allMeetings.map((meeting) => (
                                                <TableRow key={meeting.id} className="hover:bg-muted/50">
                                                    <TableCell className="font-medium">{meeting.title}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={meeting.isRecurring ? "default" : "secondary"} className="font-normal">
                                                            {meeting.isRecurring ? "Recurring" : "Scheduled"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{formatDate(meeting.startTime)}</TableCell>
                                                    <TableCell>{meeting.host.name}</TableCell>
                                                    <TableCell>{meeting.participants.length}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Open menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={() => router.push(`/meeting/${meeting.id}`)}>
                                                                    <Video className="mr-2 h-4 w-4" />
                                                                    Start Now
                                                                </DropdownMenuItem>
                                                                {meeting.host.id === meeting.hostId && (
                                                                    <DropdownMenuItem onClick={() => prepareEditMeeting(meeting)}>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <DropdownMenuItem>
                                                                    <Users className="mr-2 h-4 w-4" />
                                                                    Manage Participants
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                {meeting.host.id === meeting.hostId && (
                                                                    <DropdownMenuItem
                                                                        className="text-destructive"
                                                                        onClick={() => {
                                                                            setSelectedMeeting(meeting)
                                                                            setShowDeleteDialog(true)
                                                                        }}
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="recurring" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recurring Meetings</CardTitle>
                            <CardDescription>View and manage your recurring meetings.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex justify-center py-8">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                                </div>
                            ) : allMeetings.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                                    <p className="text-muted-foreground">No recurring meetings</p>
                                    <Link href="/meetings/schedule">
                                        <Button variant="outline" size="sm" className="mt-4">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            Schedule a Recurring Meeting
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[300px]">Title</TableHead>
                                                <TableHead>Pattern</TableHead>
                                                <TableHead>Next Occurrence</TableHead>
                                                <TableHead>Host</TableHead>
                                                <TableHead>Participants</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {allMeetings.map((meeting) => (
                                                <TableRow key={meeting.id} className="hover:bg-muted/50">
                                                    <TableCell className="font-medium">{meeting.title}</TableCell>
                                                    <TableCell>{meeting.recurrencePattern || "Weekly"}</TableCell>
                                                    <TableCell>{formatDate(meeting.startTime)}</TableCell>
                                                    <TableCell>{meeting.host.name}</TableCell>
                                                    <TableCell>{meeting.participants.length}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Open menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={() => router.push(`/meeting/${meeting.id}`)}>
                                                                    <Video className="mr-2 h-4 w-4" />
                                                                    Start Now
                                                                </DropdownMenuItem>
                                                                {meeting.host.id === meeting.hostId && (
                                                                    <DropdownMenuItem onClick={() => prepareEditMeeting(meeting)}>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <DropdownMenuItem>
                                                                    <Users className="mr-2 h-4 w-4" />
                                                                    Manage Participants
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                {meeting.host.id === meeting.hostId && (
                                                                    <DropdownMenuItem
                                                                        className="text-destructive"
                                                                        onClick={() => {
                                                                            setSelectedMeeting(meeting)
                                                                            setShowDeleteDialog(true)
                                                                        }}
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Past Meetings</CardTitle>
                            <CardDescription>View your completed meetings.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex justify-center py-8">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                                </div>
                            ) : allMeetings.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                                    <p className="text-muted-foreground">No past meetings</p>
                                </div>
                            ) : (
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[300px]">Title</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Date & Time</TableHead>
                                                <TableHead>Host</TableHead>
                                                <TableHead>Participants</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {allMeetings.map((meeting) => (
                                                <TableRow key={meeting.id} className="hover:bg-muted/50">
                                                    <TableCell className="font-medium">{meeting.title}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={meeting.isRecurring ? "default" : "secondary"} className="font-normal">
                                                            {meeting.isRecurring ? "Recurring" : "Scheduled"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{formatDate(meeting.startTime)}</TableCell>
                                                    <TableCell>{meeting.host.name}</TableCell>
                                                    <TableCell>{meeting.participants.length}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Open menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="mr-2 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                                                                    >
                                                                        Coming Soon
                                                                    </Badge>
                                                                    View Recording
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => router.push(`/meeting/${meeting.id}`)}>
                                                                    <Video className="mr-2 h-4 w-4" />
                                                                    Start Again
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                {meeting.host.id === meeting.hostId && (
                                                                    <DropdownMenuItem
                                                                        className="text-destructive"
                                                                        onClick={() => {
                                                                            setSelectedMeeting(meeting)
                                                                            setShowDeleteDialog(true)
                                                                        }}
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Delete Meeting Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Meeting</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this meeting? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="font-medium">{selectedMeeting?.title}</p>
                        <p className="text-sm text-muted-foreground">{selectedMeeting && formatDate(selectedMeeting.startTime)}</p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteMeeting}>
                            Delete Meeting
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Meeting Dialog */}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Meeting</DialogTitle>
                        <DialogDescription>Update your meeting details and settings.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Meeting Title</Label>
                            <Input
                                id="title"
                                defaultValue={selectedMeeting?.title}
                                onChange={(e) => setSelectedMeeting({ ...selectedMeeting, title: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    defaultValue={selectedMeeting?.startTime?.split("T")[0]}
                                    onChange={(e) => {
                                        const date = e.target.value
                                        const time = selectedMeeting?.startTime
                                            ? new Date(selectedMeeting.startTime).toTimeString().slice(0, 5)
                                            : "00:00"
                                        setSelectedMeeting({ ...selectedMeeting, startTime: `${date}T${time}` })
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    defaultValue={
                                        selectedMeeting?.startTime
                                            ? new Date(selectedMeeting.startTime).toTimeString().slice(0, 5)
                                            : undefined
                                    }
                                    onChange={(e) => {
                                        const time = e.target.value
                                        const date = selectedMeeting?.startTime
                                            ? new Date(selectedMeeting.startTime).toISOString().split("T")[0]
                                            : new Date().toISOString().split("T")[0]
                                        setSelectedMeeting({ ...selectedMeeting, startTime: `${date}T${time}` })
                                    }}
                                />
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <Label className="text-base">Meeting Options</Label>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="recurring">Recurring Meeting</Label>
                                    <p className="text-sm text-muted-foreground">Repeat this meeting on a schedule</p>
                                </div>
                                <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
                            </div>

                            {isRecurring && (
                                <div className="pl-6 border-l-2 border-primary/10 space-y-2">
                                    <Label htmlFor="recurrence">Recurrence Pattern</Label>
                                    <Select
                                        defaultValue={selectedMeeting?.recurrencePattern || "weekly"}
                                        onValueChange={(value) => setSelectedMeeting({ ...selectedMeeting, recurrencePattern: value })}
                                    >
                                        <SelectTrigger id="recurrence">
                                            <SelectValue placeholder="Select pattern" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="waiting-room">Enable Waiting Room</Label>
                                    <p className="text-sm text-muted-foreground">Admit participants manually</p>
                                </div>
                                <Switch id="waiting-room" checked={isWaitingRoomEnabled} onCheckedChange={setIsWaitingRoomEnabled} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="password">Require Meeting Password</Label>
                                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                                </div>
                                <Switch id="password" checked={isPasswordProtected} onCheckedChange={setIsPasswordProtected} />
                            </div>

                            {isPasswordProtected && (
                                <div className="pl-6 border-l-2 border-primary/10 space-y-2">
                                    <Label htmlFor="meeting-password">Password</Label>
                                    <Input
                                        id="meeting-password"
                                        type="text"
                                        placeholder="Enter meeting password"
                                        defaultValue={selectedMeeting?.password}
                                        onChange={(e) => setSelectedMeeting({ ...selectedMeeting, password: e.target.value })}
                                    />
                                </div>
                            )}
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Label>Participants</Label>
                            <div className="h-[200px] border rounded-md p-4 overflow-y-auto">
                                <div className="space-y-2">
                                    {selectedContacts.map((contact) => (
                                        <div key={contact.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`contact-${contact.id}`}
                                                checked={contact.selected}
                                                onCheckedChange={() => toggleContactSelection(contact.id)}
                                            />
                                            <Label htmlFor={`contact-${contact.id}`} className="flex-1">
                                                <div className="font-medium">{contact.name}</div>
                                                <div className="text-sm text-muted-foreground">{contact.email}</div>
                                            </Label>
                                        </div>
                                    ))}

                                    {selectedContacts.length === 0 && (
                                        <div className="text-center text-muted-foreground py-4">
                                            <p>No contacts available</p>
                                            <Link href="/contacts">
                                                <Button variant="link" className="mt-2">
                                                    Add contacts
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditMeeting}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Toaster richColors />
        </main>
    )
}