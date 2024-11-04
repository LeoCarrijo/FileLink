import { useState } from "react";
import { ModeToggle } from "./theme-toggle";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Main() {
	const [downloadLink, setDownloadLink] = useState<string>("");
	const [copiado, setCopiado] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [fileSize, setFileSize] = useState(0);

	async function handleFileChange(file: File) {
		setIsUploading(true);
		setUploadProgress(0);
		setFileSize(file.size);
		try {
			const res = await fetch("/api/upload", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ filename: file.name, contentType: file.type }),
			});

			const { url, key, error } = await res.json();

			if (error) {
				throw new Error(error);
			}

			// Fazer o upload direto para o R2 usando a URL pré-assinada
			const xhr = new XMLHttpRequest();
			xhr.open("PUT", url, true);
			xhr.setRequestHeader("Content-Type", file.type);

			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable) {
					const percentComplete = (event.loaded / event.total) * 100;
					setUploadProgress(percentComplete);
				}
			};

			xhr.onload = async () => {
				if (xhr.status === 200 || xhr.status === 204) {
					// Obter URL pré-assinada para download
					const downloadUrl = await getDownloadUrl(key);
					const shortUrl = await encurtarUrl(downloadUrl);
					setDownloadLink(shortUrl);
					alert(`Arquivo "${file.name}" enviado com sucesso!`);
				} else {
					throw new Error("Falha no upload do arquivo");
				}
				setIsUploading(false);
			};

			xhr.onerror = () => {
				alert("Erro ao enviar o arquivo. Por favor, tente novamente 1.");
				setIsUploading(false);
			};

			xhr.send(file);
		} catch (error) {
			console.error("Erro ao enviar o arquivo:", error);
			alert("Erro ao enviar o arquivo. Por favor, tente novamente.");
			setIsUploading(false);
		}
	}

	const getDownloadUrl = async (key: string): Promise<string> => {
		try {
			const res = await fetch("/api/download-url", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ key }),
			});

			const { url, error } = await res.json();

			if (error) {
				throw new Error(error);
			}

			return url;
		} catch (error) {
			console.error("Erro ao obter URL de download:", error);
			alert("Não foi possível obter a URL de download.");
			return "";
		}
	};

	const encurtarUrl = async (url: string): Promise<string> => {
		try {
			const response = await fetch(
				`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`,
			);
			if (!response.ok) {
				throw new Error("Falha ao encurtar a URL");
			}
			const shortUrl = await response.text();
			return shortUrl;
		} catch (e) {
			return url;
		}
	};

	return (
		<main className="flex flex-col items-center justify-center gap-1.5">
			<div className="max-w-sm flex-col">
				<Label className="text-center" htmlFor="arquivo" />
				<Input
					id="arquivo"
					type="file"
					onChange={(e) => {
						if (e.target.files && e.target.files[0]) {
							handleFileChange(e.target.files[0]);
						}
					}}
				/>
			</div>
			<Input type="text" readOnly className="w-2/5" value={downloadLink} />
		</main>
	);
}
