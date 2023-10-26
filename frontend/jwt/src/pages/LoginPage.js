import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext';

export const LoginPage = () => {

    let {loginuser} = useContext(AuthContext)
  return (
    <div>

    <p>login page</p>
    <form onSubmit={loginuser} >
        <input name='username' type='text' placeholder='Enter Username' /> 
        <input name='password' type='password' placeholder='Enter Password' /> 
        <input type='submit' />
    </form>


    </div>
  )
}

export default LoginPage;
