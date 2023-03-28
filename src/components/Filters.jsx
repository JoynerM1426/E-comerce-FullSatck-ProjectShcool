import React from "react";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProductsThunk, filterCategoriesThunk, getFilterPrice } from '../store/slices/products.slice';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import Accordion from 'react-bootstrap/Accordion';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { Col, Button } from 'react-bootstrap'


const Filters = () => {
  const dispatch = useDispatch()
  const [categorie, setCategorie] = useState([]);
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((resp) => setCategorie(resp.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 1500);
      });
    dispatch(getProductsThunk());
  }, []);
  const submit = (data) => {
    dispatch(getFilterPrice(data))
  }

  return (
    < div>
      <div className='filtersPrice'>
        <Accordion defaultActiveKey="0" >
          <Accordion.Item eventKey="0" className='border-0'>
            <Accordion.Header className='w-auto shadow mb-1 bg-white text-dark border-bottom-dark rounded' variant="success" id="dropdown-basic" style={{ width: '200px' }}>Price</Accordion.Header>
            <Accordion.Body className='w-auto' show='onToggle' style={{ width: '200px' }}>
              <Form onSubmit={handleSubmit(submit)} >
                <Form.Group className="mb-3" controlId="formBasicPriceOne">
                  <Form.Label>From</Form.Label>
                  <Form.Control type="number" {...register("priceOne")} defaultValue={1000} />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPriceTwo">
                  <Form.Label>To</Form.Label>
                  <Form.Control type="number" {...register("priceTwo")} defaultValue={2000} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Filter Price
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className='filtersCategorie'>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0" className='border-0'>
            <Accordion.Header className='w-auto shadow mb-1 bg-white text-dark border-bottom-dark rounded' variant="success" id="dropdown-basic" style={{ width: '200px' }}>Category</Accordion.Header>
            <Accordion.Body className='w-auto' show='onToggle' style={{ width: '200px' }}>
              {categorie.map((category, index) => (
                <Col key={index}>
                  <Button
                    style={{ fontWeight: "normal" }}
                    variant="ligth"
                    onClick={() => dispatch(filterCategoriesThunk(category.id))}>
                    {category.name}
                  </Button>
                </Col>
              ))}
              <Col>
                <Button
                  style={{ fontWeight: "normal" }}
                  variant="ligth"
                  onClick={() => dispatch(getProductsThunk())}>All Products
                </Button>
              </Col>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>

  );
};

export default Filters;
