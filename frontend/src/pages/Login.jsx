import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { login } from '../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, isLoading, isError, message } = useSelector(
    state => state.authReducer
  );

  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <FormContainer>
      <h1 className="text-center mb-5">
        Account <span className="text-primary">Login</span>
      </h1>

      {isError && <Alert variant="danger">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
          {isLoading ? ' waiting...' : 'Sign In'}
        </Button>

        <Row className="py-3">
          <Col>
            New User? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Login;
