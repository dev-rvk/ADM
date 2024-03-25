import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header({ networkId }) {
  return (
    <Navbar expand="lg" className="bg-dark text-light"> {/* Added bg-dark for black background and text-light for white text */}
      <Container>
        <Navbar.Brand href="#home" className="text-light">ADM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="text-light">
              Netwrok ID: <a href="#login" className="text-light">{networkId}</a> {/* Added text-light for white text */}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
