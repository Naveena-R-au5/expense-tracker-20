import React,{useState,useEffect,useContext} from 'react'
import './register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link,useHistory} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import {Button} from 'react-bootstrap'

const Register = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [conpassword,setConPassword] = useState(password)
    const [phone,setPhone] = useState("")
    const [show,showPass] = useState("password")
    const [sub,submit] = useState(false)
    const [pas,passError] = useState("")
    
    const uploadfields=()=>{
        // username validation
        if(!/^(?=.*[a-z][a-z\-0-9])(?=.)(?=.{4,})/.test(name)){
    
           toast.warn('username can contain mininum 4 characters,special characters,numbers,alphabets',{position: "top-center",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined})
           return
       }
       // email validation
       if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          
           toast.error('invalid email',{position: "top-center",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined})
           return
       }
       // password validation
       if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})/.test(password)){
           
           toast.warn('password must contain minimum 4 characters , special character ,Number and Capital letter',{position: "top-center",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined})
           return
       }
       // phone validation
       if(!/^(\d{10}$)/.test(phone)){
           
        toast.warn('enter valid Phone number',{position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined})
        return
    }
    if(conpassword !== password){
        passError("password did not match.Enter again")
    }
    else{
   // signup 
   fetch("http://localhost:5000/register",{
       method:"post",
       headers:{
           "content-Type":"application/json"
       },
       body:JSON.stringify({
           name,
           email,
           password,
           phone:phone
       })
   }).then(res=>res.json())
   .then(data=>{
       if(data.errMessage){
           toast.warn('email already exist',{position: "top-center",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined})
          return
       }
       else{
           history.push('/user/login')
           submit(true)
           toast.success(`registered successfully!`,{position: "top-center",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined})
           return
       }
      
   }).catch(err=>{
       console.log(err)
   })
}
} 

// for show password toggle 
const pass=()=>{
    showPass(!show)
}
return(
    <>
      <div className="ll">
         <Card className="Card">
         <Card.Header style={{backgroundColor:"purple"}} className="card-header2 "><h2 className="head" style={{color:"purple"}}>Welcome to Expense Tracker</h2></Card.Header>
         <Card.Body className="card-body">
           <Form>
              <div className="form">
                <Form.Group controlId="formBasicName">
                     <Form.Label><h6>Name<span className="required">*</span></h6></Form.Label>
                     <Form.Control type="text" placeholder="Enter firstname"
                        className="f"
                        style={{width:"150%",height:"30px",fontSize:"15px"}} 
                        value ={name}
                        onChange = {(e)=>setName(e.target.value)}/>
                </Form.Group>
               
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><h6>Email address<span className="required">*</span></h6></Form.Label>
                       <Form.Control type="email" placeholder="Enter email"
                           className="f"
                           style={{width:"150%",height:"30px",fontSize:"15px"}} 
                           value ={email}
                           onChange = {(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                   <Form.Label><h6>Password<span className="required">*</span></h6></Form.Label>
                       <Form.Control type={show?"password":"text"} 
                            placeholder="Password"  value ={password}
                            className="f"
                            style={{width:"150%",height:"30px",fontSize:"15px"}}
                            value={password} 
                            onChange = {(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                   <Form.Label><h6>Confirm Password<span className="required">*</span></h6></Form.Label>
                       <Form.Control type={show?"password":"text"} 
                            placeholder="Password"
                            className="f"
                            style={{width:"150%",height:"30px",fontSize:"15px"}}
                            value={conpassword} 
                            onChange = {(e)=>setConPassword(e.target.value)}/>
                </Form.Group>
                <p style={{ fontSize: 14, color: "red" }} >{pas||""}</p>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" 
                         onClick={()=>pass()} style={{fontSize:"16px"}} 
                         label="show password"/>
                </Form.Group>
                <Form.Group controlId="formBasicPhone">
                    <Form.Label><h6>Phone number<span className="required">*</span></h6></Form.Label>
                       <Form.Control type="text" placeholder="Enter Phone number"
                           className="f"
                           style={{width:"150%",height:"30px",fontSize:"15px"}} 
                           value ={phone}
                           onChange = {(e)=>setPhone(e.target.value)}/>
                </Form.Group>
             
                <Button className="submit" type="button"  
                     onClick = {()=>uploadfields()} disabled={!email || !name || !password ||!phone }>
                    Submit
                </Button><br/>
                <p className="new">Already have an account?<Link to="/user/login">Login</Link></p>
           </div>
           <ToastContainer position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover/>
           <div className="link">
           <div>
            <i className="fa fa-user" style={{fontSize:"50px",marginTop:"90px",marginLeft:"90px"}} 
               aria-hidden="true">
            </i>
           </div>&nbsp;&nbsp;&nbsp;&nbsp;
           <div style={{display:"flex",flexDirection:"column"}}>
              <p> Already a member?&nbsp;&nbsp;
                  <Link to="/user/login">Login</Link>
               <br/>
               <label style={{fontSize:"15px",marginTop:0,color:"grey"}} >
                    Sign in to track Expense,<br/> browse articles and engage in our community.
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

export default Register;