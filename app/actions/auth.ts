"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(
  email: string,
  password: string
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return "Incorrect email or password. Try the demo accounts.";
      }
      return "Something went wrong.";
    }
    throw error; // Re-throw redirect so Next.js handles navigation
  }
}
