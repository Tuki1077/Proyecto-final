import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button, Modal, ListGroup, Badge, CloseButton } from 'react-bootstrap'


function MyVerticallyCenteredModal(props) {
    console.log(props.data);
    return (
        < Modal
            {...props}
            size="lg"
            arialabelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Shopping Cart
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup as="ol" numbered>
                    {props.data.map((product, index) => (
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{product.title}</div>
                                {product.description}
                            </div>
                            <Badge bg="primary" pill>
                                $.{product.price}.00
                            </Badge>
                            <CloseButton onClick={(e) => props.handleDelete(index)} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <h4 className='text-left p-2'>Cart total: ${props.total}.00</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button>Proceed to checkout</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default function ShopNavbar(props) {

    const [modalShow, setModalShow] = React.useState(false);
    console.log(props.products);

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Shopping App</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Categories" id="navbarScrollingDropdown">
                            {props.categories.map((category) => (
                                <NavDropdown.Item href={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                    <Button variant="outline-light" onClick={() => setModalShow(true)}>Cart</Button>
                </Container>
            </Navbar>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={props.products}
                total={props.total}
                handleDelete={props.handleDelete}
            />
        </>
    );
}