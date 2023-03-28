import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='all-footer'>

      <a className='section1-footer a-footer' href='https://www.academlo.com/'>
        <h3 className='title-footer'>© ACADEMLO 2023</h3>
      </a>
      <section className='section-icon-footer'>
        <a className='a-footer' href="https://www.instagram.com/accounts/login/">
          <i className="fa-brands fa-instagram icon-ig"></i>
        </a>
        <a className='a-footer' href="https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Fm%2Flogout%2F&trk=login_reg_redirect">
          <i className="fa-brands fa-linkedin icon-linkedin"></i>
        </a>
        <a className='a-footer' href="https://www.youtube.com/account">
          <i className="fa-brands fa-youtube icon-youTube"></i>
        </a>
      </section>

    </div>
  );
};

export default Footer;