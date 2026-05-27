import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import "./styles.css";
import { getListUserWithCounts } from "../../lib/fetchModelData";

function UserList () {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      async function fetchData() {
        const data = await getListUserWithCounts();
        setUsers(data);
      }
      fetchData();
    }, []);

    return (
      <div>
        <List component="nav">
          {users.map((item) => (
            <Fragment key={item._id}>
              <ListItem component={Link} to={`/users/${item._id}`}>
                <ListItemText primary={`${item.first_name} ${item.last_name}`} />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip
                    label={item.photo_count || 0}
                    size="small"
                    sx={{ backgroundColor: "green", color: "white" }}
                  />
                  <Chip
                    label={item.comment_count || 0}
                    size="small"
                    sx={{ backgroundColor: "red", color: "white", cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/comments/${item._id}`);
                    }}
                  />
                </Box>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </div>
    );
}

export default UserList;
