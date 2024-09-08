import { combineReducers } from "redux";
import auth from "../store/auth/auth.reducer";
import user from "../store/user/user.reducers";
import role from "../store/role/role.reducer";

const rootReducer = combineReducers({
  auth,
  user,
  role,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
