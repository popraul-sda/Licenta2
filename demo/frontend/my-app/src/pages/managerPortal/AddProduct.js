import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {toast, ToastContainer} from "react-toastify";
import '../../styles/managerPortalProducts.css';
import DropdownItem from "react-bootstrap/DropdownItem";

export function AddProduct({categ}){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Category');
    const [active, setActive] = useState('Active');
    const [selectedImage, setSelectedImage] = useState(null);

    let categories = categ;

    async function saveProduct() {
        if (name === '' || description === '' || price === '' || category === 'Category') {
            toast("Complete all the details for the new product!");
        } else {
            try {
                const formData = new FormData();
                formData.append("image", selectedImage);
                const url = "http://localhost:8080/image/fileSystem";

                const imageResponse = await fetch(url, {
                    method: "POST",
                    body: formData,
                });

                const fileData = await imageResponse.json(); // Parse response as JSON
                console.log("Image upload response:", fileData);

                const productResponse = await fetch('http://localhost:8080/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        "name": name,
                        "description": description,
                        "price": price,
                        "category": category,
                        "fileData": {
                            "id": fileData.id,
                            "name": fileData.name,
                            "type": fileData.type,
                            "filePath": fileData.filePath
                        },
                        "active": active
                    })
                });

                const responseData = await productResponse.json();
                console.log("Product creation response:", responseData);

                // Handle response or display a success message
                toast("Product added");
            } catch (error) {
                console.error("Error:", error);
                // Handle error or display an error message
            }
            toast("Product added");
            setName("");
            setPrice("");
            setDescription("");
            setCategory('Category');
            setActive('Active');
            setSelectedImage(null);
        }
    }




    // const fileSelectedHandler = (event) =>{
    //     setImage(event.target.files[0]);
    // }

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
          <input className="upload-image" type="file" name="Image" onChange={(event) => setSelectedImage(event.target.files[0])}/>
          <DropdownButton id="dropdown-basic-button" className="mb-3" title={category}>
              {
                  categories.map(item => <Dropdown.Item key={item.id} onClick={() => setCategory(item.name)}>{item.name}</Dropdown.Item>)
              }
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" className="mb-3" title={active}>
              <DropdownItem onClick={() => setActive("Active")}>Active</DropdownItem>
              <DropdownItem onClick={() => setActive("Inactive")}>Inactive</DropdownItem>
          </DropdownButton>
          {/*<div className="bottom-row-buttons">*/}
          {/*    <DropdownButton id="dropdown-basic-button" title={category}>*/}
          {/*        {*/}
          {/*            categories.map(item => <Dropdown.Item key={item.id} onClick={() => setCategory(item.name)}>{item.name}</Dropdown.Item>)*/}
          {/*        }*/}
          {/*    </DropdownButton>*/}
          {/*    <input className="choose-file" type="file" onChange={event => fileSelectedHandler(event)} />*/}
          {/*</div>*/}
          <Button
              variant="primary"
              className="save-product"
              type="button"
              style={{ marginBottom: '100px' }}
              onClick={() => saveProduct()}
          >Save Product</Button>{' '}
          <ToastContainer />
      </>
    );
}