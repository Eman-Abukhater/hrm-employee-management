import { EmployeeFormType } from "@/lib/validation/employeeSchema";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "lib", "data", "employees.json");

export function readEmployees() {
  if (!fs.existsSync(filePath)) return [];
  const fileData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileData);
}

export function writeEmployees(employees: EmployeeFormType[]) {
  fs.writeFileSync(filePath, JSON.stringify(employees, null, 2));
}
