import {useEffect, useState} from "react";
import "../styles/index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export function ProductList(){

    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        async function getData(){
            fetch('http://localhost:8080/products', {
                headers: {
                    'Authorization':'Bearer ' + sessionStorage.getItem('token')
                },
                method: "GET"
            })
                .then(function(response){
                    return response.json();
                }).then(function(data) {
                setProducts(data)
            })
        }

        getData();
    }, []);

    const handleRoute = (productData) =>{
        let path = "/products/" + productData.id;
        navigate(path, {state:{id:productData.id, name: productData.name, desc: productData.description}});
    }

    const addProduct = () =>{
        fetch('http://localhost:8080/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
                'Authorization':'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                "name": name,
                "description": description,
                "price": price,
                "category": category
            })
        })
            .then(res => res.json())
            .then(data => setProducts(data))
    }

    //nu merge
    const deleteProduct = (id) =>{

        let path = 'http://localhost:8080/products/' + id;

        fetch(path, {
            method: 'DELETE',
            headers: {
                'Authorization':'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }

    return (
        <>
            <div className="main-container">
                {products.map((product) => {
                    return <div>
                        <div className="small-container-green">
                            <p onClick={() => handleRoute(product)}>{product.name}</p>
                            <Button variant="primary" onClick={() => deleteProduct(product.id)}>Delete</Button>{' '}
                        </div>
                    </div>
                })}
                <div className="add-container">
                    <Button variant="primary" onClick={addProduct}>Add</Button>{' '}
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="Description"
                            aria-label="Description"
                            aria-describedby="basic-addon1"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="Price"
                            aria-label="Price"
                            aria-describedby="basic-addon1"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="Category"
                            aria-label="Category"
                            aria-describedby="basic-addon1"
                            value={category}
                            onChange={e => (setCategory(e.target.value))}
                        />
                    </InputGroup>
                </div>
            </div>
        </>
    );
}