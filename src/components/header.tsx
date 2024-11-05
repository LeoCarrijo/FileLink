import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Header() {
	return (
		<header className="grid grid-cols-header p-10">
			{/* <div className="col-logo row-logo flex items-center justify-center">
				Bloco 1
			</div>
			<div className="col-titulo row-titulo flex items-center justify-center">
				Bloco 2
			</div>
			<div className="col-avatar row-avatar flex items-center justify-center">
				Bloco 3
			</div> */}
			<Image
				className="col-logo row-logo flex items-center justify-center"
				src={logo}
				width={100}
				height={100}
				alt="logo"
			/>
			<h1 className="lobster-regular col-titulo row-titulo flex items-center justify-center font-bold text-5xl text-white underline">
				FileLink
			</h1>
			<Avatar className="col-avatar row-avatar flex items-center justify-center">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</header>
	);
}
