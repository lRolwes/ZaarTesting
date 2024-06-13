import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
import { create } from 'domain';
import initializeCors from 'nextjs-cors';
const allowCors = (fn: { (req: NextApiRequest, res: NextApiResponse): Promise<void>; (arg0: any, arg1: any): any; }) => async (req: { method: string; }, res: { setHeader: (arg0: string, arg1: string | boolean) => void; status: (arg0: number) => { (): any; new(): any; end: { (): void; new(): any; }; }; }) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
async function handler(req: NextApiRequest, res: NextApiResponse) {
    //await initializeCors(req, res); // Initialize CORS

    try {
    let address = (req.query.address as string)?.split(",") || []; // Assuming the address is passed as a query parameter
    const listId = req.query.listId?.toString(); // Assuming the address is passed as a query parameter
    const addAddress = req.query.addAddress?.toString() ?? ''; // Assuming the address is passed as a query parameter and providing a default value
    if (address.length === 1 && address[0] === "") {
        address=[];
    }
    if(Array.isArray(address)){
        if(addAddress!="" && addAddress!=null && addAddress!=" "){
            address.push(addAddress) 
        }
    }
    else{
        if(addAddress!=null && addAddress != "" && addAddress!=" "){
            address = [addAddress];
        }
        else{
            address = [];
        }
    }
    if (listId != null && listId != "" && listId!=" "){
    const data = await prisma.watch.upsert({
            where: { authorAddress: listId },
            update: { address: address},
            create: { authorAddress: listId, address: address},
        });
        res.status(200).json(data);
    }
    else{
        res.status(200).json({error: 'Invalid listId'});
    }
} catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = allowCors(handler);
