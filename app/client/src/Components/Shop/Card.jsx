import React, { useState } from "react";

const BASE_URL = "http://localhost:8000";

const Card = ({ name, price, id }) => {
  const [payment, setPayment] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [paymentID, setPaymentID] = useState("");
  const [signature, setSignature] = useState("");

  const buyProduct = async (productId) => {
    let result = await fetch(`${BASE_URL}/order/${productId}`);
    result = await result.json();
    console.log(result);

    const options = {
      key: "rzp_test_f8G03GBXmR2Huk", // Enter the Key ID generated from the Dashboard
      amount: result.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: result.currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: result.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        setPaymentID(response.razorpay_payment_id);
        setOrderID(response.razorpay_order_id);
        setSignature(response.razorpay_signature);
        setPayment(true);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  };

  return (
    <>
      <div className="wrapper">
        <div className="card">
          <h1>{name}</h1>
          <p>{price}</p>
          <button onClick={() => buyProduct(id)}>BUY NOW</button>
        </div>
      </div>
    </>
  );
};

export default Card;
