import StripeScreen from '../screens/register/stripe'; // Adjust the path accordingly

const StripeRoute = () => {
  return (
    <Elements stripe={stripePromise}>
      <YourOtherComponents />
      <StripeScreen />
    </Elements>
  );
};

export default StripeRoute;
