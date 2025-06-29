'use server';

import { auth } from '@clerk/nextjs/server';

import { createSupabaseClient } from '@/lib/supabase';

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('companions')
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    throw new Error(`Failed to create companion: ${error?.message || 'Unknown error'}`);
  }

  return data[0];
};
