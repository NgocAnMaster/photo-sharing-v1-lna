import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css"; // Optional: move to external CSS if needed

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}

const PhotoDetailView = () => {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetchModel(`/photo/${photoId}`)
      .then(setPhoto)
      .catch((err) => console.error("Error loading photo:", err));
  }, [photoId]);

  if (!photo) return <div>Loading photo...</div>;

  return (
    <div className="photo-detail-view">
      <div className="photo-container">
        <img
          src={`/images/${photo.file_name}`}
          alt="User uploaded"
          className="photo-image"
        />
        <div className="photo-date">
          Uploaded by{" "}
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
                <span className="comment-date">{formatDate(comment.date_time)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>No comments yet.</div>
        )}
      </div>
    </div>
  );
};

export default PhotoDetailView;
