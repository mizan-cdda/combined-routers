import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

type ResponseData = {
  data: any;
};

const dataSync = ({ category }: { category: string }) => {
  const path: any = jsonPath(category);
  return JSON.parse(fs.readFileSync(path, "utf-8"));
};

const jsonPath = (category: string) => {
  switch (category) {
    case "page":
      return path.join(process.cwd(), "src/config", "pagesJson.json");
    case "component":
      return path.join(process.cwd(), "src/config", "componentJson.json");
    case "form":
      return path.join(process.cwd(), "src/config", "formJson.json");
  }
};

const findItem = ({ data, id }: { data: any; id: string }) => {
  const newData =
    Object?.keys(data)
      ?.flatMap((category) =>
        data[category]?.map((c: any) => ({ ...c, status: category }))
      )
      .filter((item) => !item.default)
      ?.find((item) => item.id === id) || {};

  return newData;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { id, category = "" } = req.query;

    if (category?.toLowerCase() === "page") {
      // get layout}
      const pageData = dataSync({ category: "page" });
      const foundItem = findItem({ data: pageData, id });

      return res.status(200).json({ data: foundItem });
    }
    if (category?.toLowerCase() === "component") {
      // get component
      const data = dataSync({ category: "page" });
    }
    if (category?.toLowerCase() === "form") {
      // get template
      const data = dataSync({ category: "page" });
      res.status(200).json({ category: "Hello from the server", id });
    }
  }
}
