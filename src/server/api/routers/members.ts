import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

import { createClient } from "~/utils/supabase/server";

export const memberRouter = createTRPCRouter({
    getAllSubmit: publicProcedure.query(async () => {
        const supabase = await createClient()
        let submit_messages: string[] | null = null;
        {
            const { data, error } = await supabase.from('profiles').select('submit_messages').eq('id', (await supabase.auth.getUser()).data.user!.id).limit(1).single()
            if (error) {
                console.log(error)
                return null
            }
            submit_messages = data.submit_messages
        }
        const { data, error } = await supabase.from('members').select('*').in('discord_id', submit_messages);
        if (error)
            console.log(error)
        return data ?? null
    }),
    getAllView: publicProcedure.query(async () => {
        const supabase = await createClient()
        let view_messages: string[] | null = null;
        {
            const { data, error } = await supabase.from('profiles').select('view_messages').eq('id', (await supabase.auth.getUser()).data.user!.id).limit(1).single()
            if (error) {
                console.log(error)
                return null
            }
            view_messages = data.view_messages
        }
        const { data, error } = await supabase.from('members').select('*').in('discord_id', view_messages);
        if (error)
            console.log(error)
        return data ?? null
    })
});