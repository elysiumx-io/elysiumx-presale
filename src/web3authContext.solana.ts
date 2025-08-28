import {WEB3AUTH_NETWORK } from "@web3auth/modal";
import { type Web3AuthContextConfig } from "@web3auth/modal/react";

const clientId = "BC5dL3f8Bn4vOO1LjC499LshGqwzthRjYKSXRZLWlwuEhbKAUxxxul1jC57VPL1ZnV-GT0sweRK_qko-KbXUxWg"; // get from https://dashboard.web3auth.io

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  }
};

export default web3AuthContextConfig;
