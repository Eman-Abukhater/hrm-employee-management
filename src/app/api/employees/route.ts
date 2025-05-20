import { readEmployees, writeEmployees } from "@/utils/employeeStorage";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const body = await req.json();
  const employees = readEmployees();

  const newEmployee = {
    ...body,
    id: uuidv4(), // Ensure unique ID
  };

  employees.push(newEmployee);
  writeEmployees(employees);

  return Response.json({ message: "Employee added", employee: newEmployee });
}

export async function GET() {
  const employees = readEmployees();
  return Response.json(employees);
}
