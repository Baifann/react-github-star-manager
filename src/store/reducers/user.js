import {
  TYPE
} from '../action'

const createUser = (user) => ({
  user
});

const user = (state = {}, action) => {
  switch (action.type) {
    case TYPE.SET_USER:
      return [...state, createUser(action.user)];
    default:
      return state;
  }
}

export {
  user
}
