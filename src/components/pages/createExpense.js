import React,{useState,useEffect} from "react"
import './editpage.css'
import {useHistory,Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import create from '../../create.jpg'
import Navbar from '../navbar/nav'
import Footer from '../footer/footer'

const CreateExpense =()=>{
    const history = useHistory()
    const[amount,setAmount] = useState("")
    const[description,setDescription] = useState("")
    const[date,setDate] = useState("")
   
    const uploadfields=()=>{           
        fetch("http://localhost:5000/createExpense",{
            method:"post",
            headers:{
                "content-Type":"application/json",
                "Authorization":"Bearer"+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               amount,
               description,
               date
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                toast.error(`${data.error}`,{position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined})
                return 
            }
            else{
                toast.success('created successfully!!',{position: "top-center",
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
    

  
   
    return(
        <div>
             <Navbar/>
             <Card  className="Card7">
             <Card.Header  className="card-header2"><h2>Create Expense card</h2></Card.Header>
             <Card.Body className="card-body">
               <Form>
                  <div className="form">
                    <Form.Group controlId="formBasicName">
                         <Form.Label><h6>Amount</h6></Form.Label>
                         <Form.Control type="number" placeholder="Enter Amount"
                            style={{width:"130%",height:"30px",fontSize:"15px"}} 
                            value ={amount}
                            onChange={(e)=>setAmount(e.target.value)}/>
                    </Form.Group>
                   
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label><h6>description</h6></Form.Label>
                           <Form.Control as="textarea" rows="6" placeholder="Enter job description"
                               style={{width:"130%",fontSize:"15px"}} 
                               value ={description}
                               onChange={(e)=>setDescription(e.target.value)}/>
                    </Form.Group>


                    <Form.Group controlId="formBasicCompany">
                        <Form.Label><h6>Date</h6></Form.Label>
                           <Form.Control type="date" placeholder="Enter job expire date"
                               style={{width:"130%",height:"30px",fontSize:"15px"}} 
                               value ={date}
                               onChange={(e)=>setDate(e.target.value)}/>
                    </Form.Group>

                 
                    <Button className="submit" type="button"  
                         onClick={()=>uploadfields()} disabled={!amount || !date ||!description}>
                        Submit
                    </Button>
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
            <img src={create} alt="img" style={{width:"290px",height:"290px",fontSize:"50px",marginTop:"20px",marginLeft:"20px"}} 
               aria-hidden="true">
            </img>
           </div>&nbsp;&nbsp;&nbsp;&nbsp;
           <div style={{display:"flex",flexDirection:"column"}}>
               <label style={{fontSize:"15px",marginTop:0,color:"grey",marginLeft:"40px"}} >
                    <span style={{color:"red"}}>*</span>submitted details can edit later.
               </label>
            </div>
           </div>
                     </Form>
                </Card.Body>
            </Card>
            <Footer/>
        </div>

    )

}
export default CreateExpense