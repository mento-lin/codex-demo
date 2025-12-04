// emotion_test/api/check-code.js

const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({
      ok: false,
      message: "缺少兑换码",
    });
  }

  // 规范一下用户输入：去空格、转大写
  const inputCode = String(code).trim().toUpperCase();

  // 读取 data/codes.json 里的白名单
  const filePath = path.join(process.cwd(), "data", "codes.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);
  const codes = data.codes || [];

  const exists = codes.includes(inputCode);

  if (!exists) {
    return res.status(400).json({
      ok: false,
      message: "兑换码不存在或填写错误",
    });
  }

  // 简单版：只判断“在不在这批码里”，不做“已使用”判断
  return res.status(200).json({
    ok: true,
    message: "验证通过",
  });
};
