export interface Tenant {
  id: number;
  collegeName: string;
  principalName: string;
  email: string;
  phone: string;
  address: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
}
