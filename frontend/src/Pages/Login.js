import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../Components/NavBar';
import { Container, Row, Col, Button, Form, Card, CardHeader, CardBody, FormGroup, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const { currentUser, login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    async function handleFormSubmit(e) {
        e.preventDefault();
    
        try {
            setLoading(true);
            await login(email, password);
            navigate("/profile");
        } catch (e) {
            alert("Email/Password is incorrect");
        }

        setLoading(false);
    }

    return (
        <Container>
        <NavBar />
        <Row className="justify-content-center mt-5">
            <Col md={6}>
            <Card>
                <CardHeader tag="h4" className="text-center">Login</CardHeader>
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
                        <Button color="primary" block
                        type = "submit"
                        disabled={loading}> 
                        Login
                        </Button>
                        <div className="flex items-center justify-between mt-3">
                        <div className="text-sm text-center">
                            Don't have an account? {" "}
                            <Link
                            to="/register"
                            className="text-blue-600 hover:underline dark:text-blue-500"
                            >
                                Register
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
};

export default Login;