import React, { useState } from "react";

function CommentForm({ onCommentSubmit }) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") {
      return; // Не отправляем пустой комментарий
    }
    onCommentSubmit(commentText); // Вызываем обработчик для отправки комментария
    setCommentText(""); // Очищаем поле ввода после отправки комментария
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={handleChange}
        placeholder="Напишите комментарий..."
      ></textarea>
      <button type="submit">Отправить</button>
    </form>
  );
}

export default CommentForm;
