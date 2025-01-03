'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, Search } from 'lucide-react'
import { Checkbox } from "~/components/ui/checkbox"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Calendar } from "~/components/ui/calendar"
import { api } from '~/trpc/react'

// Sample data
const messages = [
    { id: 1, content: "Hello team!", date: "2023-05-01", author: "Alice", cringe: false },
    { id: 2, content: "Project update: we're on track", date: "2023-05-02", author: "Bob", cringe: false },
    { id: 3, content: "Don't forget the meeting at 2 PM", date: "2023-05-03", author: "Charlie", cringe: false },
    { id: 4, content: "New feature deployed", date: "2023-05-04", author: "Alice", cringe: false },
    { id: 5, content: "Weekend plans anyone?", date: "2023-05-05", author: "Bob", cringe: true },
]

export default function MessagesPage() {
    const { data: viewFilter } = api.member.getAllView.useQuery();
    const { data: messages } = api.message.getMessages.useQuery();
    const [dateFrom, setDateFrom] = useState<Date>()
    const [dateTo, setDateTo] = useState<Date>()
    const [author, setAuthor] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState<string>("")

    const filteredMessages = messages?.filter(message => {
        const messageDate = new Date(message.posted_at)
        const matchesDateRange = (!dateFrom || messageDate >= dateFrom) && (!dateTo || messageDate <= dateTo)
        const matchesAuthor = author === "all" || message.posted_by === author
        const matchesSearch = message.message_content?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesDateRange && matchesAuthor && matchesSearch
    })

    const uniqueAuthors = viewFilter;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Messages</h1>

            <div className="flex flex-wrap items-end gap-4 mb-6 ml-4">
                <div>
                    <Label htmlFor="date-from">From</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-[130px] justify-start text-left font-normal ml-2 pl-2.5 text-black">
                                <CalendarIcon className="mr-2 h-4 w-4" color='black' />
                                {dateFrom ? format(dateFrom, "PP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <Label htmlFor="date-to">To</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-[130px] justify-start text-left font-normal ml-2 pl-2.5 text-black">
                                <CalendarIcon className="mr-2 h-4 w-4" color='black' />
                                {dateTo ? format(dateTo, "PP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <Label htmlFor="author">Author</Label>
                    <Select value={author} onValueChange={setAuthor}>
                        <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Select an author" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Authors</SelectItem>
                            {uniqueAuthors?.map(author => (
                                <SelectItem key={author.discord_id} value={author.discord_id}>{author.discord_username}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex-grow">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                        <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="search"
                            placeholder="Search messages..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Cringe</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredMessages?.map((message) => (
                        <TableRow key={message.snowflake}>
                            <TableCell>{message.posted_at.toString()}</TableCell>
                            <TableCell>{viewFilter?.find((e) => e.discord_id == message.posted_by)?.discord_username}</TableCell>
                            <TableCell>{message.message_content}</TableCell>
                            <TableCell>
                                <Checkbox checked={message.cringe} disabled className='bg-white !opacity-100' />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

