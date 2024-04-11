import { supabaseServer } from "@/utils/supabase/server";
export const getUserData = async () => {
  const supabase = supabaseServer();
  const user = await supabase.auth.getUser();
  return user.data;
};
