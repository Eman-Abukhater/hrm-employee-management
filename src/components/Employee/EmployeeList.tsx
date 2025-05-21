'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Box,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';

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

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = departmentFilter ? emp.department === departmentFilter : true;
      const matchesStatus = statusFilter ? emp.status === statusFilter : true;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Paper sx={{ padding: 3, overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Employee List
      </Typography>

      {/* Search and Filters */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        flexWrap="wrap"
        mb={3}
      >
        <TextField
          label="Search by name or email"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          sx={{ minWidth: 200 }}
        />

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={departmentFilter}
            label="Department"
            onChange={(e) => {
              setDepartmentFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <MenuItem value="">All Departments</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Table */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedEmployees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>
                <Avatar src={emp.profilePhoto} alt={emp.fullName} />
              </TableCell>
              <TableCell>{emp.fullName}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>{emp.role}</TableCell>
              <TableCell>{emp.status}</TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => router.push(`/employees/${emp.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => router.push(`/employees/edit/${emp.id}`)}
                  >
                    Edit
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <Box mt={3} display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Typography>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
}
