'use client';

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"

export default function Dashboard({ recentMeetings }: {
    recentMeetings: {
        id: string;
        name: string;
        type: string;
        date: string;
        duration: string;
        participants: number;
        status: string;
    }[]
}) {
    const [searchQuery, setSearchQuery] = useState("");

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

    return (
        <Tabs defaultValue="recent" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="recent">Recent Meetings</TabsTrigger>
                    <TabsTrigger value="recordings">Recent Recordings</TabsTrigger>
                </TabsList>
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
            </div>

            <TabsContent value="recent" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Meetings</CardTitle>
                        <CardDescription>View your recent meeting history and activity.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[250px]">Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Participants</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentMeetings
                                        ?.filter((meeting) =>
                                            meeting.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            meeting.type.toLowerCase().includes(searchQuery.toLowerCase()),
                                        )
                                        .map((meeting) => (
                                            <TableRow key={meeting.id} className="hover:bg-muted/50">
                                                <TableCell className="font-medium">{meeting.name}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={meeting.type === "Scheduled" ? "default" : "secondary"}
                                                        className="font-normal"
                                                    >
                                                        {meeting.type}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{formatDate(meeting.date)}</TableCell>
                                                <TableCell>{meeting.duration}</TableCell>
                                                <TableCell>{meeting.participants}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                                                    >
                                                        {meeting.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="recordings" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Recordings</CardTitle>
                        <CardDescription>Access your recent meeting recordings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h4 className="font-medium text-muted-foreground text-center">
                            No recent recordings available
                        </h4>
                        <div className="flex justify-center mt-6">
                            <Link href="/recordings">
                                <Button variant="outline">View All Recordings</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}