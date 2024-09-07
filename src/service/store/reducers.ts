import { combineReducers } from "redux";
import auth from "../store/auth/auth.reducer";

const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
