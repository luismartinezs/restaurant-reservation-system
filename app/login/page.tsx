import { LoginForm } from "@/features/auth";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {


  return (
    <LoginForm searchParams={searchParams} />
  );
}
