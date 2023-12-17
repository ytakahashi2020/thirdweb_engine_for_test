import { config } from "dotenv";
config();

import fetch from "node-fetch";
import https from "https";
import { CONTRACT_ADDRESS, BACKEND_WALLET_ADDRESS } from "./constants.js";

// ローカルテスト用のための設定。本番ではセキュリティリスクのため行わない
const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function readContract() {
  console.log("contract address:", CONTRACT_ADDRESS);
  const resp = await fetch(
    // `https://localhost:3005/contract/mumbai/${CONTRACT_ADDRESS}/read?functionName=${FUNCTION_NAME}&args=${ARGS}`,
    `https://localhost:3005/contract/mumbai/${CONTRACT_ADDRESS}/read?functionName=balanceOf&args=${BACKEND_WALLET_ADDRESS}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
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
