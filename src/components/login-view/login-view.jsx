import React, { useState } from "react";
import PropTypes from 'prop-types';

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  const handleRegistration = () => {
      let reg = false
      props.regData(reg);
  }

  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  );
}

LoginView.propTypes = {
    regData: PropTypes.func.isRequired,
    loggingIn: PropTypes.func.isRequired
};