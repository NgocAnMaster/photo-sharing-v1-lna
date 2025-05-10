import "./App.css";

import React, { useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import UserComments from "./components/UserComments";
import PhotoDetailView from "./components/PhotoDetailView";
import { AppContext } from "./context";

const App = (props) => {
  const [contextInfo, setContextInfo] = useState("");
  const [advancedFeatures, setAdvancedFeatures] = useState(false);

  return (
    <AppContext.Provider
      value={{
        contextInfo,
        setContextInfo,
        advancedFeatures,
        setAdvancedFeatures,
      }}
    >
      <Router>
        <div>
          <TopBar />
          <Grid container spacing={2} style={{ marginTop: "80px" }}>
            <Grid item xs={3}>
              <UserList />
            </Grid>
            <Grid item xs={9}>
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />
                <Route path="/users" element={<UserList />} />
                <Route
                  path="/commentsOfUser/:userId"
                  element={<UserComments />}
                />
                <Route path="/photo/:photoId" element={<PhotoDetailView />} />
              </Routes>
            </Grid>
          </Grid>
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
