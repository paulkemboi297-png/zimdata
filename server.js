const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const bundles = [
  { id: "daily-100", name: "100MB Daily", price: 0.50, validity: "24 hours" },
  { id: "daily-300", name: "300MB Daily", price: 1.00, validity: "24 hours" },
  { id: "weekly-1gb", name: "1GB Weekly", price: 3.00, validity: "7 days" },
  { id: "weekly-3gb", name: "3GB Weekly", price: 6.00, validity: "7 days" },
  { id: "monthly-5gb", name: "5GB Monthly", price: 10.00, validity: "30 days" }
];

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "Zim Data API",
    message: "Backend is running"
  });
});

app.get("/api/bundles", (req, res) => {
  res.json({ ok: true, bundles });
});

app.post("/api/orders", (req, res) => {
  const { phone, bundleId } = req.body;

  if (!phone || !bundleId) {
    return res.status(400).json({
      ok: false,
      message: "Phone number and bundle are required"
    });
  }

  const bundle = bundles.find(item => item.id === bundleId);

  if (!bundle) {
    return res.status(404).json({
      ok: false,
      message: "Bundle not found"
    });
  }

  // This creates an order reference only.
  // Connect your legitimate payment/data-provider API here.
  const orderId = `ZD-${Date.now()}`;

  res.status(201).json({
    ok: true,
    orderId,
    status: "pending",
    phone,
    bundle
  });
});

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "Endpoint not found"
  });
});

app.listen(PORT, () => {
  console.log(`Zim Data backend running on port ${PORT}`);
});