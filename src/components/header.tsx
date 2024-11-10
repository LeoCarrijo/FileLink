"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Sun, Moon } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { createClient } from "@/app/lib/supabase/client";
import { useTheme } from "next-themes";

// Add type for user
type UserType = {
	user_metadata: {
		name: string;
		avatar_url: string;
	};
} | null;

export default function Header() {
	const [user, setUser] = useState<UserType>(null);
	const [avatarUrl, setAvatarUrl] = useState<string>("");
	const { setTheme, theme } = useTheme();

	useEffect(() => {
		async function fetchUser() {
			const supabase = await createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user as UserType); // Properly typed assertion
			setAvatarUrl(user?.user_metadata?.avatar_url || "");
		}
		fetchUser();
	}, []);

	const handleLogout = async () => {
		const supabase = await createClient();
		await supabase.auth.signOut();
		// Redirect or update state as needed after logout
	};

	return (
		<header className="shadow-md">
			<div className="container mx-auto flex items-center justify-between px-4 py-4">
				<div className="flex items-center space-x-4">
					<Image
						src={logo}
						width={50}
						height={50}
						alt="FileLink logo"
						className="rounded-full"
					/>
					<h1 className="lobster-regular font-bold text-3xl md:text-5xl">
						FileLink
					</h1>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="relative h-10 w-10 rounded-full">
							<Avatar className="h-10 w-10">
								<AvatarImage src={avatarUrl} />
								<AvatarFallback>Leonardo</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="end" forceMount>
						<DropdownMenuItem>
							<div className="flex flex-col space-y-1">
								<p className="font-medium text-sm">
									{user?.user_metadata?.name}
								</p>
								<p className="text-muted-foreground text-xs">Logged in</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center">
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="flex items-center"
							onClick={() => setTheme(theme === "light" ? "dark" : "light")}
						>
							{theme === "light" ? (
								<Moon className="mr-2 h-4 w-4" />
							) : (
								<Sun className="mr-2 h-4 w-4" />
							)}
							<span>Toggle theme</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="flex items-center"
							onClick={handleLogout}
						>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
