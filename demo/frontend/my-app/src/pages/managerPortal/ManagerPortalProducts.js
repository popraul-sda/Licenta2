import {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import "../../styles/App.css";
import "../../styles/managerPortalProducts.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AddProduct} from "./AddProduct";
import DropdownItem from "react-bootstrap/DropdownItem";

export function ManagerPortalProducts() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [add, setAdd] = useState(false);

    useEffect(() => {
        getCategories();
        getProducts();
        sortProducts();
    }, []);

    function sortProducts(){
        products.sort((a, b) => {
            if (a.active === b.active) {
                return 0;
            } else if (a.active === 'Active') {
                return -1;
            } else {
                return 1;
            }
        });
    }

    function getCategories() {
        fetch('http://localhost:8080/categories', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            method: "GET"
        })
            .then(function (response) {
                return response.json();
            }).then(function (data) {
            setCategories(data)
        })
    }

    function getProducts() {
        fetch('http://localhost:8080/products', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            method: "GET"
        })
            .then(function (response) {
                return response.json();
            }).then(function (data) {
            setProducts(data)
        })
    }

    // function removeProduct(id) {
    //     let path = 'http://localhost:8080/products/' + id;
    //
    //     const updatedProducts = products.filter(product => product.id !== id);
    //     setProducts(updatedProducts);
    //
    //     fetch(path, {
    //         method: 'DELETE',
    //         headers: {
    //             'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    //         }
    //     })
    //         .then(res => console.log(res))
    //
    //     toast("Product Removed");
    //
    // }

    function updateProduct(id, name, description, price, category, image, active) {

        let path = 'http://localhost:8080/products/' + id;

        fetch(path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                "name": name,
                "description": description,
                "price": price,
                "category": category,
                "image": image,
                "active": active
            })
        })
            .then(res => null)

        window.location.reload();
    }

    return (
        <div className="product-container">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Description</th>
                    <th>Product Category</th>
                    <th>Product Image</th>
                    <th>Product Status</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>
                            <input
                                type="text"
                                value={product.name}
                                onChange={(event) => {
                                    const updatedProducts = products.map((p) => {
                                        if (p.id === product.id) {
                                            return {...p, name: event.target.value};
                                        } else {
                                            return p;
                                        }
                                    });
                                    setProducts(updatedProducts);
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={product.price}
                                onChange={(event) => {
                                    const updatedProducts = products.map((p) => {
                                        if (p.id === product.id) {
                                            return {...p, price: event.target.value};
                                        } else {
                                            return p;
                                        }
                                    });
                                    setProducts(updatedProducts);
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={product.description}
                                onChange={(event) => {
                                    const updatedProducts = products.map((p) => {
                                        if (p.id === product.id) {
                                            return {...p, description: event.target.value};
                                        } else {
                                            return p;
                                        }
                                    });
                                    setProducts(updatedProducts);
                                }}
                            />
                        </td>
                        <td>
                            <DropdownButton id="dropdown-basic-button" title={product.category}>
                                {
                                    categories.map(item =>
                                        <Dropdown.Item key={item.id}
                                                       value={product.category}
                                                       onClick={(event) => {
                                                           const updatedProducts = products.map((p) => {
                                                               if (p.id === product.id) {
                                                                   return {...p, category: item.name};
                                                               } else {
                                                                   return p;
                                                               }
                                                           });
                                                           setProducts(updatedProducts);
                                                       }}>
                                            {item.name}
                                        </Dropdown.Item>)
                                }
                            </DropdownButton>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={product.image}
                                onChange={(event) => {
                                    const updatedProducts = products.map((p) => {
                                        if (p.id === product.id) {
                                            return {...p, image: event.target.value};
                                        } else {
                                            return p;
                                        }
                                    });
                                    setProducts(updatedProducts);
                                }}
                            />
                        </td>
                        <td>
                            <DropdownButton id="dropdown-basic-button" title={product.active}>
                                <DropdownItem onClick={(event) => {
                                    const updatedProducts = products.map((p) => {
                                        if (p.id === product.id) {
                                            return {...p, active: "Active"};
                                        } else {
                                            return p;
                                        }
                                    });
                                    setProducts(updatedProducts);
                                }}>
                                    Active
                                </DropdownItem>
                                <DropdownItem onClick={(event) => {
                                    const updatedProducts = products.map((p) => {
                                        if (p.id === product.id) {
                                            return {...p, active: "Inactive"};
                                        } else {
                                            return p;
                                        }
                                    });
                                    setProducts(updatedProducts);
                                }}>
                                    Inactive
                                </DropdownItem>
                            </DropdownButton>
                        </td>
                        <td>
                            <Button variant="primary"
                                    onClick={() => updateProduct(product.id, product.name, product.description, product.price, product.category, product.image, product.active)}>Save</Button>{' '}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant="primary" className="add-product" onClick={() => setAdd(!add)}>Add Product</Button>{' '}
            {
                add ? <AddProduct categ={categories}/> : null
            }
            <ToastContainer/>
        </div>
    );
}