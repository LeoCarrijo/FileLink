"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export default function FooterComponent() {
	return (
		<footer className="border-t">
			<div className="container mx-auto flex items-center justify-between px-4 py-6">
				<p className="text-muted-foreground text-sm">
					© {new Date().getFullYear()} FileLink. Todos direitos reservados.
				</p>
				<nav className="flex items-center space-x-4">
					<Link
						href="/termos"
						className="text-muted-foreground text-sm hover:underline"
					>
						Termos de Servico
					</Link>
					<Link
						href="/privacidade"
						className="text-muted-foreground text-sm hover:underline"
					>
						Privacidade
					</Link>
					<a
						href="https://github.com/yourusername/filelink"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-foreground"
					>
						<Github className="h-5 w-5" />
						<span className="sr-only">GitHub</span>
					</a>
				</nav>
			</div>
		</footer>
	);
}
