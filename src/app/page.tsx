"use client";

import Footer from "@/components/footer";
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
			<Footer />
		</div>
	);
}
