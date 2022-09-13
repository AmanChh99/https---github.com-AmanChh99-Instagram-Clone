import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  const deleteComment = (id) => {
    db.collection("posts").doc(postId).collection("comments").doc(id).delete();
  };

  const deletePost = () => {
    db.collection("posts").doc(postId).delete();
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Aman Chhabra"
          src="https://instagram.fbek1-2.fna.fbcdn.net/v/t51.2885-19/287746727_1076000633274097_5256090352445526922_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fbek1-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=LF6z_OE5a1AAX-nV8uw&edm=ALQROFkBAAAA&ccb=7-5&oh=00_AT_m0OgOrUDDUgp3QmrqgzeucoHAmCuA6qE0SDJ5eAvRnw&oe=62F0682C&_nc_sid=30a2ef"
        />
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} />
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map(({ id, comment }) => (
          <div className="post__comment">
            {comment.username === user?.displayName ? (
              <button
                className="post__deleteComment"
                onClick={() => deleteComment(id)}
              >
                X
              </button>
            ) : (
              <div></div>
            )}
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          </div>
        ))}
      </div>
      {user && (
        <form className="post__commentBox">
          <input
            type="text"
            className="post__input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
