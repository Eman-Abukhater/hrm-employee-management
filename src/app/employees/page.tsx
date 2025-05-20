'use client';

import { useEmployees } from '@/lib/hooks/useEmployees';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import EmployeeList from '@/components/Employee/EmployeeList';

export default function EmployeeListPage() {
  const { data, isLoading } = useEmployees();

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Employee Management
      </Typography>

      {isLoading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <EmployeeList employees={data || []} />
      )}
    </Container>
  );
}