const reducer = (state, action) => {
  // TODO: Pending to do the crud functions with redux
  switch (action.type) {
    case 'LOG_OUT':
      return action.payload;

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
