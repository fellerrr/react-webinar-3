import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import SideLayout from "../side-layout";
import { formatDateTime} from "../../utils/date-format";
import CommentForm from "../new-comment";
import NeedSign from "../need-sign";

function Comment({comment, user, answer, style, sign, auth, activeId, setActiveId, t}) {
  const handleReply = (id) => {
    setActiveId(id);
  };
  const author = comment.author.profile.name
  const cn = bem('Comment');
  const date = formatDateTime(comment?.dateCreate)
  return (
    <div style={style} className={cn()}>
      <SideLayout side={'start'}>
        <span className={author===user ? cn('user') : cn('author') }>{author}</span>
        <span className={cn('date')}>{date}</span>
      </SideLayout>
      <div className={cn('text')}>{comment.text}</div>
      <span
        className={cn('answer')}
        onClick={()=>handleReply(comment._id)}
      >
        {t('comment.answer')}
      </span>
      {activeId === comment._id && auth &&
        <CommentForm
          onCommentSubmit={answer}
          titleReply={t('comment.newReplay')}
          placeholder={`${t('comment.myAnswer')} ${author}`}
          setShow={setActiveId}
          t={t}
        />}
      {activeId === comment._id && !auth &&
        <div className={cn('options')}>
          <NeedSign sign={sign} action='ответить'/>
          <span className={cn('cancel')} onClick={() =>setActiveId(null)}> {t('comment.cancel')}</span>
        </div>
      }
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    dateCreate: PropTypes.string,
    text: PropTypes.string
  }).isRequired,
  answer: PropTypes.func,
  style: PropTypes.object,
  sign: PropTypes.func,
  auth: PropTypes.bool,
  activeCommentId: PropTypes.number,
  setActiveCommentId: PropTypes.func
};

Comment.defaultProps = {
  style: {},
  auth: false,
  activeCommentId: null,
  setActiveCommentId: () => {}
};

export default memo(Comment);