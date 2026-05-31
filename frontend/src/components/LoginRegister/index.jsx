import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../lib/fetchModelData";
import "./styles.css";

function LoginRegister({ setProfile }) {
  const navigate = useNavigate();

  // Login state
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register state
  const [regLoginName, setRegLoginName] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPassword2, setRegPassword2] = useState("");
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regLocation, setRegLocation] = useState("");
  const [regDescription, setRegDescription] = useState("");
  const [regOccupation, setRegOccupation] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    try {
      const data = await loginUser(loginName, loginPassword);
      localStorage.setItem("token", data.token);
      setProfile({ _id: data._id, first_name: data.first_name, last_name: data.last_name });
      navigate(`/users/${data._id}`);
    } catch (err) {
      setLoginError(err.response?.data || "Login failed");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");

    if (regPassword !== regPassword2) {
      setRegError("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        login_name: regLoginName,
        password: regPassword,
        first_name: regFirstName,
        last_name: regLastName,
        location: regLocation,
        description: regDescription,
        occupation: regOccupation,
      });
      setRegSuccess("Registration successful! You can now login.");
      setRegLoginName("");
      setRegPassword("");
      setRegPassword2("");
      setRegFirstName("");
      setRegLastName("");
      setRegLocation("");
      setRegDescription("");
      setRegOccupation("");
    } catch (err) {
      setRegError(err.response?.data || "Registration failed");
    }
  }

  return (
    <Box sx={{ display: "flex", gap: 4, p: 2 }}>
      {/* Login */}
      <Box component="form" onSubmit={handleLogin} sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Login</Typography>
        {loginError && <Alert severity="error" sx={{ mb: 1 }}>{loginError}</Alert>}
        <TextField
          label="Login Name"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Password"
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">Login</Button>
      </Box>

      {/* Register */}
      <Box component="form" onSubmit={handleRegister} sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Register</Typography>
        {regError && <Alert severity="error" sx={{ mb: 1 }}>{regError}</Alert>}
        {regSuccess && <Alert severity="success" sx={{ mb: 1 }}>{regSuccess}</Alert>}
        <TextField label="Login Name" value={regLoginName} onChange={(e) => setRegLoginName(e.target.value)} fullWidth sx={{ mb: 1 }} />
        <TextField label="Password" type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} fullWidth sx={{ mb: 1 }} />
        <TextField label="Confirm Password" type="password" value={regPassword2} onChange={(e) => setRegPassword2(e.target.value)} fullWidth sx={{ mb: 1 }} />
        <TextField label="First Name" value={regFirstName} onChange={(e) => setRegFirstName(e.target.value)} fullWidth sx={{ mb: 1 }} />
        <TextField label="Last Name" value={regLastName} onChange={(e) => setRegLastName(e.target.value)} fullWidth sx={{ mb: 1 }} />
        <TextField label="Location" value={regLocation} onChange={(e) => setRegLocation(e.target.value)} fullWidth sx={{ mb: 1 }} />
        <TextField label="Description" value={regDescription} onChange={(e) => setRegDescription(e.target.value)} fullWidth sx={{ mb: 1 }} />
        <TextField label="Occupation" value={regOccupation} onChange={(e) => setRegOccupation(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <Button type="submit" variant="contained">Register Me</Button>
      </Box>
    </Box>
  );
}

export default LoginRegister;
