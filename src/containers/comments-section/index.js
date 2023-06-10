import {memo, useCallback, useMemo, useState} from "react";

import {useSelector as useSelectorRedux} from "react-redux/es/hooks/useSelector";
import shallowequal from "shallowequal";
import Comment from "../../components/comment";
import CommentHead from "../../components/commens-head";
import listToTree from '../../utils/comments-list-to-tree';
import treeToList from '../../utils/tree-to-list';
import list from "../../components/list";
import CommentForm from "../../components/new-comment";
import commentsActions from "../../store-redux/article-comments/actions";
import {useDispatch} from "react-redux";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import NeedSign from "../../components/need-sign";
import CommentsLayout from "../../components/comments-layout";


function CommentsSection({articleId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(state => ({
    exists: state.session.exists
  }));

  const select = useSelectorRedux(state => ({
    comments: state.comments.comments,
  }), shallowequal);

  const callbacks = {
    sendComment: useCallback((comment) =>
      dispatch(commentsActions.send(comment, articleId, 'article')), []),
    sendAnswer: useCallback((comment, parentId) =>
      dispatch(commentsActions.send(comment, parentId, 'comment')), []),
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  }
  const list = useMemo(() => {
    if (Object.keys(select.comments).length > 0) {
      return [
        ...treeToList(listToTree(select.comments?.items), (item, level) => (
          {value: item, padding: `${level === 0 ? 40 : level > 7 ? 7 * 30 + 40: level * 30 + 40}px`}
        ))
      ];
    }
    return [];
  }, [select.comments]);

  const [activeId, setActiveId] = useState(null);
  return (
    <>
      <CommentHead title='Комментарии' count={select.comments?.items?.length}/>
      {list.map(comment => (
        <Comment
          key={comment.value._id}
          comment={comment.value}
          answer={(text) => callbacks.sendAnswer(text, comment.value._id)}
          style={{ paddingLeft: comment.padding || '40px' }}
          sign={callbacks.onSignIn}
          auth={auth.exists}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      ))}
      <CommentsLayout>
        {auth.exists
          ? <CommentForm onCommentSubmit={callbacks.sendComment}/>
          : <NeedSign sign={callbacks.onSignIn}/>
        }
      </CommentsLayout>
    </>
  );

}

export default memo(CommentsSection);