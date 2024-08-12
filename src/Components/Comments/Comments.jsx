import { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import CommentsTable from "./CommentsTable/CommentsTable";

export default function Comments() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = () => {
    fetch("http://localhost:8000/api/comments/")
      .then((res) => res.json())
      .then((result) => {
        console.log(result), setComments(result);
      });
  };

  const deleteComment = (commentID) => {
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllComments();
      });
  };

  const acceptComment = (commentID) => {
    fetch(`http://localhost:8000/api/comments/accept/${commentID}`, {
      method: "POST",
    })
      .then((res) => console.log(res.json()))
      .then((result) => {
        console.log(result);
        getAllComments();
      });
  };

  const rejectComment = (commentID) => {
    fetch(`http://localhost:8000/api/comments/reject/${commentID}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  return (
    <div>
      {comments.length ? (
        <CommentsTable
          rejectComment={rejectComment}
          deleteComment={deleteComment}
          comments={comments}
          getAllComments={getAllComments}
          acceptComment={acceptComment}
        />
      ) : (
        <ErrorBox msg={"هیج کامنتی یافت نشد ."} />
      )}
    </div>
  );
}
