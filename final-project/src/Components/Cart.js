import React, { Component } from "react";
import { ListGroup, Badge, Container, CloseButton } from "react-bootstrap";

class Cart extends Component {
    render() {
        const products = this.props.cartProducts;
        return (
            <Container>
                <h1 className="text-center py-3">Your shopping cart</h1>
                {console.log(products)}
                <ListGroup as="ol" numbered>
                    {products.map((product) => (
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
                            <CloseButton />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

export default Cart;