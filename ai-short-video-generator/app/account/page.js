// app/account/page.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";

export default function AccountPage() {
  // Mock user data
  const user = {
    name: "Ubaid Shaikh",
    email: "ubaid.s@example.com",
    bio: "Software engineer at Ai short video company.",
    avatarUrl: "/avatar.png",
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-12">
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col md:flex-row gap-8 h-full">
          {/* Profile Section - Now taller */}
          <Card className="w-full md:w-1/3 h-full">
            <CardHeader>
              <CardTitle className="text-2xl">Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-120px)] flex flex-col">
              <div className="flex flex-col items-center gap-6 flex-grow justify-center">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback className="text-3xl">AJ</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full h-10 w-10"
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Form - Expanded */}
          <Card className="w-full md:w-2/3 h-full">
            <CardHeader>
              <CardTitle className="text-2xl">Edit Profile</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-120px)]">
              <form className="space-y-6 h-full flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue={user.name}
                      placeholder="Enter your name"
                      className="h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user.email}
                      disabled
                      className="h-12 text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2 flex-grow">
                  <Label htmlFor="bio" className="text-base">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    className="min-h-[200px] text-lg"
                    defaultValue={user.bio}
                    placeholder="Tell us about yourself"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Profile Picture</Label>
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback className="text-2xl">AJ</AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      type="button"
                      className="h-12 px-6 text-lg bg-primary text-white"
                    >
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="outline" className="h-12 px-8 text-lg">
                    Cancel
                  </Button>
                  <Button type="submit" className="h-12 px-8 text-lg">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
