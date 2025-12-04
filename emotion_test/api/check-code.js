import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({
      ok: false,
      message: "缺少兑换码",
    });
  }

  // 统一成大写、去掉前后空格，防止用户输小写或多输空格
  const inputCode = String(code).trim().toUpperCase();

  // 读取 data/codes.json
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

  // 简单版：只校验“是否存在”，不记录已使用
  // 后面如果你想做“防重复使用”，我们再接数据库来做

  return res.status(200).json({
    ok: true,
    message: "兑换成功",
  });
}
