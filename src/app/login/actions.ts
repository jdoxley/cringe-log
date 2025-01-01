'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { env } from '~/env'

import { createClient } from '~/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signInWithDiscord() {
    const supabase = await createClient()
    console.log(env.NEXT_PUBLIC_URL)
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'discord', options: { redirectTo: `${env.NEXT_PUBLIC_URL}/auth/callback` } })
    if (error) {
        console.log(error)
        redirect('/error')
    }
    if (data.url) {
        redirect(data.url)
    }
}