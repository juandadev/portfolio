const login = JSON.parse(localStorage.getItem('isLoggedIn'));
const userData = JSON.parse(localStorage.getItem('userData'));

const initialState = {
  isLoggedIn: login,
  userData: { ...userData },
  posts: [],
  poststags: [],
  tags: [],
};

export default initialState;
