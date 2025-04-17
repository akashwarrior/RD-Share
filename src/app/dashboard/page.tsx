import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { Calendar, Clock, MoreHorizontal, Users, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Dashboard from "@/components/pages/dashboard"

const recentMeetings = [
  {
    id: "meet-1",
    name: "Weekly Team Standup",
    type: "Scheduled",
    date: "2025-04-12T10:30:00",
    duration: "45 minutes",
    participants: 8,
    status: "Completed",
  },
]

// Mock data for upcoming meetings
const upcomingMeetings: {
  id: string;
  name: string;
  date: string;
  duration: string;
  participants: number;
}[] | [] = [];

export default async function DashboardPage() {
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

  return (
    <main className="flex-1 space-y-6 p-6 md:p-8 lg:p-10">
      <DashboardHeader heading="Dashboard" text="Manage your meetings and view recent activity.">
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/10 hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
            <Video className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-primary/10 hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meeting Time</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54h 23m</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-primary/10 hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-primary/10 hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingMeetings.length}</div>
            <p className="text-xs text-muted-foreground">Next: Today at 10:30 AM</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>Your scheduled meetings for the next 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingMeetings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No upcoming meetings</p>
                <Button variant="outline" size="sm" className="mt-4">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Meeting
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Video className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{meeting.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(meeting.date)}</span>
                          <span>•</span>
                          <Clock className="h-3.5 w-3.5" />
                          <span>{meeting.duration}</span>
                          <span>•</span>
                          <Users className="h-3.5 w-3.5" />
                          <span>{meeting.participants} participants</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm">Join</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Meeting</DropdownMenuItem>
                          <DropdownMenuItem>Copy Invitation</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Cancel Meeting</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start or join a meeting with one click.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button size="lg" className="h-22 flex-col">
                <Video className="h-6 w-6 mb-2" />
                <span>Start Instant Meeting</span>
              </Button>
              <Button size="lg" variant="outline" className="h-22 flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span>Join with ID</span>
              </Button>
            </div>
            <div className="pt-2">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Join Meeting</h4>
                <div className="flex gap-2">
                  <Input placeholder="Enter meeting ID" />
                  <Button>Join</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dashboard recentMeetings={recentMeetings} />
    </main>
  )
}
