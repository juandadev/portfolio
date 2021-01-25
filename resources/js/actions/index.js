export const logOut = (payload) => ({
  type: 'LOG_OUT',
  payload,
});

export const createPost = (payload) => ({
  type: 'CREATE_POST',
  payload,
});

export const deletePost = (payload) => ({
  type: 'DELETE_POST',
  payload,
});

export const initPosts = (payload) => ({
  type: 'INIT_POSTS',
  payload,
});
