import { createClient } from "@/app/lib/supabase/server";
import UserManagement from "@/components/user-management";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";

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
			<div className="mb-8 space-y-4">
				<Link href="/">
					<Button variant="outline" className="flex items-center gap-2">
						<ArrowLeft className="h-4 w-4" />
						Voltar para Página Principal
					</Button>
				</Link>
				<div className="flex items-center gap-3 border-b pb-4">
					<Users className="h-8 w-8 text-primary" />
					<h1 className="font-bold text-3xl text-primary">
						Gerenciamento de Usuários
					</h1>
				</div>
			</div>
			<UserManagement />
		</div>
	);
}
