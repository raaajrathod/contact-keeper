import React, {useState, useContext, useEffect} from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Register = props => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const {setAlert} = useContext(AlertContext);
  const {register, error, clearError, isAuthenticated} = useContext(
    AuthContext
  );

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error !== null) {
      setAlert(error, "danger");
    }

    setTimeout(() => {
      clearError();
    }, 5000);

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const {name, email, password, confirmPassword} = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();

    if (name == "" || email == "" || password == "") {
      setAlert("Please Enter All Fields", "danger");
    }

    if (password !== confirmPassword) {
      setAlert("Passwords Does not Match", "danger");
    } else {
      console.log("Register Submit!");
      register({
        name,
        email,
        password
      });
    }
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
            required
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
            required
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
            required
            minLength='6'
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
            required
            minLength='6'
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
