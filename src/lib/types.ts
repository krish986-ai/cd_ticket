export interface User {
  uid: string;
  email: string;
  displayName: string;
  phone: string;
  collegeId: string;
  department: string;
  year: string;
  photoURL?: string;
  photoBase64?: string;
  ticketNumber?: string;
  qrCodeData?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  checkedIn: boolean;
  checkedInAt?: Date;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: "superadmin" | "admin";
  createdAt: Date;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  maxCapacity: number;
  currentRegistrations: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ticket {
  id: string;
  userId: string;
  ticketNumber: string;
  qrCodeData: string;
  eventId: string;
  status: "pending" | "confirmed" | "checked-in" | "cancelled";
  createdAt: Date;
  verifiedAt?: Date;
}

export interface RegistrationFormData {
  displayName: string;
  email: string;
  phone: string;
  collegeId: string;
  department: string;
  year: string;
  password: string;
  confirmPassword: string;
  photo: File | null;
}

export interface AdminLoginData {
  password: string;
}

export interface DatabaseCleanupData {
  password: string;
}

export interface ExportFilters {
  department?: string;
  year?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface DashboardStats {
  totalRegistrations: number;
  verifiedUsers: number;
  checkedIn: number;
  pendingVerification: number;
  byDepartment: Record<string, number>;
  byYear: Record<string, number>;
  recentRegistrations: User[];
}

export type UserStatus = "all" | "verified" | "pending" | "checked-in";