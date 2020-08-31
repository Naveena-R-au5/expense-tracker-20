import React,{useState,useContext, useEffect} from 'react'
import './login.css'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login =()=>{
    const {dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [show,showPass] = useState("password")
    const [sub,submit] = useState(false)
    const [err,emailError] = useState("")
    const [pas,passError] = useState("")

    // validation for input field
    const PostData =()=>{
 
       
        // email validation
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast.error("invalid email",{position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined}) 
            return
        }
        // password validation
        if(!/^(?=.{4,})/.test(password)){
            toast.warn("password must contain minimum 4 characters",{position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined})
            return
        }
        // login api
        fetch("http://localhost:5000/login",{
            method:"post",
            headers:{
                "content-Type":"application/json",
            },
            body:JSON.stringify({
                email,
                password,
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log("login",data)
            if(data.err || data.errorm){
               toast.error(` ${data.errorm || data.err}`,{position: "top-center",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined})
            console.log(data.error)
            }
            else{
                
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:"data.user"})
                history.push('/user/dashboard')
                submit(true)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    // show password toggle
    const pass=()=>{
        showPass(!show)
    }
    return(
    <>
    {/* <Navbar/> */}
       <div className="ll">
         <Card className="Card2">
             <Card.Header className="card-header2 "><h2 className="head" style={{color:"purple"}}>Welcome back!!Login here</h2> </Card.Header>
             <Card.Body className="card-body">
              <Form>
          <div className="form">
             <Form.Group controlId="formBasicEmail">
             <Form.Label><h6>Email address<span className="required">*</span></h6></Form.Label>
             <Form.Control type="email" placeholder="Enter email"
                   className="f"
                   style={{width:"150%",height:"30px",fontSize:"15px"}} 
                   value ={email}
                   onChange = {(e)=>setEmail(e.target.value)}/>
                  <p style={{ fontSize: 14, color: "red" }}>{err||""}</p>
              </Form.Group>
          <Form.Group controlId="formBasicPassword">
              <Form.Label><h6>Password<span className="required">*</span></h6></Form.Label>
              <Form.Control type={show?"password":"text"} 
                  className="f"
                  placeholder="Password"  value ={password}
                  style={{width:"150%",height:"30px",fontSize:"15px"}} 
                  onChange = {(e)=>setPassword(e.target.value)}/>
                  <p style={{ fontSize: 14, color: "red" }}>{pas||""}</p>
              </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
       <Form.Check type="checkbox" onClick={()=>pass()} 
            style={{fontSize:"16px"}} label="show password"/>
     </Form.Group>
     <Button className="submit" type="button"  
        onClick = {()=>PostData()} disabled={!email  || !password }>
        Submit
     </Button>
     <ToastContainer />
     <p className="new">New user?<Link to="/">Signup</Link></p>
     </div>
        <div className="link">
            <div>
                <i className="fa fa-user" 
                   style={{fontSize:"50px",marginTop:"50px",marginLeft:"80px"}} 
                   aria-hidden="true">
                </i>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;
                  <div style={{display:"flex",flexDirection:"column"}}>
                  <p> New user?&nbsp;&nbsp;
                  <Link to="/">Signup</Link>
                  <br/>
                  <label style={{fontSize:"15px",marginTop:0,color:"grey"}} >
                   Create an account to Create Expense,<br/> read articles and engage in our community.
                  </label>
                </p>
              </div>
             </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
    )
  }
export default Login