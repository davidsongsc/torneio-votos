import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { loginUser } from '../actions/userActions';
import { RootState } from '../reducers'; // Substitua pelo caminho correto

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Ajuste o tipo do dispatch para ThunkDispatch
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;