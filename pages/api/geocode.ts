// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;
  let geoInfo;
  try {
    const URI = encodeURI(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query}`
    );

    const response = await fetch(URI, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_CLIENT_ID!,
        "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      },
    });
    geoInfo = await response.json();
  } catch (e) {
    res.status(403).json({ message: "error~" });
  }

  res.status(200).json(geoInfo);
}
