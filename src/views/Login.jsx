import axios from 'axios';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

export const Login = () => {
  const { logged, setLogged } = useContext(LoginContext);
  let navigate = useNavigate();
  const handlerLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/api/auth/login', {
        mail: 'p@gmail.com',
        password: 'pepe11',
      })
      .then(function (response) {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('mail', response.data.user.mail);
        window.localStorage.setItem('password', response.data.user.password);
        setLogged(true);
        navigate('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
 
  if (logged) {
    return <Navigate to='/' />;
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-4 m-auto mt-5'>
          <h4 className='text-center'>Bienvenid@</h4>
          <input placeholder='Mail..' type='text' className='form-control' />
          <input
            placeholder='Password..'
            type='password'
            className='form-control mt-2'
          />
          <div className='d-flex justify-content-between align-items-center mt-3'>
            <div>
              <a className='fw-bold text-decoration-none text-dark' href='#'>
                Olvidaste tu contraseña?
              </a>
              <a className='fw-bold text-decoration-none text-dark' href='#'>
                Registrarme
              </a>
            </div>
            <button className='btn btn-dark p-2' onClick={handlerLogin}>
              INGRESAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
