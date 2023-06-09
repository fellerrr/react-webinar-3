export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(*,author(profile(name)))`
        });
        dispatch({ type: 'comments/load-success', payload: { comments: res.data.result } });
      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  send: (comment, id, type) => {
    console.log('comment to send:', comment)
    console.log('id to send:', id)
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=*,author(profile(name))`,
          method: 'POST',
          body: JSON.stringify({
            text: comment,
            parent: {
              _id: id,
              _type: type
            }
          })
        });
      } catch (e) {
        console.log(e)
      }
    }
  },
}
