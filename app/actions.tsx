// "use server";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export async function login(formData: FormData) {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   //   if (!email || !password) {
//   //     throw new Error("Email and Password are required");
//   //   }

//   //   const pocket = new PocketBase(process.env.POCKETBASE_URL);

//   //   const { token, record: user } = await pocket
//   //     .collection("users")
//   //     .authWithPassword(email, password);

//   //   const cookie = JSON.stringify({ token, user });

//   //   cookies().set("pb_auth", cookie, {
//   //     path: "/",
//   //     httpOnly: true,
//   //     secure: process.env.NODE_ENV === "production",
//   //     sameSite: "lax",
//   //     // maxAge: 60 * 60 * 24 * 30,
//   //   });

//   //   return redirect("/");
// }

// export async function logout() {
//   cookies().delete("pb_auth");
//   redirect("/");
// }
