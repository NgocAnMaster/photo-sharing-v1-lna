import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import models from '../../modelData/models';
import { AppContext } from '../../context';

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const { setContextInfo } = useContext(AppContext);

  useEffect(() => {
    const fetchedUser = models.userModel(userId);
    setUser(fetchedUser);
    setContextInfo(`${fetchedUser.first_name} ${fetchedUser.last_name}`);
  }, [userId, setContextInfo]);

  if (!user) return null;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h5">{user.first_name} {user.last_name}</Typography>
        <Typography>Location: {user.location}</Typography>
        <Typography>Occupation: {user.occupation}</Typography>
        <Typography>Description: {user.description}</Typography>
        <Typography variant="body2">
          <Link to={`/photos/${user._id}`}>View {user.first_name}'s Photos</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
