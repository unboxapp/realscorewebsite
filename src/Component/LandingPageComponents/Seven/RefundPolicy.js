import React from 'react';
import './Terms3.css'; // Extract styles to an external CSS file for better maintainability.
import SeventhComponent from './SeventhComponent';

const RefundPolicy = () => {
    return (
        <div className='outer-ref'>
            {/* Navigation section */}
            <div className="nav-term">
                <div className="logo">
                    <img src="../image/RealScoreLogo.png" alt="RealScore Logo" height="100px" />
                </div>
            </div>

            {/* Content section */}
            <div className="text-term">
                <h2>Cancellation & Refund Policy</h2>
                <b>
                    <h3>Last updated on Dec 19th 2022</h3>
                </b>
                <p>
                    LOANUNBOX / RealScore believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
                    <br />
                    Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
                    <br />
                    LOANUNBOX / Real Score does not accept cancellation requests for perishable items like flowers, eatables, etc. However, refund/replacement can be made if the customer establishes that the quality of the product delivered is not good.
                    <br />
                    In case of receipt of damaged or defective items, please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 30+ days of receipt of the products.
                    <br />
                    In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 30+ days of receiving the product. The Customer Service Team, after looking into your complaint, will take an appropriate decision.
                    <br />
                    In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
                    <br />
                    In case of any Refunds approved by the LOANUNBOX / RealScore, it’ll take 3-5 days for the refund to be processed to the end customer.
                </p>
            </div>
            <SeventhComponent/>
        </div>
    );
};

export default RefundPolicy;
