let employees: any[] = []; // Temporary storage (in-memory for now)

export async function GET() {
  return Response.json(employees);
}

export async function POST(request: Request) {
  const newEmployee = await request.json();
  employees.push(newEmployee);
  return Response.json({ success: true });
}
