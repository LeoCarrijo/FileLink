"use client";

import Header from "@/components/header";
import Main from "@/components/main";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Home() {
	return (
		<div>
			<Header />
			<Main />
			<div className="absolute bottom-0 pb-8 pl-8">
				<ModeToggle />
			</div>
		</div>
	);
}
