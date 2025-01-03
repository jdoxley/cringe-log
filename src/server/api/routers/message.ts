import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

import { createClient } from "~/utils/supabase/server";
import { memberRouter } from "./members";
import { snowflakeToUnixString } from "~/utils/snowlfake";

export const messageRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({
            snowflake: z.string(), channel_id: z.string(), posted_by: z.string(), message_conent: z.string().nullable(), cringe: z.boolean()
        }))
        .mutation(async ({ input, ctx: { supabase, userId } }) => {
            const { data, error } = await supabase.from('messages').insert(
                {
                    channel_id: input.channel_id,
                    posted_by: input.posted_by,
                    snowflake: input.snowflake,
                    submitted_by: userId!,
                    message_content: input.message_conent,
                    cringe: input.cringe
                }
            ).select()
            if (error)
                console.log(error)
            return data ?? null;
        }),
    getMessages: publicProcedure.query(async ({ ctx: { supabase, userId } }) => {
        const { data: d, error: e } = await supabase.from('profiles').select('view_messages').eq('id', userId!).limit(1).single();
        const { data, error } = await supabase.from('messages').select().in('posted_by', d!.view_messages).order('snowflake');
        if (error)
            console.log(error)
        const newdata = data?.map((e) => {
            const posted_at = new Date(snowflakeToUnixString(e.snowflake) * 1000)
            return { ...e, posted_at }
        })
        return newdata ?? null;
    })
});