import "server-only"

import { AdminUserAttributes, AuthMFAAdminDeleteFactorParams, GenerateLinkParams } from "@supabase/supabase-js"

import { createClient } from "@/lib/supabase/admin";

export function api() {
  const supabase = createClient()
  const { admin } = supabase.auth

  const getAll = async (page = 1, perPage = 50) => {
    const { data, error } = await admin.listUsers({
      page,
      perPage
    });
    return { data, error };
  }

  const getById = async (uid: string) => {
    const { data, error } = await admin.getUserById(uid);
    return { data, error };
  }

  const create = async (attributes: AdminUserAttributes) => {
    const { data, error } = await admin.createUser(attributes);
    return { data, error };
  }

  const update = async (uid: string, attributes: AdminUserAttributes) => {
    const { data, error } = await admin.updateUserById(uid, attributes);
    return { data, error };
  }

  const remove = async (id: string, shouldSoftDelete = false) => {
    const { data, error } = await admin.deleteUser(id, shouldSoftDelete);
    return { data, error };
  }

  const invite = async (email: string, options: {
    data?: object
    redirectTo?: string
  } = {}) => {
    const { data, error } = await admin.inviteUserByEmail(email, options);
    return { data, error };
  }

  const generateLink = async (params: GenerateLinkParams) => {
    const { data, error } = await admin.generateLink(params);
    return { data, error };
  }

  const listMFAFactors = async (userId: string) => {
    const { data, error } = await admin.mfa.listFactors({ userId });
    return { data, error };
  }

  const deleteMFAFactor = async (params: AuthMFAAdminDeleteFactorParams) => {
    const { data, error } = await admin.mfa.deleteFactor(params);
    return { data, error };
  }

  return {
    getAll,
    getById,
    create,
    update,
    remove,
    invite,
    generateLink,
    listMFAFactors,
    deleteMFAFactor
  }
}