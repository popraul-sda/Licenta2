import { Route, Routes } from "react-router-dom"
import {ProductList} from "./components/ProductList";
import {ProductInformation} from "./components/ProductInformation";
import {LoginPage} from "./pages/LoginPage";

function App() {
    return <Routes>
        {/*<Route path="/" element={<ShowTables locationCheck={"I"}/>}/>*/}
        {/*<Route path="/outside" element={<ShowTables locationCheck={"O"}/>}/>*/}
        {/*<Route path="/masa/:id" element={<TableContents/>}/>*/}
        <Route path="/" element={<ProductList />}/>
        <Route path="/products/:id" element={<ProductInformation />}/>
        <Route path="/login" element={<LoginPage />} />
    </Routes>
}

export default App