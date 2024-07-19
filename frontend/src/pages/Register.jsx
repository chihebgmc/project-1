import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { register } from '../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.authReducer
  );

  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <FormContainer>
      <h1 className="text-center mb-5">
        Account <span className="text-primary">Register</span>
      </h1>

      {isError && <Alert variant="danger">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label className="mb-3">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={e => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="mb-3">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="mb-3">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label className="mb-3">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          {isLoading && (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {isLoading ? ' waiting...' : 'Sign Up'}
        </Button>

        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Register;
