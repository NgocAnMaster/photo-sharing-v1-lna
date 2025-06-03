import React, { useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import axios from "axios";
import { AppContext } from "../../context";
import "./styles.css";

const LoginRegister = () => {
  const { setCurrentUser } = useContext(AppContext);

  const [mode, setMode] = useState("login");

  // Login state
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register state
  const [regInfo, setRegInfo] = useState({
    login_name: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");
  const [regErrors, setRegErrors] = useState({});

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/login`,
        { login_name: loginName, password }
      );
      setCurrentUser(res.data);
    } catch {
      setLoginError("Invalid login credentials.");
    }
  };

  const handleRegister = async () => {
    const {
      login_name,
      password,
      confirmPassword,
      first_name,
      last_name,
    } = regInfo;

    const errors = {};

    if (!login_name) errors.login_name = "Login name is required.";
    if (!first_name) errors.first_name = "First name is required.";
    if (!last_name) errors.last_name = "Last name is required.";
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setRegErrors(errors);

    if (Object.keys(errors).length > 0) {
      setRegError("Please fix the errors above.");
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user`, regInfo);
      setCurrentUser(res.data);
      setRegSuccess("Registration successful!");
      setRegError("");
      setRegInfo({
        login_name: "",
        password: "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
        location: "",
        description: "",
        occupation: "",
      });
      setRegErrors({});
    } catch (err) {
      if (err.response?.data?.error?.includes("login_name")) {
        setRegErrors((prev) => ({
          ...prev,
          login_name: "Login name already exists.",
        }));
      }
      setRegError(err.response?.data?.error || "Registration failed.");
    }
  };

  const handleRegFieldChange = (field, value) => {
    setRegInfo((prev) => ({ ...prev, [field]: value }));

    setRegErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper className="login-paper" elevation={3}>
        <Box display="flex" justifyContent="center" my={2}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(e, newMode) => newMode && setMode(newMode)}
          >
            <ToggleButton value="login">Login</ToggleButton>
            <ToggleButton value="register">Register</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {mode === "login" ? (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Login to Your Account
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Login Name"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
              </Button>
              {loginError && <Alert severity="error">{loginError}</Alert>}
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Register New Account
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Login Name"
                value={regInfo.login_name}
                onChange={(e) =>
                  handleRegFieldChange("login_name", e.target.value)
                }
                error={!!regErrors.login_name}
                helperText={regErrors.login_name}
                fullWidth
              />
              <TextField
                label="First Name"
                value={regInfo.first_name}
                onChange={(e) =>
                  handleRegFieldChange("first_name", e.target.value)
                }
                error={!!regErrors.first_name}
                helperText={regErrors.first_name}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={regInfo.last_name}
                onChange={(e) =>
                  handleRegFieldChange("last_name", e.target.value)
                }
                error={!!regErrors.last_name}
                helperText={regErrors.last_name}
                fullWidth
              />
              <TextField
                label="Location"
                value={regInfo.location}
                onChange={(e) =>
                  handleRegFieldChange("location", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Occupation"
                value={regInfo.occupation}
                onChange={(e) =>
                  handleRegFieldChange("occupation", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Description"
                value={regInfo.description}
                onChange={(e) =>
                  handleRegFieldChange("description", e.target.value)
                }
                fullWidth
                multiline
              />
              <TextField
                label="Password"
                type="password"
                value={regInfo.password}
                onChange={(e) =>
                  handleRegFieldChange("password", e.target.value)
                }
                error={!!regErrors.password}
                helperText={regErrors.password}
                fullWidth
              />
              <TextField
                label="Confirm Password"
                type="password"
                value={regInfo.confirmPassword}
                onChange={(e) =>
                  handleRegFieldChange("confirmPassword", e.target.value)
                }
                error={!!regErrors.confirmPassword}
                helperText={regErrors.confirmPassword}
                fullWidth
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRegister}
              >
                Register Me
              </Button>
              {regError && <Alert severity="error">{regError}</Alert>}
              {regSuccess && <Alert severity="success">{regSuccess}</Alert>}
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default LoginRegister;
