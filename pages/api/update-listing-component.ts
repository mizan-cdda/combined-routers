// Import necessary modules and types
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// Define the data and error response types
type Data = {
  name: string;
};

export type ErrorResponse = {
  error: string;
};

// Define the handler function
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    if (req.method !== "PUT") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Extract necessary data from the request body
    const {
      id,
      name,
      type,
      icon,
      category = "",
      author,
      description,
      childrenLayout,
      defaultStyles
    } = req.body;

    // CONVERT CATEGORY TO LOWERCASE
    const lowerCaseCategory = category?.toLowerCase();

    // Update the JSON file
    const jsonPath = path.join(
      process.cwd(),
      "src/config",
      "componentJson.json"
    );

    // Read the existing JSON file
    let jsonData = fs.existsSync(jsonPath)
      ? JSON.parse(fs.readFileSync(jsonPath, "utf-8"))
      : {};

    // Find the component in the JSON data and update its properties
    if (jsonData[lowerCaseCategory]) {
      const index = jsonData[lowerCaseCategory].findIndex(
        (comp: any) => comp.id === id
      );

      if (index !== -1) {
        jsonData[lowerCaseCategory][index] = {
          id,
          name,
          type,
          icon,
          category: lowerCaseCategory,
          author,
          description,
          childrenLayout,
          defaultStyles
        };
      }
    }

    // console.log("jsonData", jsonData);
    // Write the updated JSON data back to the file
    // console.log("jsonData", jsonData.forms[2])
    fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));

    // RETURN SUCCESS
    res.status(200).json({ name: "Success" });
  } catch (error) {
    console.error("Error updating component:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
