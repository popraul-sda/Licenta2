import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {toast, ToastContainer} from "react-toastify";

export function AddProduct({categ}){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Category');
    const [image, setImage] = useState('');

    let categories = categ;

    function saveProduct(){
        if (name === '' || description === '' || price === '' || category === 'Category' || image === '')
        {
            toast("Complete all the details for the new product!")
        }
        else {
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
                    "category": category,
                    "image": image
                })
            })
                .then(res => null)

            toast("Product added");
        }
    }

    return (
      <>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
              <Form.Control
                  aria-label="Name"
                  aria-describedby="basic-addon1"
                  value={name}
                  onChange={e => setName(e.target.value)}
              />
          </InputGroup>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
              <Form.Control
                  aria-label="Description"
                  aria-describedby="basic-addon1"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
              />
          </InputGroup>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Price</InputGroup.Text>
              <Form.Control
                  aria-label="Price"
                  aria-describedby="basic-addon1"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
              />
          </InputGroup>
          <DropdownButton id="dropdown-basic-button" title={category}>
              {
                  categories.map(item => <Dropdown.Item key={item.id} onClick={() => setCategory(item.name)}>{item.name}</Dropdown.Item>)
              }
          </DropdownButton>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Image</InputGroup.Text>
              <Form.Control
                  aria-label="Image"
                  aria-describedby="basic-addon1"
                  value={image}
                  onChange={e => setImage(e.target.value)}
              />
          </InputGroup>
          <Button
              variant="primary"
              className="save-product"
              style={{ marginBottom: '100px' }}
              onClick={() => saveProduct()}
          >Save Product</Button>{' '}
          <ToastContainer />
      </>
    );
}