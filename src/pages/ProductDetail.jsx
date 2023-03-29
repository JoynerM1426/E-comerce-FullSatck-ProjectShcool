import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setIsLoading } from '../store/slices/isLoading.slice';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// thunk
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../store/slices/products.slice';
import { thunkCartPost } from '../store/slices/cart.slice';
// import {thunkCartGet } from '../store/slices/cart.slice'


const ProductDetail = () => {

  const { id } = useParams()
  const [detail, setDetail] = useState({})

  useEffect(() => {

    dispatch(setIsLoading(true))

    axios
      .get(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(resp => {setDetail(resp.data)})
      .catch(error => console.log(error))
      .finally(() => dispatch(setIsLoading(false)))

  }, [id])

  //Products per category
  const productRelated = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsThunk())
  }, [dispatch]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  const similarItems = productRelated?.filter((element) =>  element?.categoryId ===detail?.categoryId && detail?.id !== element?.id);

  const [input, setInput] = useState(1);
  const dispatchPostCart = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = () => {

    if (localStorage.getItem('token')) {
      const data = {
        productId: detail.id,
        quantity: input
      }
      dispatchPostCart(thunkCartPost(data));

    } else {
      navigate('/login')
    }
  }



  return (

    <Container className='col-11 conteiner  '  >

      {/* title section */}
      <div className="flex justify-content-start  align-items-center mb-5">
        
        <div style={{
          background: "var(--secondary--color)",
          borderRadius: "50%",
          height: "6px",
          margin: " 0 14px",
          width: "6px"
        }}
        ></div>
        <div style={{ fontWeight: 700}}>{detail.title}</div>
      </div>

      {/* main content */}
      <Row className='d-flex justify-content-between align-items-center' >

        {/* carrousel */}
        <Col xs={12} lg={4} className='colCarrousel'  >
          <Carousel activeIndex={activeIndex} onSelect={handleSelect} >
            {
              detail?.images?.map((element, index) => (
                <Carousel.Item key={index} >
                  <img
                    className="centered-img"
                    src={`${element.url}`}
                    alt={`img ${index}`}
                  />


                </Carousel.Item>
              ))

            }

          </Carousel>

          <div className="miniature-container">
            {
              detail?.images?.map((element, index) => (
                <img
                  key={index}
                  src={`${element.url}`}
                  alt={`img ${index}`}
                  className={`miniature ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))
            }
          </div>

        </Col>

        {/* detail */}
        <Col xs={12} lg={7} >

          <Card style={{ border: 'transparent' }}  >

            <Card.Body >

              <Card.Title style={{ marginBottom: '1.5rem' }}>{detail.title}</Card.Title>

              <Card.Text>
                {detail.description}
              </Card.Text>

              <Container className='mt-4 col-12'>


                <Row>
                  <Col className='col-6'  >
                    <h6 style={{ color: '#ababab', fontWeight: 400 }}>Precio</h6>
                    <h4 style={{ fontSize: '1.2rem' }}>${detail.price}</h4>
                  </Col>

                  <Col className="Col-6">

                    <h6 style={{ color: '#ababab', fontWeight: 400 }}>Quantity</h6>

                    <div className="quantity-box">
                      <div className="flex">
                        <button className='buttonCart' > <i className='bx bx-minus' onClick={() => setInput(input <= 1 ? 1 : input - 1)} ></i></button>
                        <div className="value">{input}</div>
                        <button className='buttonCart' variant="primary" onClick={() => setInput(input + 1)}><i className='bx bx-plus'></i></button>
                      </div>
                    </div>
                  </Col>

                </Row>

              </Container>



              <Button onClick={() => handleSubmit()} variant="primary" className='w-100 buttonAddCart' >Add to cart <i className='bx bx-cart'></i></Button>

            </Card.Body>
          </Card>


        </Col>
      </Row>

      {/* secondary content */}

      <Container className='d-flex flex-wrap col-12 justify-content-around' >

        {
          similarItems.map((element, index) =>

            <Card
              as={Link} to={`/products/${element.id}`}
              key={index}
              style={{ width: '18rem', textDecoration: 'none' }} className='mx-3 mb-3 d-flex justify-content-start'>

              <Card.Body >
                <Card.Img className='similarItemsImg similarItemsImg0' variant="top" src={`${element.images[0]}`} />
                <Card.Img className='similarItemsImg similarItemsImg1' variant="top" src={`${element.images[1]}`} />
              </Card.Body>

              <hr style={{ border: `1px solid rgba(0, 0, 0, 0.175)` }} />


              <Card.Body
                style={{ color: 'var(--text--color)' }}
                className='d-flex flex-column'
              >

                <Card.Title className='mb-3' style={{ fontFamily: 'Yantramanav,sans-serif' }}>
                  {element.title}
                </Card.Title>

                <Card.Text className='mb-1' style={{ color: "var(--text--gray)" }}>
                  Precio
                </Card.Text>

                <Card.Title style={{ fontFamily: 'Yantramanav,sans-serif' }}>{element.price}</Card.Title>

                <Button
                  variant="primary"
                  style={{ borderRadius: '50%', width: '3rem', height: '3rem' }}
                  className=' align-self-end d-flex justify-content-center  align-items-center'
                >
                  <i className='bx bx-cart'></i>
                </Button>
              </Card.Body>
            </Card>)
        }

      </Container>



    </Container >



  )


}

export default ProductDetail


