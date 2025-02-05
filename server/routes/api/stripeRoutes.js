const router = require("express").Router();
const client = require("../../client");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const getPaymentIntent = async () => {
  return await stripe.paymentIntents.create({
    amount: 500,
    currency: "aud",
  });
};

const paymentIntent = getPaymentIntent();

router.get("/", async (req, res) => {
  const intent = await paymentIntent;
  res.json({ client_secret: intent.client_secret, payment_intent: intent.id });
});

router.get("/search/users/:userId/emails/:emailId", async (req, res) => {
  const customers = await stripe.customers.search({
    query: `name:"${req.params.userId}" AND email:"${req.params.emailId}"`,
  });
  res.json(customers.data);
});

router.post("/create-customer", async (req, res) => {
  const customer = await stripe.customers.create({
    name: req.body.name,
    email: req.body.email,
  });
  res.json({ client_id: customer.id });
});

router.post("/update", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.update(req.body.pi, {
    customer: req.body.customerId,
  });
  res.json({ client_secret: paymentIntent.client_secret });
});

router.get("/payment-status", async (req, res) => {
  const pi = await paymentIntent;
  const paymentIntents = await stripe.paymentIntents.retrieve(pi.id);
  res.json(paymentIntents.status);
});

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 200,
    currency: "aud",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
