import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { existsSync } from "fs";

export const POST = async (request) => {
  try {
    const formData = await request.formData();

    const folderName = formData.get("folderName");
    const uploadsDir = path.join(process.cwd(), `public/${folderName}`);

    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const uploadedFiles = [];

    for (const [key, value] of formData.entries()) {
      const file = value;

      if (file && file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name;

        const filePath = path.join(uploadsDir, filename);
        await writeFile(filePath, buffer);

        uploadedFiles.push(`${folderName}/${filename}`);
      }
    }

    return NextResponse.json({ success: true, files: uploadedFiles });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
