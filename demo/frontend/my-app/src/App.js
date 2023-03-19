import { Route, Routes } from "react-router-dom"
import { ShowTables } from "./ShowTables"
import {TableContents} from "./TableContents";
import {ProductList} from "./ProductList";
import {ProductInformation} from "./ProductInformation";

function App() {
    return <Routes>
        <Route path="/" element={<ShowTables locationCheck={"I"}/>}/>
        <Route path="/outside" element={<ShowTables locationCheck={"O"}/>}/>
        <Route path="/masa/:id" element={<TableContents/>}/>
        <Route path="/products" element={<ProductList />}/>
        <Route path="/products/:id" element={<ProductInformation />}/>
    </Routes>
}

export default App