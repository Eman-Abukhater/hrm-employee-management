import { z } from 'zod';

export const employeeSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone number is required'),
  department: z.string().min(1, 'Department is required'),
  role: z.string().min(1, 'Role is required'),
  joinDate: z.string().min(1, 'Join date is required'),
  status: z.enum(['Active', 'Inactive']),
  profilePhoto: z.any().optional(), // for file upload (handled separately)
});

export type EmployeeFormType = z.infer<typeof employeeSchema>;
