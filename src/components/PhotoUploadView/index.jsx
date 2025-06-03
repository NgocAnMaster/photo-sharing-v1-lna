import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import { Button, Typography } from "@mui/material";

const PhotoUploadView = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/photo/new`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Upload failed");
        return;
      }

      navigate(`/users/${currentUser._id}`); // Redirect to user photo page
    } catch (e) {
      console.error(e);
      setError("Upload failed.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Upload a New Photo
      </Typography>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default PhotoUploadView;
