import { combineReducers } from "redux";
import { dialog } from "../components/molecules/Dialog/Dialog";
import auth from "../state/Auth/reducer";
import profile from "../state/Profile/reducer";
import settings from "../state/Settings/reducer";

const reducer = combineReducers({
  auth,
  dialog: dialog.dialogReducer,
  profile,
  settings,
})

export default reducer
