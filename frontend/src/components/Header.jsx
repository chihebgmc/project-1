import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../redux/actions/authActions';

const Header = () => {
  const { user } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>My App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user ? (
              <Nav className="ms-auto">
                <Button
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <FaSignOutAlt />
                  Logout
                </Button>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <LinkContainer to="/login">
                  <Nav.Link
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FaSignInAlt /> <span className="px-2">Sign In</span>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FaUser /> <span className="px-2">Sign Up</span>
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
