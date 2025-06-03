import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TopBar = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Photo Sharing App
        </Typography>
        {currentUser ? (
          <>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Hi {currentUser.first_name}
            </Typography>
            <Button color="inherit" onClick={() => navigate("/photo/upload")}>
              Add Photo
            </Button>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Typography variant="body1">Please Login</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
