import React,{useState,useContext, useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import './footer.css'
import Modal from 'react-bootstrap/Modal'

const Navbar =()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const [User,setUsers] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
         <div className="footericon">
             <Nav>
                <Nav.Item >
                    <Nav.Link href="/user/create"><i className="resp fa fa-plus-square" aria-hidden="true"></i></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/user/dashboard"><i className="resp fa fa-home" aria-hidden="true"></i></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleShow}><i className="resp fa fa-sign-out" aria-hidden="true"></i></Nav.Link>
                </Nav.Item>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                   <Modal.Body>
                       <h5><span style={{color:"blue"}}>{state?state.name:""}</span>,want to logout?</h5>
                   </Modal.Body>
               <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                       Close
                    </Button>
                    <Button variant="primary" onClick={()=>{localStorage.clear()
                         dispatch({type:"CLEAR"})
                         history.push('/user/login')
                    }}>
                     Logout
                    </Button>
              </Modal.Footer>
            </Modal>
                
            </Nav>
         </div>
    )
}


export default Navbar;