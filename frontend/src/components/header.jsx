import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Header = () => {
  return (
    <Navbar expand="lg" bg="primary">
      <Container>
        <Navbar.Brand className="text-white">React Test App</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
