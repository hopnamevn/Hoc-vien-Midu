export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { messages } = req.body;
  const SYSTEM = `Ban la tro ly AI chuyen ve chieu cao Midu. Biet ve 8 bac: Bac 0 tap su, Bac 1 chinh thuc, Bac 2 uu tu, Bac 3 cao cap, Bac 4 CG chinh thuc, Bac 5 CG uu tu, Bac 6 CG cao cap, Bac 7 CG cong hien. Tra loi bang tieng Viet, than thien.`;
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, system: SYSTEM, messages })
    });
    return res.status(200).json(await r.json());
  } catch(e) { return res.status(500).json({ error: 'Error' }); }
}