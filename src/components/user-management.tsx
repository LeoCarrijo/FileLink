"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

type User = {
	id: string;
	email: string;
	created_at: string;
	user_metadata: {
		name?: string;
	};
	role?: string;
};

export default function UserManagement() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [newEmail, setNewEmail] = useState("");
	const [newName, setNewName] = useState("");

	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		try {
			const response = await fetch("/api/users");
			const data = await response.json();

			if (!response.ok) throw new Error(data.error);

			setUsers(
				data.users.map((user: User) => ({
					...user,
					email: user.email || "",
				})),
			);
		} catch (error) {
			toast.error("Erro ao carregar usuários");
		} finally {
			setLoading(false);
		}
	}

	async function handleDeleteUser(userId: string) {
		try {
			const response = await fetch("/api/users", {
				method: "DELETE",
				body: JSON.stringify({ userId }),
			});
			const data = await response.json();

			if (!response.ok) throw new Error(data.error);

			toast.success("Usuário deletado com sucesso");
			fetchUsers();
		} catch (error) {
			toast.error("Erro ao deletar usuário");
		}
	}

	async function handleUpdateUser(userId: string) {
		try {
			const response = await fetch("/api/users", {
				method: "PUT",
				body: JSON.stringify({
					userId,
					email: newEmail || editingUser?.email,
					name: newName || editingUser?.user_metadata?.name,
				}),
			});
			const data = await response.json();

			if (!response.ok) throw new Error(data.error);

			toast.success("Usuário atualizado com sucesso");
			setEditingUser(null);
			fetchUsers();
		} catch (error) {
			toast.error("Erro ao atualizar usuário");
		}
	}

	if (loading) {
		return <div>Carregando...</div>;
	}

	return (
		<div className="space-y-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nome</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Data de Criação</TableHead>
						<TableHead>Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>
								{editingUser?.id === user.id ? (
									<Input
										value={newName}
										onChange={(e) => setNewName(e.target.value)}
										placeholder="Novo nome"
									/>
								) : (
									user.user_metadata?.name || "N/A"
								)}
							</TableCell>
							<TableCell>
								{editingUser?.id === user.id ? (
									<Input
										value={newEmail}
										onChange={(e) => setNewEmail(e.target.value)}
										placeholder="Novo email"
									/>
								) : (
									user.email
								)}
							</TableCell>
							<TableCell>
								{new Date(user.created_at).toLocaleDateString()}
							</TableCell>
							<TableCell>
								{editingUser?.id === user.id ? (
									<div className="flex space-x-2">
										<Button
											onClick={() => handleUpdateUser(user.id)}
											variant="default"
										>
											Salvar
										</Button>
										<Button
											onClick={() => setEditingUser(null)}
											variant="outline"
										>
											Cancelar
										</Button>
									</div>
								) : (
									<div className="flex space-x-2">
										<Button
											onClick={() => {
												setEditingUser(user);
												setNewEmail(user.email);
												setNewName(user.user_metadata?.name || "");
											}}
											variant="outline"
										>
											Editar
										</Button>
										<Button
											onClick={() => handleDeleteUser(user.id)}
											variant="destructive"
										>
											Deletar
										</Button>
									</div>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
