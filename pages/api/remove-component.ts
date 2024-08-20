import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { ErrorResponse } from "./listing-component";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    const { name, category }: any = req.query;

    // DELETE FOLDER WHERE COMPONENT IS STORED
    const componentDirectory = "src/@core-components/ui-components";
    const folderPath = path.join(process.cwd(), componentDirectory, name);

    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({ error: "Folder not found" });
    }

    // REMOVE FOLDER
    fs.rmdirSync(folderPath, { recursive: true });

    // REMOVE COMPONENT IMPORT/EXPORT FROM INDEX FILE
    const indexPath = path.join(process.cwd(), componentDirectory, "index.tsx");
    const indexContent = fs.readFileSync(indexPath, "utf-8");

    const importStatement = `import ${name} from "./${name}";`;
    const exportStatement = `export { ${name} };`;

    // REMOVE IMPORT/EXPORT STATEMENTS
    const updatedIndexContent = indexContent
      .replace(importStatement, "")
      .replace(exportStatement, "");

    fs.writeFileSync(indexPath, updatedIndexContent);

    // REMOVE COMPONENT FROM JSON FILE
    const jsonPath = path.join(
      process.cwd(),
      "src/config",
      "componentJson.json"
    );
    let jsonData = fs.existsSync(jsonPath)
      ? JSON.parse(fs.readFileSync(jsonPath, "utf-8"))
      : {};

    if (jsonData[category]) {
      // REMOVE COMPONENT FROM JSON DATA
      jsonData[category] = jsonData[category].filter(
        (component: any) => component.name !== name
      );

      // if (jsonData[category].length === 0) {
      //   delete jsonData[category];
      // }
    }

    // SET UPDATE JSON FILE
    fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));

    res.status(200).json({ name: "Success" });
  } catch (error) {
    console.error("Error deleting component:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
