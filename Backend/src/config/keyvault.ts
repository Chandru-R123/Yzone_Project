import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import dotenv from "dotenv";

dotenv.config();

const keyVaultName = process.env.KEY_VAULT_NAME;

if (!keyVaultName) {
  throw new Error("KEY_VAULT_NAME is not defined in environment variables");
}

const KVUri = `https://${keyVaultName}.vault.azure.net`;

export const keyVaultClient = new SecretClient(KVUri, new DefaultAzureCredential());
