const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ ok: false, message: "缺少兑换码" });
  }

  const inputCode = String(code).trim().toUpperCase();

  // 用绝对路径找 codes.json（最保险）
  const filePath = path.join(process.cwd(), "数据", "codes.json");

  let fileContent = "";

  try {
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error("读取文件失败:", err);
    return res.status(500).json({ ok: false, message: "服务端读取兑换码失败" });
  }

  let data = {};

  try {
    data = JSON.parse(fileContent);
  } catch (err) {
    return res.status(500).json({ ok: false, message: "兑换码数据格式错误" });
  }

  const codes = data.codes || [];
  const exists = codes.includes(inputCode);

  if (!exists) {
    return res.status(400).json({ ok: false, message: "兑换码不存在或已失效" });
  }

  return res.status(200).json({ ok: true, message: "验证通过" });
};

