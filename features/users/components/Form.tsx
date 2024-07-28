import { redirect } from "next/navigation";

import { Box, Title, Stack, Button, TextInput } from "@mantine/core";
// import { z } from 'zod'

import { KEY } from "../constants";
import { api } from "../api";
import { User } from "@supabase/supabase-js";

// const schema = z.object({
//   email: z.string().email(),
// })

function getFormData(formData: FormData) {
  return {
    email: formData.get("email") as string,
  };
}

function validate(formData: FormData) {
  // try {
  //   schema.parse(getFormData(formData))
  //   return true
  // } catch (err) {
  //   return err
  // }
  const { email } = getFormData(formData);

  if (!email) {
    return "Missing required fields";
  }

  return true;
}

const Form = ({ initialData }: { initialData?: User }) => {
  const { id, email } = initialData || {};
  const isEdit = typeof id !== "undefined";

  async function submit(formData: FormData) {
    "use server";

    const validated = validate(formData);

    if (validated !== true) {
      return validated;
    }

    const { create, update } = api();

    const submitHandler = isEdit
      ? update.bind(null, id, getFormData(formData))
      : create.bind(null, getFormData(formData));

    const {
      data: { user },
      error,
    } = await submitHandler();

    if (user) {
      redirect(`/scaffold/${KEY}/${user.id}`);
    }
  }
  return (
    <Box mx="auto">
      <Title order={2} mb="md">
        Create New User
      </Title>
      <form>
        <Stack>
          <TextInput label="Email" defaultValue={email} name="email" />
          <Button type="submit" formAction={submit}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export { Form };
