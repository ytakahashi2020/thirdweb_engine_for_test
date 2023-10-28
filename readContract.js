import fetch from "node-fetch";
import https from "https";

// ローカルテスト用のための設定。本番ではセキュリティリスクのため行わない
const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function readContract() {
  const resp = await fetch(
    "https://localhost:3005/contract/mumbai/<contract_address>/read?functionName=<function_name>&args=<args>",
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
