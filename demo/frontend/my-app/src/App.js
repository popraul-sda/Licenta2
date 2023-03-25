import { Route, Routes } from "react-router-dom"
import {ProductInformation} from "./components/ProductInformation";
import {Login} from "./pages/Login";
import {ShowTables} from "./components/ShowTables";
import {ProductList} from "./components/ProductList";

function App() {
    return <Routes>
        <Route path="/tables" element={<ShowTables locationCheck={"I"}/>}/>
        {/*<Route path="/outside" element={<ShowTables locationCheck={"O"}/>}/>*/}
        {/*<Route path="/masa/:id" element={<TableContents/>}/>*/}
        {/*<Route path="/" element={<ProductList />}/>*/}
        <Route path="/products/:id" element={<ProductInformation />}/>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProductList />} />
    </Routes>
}

export default App