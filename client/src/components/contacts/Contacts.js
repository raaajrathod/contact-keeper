import React, {useContext, Fragment} from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const {contacts, filtered} = contactContext;

  if (contacts.length == 0) {
    return <h4>Please Add Contacts</h4>;
  }

  if (filtered == null) {
    return (
      <Fragment>
        {contacts.map(o => {
          return <ContactItem key={o._id} contact={o} />;
        })}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {filtered.map(o => {
          return <ContactItem key={o._id} contact={o} />;
        })}
      </Fragment>
    );
  }
};

export default Contacts;
