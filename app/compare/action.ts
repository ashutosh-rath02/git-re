"use server";

import { supabaseServer } from "@/utils/supabase/server";

const supabase = supabaseServer();

export async function fetchSuggestions() {
    try {
        const { data, error } = await supabase.from("recent_users")
            .select("*", { count: "exact" })
            .neq("rating", "-0.1")
            .order("rating", { ascending: false })

        if (error) throw error;

        return data;
    } catch (error) {
        throw error;
    }
}


export async function createUser(username: string) {
    try {
        const { data, error } = await supabase.from("recent_users")
            .insert([{ username }])

        if (error) throw error;

        return data;
    } catch (error) {
        throw error;
    }
}