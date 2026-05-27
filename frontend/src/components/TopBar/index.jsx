import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getUserProfile } from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar(props) {
  const location = useLocation();
  const [context, setContext] = useState("");
  const { checked, handleClick } = props;

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

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Đặng Hữu Hiệu
        </Typography>
        <Typography variant="h5" color="inherit">
          {context}
        </Typography>
        
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
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
