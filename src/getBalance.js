import { config } from "dotenv";
config();
import fetch from "node-fetch";
import https from "https";
import { BACKEND_WALLET_ADDRESS } from "./constants.js";

// ローカルテスト用のための設定。本番ではセキュリティリスクのため行わない
const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function getWalletBalance() {
  const resp = await fetch(
    `https://localhost:3005/backend-wallet/mumbai/${BACKEND_WALLET_ADDRESS}/get-balance`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
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
