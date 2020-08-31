import React,{useEffect,createContext,useReducer,useContext, useState} from 'react';
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Register from './components/auth/register'
import Login from './components/auth/login'
import CreateExpense from './components/pages/createExpense'
import Dashboard from './components/pages/dashboard'
import EditExpense from './components/pages/editExpense'
import {reducer,initialState} from './reducer/state'

export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  const [User,setUsers] = useState([])
  console.log("st",User)
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    setUsers(user)
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      if(!history.location.pathname.startsWith('/user'))
      history.push('/')
    }
  },[])
  return(
    <Switch>
       <Route exact path="/">
        <Register />
      </Route>
      <Route  path="/user/login">
        <Login />
      </Route>
      <Route  path="/user/create">
        <CreateExpense />
      </Route>
      <Route  path="/user/dashboard">
        <Dashboard />
      </Route>
      <Route path="/Expense/edit/:id">
        <EditExpense/>
      </Route>
      
   
   </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}} >
     <BrowserRouter>
      <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
 }

export default App;
