"use client";

import { Button } from "@/components/ui/button";
import { LoginWithGithub, login, signup } from "./actions";
import { Github } from "lucide-react";
import { createClient } from "../lib/supabase/client";

export default function LoginPage() {
	return (
		<Button
			onClick={async () => {
				const supabase = await createClient();
				await supabase.auth.signInWithOAuth({
					provider: "github",
					options: {
						redirectTo: "http://localhost:3000/auth/callback",
					},
				});
			}}
		>
			Entrar com GitHub <Github />
		</Button>
	);
}
