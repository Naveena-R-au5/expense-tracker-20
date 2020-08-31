import React,{useState,useEffect,useContext} from "react"
import './editpage.css'
import {useHistory,Link,useParams} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import {UserContext} from '../../App'
import Navbar from '../navbar/nav'
import edit from '../../edit.png'
import Footer from '../footer/footer'



const CreateExpense =()=>{
    const history = useHistory()
    const[pp,setPost] = useState([])
    const[amount,setAmount] = useState("" || pp.amount)
    const {state,dispatch} =useContext(UserContext)
    const[description,setDescription] = useState("" || pp.description)
    const[date,setDate] = useState("" || pp.date)
    const {id} = useParams()

    fetch(`http://localhost:5000/expense/${id}`,{
        methos:"get",
        headers:{
            "Authorization":"Bearer"+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log("mypicsgg",result)
        setPost(result.posts)
    })
   
    const editExpense =()=>{

        fetch(`http://localhost:5000/updateExpense/${id}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer"+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                amount,
                description,
                date
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log("update",data)
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
                dispatch({type:"UPDATE_EXPENSE",payload:
                              { amount:data.amount,
                                description:data.description,
                                date:data.date
                            }})
                // localStorage.setItem("data",JSON.stringify(data))
                history.push('/user/dashboard')
                toast.success('updated successfully!!',{position: "top-center",
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
            // M.toast({html:data.error,classes:"#b71c1c red darken-4"})
        })
    }
    return(
        <div>
            <Navbar/>
             <Card className="Card7">
             <Card.Header  className="card-header2"><h2>Edit Expense details</h2></Card.Header>
             <Card.Body className="card-body">
               <Form>
                  <div className="form">
                    <Form.Group controlId="formBasicName">
                         <Form.Label><h6>Amount</h6></Form.Label>
                         <Form.Control type="number" placeholder="Enter Title"
                            style={{width:"130%",height:"30px",fontSize:"15px"}} 
                            value ={amount}
                            placeholder={pp.amount}
                            onChange={(e)=>setAmount(e.target.value)}/>
                    </Form.Group>
                   
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label><h6>description</h6></Form.Label>
                           <Form.Control as="textarea" rows="6" placeholder="Enter job description"
                               style={{width:"130%",fontSize:"15px",textAlign:"start"}} 
                               value ={description}
                               placeholder={pp.description}
                               onChange={(e)=>setDescription(e.target.value)}/>
                    </Form.Group>


                    <Form.Group controlId="formBasicCompany">
                        <Form.Label><h6>Date</h6></Form.Label>
                           <Form.Control type="date" placeholder="Enter job expire date"
                               style={{width:"130%",height:"30px",fontSize:"15px"}} 
                               value ={date}
                               placeholder={pp.date}
                               onChange={(e)=>setDate(e.target.value)}/>
                    </Form.Group>

                 
                    <Button className="submit" type="button" disabled={!amount || !description ||!date} 
                         onClick={()=>editExpense()}>
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
            <img src={edit} alt="img" style={{width:"290px",height:"290px",fontSize:"50px",marginTop:"20px",marginLeft:"20px"}} 
               aria-hidden="true">
            </img>
           </div>&nbsp;&nbsp;&nbsp;&nbsp;
           <div style={{display:"flex",flexDirection:"column"}}>
               <label style={{fontSize:"15px",marginTop:0,color:"grey",marginLeft:"50px"}} >
                    <span style={{color:"red"}}>*</span>Please fill all the fields.
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