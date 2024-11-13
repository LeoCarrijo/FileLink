import { createClient } from "@/app/lib/supabase/server";
import UserManagement from "@/components/user-management";
import { redirect } from "next/navigation";

export default async function UsersPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="container mx-auto py-8">
			<h1 className="mb-8 font-bold text-3xl">Gerenciamento de Usuários</h1>
			<UserManagement />
		</div>
	);
}
