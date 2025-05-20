import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
    Avatar,
  } from '@mui/material';
  import { useRouter } from 'next/navigation';
  
  interface Employee {
    id: string;
    fullName: string;
    email: string;
    department: string;
    role: string;
    status: string;
    profilePhoto: string;
  }
  
  export default function EmployeeList({ employees }: { employees: Employee[] }) {
    const router = useRouter();
  
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(emp => (
              <TableRow key={emp.id}>
                <TableCell><Avatar src={emp.profilePhoto} /></TableCell>
                <TableCell>{emp.fullName}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.role}</TableCell>
                <TableCell>{emp.status}</TableCell>
                <TableCell>
                  <Button onClick={() => router.push(`/employees/${emp.id}`)}>View</Button>
                  <Button onClick={() => router.push(`/employees/edit/${emp.id}`)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  