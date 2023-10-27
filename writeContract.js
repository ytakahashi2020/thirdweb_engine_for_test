import fetch from "node-fetch";
import https from "https";

// ローカルテスト用のための設定。本番ではセキュリティリスクのため行わない
const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function writeContract() {
  const resp = await fetch(
    "https://localhost:3005/contract/mumbai/0xe899877b5363A28b4df29fb9610F116c946b522e/write",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer <access_token>",
        "x-backend-wallet-address":
          "0xdc63ac3b4676cf6d7be02c47e704460bf70988ef",
      },
      body: JSON.stringify({
        function_name: "burn",
        args: ["0"],
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
