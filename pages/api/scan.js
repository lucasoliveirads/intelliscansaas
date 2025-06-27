export default async function handler(req, res) {
  const { ip } = req.query;
  const SHODAN_API_KEY = process.env.SHODAN_API_KEY;

  if (!ip) {
    return res.status(400).json({ error: 'IP não informado' });
  }

  try {
    const response = await fetch(`https://api.shodan.io/shodan/host/${ip}?key=${SHODAN_API_KEY}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar Shodan', details: err.message });
  }
}
