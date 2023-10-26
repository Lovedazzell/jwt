import React,{useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthContext';

const PrivateRoute = () => {
    let {user} = useContext(AuthContext)
    console.log('private route working fine')
    return user ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;