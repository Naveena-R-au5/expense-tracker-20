import React,{useState,useEffect,useContext} from 'react';
import './dashboard.css'
import ReactTimeAgo from 'react-time-ago'
import {useParams,Link} from 'react-router-dom'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Card from 'react-bootstrap/Card'
import {UserContext} from '../../App'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Navbar from '../navbar/nav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../footer/footer'

JavascriptTimeAgo.addLocale(en)
const ExpenseList=()=>{
    const [post,setPosts] = useState("")
    const {state,dispatch} =useContext(UserContext)
    const [show, setShow] = useState(false);
    const {id} = useParams()
    useEffect(()=>{
    fetch('http://localhost:5000/myposts',{
    methos:"get",
    headers:{
        "Authorization":"Bearer"+localStorage.getItem("jwt")
    }
}).then(res=>res.json())
.then(result=>{
    // console.log("mypics",result)
    setPosts(result.mypost)
})
}
,[post])

const deletepost = (id) =>{
    fetch(`http://localhost:5000/deleteExpense/${id}`,{
        method:"delete",
        headers:{
            "Authorization":"Bearer"+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result =>{
        console.log(result)
        const newData = post.filter(item =>{
            return item._id !== result._id
        })
        toast.success('deleted successfully!!',{position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined})
        setPosts(newData)
        
    })
}



    return(
        <div>
            <Navbar/>
            <div className="p">
            <Card.Header  className="cardpost4"><h4>List of Expenses</h4></Card.Header>
                {post.length !==0?post.map(data=> {return(
            <Card className="cardpost2">
                   <div className="detailspost">
                   <h5 className="font"><i class="picons fa fa-credit-card" aria-hidden="true">&nbsp;&nbsp;{data.amount}&nbsp;rupees</i><span style={{fontWeight:"normal"}}></span></h5>
                   <h5 className="font"><i class="picons fa fa-list-alt" aria-hidden="true">&nbsp;&nbsp;{data.description}</i></h5>
                   <h5 className="font"><i className="picons fa fa-clock-o" aria-hidden="true">&nbsp;&nbsp;{data.date.split('T')[0]}</i></h5>
                   <label>posted  <ReactTimeAgo style={{color:"grey",fontWeight:"normal"}} date={data.createdAt}/></label>
                   
                  
                   <Card.Footer className="footer">
                     <Card.Link className="edit"><Link to={data._id?"/Expense/edit/"+ data._id:"/Expense/edit"} className="edit"><i class="picon fa fa-pencil-square-o" aria-hidden="true"></i>Edit</Link> </Card.Link>
                     <Card.Link className="delete"><Link onClick={()=>deletepost(data._id?data._id:"")} className="delete"><i class="picon fa fa-trash-o" aria-hidden="true"></i>Delete</Link></Card.Link>
                   </Card.Footer>
                </div>
            </Card>
            )}):<div className="no" style={{marginTop:"40%",marginLeft:"70%"}}><h4>No Expense created.<Link to="/user/create">Click here</Link></h4></div>}
            </div>
            <ToastContainer />
            <Footer/>
        </div>
    )
}
export default ExpenseList;