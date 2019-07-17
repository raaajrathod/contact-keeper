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
        type: "PeFrsonal"
      },
      {
        id: 2,
        name: "Raj2",
        email: "raj@mail.com",
        phone: "1221312323",
        type: "PeFrsonal"
      },
      {
        id: 3,
        name: "Raj3",
        email: "raj@mail.com",
        phone: "1221312323",
        type: "PeFrsonal"
      }
    ]
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

  // set current contatc

  // cllear current contatc

  // update contact

  // filter contatc

  // clar filter

  // remmove alert

  // set alert

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts, 
        addContact
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
