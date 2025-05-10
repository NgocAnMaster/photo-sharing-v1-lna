import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import fetchModel from "../../lib/fetchModelData";
import { AppContext } from "../../context";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [index, setIndex] = useState(0);
  const { advancedFeatures, setContextInfo } = useContext(AppContext);

  useEffect(() => {
    // Fetch user details
    fetchModel(`/user/${userId}`).then((userData) => {
      setUser(userData);
      setContextInfo(`Photos of ${userData.first_name} ${userData.last_name}`);
    });

    // Fetch user photos
    fetchModel(`/photo/photosOfUser/${userId}`).then((photoData) => {
      setPhotos(photoData);
    });
  }, [userId, setContextInfo]);

  if (!user || !photos.length) return null;

  const currentPhotos = advancedFeatures ? [photos[index]] : photos;

  return (
    <div>
      {currentPhotos.map((photo) => (
        <Card key={photo._id} sx={{ mt: 2 }}>
          <CardMedia
            component="img"
            height="400"
            image={`/images/${photo.file_name}`}
            alt="User uploaded content"
          />
          <CardContent>
            <Typography variant="subtitle2">
              Uploaded: {formatDate(photo.date_time)}
            </Typography>
            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment) => (
                <Card key={comment._id} sx={{ mt: 1, p: 1 }}>
                  <Typography variant="body2">
                    <Link to={`/users/${comment.user._id}`}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>{" "}
                    commented at {formatDate(comment.date_time)}
                  </Typography>
                  <Typography>{comment.comment}</Typography>
                </Card>
              ))
            ) : (
              <Typography variant="body2" sx={{ mt: 1 }}>
                No comments.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}

      {advancedFeatures && (
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            onClick={() => setIndex(index - 1)}
            disabled={index === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={() => setIndex(index + 1)}
            disabled={index === photos.length - 1}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserPhotos;
