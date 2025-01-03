"use client";

import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "~/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";
import { Checkbox } from "~/components/ui/checkbox";
import { set } from "date-fns";

// Mock user data - in a real application, this would come from your backend
const users = [
  { id: "123456789", name: "Alice" },
  { id: "987654321", name: "Bob" },
  { id: "456789123", name: "Charlie" },
];

export default function SubmitMessage() {
  const { data: members, isPending } = api.member.getAllSubmit.useQuery();
  const createMessage = api.message.create.useMutation();
  const [error, setError] = useState<string>("");
  const [channelId, setChannelId] = useState<string>("");
  const [messageId, setMessageId] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [cringe, setCringe] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    const discordUrl = formData.get("discordUrl") as string;
    const messageContent = formData.get("messageContent") as string;

    if (!selectedUser) {
      setError("Please select a user");
      return;
    }

    try {
      // Extract channel and message IDs from Discord URL
      const r = RegExp(/discord\.com\/channels\/@me\/(\d+)\/(\d+)/);
      const match = r.exec(discordUrl);

      if (!match) {
        throw new Error("Invalid Discord message URL format");
      }

      const [_, extractedChannelId, extractedMessageId] = match;
      setChannelId(extractedChannelId!);
      setMessageId(extractedMessageId!);

      // Here you would typically send this data to your backend
      console.log({
        userId: selectedUser,
        channelId: extractedChannelId,
        messageId: extractedMessageId,
        messageContent,
      });
      const message = createMessage.mutate({
        snowflake: extractedMessageId!,
        channel_id: extractedChannelId!,
        posted_by: selectedUser,
        message_conent: messageContent,
        cringe: cringe,
      });
      console.log(message);

      setSelectedUser("");
      setChannelId("");
      setMessageId("");
      setCringe(false);
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Submit Discord Message</CardTitle>
          <CardDescription>
            Enter a Discord message link and optional message content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="user" className="text-sm font-medium">
                Select User
              </label>
              <Select onValueChange={setSelectedUser} value={selectedUser}>
                <SelectTrigger id="user">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {isPending ? (
                    <SelectItem value="null" disabled>
                      Loading...
                    </SelectItem>
                  ) : (
                    members!.map((user) => (
                      <SelectItem
                        className=""
                        key={user.discord_id}
                        value={user.discord_id}
                      >
                        {user.discord_username}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="discordUrl" className="text-sm font-medium">
                Discord Message URL
              </label>
              <Input
                id="discordUrl"
                name="discordUrl"
                placeholder="https://discord.com/channels/@me/..."
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="messageContent" className="text-sm font-medium">
                Message Content (Optional)
              </label>
              <Textarea
                id="messageContent"
                name="messageContent"
                placeholder="Enter your message here..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center space-x-2 space-y-2">
              <Checkbox
                id="cringe"
                onClick={() => {
                  setCringe(!cringe);
                }}
              />
              <label
                htmlFor="cringe"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Is this message cringe?
              </label>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
