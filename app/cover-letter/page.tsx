import CoverLetter from "@/components/cover-letter";
import { supabaseServer } from "@/utils/supabase/server";
import React from "react";

export default async function Page() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();

  return (
    <div className="mt-12">
      <CoverLetter user={data.user} />
    </div>
  );
}
