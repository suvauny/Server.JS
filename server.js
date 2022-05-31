const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51IRYcnGTO6GEZkLI50bVJjbIBatNqz5NIRV21bbyDVFPG23yG3kb4lbC1o1Px6DCfawa7sw5Ozk8XAGzvyhPTdmv00Tnat6qAW');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const items = req.body.amount;
  var total = Number(items)
   
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(8080, () => console.log("Node server listening on port 8080!"));