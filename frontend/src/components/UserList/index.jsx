import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import { getListUser } from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const data = await getListUser();
        setUsers(data);
      }
      fetchData();
    }, []);

    return (
      <div>
        <List component="nav">
          {users.map((item) => (
            <>
              <ListItem>
                <Link to={`/users/${item._id}`}>
                  <ListItemText primary={item.first_name + " " + item.last_name}/>
                </Link>      
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </div>
    );
}

export default UserList;
