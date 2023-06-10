import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import SideLayout from "../side-layout";
import { formatDateTime} from "../../utils/date-format";
import CommentForm from "../new-comment";
import NeedSign from "../need-sign";

function Comment({comment, answer, style, sign, auth}) {
  const [show, setShow] = useState(false)
  const author = comment.author.profile.name
  const cn = bem('Comment');
  const date = formatDateTime(comment?.dateCreate)
  return (
    <div style={style} className={cn()}>
      <SideLayout side={'start'}>
        <span className={cn('author')}>{author}</span>
        <span className={cn('date')}>{date}</span>
      </SideLayout>
      <div className={cn('text')}>{comment.text}</div>
      <span
        className={cn('answer')}
        onClick={() => setShow(true)}
      >
        {/*{t('article.add')}*/}
        Ответить
      </span>
      {show && auth &&
        <CommentForm
          onCommentSubmit={answer}
          title='Новый ответ'
          placeholder={`Мой ответ для ${author}`}
          setShow={setShow}
        />}
      {show && !auth &&
        <div className={cn('options')}>
          <NeedSign sign={sign} />
          <span className={cn('cancel')} onClick={() =>setShow(false)}> Отмена</span>
        </div>
      }
    </div>
  );
}

Comment.propTypes = {
  article: PropTypes.shape({
    text: PropTypes.string
  })

};

Comment.defaultProps = {

}

export default memo(Comment);
