import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { setCurrentUser } from "@/utils/currentUser";
import { getCurrentUser } from "@/utils/currentUser";

export async function GET() {
    const user = getCurrentUser();
    return NextResponse.json({ user });
  }
  

const USERS_PATH = path.join(process.cwd(), "src", "lib", "data", "users.json");
export async function POST(req: Request) {
    try {
      const bodyText = await req.text();
      if (!bodyText) {
        return NextResponse.json({ message: "Empty request body" }, { status: 400 });
      }
  
      const { email, password } = JSON.parse(bodyText);
  
      const usersData = fs.readFileSync(USERS_PATH, "utf-8");
      const users = JSON.parse(usersData);
  
      const user = users.find((u: any) => u.email === email && u.password === password);
  
      if (user) {
        setCurrentUser(user);
        return NextResponse.json({ message: "Login successful", user });
      } else {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }
    } catch (error) {
      console.error("Login error:", error);
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }
  }
  
