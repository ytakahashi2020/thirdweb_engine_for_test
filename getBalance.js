import fetch from "node-fetch";
import https from "https";

// ローカルテスト用のための設定。本番ではセキュリティリスクのため行わない
const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function getWalletBalance() {
  const resp = await fetch(
    "https://localhost:3005/backend-wallet/mumbai/0xa08832afda063bddca5f146ae279545dbd34df14/get-balance",
    {
      headers: {
        Authorization: "Bearer <access_token>",
      },
      agent: agent,
    }
  );

  const { result } = await resp.json();
  console.log("Balance:", result.value);
}

getWalletBalance().catch((error) => {
  console.error("An error occurred:", error);
});
