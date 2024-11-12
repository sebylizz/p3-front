import { rm } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { folderNames } = await request.json();

    if (!folderNames || folderNames.length === 0) {
      return NextResponse.json({ error: "No folder names provided" }, { status: 400 });
    }

    for (const folderName of folderNames) {
      const folderPath = path.join(process.cwd(), "public", String(folderName)); 
      await rm(folderPath, { recursive: true, force: true });
    }

    return NextResponse.json({ success: true, message: "Folders deleted" });
  } catch (error) {
    console.error("Error deleting folders:", error);
    return NextResponse.json({ success: false, error: "Folder deletion failed" }, { status: 500 });
  }
}
