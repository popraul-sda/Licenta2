import "../styles/App.css";
import {Header} from "../components/product-page-components/Header";
import "../styles/contact.css";
import {BottomMenu} from "../components/product-page-components/BottomMenu";
import { Helmet } from 'react-helmet';

export function Contact(){

    function generateContactJsonLd() {
        return `
    {
      "@context": "https://schema.org/",
      "@type": "ContactPage",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Example St",
        "addressLocality": "City",
        "addressRegion": "State",
        "postalCode": "12345",
        "addressCountry": "Country"
      },
      "openingHours": "Mo-Su 08:00-21:00",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-123-456-7890",
        "contactType": "customer service"
      }
    }
  `;
    }

    return (
        <div>
            <Helmet>
                <script type="application/ld+json">{generateContactJsonLd()}</script>
            </Helmet>
            <Header />
            <div className="center-container">
                    <div className="address">
                        <h2>Address</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                    </div>
                    <div className="schedule">
                        <h2>Schedule</h2>
                        <ul>
                            <li>L: 8-21</li>
                            <li>M: 8-21</li>
                            <li>M: 8-21</li>
                            <li>J: 8-21</li>
                            <li>V: 8-21</li>
                            <li>S: 8-21</li>
                            <li>D: 8-21</li>
                        </ul>
                    </div>
                    <div className="contact">
                        <h2>Contact</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                        <a href="https://facebook.com"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/800px-Facebook_icon.svg.png" alt=""/></a>
                        <a href="https://www.instagram.com"><img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Instagram-Icon.png" alt="" /></a>
                    </div>
                    <div className="delivery-fee">
                        <h2>Delivery Fee</h2>
                        <p>Gratuit pentru comenzile de peste 50 lei</p>
                        <p>10 lei pentru comenzile mai mici de 50 lei</p>
                    </div>
            </div>
            <BottomMenu />
        </div>
    );
}