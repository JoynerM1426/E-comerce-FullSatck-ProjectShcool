import React from 'react';
import axios from 'axios';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';



const Purchases = () => {

  const dispatch = useDispatch()
  let total = 0
  const [purchases, setPurchases] = useState([])
  useEffect(() => {

    dispatch(setIsLoading(true))

    axios
      .get(`${import.meta.env.VITE_API_URL}/purchases`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((resp) => { 
        console.log(resp.data);
        setPurchases(resp.data) })
      .catch((resp) => console.log(resp))
      .finally(() => dispatch(setIsLoading(false)))
  }, [])


  return (
    <div className='content-purchase'>

      <section className='section-name-purchase'>
        <Link to={"/"}
          style={{
            textDecoration: "none"
          }}>
          <h4>Home</h4> </Link>
        <div style={{
          background: "var(--secondary--color)",
          borderRadius: "50%",
          height: "6px",
          margin: "  14px",
          width: "6px"
        }}
        ></div>
        <h4>Purchases</h4>
      </section>
      <div>
        <h3 className='my-purchase'>My Purchase</h3>
      </div>

      <Table striped bordered hover>
        <thead className='head'>
          <tr>
            <th>#</th>
            <th>Of date purchases</th>
            <th>Details</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody className='body'>
          {
            purchases?.map((element, index) => {
              // console.log(element.quantity);
              total = 0
              return (
                <tr key={index}>

                  <td>{index + 1}</td>
                  <td>{element.updatedAt.slice(0, 10)}</td>

                  <td>
                    <div className='detailsProduct'>
                      {` ${element.product.title}`}
                    </div>
                  </td>

                  <td>
                    <div className='detailsProduct'>
                      {`$ ${element.product.price * element.quantity}`}
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>

      </Table>
    </div>
  );

};

export default Purchases;