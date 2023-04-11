import "../styles/test.css";

export function Test(){
    return (
        <main className="container">
            <div className="left-column">
                <img data-image="black" src="https://pizzanapoleon.ro/wp-content/uploads/2015/10/4.-salami.png" alt=""/>
                    <img data-image="blue" src="images/blue.png" alt=""/>
                        <img data-image="red" className="active" src="https://pizzanapoleon.ro/wp-content/uploads/2015/10/4.-salami.png" alt=""/>
            </div>
            <div className="right-column">
                <div className="product-description">
                    <span>Headphones</span>
                    <h1>Beats EP</h1>
                    <p>The preferred choice of a vast range of acclaimed DJs. Punchy, bass-focused sound and high
                        isolation. Sturdy headband and on-ear cushions suitable for live performance</p>
                </div>
                <div className="product-configuration">
                    <div className="product-color">
                        <span>Color</span>

                        <div className="color-choose">
                            <div>
                                <input data-image="red" type="radio" id="red" name="color" value="red" checked/>
                                    <label htmlFor="red"><span></span></label>
                            </div>
                            <div>
                                <input data-image="blue" type="radio" id="blue" name="color" value="blue"/>
                                    <label htmlFor="blue"><span></span></label>
                            </div>
                            <div>
                                <input data-image="black" type="radio" id="black" name="color" value="black"/>
                                    <label htmlFor="black"><span></span></label>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="product-price">
                    <span>148$</span>
                    <a href="/" className="cart-btn">Add to cart</a>
                </div>
            </div>
        </main>
    );
}