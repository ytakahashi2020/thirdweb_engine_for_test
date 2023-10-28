import fetch from "node-fetch";
import https from "https";

// ローカルテスト用のための設定。本番ではセキュリティリスクのため行わない
const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function writeContract() {
  const resp = await fetch(
    "https://localhost:3005/contract/mumbai/<contract_address>/write",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer <access_token>",
        "x-backend-wallet-address": "<backend_wallet_address>",
      },
      body: JSON.stringify({
        functionName: "<function>",
        args: ["<arg1>", "<arg2>", "<arg3>"],
      }),
      agent: agent,
    }
  );

  const { result } = await resp.json();
  // queueId is a reference to the transaction queued by Engine.
  console.log("Queue ID:", result.queueId);
}

writeContract().catch((error) => {
  console.error("An error occurred:", error);
});
