const FEISHU_APP_ID = process.env.FEISHU_APP_ID;
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET;

const APP_TOKEN = "Gu3lbILvIlavBz3slk98cgVXtnIb";
const RESULT_TABLE_ID = "tblQk1jntmv17zbA";

async function getTenantToken() {
  const response = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: FEISHU_APP_ID,
      app_secret: FEISHU_APP_SECRET,
    }),
  });

  const result = await response.json();
  if (!response.ok || result.code !== 0) {
    throw new Error(result.msg || "Failed to obtain tenant access token");
  }
  return result.tenant_access_token;
}

async function createResultRecord(token, payload) {
  const response = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${RESULT_TABLE_ID}/records`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: payload }),
    }
  );

  const result = await response.json();
  if (!response.ok || result.code !== 0) {
    throw new Error(result.msg || "Failed to create test result record");
  }
  return result.data?.record;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method Not Allowed" }),
    };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { code, order_id: orderId, answer, score } = body;

    if (!code || typeof score === "undefined" || typeof answer === "undefined") {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "缺少必要字段" }),
      };
    }

    const token = await getTenantToken();
    const nowIso = new Date().toISOString();

    const payload = {
      code,
      order_id: orderId || "",
      answer: typeof answer === "string" ? answer : JSON.stringify(answer),
      score,
      created_at: nowIso,
    };

    await createResultRecord(token, payload);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message || "服务器错误" }),
    };
  }
};