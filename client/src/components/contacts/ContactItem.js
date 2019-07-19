import React, {useContext} from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/ContactContext";

const ContactItem = ({contact}) => {
  const contactContext = useContext(ContactContext);
  const {
    deleteContact,
    setCurrentContact,
    clearCurrentContact
  } = contactContext;
  const {name, _id, email, phone, type} = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrentContact();
  };

  const onEdit = () => {
    setCurrentContact(contact);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{" "}
        <span
          style={{float: "right"}}
          className={
            "badge" +
            (type === "professional" ? " badge-success" : " badge-primary")
          }>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' />
            {" " + email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' />
            {" " + phone}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={onEdit}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.prototype = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
