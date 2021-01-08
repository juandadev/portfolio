const reducer = (state, action) => {
  switch (action.type) {
    case 'LOG_OUT':
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
