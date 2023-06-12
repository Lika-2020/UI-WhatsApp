import './Form.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import checkCredentials from '../../../api/api';
import { loginFailure } from '../../../store/slice/authSlice';

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const credentials = {
      idInstance,
      apiTokenInstance,
    };

    try {
      const response = await dispatch(checkCredentials(credentials));
      if (response.error) {
        setError(response.error.message);
      } else {
        navigate('/chat');
      }
    } catch (err) {
      console.error('Login error:', error.message);
      dispatch(loginFailure('An error occurred during credential check'));
      setError('Неверный idInstance или apiTokenInstance');
    }
  };

  return (
    <div className="container-form">
      <div className="form">
        <span className="text">idInstance</span>
        <input
          type="text"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
        />

        <span className="text">apiTokenInstance</span>
        <input
          type="text"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
        />

        <button type="button" onClick={handleLogin}>
          Войти
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Form;
