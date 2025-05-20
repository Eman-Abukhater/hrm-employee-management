import { EmployeeFormType } from "@/lib/validation/employeeSchema";
const employees: EmployeeFormType[] = [];

export async function POST(req: Request) {
  const body = await req.json();
  employees.push(body); 
  return Response.json({ message: 'Employee added' });
}

export async function GET() {
  return Response.json(employees);
}
