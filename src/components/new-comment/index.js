import React, { useState } from "react";
import {cn as bem} from "@bem-react/classname";

import './style.css'
import useTranslate from "../../hooks/use-translate";


function CommentForm({ onCommentSubmit,
                       titleReply,
                       placeholder= 'Текст',
                       setShow,
                     }) {
  const {t} = useTranslate();
  let title = titleReply ? titleReply : t('comment.newComment')


  const [commentText, setCommentText] = useState(placeholder);
  const cn = bem('NewComment');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") {
      return; // Не отправляем пустой комментарий
    }
    onCommentSubmit(commentText);
    setCommentText("");
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <div className={cn()}>
      <form className={cn('form')} onSubmit={handleSubmit}>
      <span className={cn('title')}>{title}</span>
      <textarea
        className={cn('textarea')}
        value={commentText}
        onChange={handleChange}
        rows={5}
      ></textarea>
        <div className={cn('buttonsBlock')}>
          <button className={cn('button')} type="submit">{t('comment.submit')}</button>
          {title===titleReply &&
            <button className={cn('button')} onClick={()=>setShow(null)}>{t('comment.cancel')}</button>
          }
        </div>
      </form>
    </div>
  );

}

export default CommentForm;
