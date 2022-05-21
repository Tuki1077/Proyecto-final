import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button, Modal, ListGroup, Badge, CloseButton, Alert } from 'react-bootstrap'


function MyVerticallyCenteredModal(props) {
    let alert = props.posted === 1 ? <Alert variant='success'>The order was set! Thank you for your purchase.</Alert> : <Button onClick={props.handlePostCart}>Proceed to checkout</Button>
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
                    Your cart at the moment:
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
                <h4 className='text-left p-2'>Total: ${props.total}.00</h4>
            </Modal.Body>
            <Modal.Footer>
             {alert}
            </Modal.Footer>
        </Modal >
    );
}

export default function ShopNavbar(props) {

    const [modalShow, setModalShow] = React.useState(false);
    console.log(props.products);

    return (
        <>
            <Navbar bg="light" variant="light">
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
                    <Button variant="outline-primary" onClick={() => setModalShow(true)}>Cart</Button>
                </Container>
            </Navbar>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={props.products}
                total={props.total}
                handleDelete={props.handleDelete}
                handlePostCart={props.handlePostCart}
                posted={props.posted}
            />
        </>
    );
}