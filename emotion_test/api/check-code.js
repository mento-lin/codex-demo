const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  // 从查询参数里拿 code，例如 ?code=MF8Q2LAP
  const codeParam = req.query.code;

  if (!codeParam) {
    return res.status(400).json({
      ok: false,
      message: "缺少兑换码",
    });
  }

  const inputCode = String(codeParam).trim().toUpperCase();

  // 注意：你的 codes.json 在 data 目录下（不是“数据”）
  const filePath = path.join(process.cwd(), "data", "codes.json");

  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error("读取 codes.json 失败:", err);
    return res.status(500).json({
      ok: false,
      message: "服务端读取兑换码失败",
    });
  }

  let data;
  try {
    data = JSON.parse(fileContent);
  } catch (err) {
    console.error("解析 codes.json 失败:", err);
    return res.status(500).json({
      ok: false,
      message: "兑换码数据格式错误",
    });
  }

  const codes = data.codes || [];
  const exists = codes.includes(inputCode);

  if (!exists) {
    return res.status(400).json({
      ok: false,
      message: "兑换码不存在或已失效",
    });
  }

  // 简单版：只验证有没有这个码
  return res.status(200).json({
    ok: true,
    message: "验证通过",
  });
};


