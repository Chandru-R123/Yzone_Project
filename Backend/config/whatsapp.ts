import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;

if (!WHATSAPP_API_URL || !WHATSAPP_API_TOKEN) {
  throw new Error("WhatsApp API configuration is missing in environment variables");
}

export const sendWhatsAppMessage = async (to: string, message: string) => {
  try {
    const response = await axios.post(
      `${WHATSAPP_API_URL}/messages`,
      {
        to,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error sending WhatsApp message:", err);
    throw err;
  }
};
