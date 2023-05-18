import { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    FormLabel,
    FormControl,
    Alert,
    Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HttpService from "../../services/httpService";
import AuthContext from "../../context/AuthContext";

const LoginContainer = styled.div`
    padding-top: 150px;
    margin-right: auto;
    margin-left: auto;
`;

const RegisterLink = styled(Link)`
    color: blue;
    font-family: emoji;
    font-weight: bold;
    font-size: 20px;
    text-decoration: underline;

    &:hover {
        color: red;
        text-decoration: underline;
    }
`;

const LoginPage = (props) => {
    const { setToken } = useContext(AuthContext);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailErrors, setEmailErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const navigate = useNavigate();

    const reset = () => {
        setLoading(true);
        setSubmitted(true);
        setEmailErrors([]);
        setPasswordErrors([]);
        setErrorMessage("");
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        reset();
        HttpService.post(
            "login",
            {
                email,
                password,
            },
            false
        )
            .then((response) => {
                console.log("response", response);
                if (response.data.status.error) {
                    setErrorMessage(response.data.status.message);
                } else {
                    setToken(response.data.data.token);
                    localStorage.setItem("token", response.data.data.token);
                    localStorage.setItem(
                        "preferred_authors",
                        response.data.data.user.preferred_authors
                    );
                    localStorage.setItem(
                        "preferred_categories",
                        response.data.data.user.preferred_categories
                    );
                    localStorage.setItem(
                        "preferred_sources",
                        response.data.data.user.preferred_sources
                    );
                    navigate("/");
                }
                setLoading(false);
            })
            .catch((error) => {
                setErrorMessage(
                    `Internal Server Error: ${error.response.data.status.message}`
                );
                setLoading(false);
            });
    };
    return (
        <>
            <LoginContainer>
                {/* <h2 className="text-center text-light py-3">Login</h2> */}
                <Row className="justify-content-center">
                    <Col sm={12} md={8} lg={4} xl={3}>
                        {errorMessage && (
                            <Alert key="danger" variant="danger">
                                {errorMessage}
                            </Alert>
                        )}
                        <Form noValidate onSubmit={handleSubmit}>
                            <FormGroup className="mb-3" controlId="email">
                                <FormLabel>Email</FormLabel>
                                <FormControl
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                    isInvalid={
                                        submitted && emailErrors.length > 0
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {emailErrors.map((error) => (
                                        <div key={error}>{error}</div>
                                    ))}
                                </Form.Control.Feedback>
                            </FormGroup>

                            <FormGroup className="mb-3" controlId="password">
                                <FormLabel>Password</FormLabel>
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                    isInvalid={
                                        submitted && passwordErrors.length > 0
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {passwordErrors.map((error) => (
                                        <div key={error}>{error}</div>
                                    ))}
                                </Form.Control.Feedback>
                            </FormGroup>
                            <div className="text-center my-3">
                                <RegisterLink to="/register">
                                    Click Here to Register!
                                </RegisterLink>
                            </div>
                            <Button
                                variant="primary"
                                type="submit"
                                className="d-block w-100"
                            >
                                {loading ? <Spinner size="sm" /> : "LogIn"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </LoginContainer>
        </>
    );
};

export default LoginPage;
