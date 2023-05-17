import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "../Spinner/Spinner";
import { Header, Container, JustifyCenter, formButton } from "./style";
import HttpService from "../../services/httpService";

const Register = (props) => {
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
        props.setProgress(15);
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
                props.setProgress(70);
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
                    setSuccessMessage(response.data.status.message);
                }
                setLoading(false);
                props.setProgress(100);
            })
            .catch((error) => {
                setErrorMessage(
                    `Internal Server Error: ${error.response.data.status.message}`
                );
                setLoading(false);
                props.setProgress(100);
            });
    };
    return (
        <>
            <Header>Register</Header>
            {loading && <Spinner />}
            <Container>
                <Row style={JustifyCenter}>
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
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicName"
                            >
                                <Form.Control
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
                                <Form.Control.Feedback type="invalid">
                                    {nameErrors.map((error) => (
                                        <div key={error}>{error}</div>
                                    ))}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Control
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
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Control
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
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                style={formButton}
                            >
                                Create Account
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Register;
