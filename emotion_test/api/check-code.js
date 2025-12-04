export default async function handler(req, res) {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ ok: false, message: "缺少兑换码" });
    }

    // 读取兑换码文件
    const fs = require("fs");
    const path = require("path");

    const filePath = path.join(process.cwd(), "data", "codes.json");
    const fileData = fs.readFileSync(filePath, "utf-8");

    const json = JSON.parse(fileData);
    const codes = json.codes; // 数组：{code, status, used_time, score}

    // 查找兑换码对象
    const found = codes.find((item) => item.code === code);

    if (!found) {
      return res.status(200).json({ ok: false, message: "兑换码不存在" });
    }

    if (found.status !== "unused") {
      return res.status(200).json({ ok: false, message: "兑换码已被使用" });
    }

    // 标记已使用
    found.status = "used";
    found.used_time = new Date().toISOString();

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

    return res.status(200).json({ ok: true, message: "兑换成功" });

  } catch (err) {
    return res.status(500).json({ ok: false, message: "服务器错误", error: err.message });
  }
}
