import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

import { createClient } from "~/utils/supabase/server";

export const profileRouter = createTRPCRouter({
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const supabase = await createClient();
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', input.id)
                .single();
            if (error) {
                console.log(error);
                return null;
            }
            return profile;
        }),
    update: publicProcedure
        .input(z.object({
            id: z.string(), created_at: z.string(), submit_messages: z.array(z.string()), view_messages: z.array(z.string()),
            name: z.string().nullable(), picture: z.string().nullable(), discord_id: z.string().nullable()
        }))
        .mutation(async ({ input: profile }) => {
            const supabase = await createClient();
            const { data, error } = await supabase
                .from('profiles')
                .update(profile)
                .eq('id', profile.id)
                .select();
            if (error) {
                console.log(error)
                return null;
            }
            return data;
        }),
    getAllProfiles: publicProcedure
        .query(async () => {
            const supabase = await createClient();
            const { data, error } = await supabase
                .from('profiles')
                .select();
            if (error) {
                console.log(error);
                return null;
            }
            return data;
        })
})