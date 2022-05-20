import React, { Component } from "react";
import axios from 'axios';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';

class ProductCatalog extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            category: '',
            error: '',
            limit: -1
        }
    }
    fetch = async (category = '') => {
        const skip = Math.floor(Math.random() * (100))
        let url = category !== '' ? `https://dummyjson.com/products/category/${category}` : `https://dummyjson.com/products?limit=35&skip=${skip}&select=title,description,price,images`;
        if (category !== '') {
            this.setState({ category: category })
        }
        try {
            const response = await axios.get(url);
            const allProducts = response.data.products;
            const limit = response.data.limit;
            this.setState({ products: allProducts, limit: limit })
        }
        catch (error) {
            this.setState({ error: error })
        }
    }
    componentDidMount() {
        this.fetch(
            this.props.category
        );
    };
    render() {
        let heading = this.state.category !== '' ? <h1 className="text-center py-3">{this.state.category.charAt(0).toUpperCase() + this.state.category.slice(1)}</h1> : <h1 className="text-center py-3">Popular products</h1>
        return (
            <Container>
                {heading}
                <Row xs={1} md={5} className='g-4'>
                    {this.state.products.map((product) =>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={product.images[0]} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Subtitle>${product.price}.00</Card.Subtitle>
                                    <Card.Text>
                                        {product.description}
                                    </Card.Text>
                                    <div className='text-center'>
                                        <Button variant='dark' onClick={e => this.props.handleAddToCart(product)}>Add to cart</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        );
    }
}

export default ProductCatalog;