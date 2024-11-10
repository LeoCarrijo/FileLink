"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import { createClient } from "../lib/supabase/client";

export default function LoginPageComponent() {
	const handleGithubLogin = async () => {
		const supabase = await createClient();
		await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: "http://localhost:3000/auth/callback",
			},
		});
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-center font-bold text-2xl">
						Welcome
					</CardTitle>
					<CardDescription className="text-center">
						Sign in to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						onClick={handleGithubLogin}
						className="w-full"
						variant="outline"
					>
						<Github className="mr-2 h-5 w-5" />
						Continue with GitHub
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
