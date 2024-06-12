// pages/api/getWatchlist.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
import initializeCors from 'nextjs-cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initializeCors(req, res); // Initialize CORS

  try {
    // Query your Prisma database based on the user's address
    const ownerAddress = req.query.ownerAddress?.toString(); // Assuming the address is passed as a query parameter
    const userData = await prisma.watch.findFirst({
      where: {
        authorAddress: ownerAddress,
      },
    })
    // Return the queried data to the client
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
