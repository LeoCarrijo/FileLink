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
import { createClient } from "@/app/lib/supabase/client";

type Usuario = {
	id: string;
	nome_usuario: string;
	senha: string;
	criado_em: string;
};

export default function UserManagement() {
	const [users, setUsers] = useState<Usuario[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingUser, setEditingUser] = useState<Usuario | null>(null);
	const [newUsername, setNewUsername] = useState("");
	const [newPassword, setNewPassword] = useState("");

	// Para novo usuário
	const [addingUser, setAddingUser] = useState(false);
	const [newUserData, setNewUserData] = useState({
		nome_usuario: "",
		senha: "",
	});

	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		const supabase = await createClient();
		try {
			const { data, error } = await supabase
				.from("usuarios")
				.select("*")
				.order("criado_em", { ascending: false });
			if (error) throw error;
			setUsers(data || []);
			console.log(data);
			console.log("Usuários carregados com sucesso");
		} catch (error) {
			toast.error("Erro ao carregar usuários");
		} finally {
			setLoading(false);
		}
	}

	async function handleAddUser() {
		const supabase = await createClient();
		try {
			const { error } = await supabase.from("usuarios").insert([
				{
					nome_usuario: newUserData.nome_usuario,
					senha: newUserData.senha,
				},
			]);

			if (error) throw error;

			toast.success("Usuário adicionado com sucesso");
			setAddingUser(false);
			setNewUserData({ nome_usuario: "", senha: "" });
			fetchUsers();
		} catch (error) {
			toast.error("Erro ao adicionar usuário");
		}
	}

	async function handleDeleteUser(userId: string) {
		const supabase = await createClient();
		try {
			const { error } = await supabase
				.from("usuarios")
				.delete()
				.eq("id", userId);

			if (error) throw error;

			toast.success("Usuário deletado com sucesso");
			fetchUsers();
		} catch (error) {
			toast.error("Erro ao deletar usuário");
		}
	}

	async function handleUpdateUser(userId: string) {
		const supabase = await createClient();
		try {
			const { error } = await supabase
				.from("usuarios")
				.update({
					nome_usuario: newUsername,
					senha: newPassword,
				})
				.eq("id", userId);

			if (error) throw error;

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
			<Button
				onClick={() => setAddingUser(true)}
				className="mb-4"
				variant="default"
			>
				Adicionar Usuário
			</Button>

			{addingUser && (
				<div className="mb-4 space-y-4 rounded-lg border p-4">
					<Input
						placeholder="Nome de usuário"
						value={newUserData.nome_usuario}
						onChange={(e) =>
							setNewUserData({ ...newUserData, nome_usuario: e.target.value })
						}
					/>
					<Input
						type="password"
						placeholder="Senha"
						value={newUserData.senha}
						onChange={(e) =>
							setNewUserData({ ...newUserData, senha: e.target.value })
						}
					/>
					<div className="space-x-2">
						<Button onClick={handleAddUser}>Salvar</Button>
						<Button
							variant="outline"
							onClick={() => {
								setAddingUser(false);
								setNewUserData({ nome_usuario: "", senha: "" });
							}}
						>
							Cancelar
						</Button>
					</div>
				</div>
			)}

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Usuário</TableHead>
						<TableHead>Senha</TableHead>
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
										value={newUsername}
										onChange={(e) => setNewUsername(e.target.value)}
										placeholder="Novo usuário"
									/>
								) : (
									user.nome_usuario
								)}
							</TableCell>
							<TableCell>
								{editingUser?.id === user.id ? (
									<Input
										type="password"
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										placeholder="Nova senha"
									/>
								) : (
									"*******"
								)}
							</TableCell>
							<TableCell>
								{new Date(user.criado_em).toLocaleDateString()}
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
												setNewUsername(user.nome_usuario);
												setNewPassword(user.senha);
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
