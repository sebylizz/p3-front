import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { existsSync } from "fs";

export const POST = async (request) => {
  try {
    const formData = await request.formData();
    // Define the path to the "public/uploads" directory
    const folderName = formData.get("folderName"); 
    const uploadsDir = path.join(process.cwd(), `public/${folderName}`);

    console.log("hej");

    // Check if the "public/uploads" directory exists; if not, create it
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true }); // Create the directory, including parent directories if needed
    }

    const uploadedFiles = [];

    // Loop through all form data entries
    for (const [key, value] of formData.entries()) {
      const file = value;

      if (file && file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name;

        // Save the file to the "public/uploads" folder
        const filePath = path.join(uploadsDir, filename);
        await writeFile(filePath, buffer);

        uploadedFiles.push(filename); // Save the filename for the response
      }
    }

    return NextResponse.json({ success: true, files: uploadedFiles });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
