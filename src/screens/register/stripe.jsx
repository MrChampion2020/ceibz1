// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useMediaQuery } from "react-responsive";

// // Load Stripe with your public key
// const stripePromise = loadStripe(
//   "pk_test_51Q1gtFKTNsqkYMrBOpf8FM246PAW6mq7QOcCJAffrH9M4Tsp3n6TGlHGPZA2g1phWCr8avF1bdvh5TewgNzx3jIm00YrUOw85F"
// );

// const StripeScreen = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [amount, setAmount] = useState("");
//   const [currency, setCurrency] = useState("usd"); // Default currency
//   const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

//   const handlePayment = async (event) => {
//     event.preventDefault();

//     if (!amount) {
//       alert("Please enter an amount");
//       return;
//     }

//     try {
//       // Create a payment intent on your server
//       const response = await axios.post(
//         "http://localhost:5000/create-payment-intent",
//         {
//           amount,
//           currency,
//         }
//       );

//       const { clientSecret } = response.data.data;

//       // Confirm the payment with the card details
//       const { error } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement), // Get the CardElement instance here
//         },
//       });

//       if (error) {
//         alert(`Payment Error: ${error.message}`);
//       } else {
//         alert("Payment Successful!");
//         // Handle post-payment success actions
//       }
//     } catch (error) {
//       alert(
//         `Error: ${
//           error.response
//             ? error.response.data.message
//             : "An error occurred during payment"
//         }`
//       );
//       console.error(error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handlePayment}
//       style={{
//         padding: "20px",
//         width: isMobile ? "90%" : "60%",
//         margin: isMobile ? "10% auto" :"10% auto",
        
//       }}
//     >
//       <div
//         style={{
//           padding: "10px",
//           width: isMobile ? "90%" : "60%",
//           border: "1px solid grey",
//           height: "40px",
//           gap: "10px",
//           margin: 'auto'
//         }}
//       >
//         <label 
//         style={{
//           padding: "0px 5px",
//           gap: "10px",
//         }}
//         >Amount:
//         </label>
//         <input
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           style={{ marginBottom: "20px", width: '80%', border: '0px solid grey' }}
//         />
//       </div>
//       <div
//       style={{
//         padding: "10px",
//         width: isMobile ? "90%" : "60%",
//         border: "1px solid grey",
//         height: "40px",
//         gap: "10px",
//         margin: '10px auto'
//       }}>
//         <label
//         style={{
//           padding: "0px 5px",
//           gap: "10px",
//         }}
//         >Currency:
//         </label>
//         <input
//           placeholder="Enter currency (e.g., usd, eur)"
//           value={currency}
//           onChange={(e) => setCurrency(e.target.value)}
//            style={{ marginBottom: "20px", width: '80%', border: '0px solid grey' }}
//         />
//       </div>
//       <div
//       style={{
//         padding: "10px",
//         width: isMobile ? "90%" : "60%",
//         height: "40px",
//         gap: "10px",
//         margin: '10px auto'
//       }}
//       >
//         <label
//         style={{
//           padding: "30px 0px",
//         }}
//         >Card Details:
//         </label>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 color: "#000000",
//                 fontSize: "16px",
//                 padding: "20px 0px",
//                 border: "1px solid grey",
//                 borderRadius: "4px",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                   marginBottom: 10
//                 },
//               },
//               invalid: {
//                 color: "#fa755a",
//               },
//             },
//           }}
//         />
//       </div>
//       <button type="submit" disabled={!stripe}
//       style={{
//         backgroundColor: 'black',
//         color: 'white',
//         padding: "5px 10px",
//         marginTop: 30,
//         width: 80,
//         marginLeft: 150
//       }}
//       >
//         Pay
//       </button>
//     </form>
//   );
// };

// const App = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <StripeScreen />
//     </Elements>
//   );
// };

// export default App;



import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

// Load Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51Q1gtFKTNsqkYMrBOpf8FM246PAW6mq7QOcCJAffrH9M4Tsp3n6TGlHGPZA2g1phWCr8avF1bdvh5TewgNzx3jIm00YrUOw85F"
);

const StripeScreen = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("usd"); // Default currency
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!amount) {
      alert("Please enter an amount");
      return;
    }

    try {
      // Create a payment intent on your server
      const response = await axios.post(
        "http://localhost:5000/create-payment-intent",
        {
          amount,
          currency,
        }
      );

      const { clientSecret } = response.data.data;

      // Confirm the payment with the card details
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), // Get the CardElement instance here
        },
      });

      if (error) {
        alert(`Payment Error: ${error.message}`);
      } else {
        alert("Payment Successful!");
        // Handle post-payment success actions
      }
    } catch (error) {
      alert(
        `Error: ${
          error.response
            ? error.response.data.message
            : "An error occurred during payment"
        }`
      );
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handlePayment}
      style={{
        padding: "20px",
        width: isMobile ? "90%" : "50%",
        margin: isMobile ? "10% auto" : "10% auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          Amount:
        </label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
            width: "100%",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          Currency:
        </label>
        <input
          placeholder="Enter currency (e.g., usd, eur)"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
            width: "100%",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          Card Details:
        </label>
        <div
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
            width: "100%",
          }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#000",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe}
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "12px",
          borderRadius: "4px",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
          width: "50%",
        }}
      >
        Pay
      </button>
    </form>
  );
};

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripeScreen />
    </Elements>
  );
};

export default App;
