import { Route, Routes } from "react-router-dom"
import {ProductInformation} from "./pages/ProductInformation";
import {Login} from "./pages/Login";
import {ShowTables} from "./components/ShowTables";
import {Register} from "./pages/Register";
import {ProductsPage} from "./pages/ProductsPage";
import {Reviews} from "./pages/Reviews";
import {Contact} from "./pages/Contact";
import {ManagerPortal} from "./pages/ManagerPortal";
import {Test} from "./pages/Test";
import {CheckOutPage} from "./pages/CheckOutPage";
import {AccountPage} from "./pages/AccountPage";
import {ManagerPortalProducts} from "./pages/ManagerPortalProducts";

function App() {
    return <Routes>
        <Route path="/tables" element={<ShowTables locationCheck={"I"}/>}/>
        {/*<Route path="/outside" element={<ShowTables locationCheck={"O"}/>}/>*/}
        {/*<Route path="/masa/:id" element={<TableContents/>}/>*/}
        {/*<Route path="/" element={<ProductList />}/>*/}
        <Route path="/product/:name" element={<ProductInformation />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProductsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/managerPortal" element={<ManagerPortal />} />
        <Route path="/test" element={<Test />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/managerPortalProducts" element={<ManagerPortalProducts />} />
    </Routes>
}

export default App