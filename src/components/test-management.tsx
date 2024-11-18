"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { createClient } from "@/app/lib/supabase/client";
import { toast } from "sonner";

type Member = {
	nome: string;
	equipe_id: number;
	criado_em: string;
	id: number;
};

export default function TestManagement() {
	const [members, setMembers] = useState<Member[]>([]);
	const [loading, setLoading] = useState(true);
	const [newMemberName, setNewMemberName] = useState("");
	const [newTeamId, setNewTeamId] = useState(0);
	const [editingMember, setEditingMember] = useState<Member | null>(null);
	const [addingMember, setAddingMember] = useState(false);
	const [newMemberData, setNewMemberData] = useState({
		nome: "",
		equipe_id: 0,
	});

	useEffect(() => {
		fetchMembers();
	}, []);

	async function fetchMembers() {
		const supabase = createClient();
		try {
			const { data, error } = await supabase
				.from("equipes_membros")
				.select("*")
				.order("criado_em", { ascending: false });

			if (error) {
				console.log("Erro ao carregar membros:", error);
			} else {
				setMembers(data);
				console.log("Membros carregados com sucesso:", data);
			}
		} catch (error) {
			console.error("Erro ao carregar membros: ", error);
			toast.error("Erro ao carregar membros");
		} finally {
			setLoading(false);
		}
	}

	async function handleAddMember() {
		const supabase = createClient();
		try {
			const { error } = await supabase.from("equipes_membros").insert({
				nome: newMemberData.nome,
				equipe_id: newMemberData.equipe_id,
			});
			if (error) throw error;
			toast.success("Membro adicionado com sucesso");
			setAddingMember(false);
			setNewMemberData({
				nome: "",
				equipe_id: 0,
			});
			fetchMembers();
		} catch (error) {
			toast.error("Erro ao adicionar membro");
		}
	}

	async function handleDeleteMember(memberId: number) {
		const supabase = createClient();
		try {
			const { error } = await supabase
				.from("equipes_membros")
				.delete()
				.eq("id", memberId);

			if (error) throw error;
			toast.success("Membro deletado com sucesso");
			fetchMembers();
		} catch (error) {
			toast.error("Erro ao deletar membro");
		}
	}

	async function handleUpdateMember(memberId: number) {
		const supabase = createClient();
		try {
			const { error } = await supabase
				.from("equipes_membros")
				.update({
					nome: newMemberName,
					equipe_id: newTeamId,
				})
				.eq("id", memberId);

			if (error) throw error;
			toast.success("Membro atualizado com sucesso");
			setEditingMember(null);
			fetchMembers();
		} catch (error) {
			toast.error("Erro ao atualizar membro");
		}
	}

	if (loading) {
		return <div>Carregando...</div>;
	}

	return (
		<div className="space-y-4">
			<Button
				onClick={() => setAddingMember(true)}
				className="mb-4"
				variant="default"
			>
				Adicionar Membro
			</Button>
			{addingMember && (
				<div className="mb-4 space-y-4 rounded-lg border p-4">
					<Input
						placeholder="Nome do Membro"
						value={newMemberData.nome}
						onChange={(e) =>
							setNewMemberData({
								...newMemberData,
								nome: e.target.value,
							})
						}
					/>
					<Input
						placeholder="ID da Equipe"
						value={newMemberData.equipe_id}
						onChange={(e) =>
							setNewMemberData({
								...newMemberData,
								equipe_id: Number(e.target.value),
							})
						}
					/>
					<div className="space-x-2">
						<Button onClick={handleAddMember}>Salvar</Button>
						<Button
							variant="outline"
							onClick={() => {
								setAddingMember(false);
								setNewMemberData({
									nome: "",
									equipe_id: 0,
								});
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
						<TableHead>Nome</TableHead>
						<TableHead>ID da Equipe</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{members.map((member) => (
						<TableRow key={member.id}>
							<TableCell>
								{editingMember?.id === member.id ? (
									<Input
										value={newMemberName}
										onChange={(e) => setNewMemberName(e.target.value)}
										placeholder="Novo nome do Membro"
									/>
								) : (
									member.nome
								)}
							</TableCell>
							<TableCell>
								{editingMember?.id === member.id ? (
									<Input
										value={newTeamId}
										onChange={(e) => setNewTeamId(Number(e.target.value))}
										placeholder="Novo ID da equipe"
									/>
								) : (
									member.equipe_id
								)}
							</TableCell>
							<TableCell>
								{new Date(member.criado_em).toLocaleDateString()}
							</TableCell>
							<TableCell>
								{editingMember?.id === member.id ? (
									<div className="flex space-x-2">
										<Button
											onClick={() => handleUpdateMember(member.id)}
											variant="default"
										>
											Salvar
										</Button>
										<Button
											onClick={() => setEditingMember(null)}
											variant="outline"
										>
											Cancelar
										</Button>
									</div>
								) : (
									<div className="flex space-x-2">
										<Button
											onClick={() => {
												setEditingMember(member);
												setNewMemberName(member.nome);
												setNewTeamId(member.equipe_id);
											}}
										>
											Editar
										</Button>
										<Button
											onClick={() => {
												handleDeleteMember(member.id);
											}}
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
