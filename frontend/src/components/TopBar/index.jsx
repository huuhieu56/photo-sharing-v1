import { useState, useEffect, useRef } from "react";
import { AppBar, Toolbar, Typography, Checkbox, FormControlLabel, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserProfile, uploadPhoto } from "../../lib/fetchModelData";
import "./styles.css";

function TopBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [context, setContext] = useState("");
  const { profile, setProfile, checked, handleClick } = props;

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const type = pathParts[1];
    const userId = pathParts[2];

    async function updateTopbar() {
      if (userId) {
        const data = await getUserProfile(userId);
        if (data) {
          const fullName = `${data.first_name} ${data.last_name}`;

          if (type === "users") {
            setContext(fullName);
          } else if (type === "photos") {
            setContext(`Photos of ${fullName}`);
          }
        }
      } else {
        setContext("");
      }
    }

    updateTopbar();
  }, [location]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    setProfile(null);
    navigate("/login");
  }

  async function handleAddPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await uploadPhoto(file);
      window.location.reload();
    } catch (err) {
      console.error("Upload failed:", err);
    }
    e.target.value = "";
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Đặng Hữu Hiệu
        </Typography>
        <Typography variant="h5" color="inherit">
          {context}
        </Typography>

        {profile ? (
          <Typography variant="h6" color="inherit">
            Hi {profile.first_name}
          </Typography>
        ) : (
          <Typography variant="h6" color="inherit">
            Please Login
          </Typography>
        )}

        {profile && (
          <>
            <Button color="inherit" variant="outlined" onClick={() => fileInputRef.current?.click()}>
              Add Photo
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleAddPhoto}
            />
          </>
        )}

        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              color="default"
              onChange={handleClick}
            />
          }
          label={<Typography variant="h6">Enable Advanced Features</Typography>}
        />

        {profile && (
          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
