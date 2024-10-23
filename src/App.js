
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './Home/HomePage';
import Authentication from './Authentication/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './Redux/Auth/Action';

function App() {

  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store=>store);
  const dispatch = useDispatch();
  const navigate =useNavigate();

useEffect(()=>{
  if(jwt){
    dispatch(getUser(jwt))
    // if(auth.user){
    //   navigate("/")
    // }
  }
},[jwt])

  return (
   
    <div>
      <Routes>
        <Route path='/*' element={auth.user?.email ? <HomePage/> : <Authentication/>}>
          
        </Route>
      </Routes>
    </div>

  );
}

export default App;
