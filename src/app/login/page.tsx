"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (res.ok) {
        const data = await res.json();
        const role = data.user.role;
      
        if (role === "admin") {
          router.push("/admin");
        } else if (role === "hr") {
          router.push("/hr");
        } else {
          router.push("/employee");
        }
      }
      
    } catch (err) {
      setError("Unexpected error occurred");
      console.error("Login error:", err);
    }
  };
  

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" mb={2}>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
