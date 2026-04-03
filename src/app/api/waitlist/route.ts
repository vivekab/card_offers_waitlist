import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(req: Request) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseKey) {
        console.error("CRITICAL: Supabase environment variables missing!");
    }

    const supabase = createClient(supabaseUrl || 'https://dummy.supabase.co', supabaseKey || 'dummy');

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { fullName, email, mobile } = await req.json();

        if (!fullName || !email) {
            return NextResponse.json(
                { error: 'Full name and email are required.' },
                { status: 400 }
            );
        }

        // I have re-enabled the Supabase DB insertion for you so the flow is fully complete!
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

        // Try to send an automated response if Resend is configured
        if (process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: process.env.RESEND_FROM_EMAIL || 'Mera Card Team <onboarding@resend.dev>',
                    to: email,
                    subject: 'Welcome to the Mera Card Waitlist! 🎉',
                    html: `
                        <p>Hi <b>${fullName}</b>,</p>
                        <p>Thank you for joining the <b>Mera Card</b> waitlist! We are thrilled to have you on board.</p>
                        <p>We will notify you the moment we launch so you can start maximizing your credit card rewards.</p>
                        <br/>
                        <p>Best,<br/>The Mera Card Team</p>
                    `,
                });
            } catch (emailError) {
                console.error('Failed to send welcome email via Resend:', emailError);
            }
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
