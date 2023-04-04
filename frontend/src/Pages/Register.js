import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card, CardHeader, CardBody, FormGroup, Label, Input } from 'reactstrap';

function Register() {
    const navigate = useNavigate();

    const { currentUser, register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    async function handleFormSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            setLoading(true);
            await register(email, password, displayName);
            navigate("/profile");
        } catch (e) {
            alert("Failed to register");
        }

        setLoading(false);
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card>
                        <CardHeader tag="h4" className="text-center">Register</CardHeader>
                        <CardBody>
                            <Form onSubmit={handleFormSubmit}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="confirmPassword">Confirm Password</Label>
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="displayName">Display Name</Label>
                                    <Input
                                        type="text"
                                        name="displayName"
                                        id="displayName"
                                        placeholder="Enter your display name"
                                        value={displayName}
                                        onChange={e => setDisplayName(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <Button color="primary" block
                                    type="submit"
                                    disabled={loading}>
                                    Register
                                </Button>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="text-sm text-center">
                                        Already have an account?{" "}
                                        <Link
                                            to="/login"
                                            className="text-blue-600 hover:underline dark:text-blue-500"
                                        >
                                            Login
                                        </Link>
                                    </div>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;