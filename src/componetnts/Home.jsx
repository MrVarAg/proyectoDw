// eslint-disable-next-line no-unused-vars
import React from 'react';
import appFirebase from '../log-credenciales';
import { getAuth, signOut} from 'firebase/auth';

const auth = getAuth(appFirebase);

// eslint-disable-next-line react/prop-types
const Home =({correoUsuario})=>{
return(

<div>
<h2 className='text-center'>Bienvenido {correoUsuario}  <button className='btn btn-primary' onClick={()=>signOut(auth)}> Logout</button></h2>

</div>


)
}
export default Home