// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { start, goal, waypoints } = req.query;

  let paths = [];
  try {
    const response = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${start}&goal=${goal}&waypoints=${waypoints}`,
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_CLIENT_ID!,
          "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_CLIENT_SECRET!,
        },
      }
    );
    paths = await response.json();
  } catch (e) {
    paths = [];
  }

  res.status(200).json(paths);
}
