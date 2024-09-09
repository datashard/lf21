"use server";

import { createClerkClient } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function getUsernameByID(userId: string) {
  const user = await clerkClient.users.getUser(userId);
  return user;
}
