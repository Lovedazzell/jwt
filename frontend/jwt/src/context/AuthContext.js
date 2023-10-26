import {createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
const AuthContext = createContext() 


export default AuthContext;

export  const AuthProvider = ({children}) =>{

    console.log('local',localStorage.getItem('authToken'))
    let [authToken,setAuthToken] = useState(()=>localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [user,setUser] = useState(()=>localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null)
    let [loading , setLoading ] = useState(true)

    let navigate = useNavigate()

    let loginuser = async(e)=>{
        e.preventDefault()
        console.log('Form submited')
        let response = await fetch('http://127.0.0.1:8000/api/token/',{
            method :'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'username':e.target.username.value,'password':e.target.password.value
            })
        })

        let data = await response.json()
            console.log('data:',data) 
        if( response.status === 200){
            setUser(jwt_decode(data.access))
            setAuthToken(data)
            localStorage.setItem('authToken',JSON.stringify(data))      
            navigate('/')
        }else{
            alert('somehting Went Wrong!')
        }
        
    }


    let logoutUser = ()=>{
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        navigate('/login')
    }


    let updateToken = async () =>{
        console.log('update token called')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method :'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'refresh':authToken?.refresh
            })
        })

        let data = await response.json()
            console.log('data:',data) 
        if( response.status === 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken',JSON.stringify(data))      
          
        }else{
            logoutUser( )
        }
        
        if (loading){
            setLoading(false)
        }
    }


    let conntextData = {
        user:user,
        loginuser:loginuser,
        logoutUser:logoutUser,
        authToken:authToken,
    }

    useEffect(() =>{
        if(loading){
            updateToken()
          }

        let interval = setInterval(()=>{
            if(authToken){
                updateToken()
            }
        },1000 * 60 * 4)
        return ()=>{
            clearInterval(interval)
        }
    },[authToken,loading])



    return(
        <AuthContext.Provider value={conntextData} >
        {loading ? null : children}
        </AuthContext.Provider>
    )
}