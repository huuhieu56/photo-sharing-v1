import "./App.css";

import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = (props) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <Router>
      <div>
        <TopBar checked={checked} handleClick={handleClick} />
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
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
