import "./App.css";

import { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import LoginRegister from "./components/LoginRegister";
import UserComments from "./components/UserComments";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = () => {
  const [checked, setChecked] = useState(false);
  const [profile, setProfile] = useState(() => {
    const token = localStorage.getItem("token");
    const storedProfile = localStorage.getItem("profile");
    if (token && storedProfile) {
      return JSON.parse(storedProfile);
    }
    return null;
  });

  useEffect(() => {
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
    } else {
      localStorage.removeItem("profile");
    }
  }, [profile]);

  const handleClick = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  if (!profile) {
    return (
      <Router>
        <div>
          <TopBar profile={null} checked={checked} handleClick={handleClick} />
          <Grid container spacing={2} sx={{ mt: "64px", px: 2 }}>
            <Grid item sm={12}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route path="/login" element={<LoginRegister setProfile={setProfile} />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <TopBar profile={profile} setProfile={setProfile} checked={checked} handleClick={handleClick} />
        <Grid container spacing={2} sx={{ mt: "64px", px: 2 }}>
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos checked={checked} />} />
                <Route path="/photos/:userId/:photoId" element={<UserPhotos checked={checked} />} />
                <Route path="/comments/:userId" element={<UserComments />} />
                <Route path="/login" element={<Navigate to={`/users/${profile._id}`} replace />} />
                <Route path="*" element={<Navigate to={`/users/${profile._id}`} replace />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
