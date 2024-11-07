// app/api/delete/route.jsx
import { unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { filename } = await request.json();

    if (!filename) {
      return NextResponse.json({ error: "No filename provided" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public/uploads", filename);

    // Delete the file
    await unlink(filePath);

    return NextResponse.json({ success: true, message: "File deleted" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ success: false, error: "File deletion failed" }, { status: 500 });
  }
}
