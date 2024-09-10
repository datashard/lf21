import { getUsernameByID } from "@/lib/clerk";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { userId: id } = auth();
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return new Response("No userId provided", { status: 400 });
  }
  const user = await getUsernameByID(userId);

  if (!id) {
    return new Response(JSON.stringify({ username: user.username }));
  }

  return new Response(JSON.stringify(user));
}
