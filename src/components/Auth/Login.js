import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import {
  Header, Container, JustifyCenter, formButton
} from './style';
import HttpService from '../../services/httpService';

const Login = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();
  const reset = () => {
    setLoading(true);
    setSubmitted(true);
    setEmailErrors([]);
    setPasswordErrors([]);
    setErrorMessage('');
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.setProgress(15);
    reset();
    HttpService.post(
      'login',
      {
        email,
        password
      },
      false
    ).then((response) => {
      console.log('response', response);
      props.setProgress(70);
      if (response.data.status.error) {
        setErrorMessage(response.data.status.message);
      } else {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('preferred_authors', response.data.data.user.preferred_authors);
        localStorage.setItem('preferred_categories', response.data.data.user.preferred_categories);
        localStorage.setItem('preferred_sources', response.data.data.user.preferred_sources);
        props.setLoggedIn(true);
        setTimeout(() => {
          navigate('/');
        }, 300);
      }
      setLoading(false);
      props.setProgress(100);
    }).catch((error) => {
      setErrorMessage(`Internal Server Error: ${error.response.data.status.message}`);
      setLoading(false);
      props.setProgress(100);
    });
  };
  return (

    <>
      <Header>
        Login
      </Header>
      <Container>
        <Row style={JustifyCenter}>
          <Col
            sm={12}
            md={8}
            lg={4}
            xl={3}
          >

            {errorMessage && (
              <Alert key="danger" variant="danger">
                {errorMessage}
              </Alert>
            )}
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); }}
                  required
                  isInvalid={submitted && emailErrors.length > 0}
                />
                <Form.Control.Feedback type="invalid">
                  {
                    emailErrors.map((error) => (
                      <div key={error}>
                        {error}
                      </div>
                    ))
                  }
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); }} required isInvalid={submitted && passwordErrors.length > 0} />
                <Form.Control.Feedback type="invalid">
                  {
                    passwordErrors.map((error) => (
                      <div key={error}>
                        {error}
                      </div>
                    ))
                  }
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" style={formButton}>
                Login
              </Button>
            </Form>
          </Col>
        </Row>

      </Container>
    </>
  );
};

export default Login;
