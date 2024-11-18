"use client";

import { createClient } from "@/app/lib/supabase/client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
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

type Team = {
	id: string;
	nome_equipe: string;
	quantidade_membros: number;
	membros: string;
	criado_em: string;
};

export default function TeamManagement() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState(true);
	const [newTeamName, setNewTeamName] = useState("");
	const [newTeamMembers, setNewTeamMembers] = useState("");
	const [newTeamMembersQuantity, setNewTeamMembersQuantity] = useState(0);
	const [editingTeam, setEditingTeam] = useState<Team | null>(null);
	const [addingTeam, setAddingTeam] = useState(false);
	const [newTeamData, setNewTeamData] = useState({
		nome_equipe: "",
		membros: "",
		quantidade_membros: 0,
	});

	useEffect(() => {
		fetchTeams();
	}, []);

	async function fetchTeams() {
		const supabase = createClient();
		try {
			const { data, error } = await supabase
				.from("equipes")
				.select("*")
				.order("criado_em", { ascending: false });
			if (error) {
				console.error("Erro ao carregar equipes: ", error);
			} else {
				setTeams(data);
				console.log("Equipes carregadas com sucesso: ", data);
			}
		} catch (error) {
			console.error("Erro ao carregar equipes: ", error);
			toast.error("Erro ao carregar equipes");
		} finally {
			setLoading(false);
		}
	}

	async function handleAddTeam() {
		const supabase = createClient();
		try {
			const { error } = await supabase.from("equipes").insert({
				nome_equipe: newTeamData.nome_equipe,
				membros: newTeamData.membros,
				quantidade_membros: newTeamData.quantidade_membros,
			});
			if (error) throw error;
			toast.success("Equipe adicionada com sucesso");
			setAddingTeam(false);
			setNewTeamData({
				nome_equipe: "",
				membros: "",
				quantidade_membros: 0,
			});
			fetchTeams();
		} catch (error) {
			toast.error("Erro ao adicionar equipe");
		}
	}

	async function handleDeleteTeam(teamId: string) {
		const supabase = createClient();
		try {
			const { error } = await supabase
				.from("equipes")
				.delete()
				.eq("id", teamId);

			if (error) throw error;
			toast.success("Equipe deletada com sucesso");
			fetchTeams();
		} catch (error) {
			toast.error("Erro ao deletar equipe");
		}
	}

	async function handleUpdateTeam(teamId: string) {
		const supabase = createClient();
		try {
			const { error } = await supabase
				.from("equipes")
				.update({
					nome_equipe: newTeamName,
					membros: newTeamMembers,
					quantidade_membros: newTeamMembersQuantity,
				})
				.eq("id", teamId);

			if (error) throw error;
			toast.success("Equipe atualizada com sucesso");
			setEditingTeam(null);
			fetchTeams();
		} catch (error) {
			toast.error("Erro ao atualizar equipe");
		}
	}

	if (loading) {
		return <div>Carregando...</div>;
	}

	return (
		<div className="space-y-4">
			<Button
				onClick={() => setAddingTeam(true)}
				className="mb-4"
				variant="default"
			>
				Adicionar Equipe
			</Button>
			{addingTeam && (
				<div className="mb-4 space-y-4 rounded-lg border p-4">
					<Input
						placeholder="Nome da equipe"
						value={newTeamData.nome_equipe}
						onChange={(e) =>
							setNewTeamData({
								...newTeamData,
								nome_equipe: e.target.value,
							})
						}
					/>
					<Input
						placeholder="Membros da equipe"
						value={newTeamData.membros}
						onChange={(e) =>
							setNewTeamData({
								...newTeamData,
								membros: e.target.value,
							})
						}
					/>
					<Input
						type="number"
						placeholder="Quantidade de membros"
						value={newTeamData.quantidade_membros}
						onChange={(e) =>
							setNewTeamData({
								...newTeamData,
								quantidade_membros: Number(e.target.value),
							})
						}
					/>
					<div className="space-x-2">
						<Button onClick={handleAddTeam}>Salvar</Button>
						<Button
							variant="outline"
							onClick={() => {
								setAddingTeam(false);
								setNewTeamData({
									nome_equipe: "",
									membros: "",
									quantidade_membros: 0,
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
						<TableHead>Nome da Equipe</TableHead>
						<TableHead>Membros</TableHead>
						<TableHead>Quantidade de Membros</TableHead>
						<TableHead>Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{teams.map((team) => (
						<TableRow key={team.id}>
							<TableCell>
								{editingTeam?.id === team.id ? (
									<Input
										value={newTeamName}
										onChange={(e) => setNewTeamName(e.target.value)}
										placeholder="Novo nome da equipe"
									/>
								) : (
									team.nome_equipe
								)}
							</TableCell>
							<TableCell>
								{editingTeam?.id === team.id ? (
									<Input
										value={newTeamMembers}
										onChange={(e) => setNewTeamMembers(e.target.value)}
										placeholder="Novo membro da equipe"
									/>
								) : (
									team.membros
								)}
							</TableCell>
							<TableCell>
								{editingTeam?.id === team.id ? (
									<Input
										type="number"
										value={newTeamMembersQuantity}
										onChange={(e) =>
											setNewTeamMembersQuantity(Number(e.target.value))
										}
										placeholder="Nova quantidade de membros"
									/>
								) : (
									team.quantidade_membros
								)}
							</TableCell>
							<TableCell>
								{new Date(team.criado_em).toLocaleDateString()}
							</TableCell>
							<TableCell>
								{editingTeam?.id === team.id ? (
									<div className="flex space-x-2">
										<Button
											onClick={() => handleUpdateTeam(team.id)}
											variant="default"
										>
											Salvar
										</Button>
										<Button
											onClick={() => setEditingTeam(null)}
											variant="outline"
										>
											Cancelar
										</Button>
									</div>
								) : (
									<div className="flex space-x-2">
										<Button
											onClick={() => {
												setEditingTeam(team);
												setNewTeamName(team.nome_equipe);
												setNewTeamMembers(team.membros);
												setNewTeamMembersQuantity(team.quantidade_membros);
											}}
										>
											Editar
										</Button>
										<Button
											onClick={() => {
												handleDeleteTeam(team.id);
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
