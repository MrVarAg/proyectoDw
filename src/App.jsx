import { useState } from 'react'
//Imp modulos de firebase
import appFirebase from '../src/log-credenciales';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
const auth = getAuth(appFirebase)
//Importar los componenentes log y Home
import Login from '../src/componetnts/login'
import Home from '../src/componetnts/Home'
import './App.css'

function App() {
   
const [usuario, setusuario]= useState(null)
onAuthStateChanged(auth,(usuarioFirebase)=>{
  if(usuarioFirebase){
    setusuario(usuarioFirebase)
  }
  else{
  setusuario(null)
  }
})

  return (
    <div>
{usuario ? <Home correoUsuario = {usuario.email}/>: <Login/>}


    </div>
  )
}

export default App
