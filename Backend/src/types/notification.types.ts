export interface Notification {
  id?: string;
  tenantId: string;
  userId: string;
  title: string;
  message: string;
  type: "EMAIL" | "WHATSAPP" | "SYSTEM";
  isRead?: boolean;
  createdAt?: Date;
}