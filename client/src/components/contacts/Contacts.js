import React, {useContext, Fragment} from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const {contacts} = contactContext;

  return (
    <Fragment>
      {contacts.map(o => {
          return <ContactItem key={o.id} contact={o} />;
      })}
    </Fragment>
  );
};

export default Contacts;
