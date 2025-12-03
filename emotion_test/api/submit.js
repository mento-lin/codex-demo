import Feishu from '@larksuiteoapi/node-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST required' });
  }

  const { answers, score } = req.body;

  const client = new Feishu.Client({
    appId: process.env.FEISHU_APP_ID,
    appSecret: process.env.FEISHU_APP_SECRET,
  });

  try {
    await client.bitable.record.create({
      app_token: process.env.FEISHU_BASE_ID,
      table_id: process.env.RESULTS_TABLE_ID,
      fields: {
        score,
        answers: JSON.stringify(answers),
        time: new Date().toLocaleString('zh-CN'),
      },
    });

    return res.json({ success: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
}
