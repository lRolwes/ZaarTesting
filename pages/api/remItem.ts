import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
try {
    const address = (req.query.address as string)?.split(",") || []; 
    const listId = req.query.listId?.toString(); 
    const remAddress = req.query.remAddress; 
    let newArray = Array.isArray(address)? address.filter(item => item !== remAddress) : [];

    const data = await prisma.watch.update({
            where: { authorAddress: listId },
            data: { address: newArray},
        });

    res.status(200).json(data);
} catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

