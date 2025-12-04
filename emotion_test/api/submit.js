const axios = require("axios");

async function getTenantToken() {
  const resp = await axios.post(
    "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
    {
      app_id: process.env.FEISHU_APP_ID,
      app_secret: process.env.FEISHU_APP_SECRET
    }
  );

  return resp.data.tenant_access_token;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { score, uid } = req.body;

  try {
    const token = await getTenantToken();

    await axios.post(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_ID}/tables/${process.env.RESULTS_TABLE_ID}/records`,
      {
        fields: { uid, score }
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: e.message });
  }
};
