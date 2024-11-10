"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export async function login(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		console.log(error);
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function signup() {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	// const data = {
	// 	email: formData.get("email") as string,
	// 	password: formData.get("password") as string,
	// };

	// const { error } = await supabase.auth.signUp(data);

	// if (error) {
	// 	console.log(error);
	// }

	const { error } = await supabase.auth.signInWithOAuth({
		provider: "github",
	});

	revalidatePath("/", "layout");
	redirect("/");
}

export async function LoginWithGithub() {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	// const data = {
	// 	email: formData.get("email") as string,
	// 	password: formData.get("password") as string,
	// };

	// const { error } = await supabase.auth.signUp(data);

	// if (error) {
	// 	console.log(error);
	// }

	await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: "https://pjryopplvwzybwurdmqv.supabase.co/auth/v1/callback",
		},
	});

	revalidatePath("/", "layout");
	redirect("/");
}

async function signOut() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
}
