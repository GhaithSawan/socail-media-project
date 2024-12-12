import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navbar.css";
import { FaRegMoon } from "react-icons/fa";
import { GoQuestion } from "react-icons/go";
import { FaRegBell } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Mynavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary w-100 px-5">
      <Container fluid className='flex Navbar w-100'>
        <Link to={"/"} style={{ fontSize: "15px", width: "100%", textDecoration: "none" }}>
          <Navbar.Brand href="#" style={{ color: "#16cff8", fontSize: "20px", fontWeight: "500" }}>Social Media</Navbar.Brand>
        </Link>
        <Form className="d-flex col-4">
          <Form.Control
            type="search"
            placeholder="Search.."
            className="me-2 searchbar"
            aria-label="Search"
          />
        </Form>
        <div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px', color: "#fff", gap: "20px" }}
              navbarScroll
            >
              <Nav.Link href="#action1" style={{ color: "#fff", fontSize: "16px", fontWeight: "500" }}><FaRegMoon className='icons' />
              </Nav.Link>
              <Nav.Link href="#action2" style={{ color: "#fff", fontSize: "16px", fontWeight: "500" }}><GoQuestion className='icons' /></Nav.Link>
              <Nav.Link href="#action3" style={{ color: "#fff", fontSize: "16px", fontWeight: "500" }}><FaRegBell className='icons' /></Nav.Link>
              <NavDropdown title="User info" id="navbarScrollingDropdown" >
                <Link to={"/Profilepage"} style={{ fontSize: "15px", width: "100%", textDecoration: "none" }}>
                  <NavDropdown.Item href="#action3">My account</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action3">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action4">Log out </NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default Mynavbar;