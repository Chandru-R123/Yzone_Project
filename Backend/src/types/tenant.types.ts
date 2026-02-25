export interface Tenant {
  id?: string;
  name: string;
  code: string; // unique tenant identifier
  address?: string;
  contactEmail?: string;
  createdAt?: Date;
}