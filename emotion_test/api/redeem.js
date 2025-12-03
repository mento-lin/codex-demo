import Feishu from '@larksuiteoapi/node-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST required' });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Missing code' });
  }

  const client = new Feishu.Client({
    appId: process.env.FEISHU_APP_ID,
    appSecret: process.env.FEISHU_APP_SECRET,
  });

  try {
    // 从飞书表格查询兑换码
    const result = await client.bitable.record.list({
      app_token: process.env.FEISHU_BASE_ID,
      table_id: process.env.REDEEM_TABLE_ID,
    });

    const records = result?.data?.items ?? [];

    const found = records.find((r) => r.fields.code === code);

    if (!found) {
      return res.status(400).json({ error: '兑换码不存在或已被使用' });
    }

    if (found.fields.used === '1') {
      return res.status(400).json({ error: '兑换码已被使用' });
    }

    // 标记为使用
    await client.bitable.record.update({
      app_token: process.env.FEISHU_BASE_ID,
      table_id: process.env.REDEEM_TABLE_ID,
      record_id: found.record_id,
      fields: { used: '1' },
    });

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}
