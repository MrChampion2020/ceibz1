import React, { useState } from 'react';
import { useStripe, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe public key outside of the component
const stripePromise = loadStripe('your-public-key'); // Replace with your actual public key

const StripeScreen = () => {
  const stripe = useStripe();
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
          card: CardElement, // This should be updated to use a ref to the CardElement
        },
      });

      if (error) {
        alert(`Payment Error: ${error.message}`);
      } else {
        alert('Payment Successful!');
        // Here you can send the amount to your Naira account
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

export default StripeScreen;
