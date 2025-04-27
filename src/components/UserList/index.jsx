import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import models from '../../modelData/models';
import { AppContext } from '../../context';

function UserList() {
  const [users, setUsers] = useState([]);
  const { setContextInfo } = useContext(AppContext);

  useEffect(() => {
    setUsers(models.userListModel());
    setContextInfo('User List');
  }, [setContextInfo]);

  return (
    <List>
      {users.map((user) => (
        <ListItem button component={Link} to={`/users/${user._id}`} key={user._id}>
          <ListItemText primary={`${user.first_name} ${user.last_name}`} />
        </ListItem>
      ))}
    </List>
  );
}

export default UserList;
