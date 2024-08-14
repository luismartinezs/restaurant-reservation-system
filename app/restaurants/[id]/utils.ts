import invariant from "tiny-invariant";
import { Id } from "@/features/restaurants";


export type PageProps = { params: { id: string } };

export function validateParams(params: any): params is PageProps["params"] {
  return typeof params.id === "string";
}

export function getParamId(params: any): Id {
  invariant(validateParams(params), "Invalid params");

  const { id } = params;

  const numId = parseInt(id, 10);

  invariant(!isNaN(numId), "id must be a number");

  return numId;
}