// codex-demo/emotion_test/api/check-code.js

const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        ok: false,
        message: "缺少兑换码",
      });
    }

    const inputCode = String(code).trim().toUpperCase();

    // 关键：codes.json 和这个文件在同一目录
    const filePath = path.join(__dirname, "codes.json");

    const fileData = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(fileData);
    const codes = json.codes || [];

    // 找到对应的那条记录
    const found = codes.find((item) => item.code === inputCode);

    if (!found) {
      return res.status(200).json({
        ok: false,
        message: "兑换码不存在",
      });
    }

    if (found.status !== "unused") {
      return res.status(200).json({
        ok: false,
        message: "兑换码已被使用",
      });
    }

    // 标记为已使用
    found.status = "used";
    found.used_time = new Date().toISOString();

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

    return res.status(200).json({
      ok: true,
      message: "兑换成功",
    });
  } catch (err) {
    console.error("check-code error:", err);
    return res.status(500).json({
      ok: false,
      message: "服务器错误",
    });
  }
};

