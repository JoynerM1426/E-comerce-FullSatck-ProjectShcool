import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import AlertSuccess from '../components/Alert'
import { useState } from 'react'

const Register = () => {

    const navigate = useNavigate()
    const [alert, setAlert] = useState(false)
    const [msg, setMsg] = useState({})
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (user) => {

        user.role = 'admin'
        axios.post(`${import.meta.env.VITE_API_URL}/users`, user)
            .then(() => {
                setMsg({
                    msg: 'Se ha registrado con éxito',
                    color: 'success'
                })
                setAlert(true)
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            })
            .catch(error => {
                setMsg({
                    msg: error.response.data.message,
                    color: 'danger'
                })
                setAlert(true)
            })
    }

    return (
        <div className='row d-flex justify-content-center'>
            <div className='col-sm-9 col-md-5 col-12'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="firstName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control {...register('firstName')} type="text" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control {...register('lastName')} type="text" placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            {...register('email')}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control {...register('phone', { required: true, minLength: 10, maxLength: 10 })} type="number" placeholder="Phone" />
                        <small className='errors'> {errors.phone && 'Phone must be 10 digits'} </small>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control {...register('password', { required: true, minLength: 8 })} type="password" placeholder="Password" />
                        <small className='errors'> {errors.password && 'Password must be 8 characters'} </small>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='col-12'>
                        Register
                    </Button>
                </Form>
                <AlertSuccess
                    isVisible={alert}
                    dismiss={() => setAlert(false)}
                    msg={msg}
                />
            </div>
        </div>
    )
}
export default Register