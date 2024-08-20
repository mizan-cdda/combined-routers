import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  name: string;
};

export type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    const {
      id,
      name,
      type,
      icon,
      category,
      author,
      description,
      childrenLayout,
      defaultStyles,
      props
    } = req.body;

    // CONVERT CATEGORY TO LOWERCASE
    const lowerCaseCategory = category?.toLowerCase();

    // CREATE FOLDER WHERE I WILL STORE COMPONENT
    const componentDirectory = "src/@core-components/ui-components";
    const folderPath = path.join(process.cwd(), componentDirectory, name);

    // CHECK IF FOLDER ALREADY EXISTS
    if (fs.existsSync(folderPath)) {
      return res.status(400).json({ error: "Folder already exists" });
    }
    // CREATE FOLDER
    fs.mkdirSync(folderPath);

    // CREATE COMPONENT FILE
    const componentPath = path.join(folderPath, `index.tsx`);
    const content = `
  // Your content goes here
import React, {forwardRef} from "react";

const ${name} = forwardRef(({ children, style, ...rest }: any, ref) => {
  const { content, functions, componentName, ...newRest } = rest || {};
  return <div style={style} ref={ref} {...newRest}>{children}</div>;
});

${name}.displayName = "${name}";
export default ${name};
  `;
    // WRITE CONTENT TO FILE
    fs.writeFileSync(componentPath, content);

    // IMPORT COMPONENT IN INDEX FILE
    const indexPath = path.join(process.cwd(), componentDirectory, "index.tsx");
    const indexContent = fs.readFileSync(indexPath, "utf-8");
    const importStatement = `import ${name} from "./${name}";`;
    const exportStatement = `export { ${name} };`;

    // UPDATE INDEX FILE
    const updatedIndexContent =
      importStatement + "\n" + indexContent + "\n" + exportStatement + "\n";

    // WRITE UPDATED CONTENT TO FILE
    fs.writeFileSync(indexPath, updatedIndexContent);

    // Read the existing JSON file
    const jsonPath = path.join(
      process.cwd(),
      "src/config",
      "componentJson.json"
    );

    // CHECK IF FILE EXISTS
    let jsonData = fs.existsSync(jsonPath)
      ? JSON.parse(fs.readFileSync(jsonPath, "utf-8"))
      : {};

    if (jsonData[lowerCaseCategory]) {
      jsonData[lowerCaseCategory].push({
        id,
        name,
        type,
        icon,
        category: lowerCaseCategory,
        author,
        description,
        childrenLayout,
        defaultStyles,
        props
      });
    }
    // IF CATEGORY DOES NOT EXISTS CREATE NEW ONE
    else {
      jsonData[lowerCaseCategory] = [
        {
          id,
          name,
          type,
          icon,
          category: lowerCaseCategory,
          author,
          description,
          childrenLayout,
          defaultStyles,
          props
        },
      ];
    }
    // Write the updated JSON data back to the file
    fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));

    // RETURN SUCCESS
    res.status(200).json({ name: "Success" });
  } catch (error) {
    console.error("Error creating folder and updating files:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
