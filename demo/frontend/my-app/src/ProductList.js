import {useEffect, useState} from "react";
import "./useless/index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export function ProductList(){

    const [products, setProducts] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        async function getData(){
            fetch('http://localhost:8080/products')
                .then(res => res.json())
                .then(data => setProducts(data))
        }

        getData();
    }, []);

    const handleRoute = (productData) =>{
        let path = "/products/" + productData.id;
        navigate(path, {state:{id:productData.id, name: productData.name, desc: productData.description}});
    }

    //adauga produsul Salata Cesar o singura data
    //trebuie un niste fielduri pentru datele unui produs nou care se va introduce
    const addProduct = () =>{
        fetch('http://localhost:8080/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": "Salata Caesar",
                "description": "ingrediente",
                "price": "27",
                "category": "BUC"
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
        })
            .then(res => res.json())
            .then(data => setProducts(data))
    }

    return (
        <>
            <div>
                <Button variant="primary" onClick={addProduct}>Add</Button>{' '}
            </div>
            <div className="main-container">
                {products.map((product) => {
                    return <div>
                        <div className="small-container-green" onClick={() => handleRoute(product)}>
                            {product.name}
                        </div>
                        <Button variant="primary" onClick={() => deleteProduct(product.id)}>Delete</Button>{' '}
                    </div>
                })}
            </div>
        </>
    );
}