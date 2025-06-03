import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { AppContext } from "../../context";
import "./styles.css";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}

const PhotoDetailView = () => {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);
  const { currentUser } = useContext(AppContext);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const { contextInfo } = useContext(AppContext);

  const fetchPhoto = () => {
    fetchModel(`/photo/${photoId}`)
      .then(setPhoto)
      .catch((err) => console.error("Error loading photo:", err));
  };

  useEffect(() => {
    fetchPhoto();
  }, [photoId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/photo/commentsOfPhoto/${photoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ comment: newComment }),
      });
      if (!response.ok) {
        const err = await response.json();
        setError(err.error || "Failed to add comment");
        return;
      }
      setNewComment("");
      setError("");
      fetchPhoto();
    } catch (e) {
      setError("Failed to add comment.");
      console.error(e);
    }
  };

  if (!photo) return <div>Loading photo...</div>;

  return (
    <div className="photo-detail-view">
      <div className="photo-container">
        <img
          src={`${process.env.REACT_APP_API_URL}/images/${photo.file_name}`}
          alt="User uploaded"
          className="photo-image"
        />
        <div className="photo-date">
          Uploaded by {" "}
          <strong>
            {photo.user?.first_name} {photo.user?.last_name}
          </strong>{" "}
          on {formatDate(photo.date_time)}
        </div>
      </div>

      <div className="photo-comments">
        <h3>Comments:</h3>
        {photo.comments && photo.comments.length > 0 ? (
          <ul className="comment-list">
            {photo.comments.map((comment) => (
              <li key={comment._id} className="comment-item">
                <strong>
                  {comment.user
                    ? `${comment.user.first_name} ${comment.user.last_name}`
                    : "Unknown"}
                </strong>
                : {comment.comment}
                <br />
                <span className="comment-date">
                  {formatDate(comment.date_time)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div>No comments yet.</div>
        )}

        {currentUser && (
          <div className="comment-form">
            <h4>Add a comment:</h4>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
            />
            {error && <div className="error-text">{error}</div>}
            <button onClick={handleAddComment}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoDetailView;
