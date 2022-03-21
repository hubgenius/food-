import React from 'react'
import {Navbar,Container,Offcanvas,Nav,Form,FormControl,Button} from 'react-bootstrap'
function Menu() {
  return (
    <div>
        <Navbar bg="light" expand={false}>
  <Container fluid>
    <Navbar.Brand href="#">Food Shop</Navbar.Brand>
    <Navbar.Toggle aria-controls="offcanvasNavbar" />
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
        <Nav.Link href="/Table">food List</Nav.Link>
          <Nav.Link href="/User">User List</Nav.Link>
          <Nav.Link href="/Profile">My Profile</Nav.Link>
           
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>
    </div>
  )
}

export default Menu