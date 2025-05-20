"use client";

import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  employeeSchema,
  EmployeeFormType,
} from "@/lib/validation/employeeSchema";

export default function AddEmployeePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormType>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = (data: EmployeeFormType) => {
    console.log("✅ Submitted:", data);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Add New Employee
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            {/* Full Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                fullWidth
                {...register("fullName")}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                fullWidth
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>

            {/* Department */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Department"
                fullWidth
                {...register("department")}
                error={!!errors.department}
                helperText={errors.department?.message}
              />
            </Grid>

            {/* Role */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Role"
                fullWidth
                {...register("role")}
                error={!!errors.role}
                helperText={errors.role?.message}
              />
            </Grid>

            {/* Join Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Join Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("joinDate")}
                error={!!errors.joinDate}
                helperText={errors.joinDate?.message}
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.status}>
                <InputLabel>Status</InputLabel>
                <Select defaultValue="" label="Status" {...register("status")}>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="caption" color="error">
                {errors.status?.message}
              </Typography>
            </Grid>

            {/* Profile Photo */}
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Profile Photo
                <input type="file" hidden {...register("profilePhoto")} />
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box textAlign="right">
                <Button type="submit" variant="contained" color="primary">
                  Add Employee
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
