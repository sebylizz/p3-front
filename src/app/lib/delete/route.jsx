import { unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Get all "file" and "folderName" entries
    const files = formData.getAll("file");
    const folderNames = formData.getAll("folderName");

    // Validate lengths
    if (files.length !== folderNames.length) {
      return NextResponse.json(
        { success: false, error: "Mismatch between files and folderNames" },
        { status: 400 }
      );
    }

    // Process each file and folder pair
    const results = await Promise.all(
      files.map(async (filename, index) => {
        try {
          const folderName = folderNames[index];
          const sanitizedFolderName = path.normalize(folderName).replace(/^(\.\.[/\\])+/, ""); // Prevent directory traversal
          const sanitizedFilename = path.basename(filename);

          const filePath = path.join(
            process.cwd(),
            "public",
            sanitizedFolderName,
            sanitizedFilename
          );

          console.log("Attempting to delete file at:", filePath);

          await unlink(filePath);

          return { success: true, filename };
        } catch (error) {
          console.error(`Error deleting file ${filename}:`, error);
          return { success: false, filename, error: error.message };
        }
      })
    );

    // Check for failures
    const failedDeletions = results.filter((res) => !res.success);

    if (failedDeletions.length > 0) {
      return NextResponse.json(
        { success: false, failed: failedDeletions },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "All files deleted successfully" });
  } catch (error) {
    console.error("Error during file deletion:", error);
    return NextResponse.json(
      { success: false, error: "Batch file deletion failed" },
      { status: 500 }
    );
  }
}
