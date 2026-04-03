import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Service Role Key is preferred to bypass RLS, but ANON key works if inserts are public.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error("CRITICAL: Supabase environment variables missing!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
    try {
        const { fullName, email, mobile } = await req.json();

        if (!fullName || !email) {
            return NextResponse.json(
                { error: 'Full name and email are required.' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('users')
            .insert([
                { username: fullName, email, phone: mobile || null }
            ])
            .select();

        if (error) {
            if (error.code === '23505') {
                return NextResponse.json(
                    { error: 'This email is already on the waitlist.' },
                    { status: 400 }
                );
            }
            throw error;
        }

        return NextResponse.json({ message: 'Successfully joined the waitlist!' });

    } catch (error) {
        console.error('Waitlist POST error:', error);
        return NextResponse.json(
            { error: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}
