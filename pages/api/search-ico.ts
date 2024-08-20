import { allIcons } from "@/config/iconJson";
import { NextApiRequest, NextApiResponse } from "next";

const icons = allIcons;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query } = req.query;
    const searchQuery = query?.toString().toLowerCase() || "";
    const filteredIcons = await filterIcons(searchQuery);

    res.status(200).json({ icons: filteredIcons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function filterIcons(query: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = icons.filter((icon: any) =>
        icon.toLowerCase().includes(query)
      );
      resolve(filtered);
    }, 500);
  });
}
