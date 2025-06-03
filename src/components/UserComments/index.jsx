import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";

const UserComments = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchModel(`/user/commentsOfUser/${userId}`).then((data) => {
      setComments(data);
    });
  }, [userId]);

  if (!comments) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Comments by User
      </Typography>
      <Grid container spacing={2}>
        {comments.map((comment, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <Link to={`/photos/${comment.photo_id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.REACT_APP_API_URL}/images/${comment.file_name}`}
                  alt="Photo thumbnail"
                />
              </Link>
              <CardContent>
                <Link to={`/photo/${comment.photo_id}`}>
                  <Typography variant="body1">{comment.comment}</Typography>
                </Link>
                <Typography variant="caption" color="text.secondary">
                  {new Date(comment.date_time).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserComments;
