import fs from "fs";
import path from "path";

const CURRENT_USER_PATH = path.join(process.cwd(), "src/data/currentUser.json");

export function getCurrentUser() {
  try {
    const data = fs.readFileSync(CURRENT_USER_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: any) {
  fs.writeFileSync(CURRENT_USER_PATH, JSON.stringify(user, null, 2));
}

export function clearCurrentUser() {
  fs.writeFileSync(CURRENT_USER_PATH, "null");
}
