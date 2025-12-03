const axios = require("axios");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { score, uid } = req.body;

  try {
    await axios.post(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${process.env.FEISHU_BASE_ID}/tables/${process.env.RESULTS_TABLE_ID}/records`,
      {
        fields: { uid, score }
      },
      { headers: { Authorization: `Bearer ${process.env.FEISHU_APP_SECRET}` } }
    );

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

