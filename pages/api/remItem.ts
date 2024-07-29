import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
import initializeCors from 'nextjs-cors';


const allowCors = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    return await fn(req, res);
  };
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    //await initializeCors(req, res); // Initialize CORS
    

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

export default allowCors(handler);
