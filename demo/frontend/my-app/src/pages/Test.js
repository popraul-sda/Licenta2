// import "../styles/test.css";
// import { useState } from "react";
//
// export function Test() {
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [orders, setOrders] = useState([]);
//
//     function fileUpload() {
//         const formData = new FormData();
//         formData.append("image", selectedImage);
//         const url = "http://localhost:8080/image";
//
//         fetch(url, {
//             method: "POST",
//             body: formData,
//         })
//             .then((response) => response.text())
//             .then((data) => {
//                 console.log(data);
//                 // Handle success or display a success message
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//                 // Handle error or display an error message
//             });
//     }
//
//     function fileDownload() {
//         // fetch("http://localhost:8080/products", {
//         //     method: "GET",
//         // })
//         //     .then((res) => res.json())
//         //     .then((data) => {
//         //         setOrders(data);
//         //         console.log(orders); // This may not display the updated value immediately due to the asynchronous nature of state updates
//         //         const item = data.find((item) => item.id === 43);
//         //         if (item) {
//         //             // const blob = new Blob([item.imageData.imageData], { type: "image/png" });
//         //             // setSelectedImage(blob);
//         //
//         //         }
//         //     })
//         //     .catch((error) => {
//         //         console.error("Error:", error);
//         //         // Handle error or display an error message
//         //     });
//
//         const url = "http://localhost:8080/image/6";
//
//         fetch(url, {
//             method: "GET",
//             responseType: "blob", // Specify the response type as "blob"
//         })
//             .then((response) => {
//                 if (response.ok) {
//                     return response.blob(); // Convert the response to a Blob object
//                 } else {
//                     throw new Error("Error: " + response.status);
//                 }
//             })
//             .then((data) => {
//                 setSelectedImage(data);
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//                 // Handle error or display an error message
//             });
//     }
//
//     return (
//         <div>
//             <h1>Upload and Display Image using React Hook's</h1>
//
//             {selectedImage && (
//                 <div>
//                     <img
//                         alt="not found"
//                         width={"250px"}
//                         src={URL.createObjectURL(selectedImage)}
//                     />
//                     <br />
//                     <button onClick={() => setSelectedImage(null)}>Remove</button>
//                     <button onClick={() => fileUpload()}>Upload</button>
//                 </div>
//             )}
//
//             <br />
//             <br />
//
//             <input
//                 type="file"
//                 name="myImage"
//                 onChange={(event) => {
//                     console.log(event.target.files[0]);
//                     setSelectedImage(event.target.files[0]);
//                 }}
//             />
//             <button onClick={() => fileDownload()}>Download</button>
//         </div>
//     );
// }

import React from "react";

export function Test() {
    const imageUrl = process.env.PUBLIC_URL + "/images/WhatsApp Image 2023-05-11 at 14.26.17.jpeg";

    return (
        <div>
            <h1>Image Component</h1>
            <img src={imageUrl} alt="Your Image" />
        </div>
    );
}

