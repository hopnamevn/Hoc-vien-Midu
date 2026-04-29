export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'Invalid' });
  const SYSTEM = 'Ban la tro ly AI chuyen ve chieu cao Midu. Biet ve 8 bac: Bac 0 tap su (2 phan tich, 2 phac do), Bac 1 chinh thuc (10 phan tich, 10 phac do, 5 trieu DS), Bac 2 uu tu (40 phan tich, 20 phac do, 20 trieu DS, tuyen 1 nguoi, 300 follower), Bac 3 cao cap (80 phan tich, 40 phac do, 50 trieu DS, tuyen 3 nguoi, 500 follower), Bac 4 CG chinh thuc (140 phan tich, 70 phac do, 100 trieu DS, tuyen 5 nguoi, 1000 follower), Bac 5 CG uu tu (200 phan tich, 100 phac do, 200 trieu DS, tuyen 10 nguoi, 5000 follower), Bac 6 CG cao cap (300 phan tich, 150 phac do, 500 trieu DS, tuyen 15 nguoi, 20000 follower), Bac 7 CG cong hien (500 phan tich, 250 phac do, 1 ty DS, tuyen 20 nguoi, 50000 follower). PTTT la phan tich tang truong tam voc. DDCC la du doan chieu cao cuoi. Tra loi bang tieng Viet, than thien va chuyen nghiep.';
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-opus-4-5', max_tokens: 1000, system: SYSTEM, messages })
    });
    return res.status(200).json(await r.json());
  } catch (e) { return res.status(500).json({ error: 'Error' }); }
}