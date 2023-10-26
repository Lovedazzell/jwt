import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import PrivateRoute from './context/PrivateRoute'
import {AuthProvider} from './context/AuthContext'


function App() {
  return (  
        
    <div>
     <Router>
      <AuthProvider>
      <Header/> 
      <Routes>

        <Route exact path='/' element={<PrivateRoute/>}>
              <Route exact path='/' element={<HomePage nex='hello' />}/>
        </Route>

        <Route  element={<LoginPage/>}  exact  path='login/'   />
      </Routes>
      </AuthProvider>
     </Router>

    </div>
  );
}

export default App;
