"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Main from "@/components/main";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<div className="flex flex-grow items-center justify-center">
				<Main />
			</div>
			<Footer />
		</div>
	);
}
