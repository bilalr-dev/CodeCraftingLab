import React from "react";
import Layout from "@/components/Layout";
import axios from "axios";

const Settings = () => {
  const handleBackup = async () => {
    try {
      const response = await axios.get("/api/backup");
      console.log("Backup successful:", response.data);
    } catch (error) {
      console.error("Backup failed:", error.message);
    }
  };

  const handleRestore = async () => {
    try {
      const response = await axios.post("/api/restore");
      console.log("Restore successful:", response.data);
    } catch (error) {
      console.error("Restore failed:", error.message);
    }
  };

  return (
    <Layout>
      <div>
        <h2>Settings page here</h2>
        <button >Backup Data</button>
        <button > Restore Data</button>
      </div>
    </Layout>
  );
};

export default Settings;
