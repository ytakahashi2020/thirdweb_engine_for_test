import { config } from "dotenv";
config();

import fetch from "node-fetch";
import https from "https";
import { CONTRACT_ADDRESS, BACKEND_WALLET_ADDRESS } from "./constants.js";

// ローカルテスト用のための設定。本番ではセキュリティリスクのため行わない
const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function writeContract() {
  const resp = await fetch(
    `https://localhost:3005/contract/mumbai/${CONTRACT_ADDRESS}/write`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "x-backend-wallet-address": `${BACKEND_WALLET_ADDRESS}`,
      },
      body: JSON.stringify({
        functionName: "burn",
        args: ["500000000000000"],
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
