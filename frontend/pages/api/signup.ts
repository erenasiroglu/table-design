import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    res.status(200).json({ message: 'User signed up successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
