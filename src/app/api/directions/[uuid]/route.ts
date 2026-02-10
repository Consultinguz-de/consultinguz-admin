import { NextResponse } from "next/server";
import { handleDelete, handlePatch } from "./handlers";

interface RouteParams {
  params: Promise<{
    uuid: string;
  }>;
}

export async function DELETE(request: Request, props: RouteParams) {
  try {
    const params = await props.params;
    return handleDelete(params.uuid);
  } catch (error) {
    console.error("Delete direction error:", error);
    return NextResponse.json(
      { ok: false, message: "Server xatosi." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, props: RouteParams) {
  try {
    const params = await props.params;
    const body = await request.json();
    return handlePatch(params.uuid, body);
  } catch (error) {
    console.error("Update direction error:", error);
    return NextResponse.json(
      { ok: false, message: "Server xatosi." },
      { status: 500 },
    );
  }
}
