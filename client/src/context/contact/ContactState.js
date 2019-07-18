import React, {useReducer} from "react";
import uuid from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import axios from "axios";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT,
  CONTACT_ERROR
} from "../Types";

const ContactState = props => {
  const initialState = {
    contacts: [],
    currentContact: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact

  const addContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/contacts/", contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });
    } catch (error) {
      console.log(error.response.data);
      // dispatch({
      //   type: CONTACT_ERROR,
      //   payload: error.res.msg
      // });
    }
  };

  // Delete Contact

  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  };

  // set current contatc

  const setCurrentContact = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };

  // cllear current contatc
  const clearCurrentContact = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  // update contact
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    });
  };

  // filter contatc
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACT,
      payload: text
    });
  };

  // clar filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };
  // remmove alert

  // set alert

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
