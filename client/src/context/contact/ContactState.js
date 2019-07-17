import React, {useReducer} from "react";
import uuid from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT
} from "../Types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Raj",
        email: "raj@mail.com",
        phone: "1221312323",
        type: "personal"
      },
      {
        id: 2,
        name: "Raj2",
        email: "raj@mail.com",
        phone: "1221312323",
        type: "personal"
      },
      {
        id: 3,
        name: "Raj3",
        email: "raj@mail.com",
        phone: "1221312323",
        type: "professional"
      }
    ],
    currentContact: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact

  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  };

  // Delete Contatc

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
