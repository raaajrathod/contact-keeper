import React, {useState} from "react";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const {name, email, password, confirmPassword} = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
    const onSubmit=e => {
        e.preventDefault();
        console.log('Register Submit!')
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name </label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password </label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password </label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={confirmPassword}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          name='submit'
          id='submit'
          value='Submit'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
