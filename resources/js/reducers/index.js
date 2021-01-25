const reducer = (state, action) => {
  // TODO: Pending to do the crud functions with redux
  switch (action.type) {
    case 'LOG_OUT':
      return action.payload;

    case 'CREATE_POST':
      return {
        ...state,
        posts: [...state.posts, action.payload[0]],
        poststags: [...state.poststags, ...action.payload[1]],
        tags: [...state.tags, ...action.payload[2]],
      };

    case 'DELETE_POST':
      return {
        ...state,
        posts: [...state.posts.filter((post) => post.id !== action.payload)],
        poststags: [...state.poststags.filter((postTag) => postTag.post_id !== action.payload)],
      };

    case 'INIT_POSTS':
      return {
        ...state,
        posts: action.payload[0],
        poststags: action.payload[1],
        tags: action.payload[2],
      };

    default:
      return state;
  }
};

export default reducer;
