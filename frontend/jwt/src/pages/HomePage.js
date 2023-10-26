import React,{useContext ,useState,useEffect} from 'react'
import AuthContext from '../context/AuthContext';

export const HomePage = (props) => {
  let {authToken,logoutUser} = useContext(AuthContext) 
  let [notes , setNotes] = useState([])


  useEffect(()=>{
    getNotes()
  },[])

  let getNotes = async()=>{
    let response = await fetch('http://127.0.0.1:8000/api/notes/',{
      method:'GET',
      headers:{
        'Content-Type' :'application/json',
        'Authorization' : 'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    console.log('fata',data)

    if (response.status === 200){
      setNotes(data)

    }else if( response.statusText === 'Unauthorized'){
      console.log('user logout')
      logoutUser()
    }

  }

  return (
    <div>You are  in to the home page
      <hr/>
      <ul>
      {notes.map(note =>(
        <li  key = {note.id} > {note.body} </li>
      ))}  
      </ul>   
    </div>
  )
} 


export default HomePage;