import React, { useState } from 'react';
import LoginForm from '../components/ui/loginForm';
import { useParams } from 'react-router-dom'
import RegisterForm from '../components/ui/registerForm';

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')
  const handleChange = () => {
    setFormType((prev) => prev === 'register' ? 'login' : 'register')
  }
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 .offset-md-3 shadow p-4'>
          {formType === 'register'
            ? <> <h4 className="mb-4">Register</h4>
              <RegisterForm />
              <p>Already have account? <a role='button' onClick={handleChange}>Sing In</a></p></>
            : <><h4 className="mb-4">Login</h4>
              <LoginForm />
              <p>Dont have account? <a role='button' onClick={handleChange}>Sing Up</a></p></>}
        </div>
      </div>
    </div>
  );
}

export default Login;