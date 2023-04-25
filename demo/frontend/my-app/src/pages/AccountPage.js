import Button from 'react-bootstrap/Button';
import {Header} from "../components/product-page-components/Header";
import {BottomMenu} from "../components/BottomMenu";
import {useState} from "react";
import {AccountDetails} from "./AccountDetails";
import '../styles/accountPage.css';

export function AccountPage() {

    const [active, setActive] = useState('');

    return (
        <div className="main-container">
            <Header/>
            {
                active === 'details' ?
                    <>
                        <Button variant="danger" className='close' onClick={() => setActive('')}>Close</Button>{' '}
                        <AccountDetails className='details'/>
                    </>
                    :
                    <>
                        <Button variant="primary" onClick={() => setActive('details')}>Account Details</Button>{' '}
                        <Button variant="primary">Active Order</Button>{' '}
                        <Button variant="primary">History</Button>{' '}
                    </>
            }
            <BottomMenu/>
        </div>
    );
}