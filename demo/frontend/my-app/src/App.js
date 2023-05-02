import { Route, Routes } from "react-router-dom"
import {ProductInformation} from "./pages/ProductInformation";
import {Login} from "./pages/login/Login";
import {ShowTables} from "./components/ShowTables";
import {Register} from "./pages/login/Register";
import {ProductsPage} from "./pages/ProductsPage";
import {Reviews} from "./pages/Reviews";
import {Contact} from "./pages/Contact";
import {ManagerPortal} from "./pages/managerPortal/ManagerPortal";
import {Test} from "./pages/Test";
import {CheckOutPage} from "./pages/CheckOutPage";
import {AccountPage} from "./pages/account/AccountPage";
import {ManagerPortalProducts} from "./pages/managerPortal/ManagerPortalProducts";
import {ManagerPortalOrders} from "./pages/managerPortal/ManagerPortalOrders";

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
        <Route path="/managerPortalOrders" element={<ManagerPortalOrders />} />
    </Routes>
}

export default App