import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import UserComments from "./components/UserComments";
import PhotoDetailView from "./components/PhotoDetailView";
import LoginRegister from "./components/LoginRegister";
import PhotoUploadView from "./components/PhotoUploadView";
import { AppContext } from "./context";

axios.defaults.withCredentials = true; // Ensure cookies are sent for session auth

const App = () => {
  const [contextInfo, setContextInfo] = useState("");
  const [advancedFeatures, setAdvancedFeatures] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/logout`);
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const fetchSessionUser = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/user/me"); // <--- New endpoint
        if (res.status === 200 && res.data && res.data._id) {
          setCurrentUser(res.data);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        setCurrentUser(null);
      }
      setLoading(false);
    };

    fetchSessionUser();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AppContext.Provider
      value={{
        contextInfo,
        setContextInfo,
        advancedFeatures,
        setAdvancedFeatures,
        currentUser,
        setCurrentUser,
      }}
    >
      <Router>
        <div>
          <TopBar currentUser={currentUser} onLogout={logout} />
          {currentUser ? (
            <Grid container spacing={2} style={{ marginTop: "80px" }}>
              <Grid item xs={3}>
                <UserList />
              </Grid>
              <Grid item xs={9}>
                <Routes>
                  <Route path="/users/:userId" element={<UserDetail />} />
                  <Route path="/photos/:userId" element={<UserPhotos />} />
                  <Route path="/photo/upload" element={<PhotoUploadView />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/commentsOfUser/:userId" element={<UserComments />} />
                  <Route path="/photo/:photoId" element={<PhotoDetailView />} />
                  <Route path="*" element={<Navigate to="/users" />} />
                </Routes>
              </Grid>
            </Grid>
          ) : (
            <Routes>
              <Route path="*" element={<LoginRegister />} />
            </Routes>
          )}
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
