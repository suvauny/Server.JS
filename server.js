const express = require("express");
const req = require("express/lib/request");

const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51IRYcnGTO6GEZkLI50bVJjbIBatNqz5NIRV21bbyDVFPG23yG3kb4lbC1o1Px6DCfawa7sw5Ozk8XAGzvyhPTdmv00Tnat6qAW');

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send('Working');
});

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

app.listen(80, "0.0.0.0", () => console.log("Node server listening on port 80!"));