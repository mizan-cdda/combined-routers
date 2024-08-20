import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promisify } from "util";
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const iconsDirectory = path.join(process.cwd(), "node_modules/react-icons");

    // Get a list of folders in the directory
    const folders = await readdirAsync(iconsDirectory);

    // Process each folder
    const icons: any = [];

    for (const folder of folders) {
      const isTrue =
        folder.endsWith(".ts") ||
        folder.endsWith(".js") ||
        folder.endsWith(".md") ||
        folder.endsWith(".json") ||
        folder.includes("LICENSE") ||
        folder.includes("README") ||
        folder.includes("lib");

      if (!isTrue) {
        const folderPath = path.join(iconsDirectory, folder, "index.d.ts");
        const fileContent = await readFileAsync(folderPath, "utf-8");

        const matches = fileContent.match(
          /export declare const (\w+): IconType;/g
        );
        if (matches) {
          icons.push(
            ...matches.map((match) =>
              match.replace(/export declare const (\w+): IconType;/, "$1")
            )
          );
        }
      }
    }

    // Send the response after all folders have been processed
    res.status(200).json({ icons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
