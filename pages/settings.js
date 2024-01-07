// pages/settings.js
import React, { useRef, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';

const CustomRestoreIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
</svg>

);

const CustomBackupIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
</svg>

);

const Settings = () => {
  const fileInputRef = useRef(null);
  const [restoreSuccess, setRestoreSuccess] = useState(false);

  const handleBackup = async () => {
    try {
      // Make a POST request to the backup API
      const response = await axios.post('/api/backup');

      // Log the backup data (adjust as needed)
      console.log('Backup successful:', response.data);

      // Create a blob with the backup data
      const blob = new Blob([JSON.stringify(response.data)], {
        type: 'application/json',
      });

      // Create a download link
      const currentDate = new Date().toISOString().split('T')[0];
      const currentTime = new Date().toLocaleTimeString().replace(/:/g, '-');
      const fileName = `backup-${currentDate}-${currentTime}.json`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);

      // Clean up the blob
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Backup failed:', error.message);
    }
  };

  const handleRestore = async () => {
    try {
      // Check if a file is selected for upload
      if (fileInputRef.current?.files.length > 0) {
        const file = fileInputRef.current.files[0];
  
        // Read the file content as text
        const fileContent = await file.text();
  
        // Parse the JSON data from the file content
        const restoreData = JSON.parse(fileContent);
  
        // Make a POST request to the restore API
        const response = await axios.post('/api/restore', restoreData);
  
        // Check the response for success
        if (response.status === 200) {
          // Set restore success state to true
          setRestoreSuccess(true);
          console.log('Restore successful');
        } else {
          console.error('Restore failed:', response.data.message);
          // Set restore success state to false in case of failure
          setRestoreSuccess(false);
        }
      } else {
        console.error('No file selected for restore');
      }
    } catch (error) {
      console.error('Restore failed:', error.message);
      // Set restore success state to false in case of failure
      setRestoreSuccess(false);
    }
  };
  

  return (
    <Layout>
      <h1>Settings</h1>
      <div className="container mx-auto p-4">
        {/* Backup Data Section */}
        <div className="mb-8 p-4 border border-gray-300 bg-white bg-opacity-20 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Backup Data</h2>
          <p className="mb-6 mt-4 text-gray-500	">Backs up your database, keeping your data safe. If something goes wrong, you can easily restore your database to a previous state, making sure your information is always secure.</p>
          <button
            onClick={handleBackup}
            className="btn-primary flex items-center p-2 text-sm hover:bg-blue-600 hover:text-white"
          >
            <CustomBackupIcon /> <span className="ml-2">Backup Data</span>
          </button>
        </div>

        {/* Restore Data Section */}
        <div className="mb-8 p-4 border border-gray-300 bg-white bg-opacity-20 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Restore Data</h2>
          <p className="mb-6 mt-4 text-gray-500	">If things go wrong, it undoes the damage, bringing your database back to safety. It's like an instant recovery button for your important information.</p>

          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              className="border-none"
              placeholder=""
            />
          </div>
          <button
            onClick={handleRestore}
            className="btn-primary flex items-center p-2 text-sm hover:bg-blue-600 hover:text-white mt-2"
          >
            <CustomRestoreIcon /> <span className="ml-2">Restore Data</span>
          </button>
          {restoreSuccess && <p className="text-sky-100 mt-1">Restore successful!</p>}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
