"use server"

export async function create(formData: FormData) {

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log();

}