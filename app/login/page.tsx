import { LoginForm } from "@/features/auth/server";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {


  return (
    <LoginForm searchParams={searchParams} />
  );
}
