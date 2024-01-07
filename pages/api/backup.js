// pages/api/backup.js
import { backupDatabase, mongooseConnect } from '../../lib/mongoose';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to MongoDB
      await mongooseConnect();

      // Perform backup
      const backupData = await backupDatabase();

      // Respond with the backup data only
      res.status(200).json(backupData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Backup failed' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
