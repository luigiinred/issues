const auth = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return Object.assign({}, state, {
        error: null
      });
    case "LOGIN_SUCCESS":
      console.log(action);
      return Object.assign({}, state, action.data);
    case "LOGIN_ERROR":
      return Object.assign({}, state, {
        error: "Invalid Username/Password combination."
      });
    default:
      return state;
  }
};

export default auth;
