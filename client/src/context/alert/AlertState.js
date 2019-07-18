import React, {useReducer} from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import uuid from "uuid";
import {SET_ALERT, REMOVE_ALERT} from "../Types";

const AuthState = props => {
  const initialState = [];

  // Set Alert
  const setAlert = (msg, type) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: {
        id,
        msg,
        type
      }
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      });
    }, 5000);
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);
  return (
    <AlertContext.Provider value={{setAlert, alerts: state}}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AuthState;
