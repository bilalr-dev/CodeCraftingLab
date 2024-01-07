// pages/api/restore.js
import { restoreDatabase, mongooseConnect } from '../../lib/mongoose';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to MongoDB
      await mongooseConnect();

      // Get the restore data from the request body
      const restoreData = req.body;

      // Log the restore data for debugging
      console.log('Restore data:', restoreData);

      // Perform the restore operation
      await restoreDatabase(restoreData);

      // Log a message to indicate a successful restore
      console.log('Restore successful');

      res.status(200).json({ message: 'Restore successful' });
    } catch (error) {
      console.error('Restore failed:', error);

      res.status(500).json({ message: 'Restore failed' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}