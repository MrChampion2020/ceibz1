import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Load Stripe with your public key
const stripePromise = loadStripe('pk_test_51Q1gtFKTNsqkYMrBOpf8FM246PAW6mq7QOcCJAffrH9M4Tsp3n6TGlHGPZA2g1phWCr8avF1bdvh5TewgNzx3jIm00YrUOw85F');

const StripeScreen = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd'); // Default currency

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!amount) {
      alert('Please enter an amount');
      return;
    }

    try {
      // Create a payment intent on your server
      const response = await axios.post('http://localhost:5000/create-payment-intent', {
        amount,
        currency,
      });

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
        alert('Payment Successful!');
        // Handle post-payment success actions
      }
    } catch (error) {
      alert(`Error: ${error.response ? error.response.data.message : 'An error occurred during payment'}`);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handlePayment} style={{ padding: '20px' }}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
      </div>
      <div>
        <label>Currency:</label>
        <input
          placeholder="Enter currency (e.g., usd, eur)"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
      </div>
      <div>
        <label>Card Details:</label>
        <CardElement 
          options={{
            style: {
              base: {
                color: '#000000',
                fontSize: '16px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#fa755a',
              },
            },
          }}
        />
      </div>
      <button type="submit" disabled={!stripe}>Pay</button>
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
