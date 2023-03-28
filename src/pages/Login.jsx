import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import AlertDismissibleExample from '../components/Alert'
import { useEffect } from 'react'

const Login = () => {

  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (user && token) {
      navigate('/')
    }
  }, [])


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: email,
      password: password
    }

    axios.post(`${import.meta.env.VITE_API_URL}/users/login`, data)
      .then(resp => {
        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('user', resp.data.user.firstName)
        navigate("/")
      })
      .catch(error => {
        console.log(error)
        setAlert(true)
      })

  }

  return (
    <div className='row d-flex justify-content-center'>
      <div className='col-sm-9 col-md-5 col-12'>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Text id="passwordHelpBlock" muted>
            Don´t have an account yet? <Link to={'/register'} >Register</Link>
          </Form.Text>
          <Button variant="primary" type="submit" className='col-12'>
            Log In
          </Button>
        </Form>
        <AlertDismissibleExample
          isVisible={alert}
          dismiss={() => setAlert(false)}
          msg={{ msg: '¡Ha ocurrido un error!', color: 'danger' }}
        />
      </div>
    </div>
  )
}
export default Login