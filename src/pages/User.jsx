import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';

const User = () => {

  const getDataUser = ()=>{
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/users/login`)
    .then((response)=>  console.log(response))
    .catch(error => console.log(error) )
}

useEffect(()=>{
  getDataUser()
},[])

  return (
    <div>
      <h1>users</h1>
    </div>
  );
};

export default User;