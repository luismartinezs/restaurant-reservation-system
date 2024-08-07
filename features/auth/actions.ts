"use server"

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { createClient } from "@/lib/supabase/server";

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export const signIn = async (payload: { redirect?: string }, prevState: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  if (payload.redirect) {
    return redirect(payload.redirect);
  }

  return redirect("/account");
};

export const signUp = async (payload: { redirect?: string }, prevState: any, formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }
  if (payload.redirect) {
    return redirect(payload.redirect);
  }

  return redirect("/login?message=Check email to continue sign in process");
};

export const googleSignIn = async (payload: { redirect?: string }) => {
  const origin = headers().get("origin");
  const supabase = createClient();
  const redirectToBaseUrl = `${origin}/auth/callback/google`;
  const redirectToParams = payload.redirect ?  `?next=${payload.redirect}` : '';
  const redirectToUrl = `${redirectToBaseUrl}${redirectToParams}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectToUrl,
    },
  })

  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
}