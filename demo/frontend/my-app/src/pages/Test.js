import "../styles/test.css";
import {useState} from "react";

export function Test(){

    const [selectedImage, setSelectedImage] = useState(null);

        function fileUpload() {
                const formData = new FormData();
                formData.append("image", selectedImage);
                const url = "http://localhost:8080/image";

                fetch(url, {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data);
                        // Handle success or display a success message
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        // Handle error or display an error message
                    });
        }

    function fileDownload() {
        const url = "http://localhost:8080/image/user.png";

        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const file = new File([blob], "user.png");
                setSelectedImage(file);
            })
            .catch((error) => {
                console.error("Error:", error);
                // Handle error or display an error message
            });
    }

    return (
        <div>
            <h1>Upload and Display Image usign React Hook's</h1>

            {selectedImage && (
                <div>
                    <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                    <button onClick={() => fileUpload()}>Upload</button>
                </div>
            )}

            <br />
            <br />

            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                }}
            />
            <button onClick={() => fileDownload()}>Download</button>
        </div>
    );
};