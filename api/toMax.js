import { UDPClient } from "unix-udpclient"; // oppure "osc"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { cmd } = req.body;

  const client = new UDPClient("127.0.0.1", 57120);
  client.send(`/fromweb`, cmd);
  client.close();

  res.status(200).json({ status: `"${cmd}" sent to Max` });
}
