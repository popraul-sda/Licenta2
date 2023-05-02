import Button from 'react-bootstrap/Button';
import {Header} from "../../components/product-page-components/Header";
import {BottomMenu} from "../../components/product-page-components/BottomMenu";
import {useState} from "react";
import {AccountDetails} from "./AccountDetails";
import '../../styles/accountPage.css';
import {CurrentOrder} from "./CurrentOrder";
import {History} from "../History";

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
                    active === 'active' ?
                        <>
                            <Button variant="danger" className='close' onClick={() => setActive('')}>Close</Button>{' '}
                            <CurrentOrder countdownTimestampMs={10}/>
                        </>
                        :
                        active === 'history' ?
                            <>
                                <Button variant="danger" className='close' onClick={() => setActive('')}>Close</Button>{' '}
                                <History />
                            </>
                            :
                        <>
                            <Button variant="primary" onClick={() => setActive('details')}>Account Details</Button>{' '}
                            <Button variant="primary" onClick={() => setActive('active')}>Active Order</Button>{' '}
                            <Button variant="primary" onClick={() => setActive('history')}>History</Button>{' '}
                        </>
            }
            <BottomMenu/>
        </div>
    );
}