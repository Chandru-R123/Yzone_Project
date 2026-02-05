// frontend/config/azureBlob.ts
import { BlobServiceClient } from "@azure/storage-blob";

// Blob Storage connection string (from .env)
const AZURE_STORAGE_CONNECTION_STRING =
  process.env.REACT_APP_AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error(
    "Azure Storage Connection string not found. Check .env"
  );
}

export const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);

// Example function to upload a file
export const uploadFileToBlob = async (
  containerName: string,
  file: File
) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(file.name);
  await blockBlobClient.uploadBrowserData(file);
  return blockBlobClient.url;
};
