import React from "react";

export default function CommentRow({ comment }) {
  return (
    <tr>
      <td>{comment.postId}</td>
      <td>{comment.name}</td>
      <td>{comment.email}</td>
    </tr>
  );
}
