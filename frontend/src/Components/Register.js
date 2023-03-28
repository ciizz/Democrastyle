import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card, CardHeader, CardBody, FormGroup, Label, Input} from 'reactstrap';
import NavBar from '../Components/NavBar';

export default function Register() {
    const navigate = useNavigate();

    const { currentUser, register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
        navigate("/");
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
        navigate("/Profile");
        } catch (e) {
        alert("Failed to register");
        }

        setLoading(false);
    }

    return (
    //     <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    //     <div className="max-w-md w-full space-y-8">
    //         <div>
    //         <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
    //             Register your account
    //         </h2>
    //         </div>
    //         <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
    //         <div className="rounded-md shadow-sm -space-y-px">
    //             <div>
    //             <input
    //                 id="email-address"
    //                 name="email"
    //                 type="email"
    //                 autoComplete="email"
    //                 required
    //                 className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
    //                 placeholder="Email address"
    //                 onChange={(e) => setEmail(e.target.value)}
    //             />
    //             </div>
    //             <div>
    //             <input
    //                 id="password"
    //                 name="password"
    //                 type="password"
    //                 autoComplete="current-password"
    //                 required
    //                 className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
    //                 placeholder="Password"
    //                 onChange={(e) => setPassword(e.target.value)}
    //             />
    //             </div>
    //             <div>
    //                 <input
    //                 id="confirmPassword"
    //                 name="confirmPassword"
    //                 type="password"
    //                 autoComplete="current-password"
    //                 required
    //                 className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
    //                 placeholder="Password"
    //                 onChange={(e) => setConfirmPassword(e.target.value)}
    //             />
    //             </div>
    //             <div>
    //                 <input
    //                 id="displayName"
    //                 name="displayName"
    //                 type="text"
    //                 required
    //                 className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
    //                 placeholder="Display Name"
    //                 onChange={(e) => setDisplayName(e.target.value)}
    //             />
    //             </div>
                
    //         </div>
    //         <div>
    //             <button
    //             type="submit"
    //             className=" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-800 hover:bg-sky-900"
    //             disabled={loading}
    //             >
    //             Register
    //             </button>
    //         </div>
    //         <div className="flex items-center justify-between">
    //             <div className="text-sm">
    //             <Link
    //                 to="/login"
    //                 className="text-blue-600 hover:underline dark:text-blue-500"
    //             >
    //                 Already have an account? Login
    //             </Link>
    //             </div>
    //         </div>
    //         </form>
    //     </div>
    //     </div>
    // );
    <Container>
      <NavBar />
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
                type = "submit"
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