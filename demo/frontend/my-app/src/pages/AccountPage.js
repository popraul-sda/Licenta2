import Button from 'react-bootstrap/Button';
import {Header} from "../components/product-page-components/Header";
import {BottomMenu} from "../components/BottomMenu";

export function AccountPage(){

    return (
      <div className="main-container">
          <Header />
          <Button variant="primary">Account Details</Button>{' '}
          <Button variant="primary">Active Order</Button>{' '}
          <Button variant="primary">History</Button>{' '}
          <BottomMenu />
      </div>
    );
}