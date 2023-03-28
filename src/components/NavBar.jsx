import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCart } from '../store/slices/cart.slice'

const NavBa = () => {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const token = localStorage.getItem('token');

  const purchase = () => {
    if (token) {

      navigate('/purchase')
    } else {
      navigate('/login')
    }
  }

  const handleShow = () => {
    if (token) {
      setShow(true)
    } else {
      navigate('/login')
    }
  }

  const user = localStorage.getItem('user')
  const dispatch = useDispatch();


  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
    dispatch(setCart([]))
  }

  return (
    <section className='navbar-container'>
      <Navbar className='navbar-all' variant="dark">
        <Container>
          <Navbar.Brand className='navbar-title' as={Link} to="/">E-commerce <i className='bx bxs-shopping-bags navbar-bags'></i></Navbar.Brand>
        </Container>
         <span className='userWelcome'>{user && `Welcome ${user}`}</span>
        <Nav className="me-auto content-detail-navbar">
          <section className='link-login'  >
            {
              user ? <Nav.Link className='purchase-navbar' onClick={logout}><i className="fa-solid fa-right-from-bracket icon-user-navbar "></i></Nav.Link> : <Nav.Link as={Link} to="/login" className='login-navbar' ><i className='bx bx-user icon-user-navbar'></i></Nav.Link>
            }

          </section>
          <section className='link-purchase'>
            <Nav.Link className='purchase-navbar' onClick={purchase} ><i className="fa-solid fa-box-archive purchase-icon"></i></Nav.Link>
          </section>
          <section className='link-car' >
            <Nav.Link className='car-navbar' onClick={handleShow} ><i className='bx bxs-cart icon-car-navbar'></i></Nav.Link>
          </section>
        </Nav>
      </Navbar>
      <Cart show={show} setShow={setShow} handleClose={handleClose}  ></Cart>

      <section className='section-navbar'>

      </section>

    </section>
  )
}

export default NavBa;