const FEISHU_APP_ID = process.env.FEISHU_APP_ID;
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET;

const APP_TOKEN = "Gu3lbILvIlavBz3slk98cgVXtnIb";
const REDEEM_TABLE_ID = "tblyGGbeg7gA0Cw7";

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

async function searchRedeemCode(token, code) {
  const response = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${REDEEM_TABLE_ID}/records/search`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: `{code} = "${code}"`,
        page_size: 1,
      }),
    }
  );

  const result = await response.json();
  if (!response.ok || result.code !== 0) {
    throw new Error(result.msg || "Failed to search redeem code");
  }

  const record = result.data?.items?.[0];
  return record;
}

async function updateRedeemRecord(token, recordId, orderId) {
  const nowIso = new Date().toISOString();
  const response = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${REDEEM_TABLE_ID}/records/${recordId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          status: "已使用",
          used_time: nowIso,
          order_id: orderId || "",
        },
      }),
    }
  );

  const result = await response.json();
  if (!response.ok || result.code !== 0) {
    throw new Error(result.msg || "Failed to update redeem record");
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
    const { code, order_id: orderId } = body;

    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "兑换码不能为空" }),
      };
    }

    const token = await getTenantToken();
    const record = await searchRedeemCode(token, code);

    if (!record) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: false, message: "兑换码不存在" }),
      };
    }

    const status = record.fields?.status;
    if (status && status !== "未使用") {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: false, message: "兑换码已被使用", code_info: record }),
      };
    }

    const updated = await updateRedeemRecord(token, record.record_id, orderId);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "兑换码验证成功", code_info: updated || record }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message || "服务器错误" }),
    };
  }
};