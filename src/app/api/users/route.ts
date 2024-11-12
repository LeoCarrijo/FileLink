import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
	const supabase = await createClient();
	const { data: users, error } = await supabase.auth.admin.listUsers();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ users: users.users });
}

export async function DELETE(request: Request) {
	const { userId } = await request.json();
	const supabase = await createClient();
	const { error } = await supabase.auth.admin.deleteUser(userId);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
	const { userId, email, name } = await request.json();
	const supabase = await createClient();
	const { error } = await supabase.auth.admin.updateUserById(userId, {
		email,
		user_metadata: { name },
	});

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ success: true });
}
