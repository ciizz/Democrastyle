import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { Container } from "react-bootstrap";

export default function Logout() {
  const navigate = useNavigate();

  const { logout } = useAuth(); 

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch {
        console.log("Failed to logout");
    }
  }

  return (
    <Container>
        <button
            type="button"
            onClick={handleLogout}
        >
            Logout
        </button>
    </Container>
  );
}