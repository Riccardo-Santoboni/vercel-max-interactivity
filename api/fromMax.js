export default async function handler(req, res) {
  const { message } = req.method === "POST" ? req.body : req.query;
  console.log("Received from Max:", message);
  res.status(200).json({ received: message });
}
