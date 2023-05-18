import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
import HttpService from "../../services/httpService";

const RegisterContainer = styled.div`
    padding-top: 150px;
    margin-right: auto;
    margin-left: auto;
`;

const RegisterPage = (props) => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [nameErrors, setNameErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const reset = () => {
        setLoading(true);
        setSubmitted(true);
        setNameErrors([]);
        setEmailErrors([]);
        setPasswordErrors([]);
        setSuccessMessage("");
        setErrorMessage("");
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        reset();
        HttpService.post(
            "register",
            {
                name: username,
                email,
                password,
            },
            false
        )
            .then((response) => {
                console.log("response", response);
                if (response.data.status.error) {
                    if (
                        Object.keys(response.data.status.validation_errors)
                            .length > 0
                    ) {
                        setErrorMessage(response.data.status.message);
                        if (response.data.status.validation_errors.name) {
                            setNameErrors(
                                response.data.status.validation_errors.name
                            );
                        }
                        if (response.data.status.validation_errors.email) {
                            setEmailErrors(
                                response.data.status.validation_errors.email
                            );
                        }
                        if (response.data.status.validation_errors.password) {
                            setPasswordErrors(
                                response.data.status.validation_errors.password
                            );
                        }
                    } else {
                        setErrorMessage(response.data.status.message);
                    }
                } else {
                    navigate("/login");
                    setSuccessMessage(response.data.status.message);
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
            <RegisterContainer>
                <Row className="justify-content-center">
                    <Col sm={12} md={8} lg={4} xl={3}>
                        {successMessage && (
                            <Alert key="success" variant="success">
                                {successMessage}
                            </Alert>
                        )}
                        {errorMessage && (
                            <Alert key="danger" variant="danger">
                                {errorMessage}
                            </Alert>
                        )}
                        <Form noValidate onSubmit={handleSubmit}>
                            <FormGroup className="mb-3" controlId="username">
                                <FormLabel>User Name</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your name"
                                    value={username}
                                    onChange={(e) => {
                                        setUserName(e.target.value);
                                    }}
                                    required
                                    isInvalid={
                                        submitted && nameErrors.length > 0
                                    }
                                />
                                <FormControl.Feedback type="invalid">
                                    {nameErrors.map((error) => (
                                        <div key={error}>{error}</div>
                                    ))}
                                </FormControl.Feedback>
                            </FormGroup>
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
                                <FormControl.Feedback type="invalid">
                                    {emailErrors.map((error) => (
                                        <div key={error}>{error}</div>
                                    ))}
                                </FormControl.Feedback>
                            </FormGroup>

                            <FormGroup className="mb-5" controlId="password">
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
                                <FormControl.Feedback type="invalid">
                                    {passwordErrors.map((error) => (
                                        <div key={error}>{error}</div>
                                    ))}
                                </FormControl.Feedback>
                            </FormGroup>
                            <Button
                                className="d-block w-100"
                                variant="primary"
                                type="submit"
                            >
                                {loading ? <Spinner size="sm" /> : "Register"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </RegisterContainer>
        </>
    );
};

export default RegisterPage;
