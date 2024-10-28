"use client";

import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
import { Github } from "lucide-react";

export default function LoginPage() {
	return (
		<Button
			onClick={() => {
				signup();
			}}
		>
			Entrar com GitHub <Github />
		</Button>
	);
}
