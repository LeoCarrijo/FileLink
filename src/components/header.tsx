import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Header() {
	return (
		<header className="flex justify-between bg-gradient-to-r from-sky-500 to-indigo-50 p-10">
			<Image src={logo} width={100} height={100} alt="logo" />
			<h1 className="font-bold text-3xl underline">FileLink</h1>
			<Avatar>
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</header>
	);
}
