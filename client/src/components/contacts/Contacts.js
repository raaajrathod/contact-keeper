import React, {useContext, Fragment, useEffect} from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const {contacts, filtered, getContact, loading} = contactContext;

  useEffect(() => {
    getContact();

    // eslint-disable-next-line
  }, []);

  if (contacts != null && contacts.length == 0 && !loading) {
    return <h4>Please Add Contacts</h4>;
  }

  if (filtered == null && contacts != null) {
    return (
      <Fragment>
        {contacts.map(o => {
          return <ContactItem key={o._id} contact={o} />;
        })}
      </Fragment>
    );
  } else if (filtered != null) {
    return (
      <Fragment>
        {filtered.map(o => {
          return <ContactItem key={o._id} contact={o} />;
        })}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h4>No Contacts to Display</h4>
      </Fragment>
    );
  }
};

export default Contacts;
