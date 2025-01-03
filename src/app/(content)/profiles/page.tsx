import Image from "next/image";
import Link from "next/link";

import { HydrateClient, api } from "~/trpc/server";

async function Profiles() {
    const users = await api.profile.getAllProfiles();
    return (
        <HydrateClient>
            <div className="container p-4">
                <h1 className="text-xl">Users</h1>
                <table className="table-fixed p-4 m-2 text-lg">
                    <thead>
                        <tr>
                            <th>Userame</th>
                            <th>Discord ID</th>
                            <th>View Messages</th>
                            <th>Submit Messages</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user.id} className="border border-gray-700  odd:bg-gray-700">
                                <td>
                                    <div className="flex items-center pr-4 pl-3">
                                        <Image
                                            src={user.picture!}
                                            alt={user.name!}
                                            width={24}
                                            height={24}
                                            className="rounded-full"
                                        />
                                        <Link href={"/profiles/" + user.id} className="ml-2 underline">{user.name}</Link>
                                    </div>
                                </td>
                                <td className="px-3 py-2">{user.discord_id}</td>
                                <td className="px-3 py-2">{user.view_messages.join(", ")}</td>
                                <td className="px-3 py-2">{user.submit_messages.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </HydrateClient>
    )
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

export default async function UsersPage() {
    const users = await api.profile.getAllProfiles();
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">User Table</h1>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Picture</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>ID</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users!.map((user) => (
                            <TableRow key={user.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell>
                                    <Link href={`/profiles/${user.id}`} className="flex items-center">
                                        <Image
                                            src={user.picture!}
                                            alt={`${user.name}'s profile picture`}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                    </Link>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Link href={`/profiles/${user.id}`} className="hover:underline">
                                        {user.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/profiles/${user.id}`} className="hover:underline">
                                        {user.id}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

