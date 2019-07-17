import React, {useState, useContext} from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const onChange = event => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    contactContext.addContact(contact);
    setContact({name: "", email: "", phone: "", type: "personal"});
  };

  const {name, email, phone, type} = contact;
  return (
    <form onSubmit={onSubmit}>
      <h1 className='form-primary'>Add Contact</h1>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h4>Contact Type</h4>
      <input
        type='radio'
        name='type'
        id='personal'
        value='personal'
        checked={type === "personal" ? "checked" : ""}
        onChange={onChange}
      />{" "}
      Personal{"   "}
      <input
        type='radio'
        name='type'
        id='professional'
        value='professional'
        checked={type === "professional" ? "checked" : ""}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type='submit'
          value='Add Contact'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default ContactForm;
