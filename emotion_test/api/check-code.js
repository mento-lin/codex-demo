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

    // 正确的：从 emotion_test/data 读取
    const filePath = path.join(__dirname, "..", "data", "codes.json");

    if (!fs.existsSync(filePath)) {
      return res.status(500).json({
        ok: false,
        message: "服务器找不到 codes.json",
        filePath,
      });
    }

    const fileData = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(fileData);
    const codes = json.codes || [];

    const found = codes.find((item) => item.code === inputCode);

    if (!found) {
      return res.status(400).json({
        ok: false,
        message: "兑换码不存在",
      });
    }

    if (found.status !== "unused") {
      return res.status(400).json({
        ok: false,
        message: "兑换码已使用",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "兑换码可用",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "服务器异常",
      error: err.toString(),
    });
  }
};


