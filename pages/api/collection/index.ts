import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

const endpoint: any = process.env.PR_BACKEND_API_ENDPOINT;

console.log(endpoint);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const formData = req.body;
    const response = await fetch(`${endpoint}/collection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("response data", data);
    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  res.status(200).json({ message: "Hello from Next.js!" });
}
