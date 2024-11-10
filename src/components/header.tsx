import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import logo from "@/public/logo.png";
import { createClient } from "@/app/lib/supabase/client";

export default async function Header() {
	const supabase = await createClient();
	const user = supabase.auth.getUser();
	const avatarUrl = (await user).data.user?.user_metadata.avatar_url;

	return (
		<header className="col-header row-header grid grid-cols-header p-10">
			{/* <div className="col-logo row-logo flex items-center justify-center">
				Bloco 1
			</div>
			<div className="col-titulo row-titulo flex items-center justify-center">
				Bloco 2
			</div>
			<div className="col-avatar row-avatar flex items-center justify-center">
				Bloco 3
			</div> */}
			<div className="col-logo row-logo flex items-center justify-center">
				<Image className="" src={logo} width={100} height={100} alt="logo" />
			</div>
			<h1 className="lobster-regular col-titulo row-titulo flex items-center justify-center font-bold text-5xl text-white underline">
				FileLink
			</h1>
			<div className="col-avatar row-avatar flex items-center justify-center">
				<Avatar className="">
					<AvatarImage src={avatarUrl} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
		</header>
	);
}
