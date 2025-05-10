import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
import { List, ListItem, ListItemText, Badge, Box, Stack } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import { AppContext } from "../../context";

function UserList() {
  const [userList, setUserList] = useState([]);
  const { setContextInfo } = useContext(AppContext);

  useEffect(() => {
    fetchModel("/user/list").then((data) => {
      setUserList(data);
      setContextInfo("User List");
    });
  }, [setContextInfo]);

  if (!userList) {
    return <div>Loading users...</div>;
  }

  return (
    <List>
      {userList.map((user) => (
        <ListItem button component={Link} key={user._id}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link to={`/users/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </Link>
            <Badge
              badgeContent={user.photoCount}
              color="success"
              sx={{ marginRight: 1 }}
            />
            <Link to={`/commentsOfUser/${user._id}`}>
              <Badge badgeContent={user.commentCount} color="error" />
            </Link>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}

export default UserList;
