"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<div className="flex w-full items-center">
			{theme === "light" ? (
				<Moon className="mr-2 h-4 w-4" />
			) : (
				<Sun className="mr-2 h-4 w-4" />
			)}
			<span>Toggle theme</span>
		</div>
	);
}
