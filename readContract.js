import fetch from "node-fetch";
import https from "https";

// ローカルテスト用のための設定。本番ではセキュリティリスクのため行わない
const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function readContract() {
  const resp = await fetch(
    "https://localhost:3005/contract/mumbai/0xe899877b5363A28b4df29fb9610F116c946b522e/read?function_name=balanceOf&args=0xBc62697F318A7A19A7167b78e1d570FF80829277",
    {
      headers: {
        Authorization: "Bearer <access_token>",
      },
      agent: agent,
    }
  );

  const { result } = await resp.json();
  console.log("balance:", result);
}

readContract().catch((error) => {
  console.error("An error occurred:", error);
});
