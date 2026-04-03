'use client';

import { useState } from 'react';

export default function Home() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, mobile }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully joined the waitlist!');
        setFullName('');
        setEmail('');
        setMobile('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to join waitlist.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/70 backdrop-blur-xl shadow-sm">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-900">account_balance_wallet</span>
            <span className="text-xl font-extrabold text-blue-900 tracking-tighter font-headline">
              Mera Card
            </span>
          </div>
          <button className="bg-primary text-on-primary px-5 py-2 rounded-full font-headline font-bold text-sm hover:opacity-80 transition-opacity active:scale-95 duration-200">
            Join Waitlist
          </button>
        </nav>
      </header>

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container mb-8 font-label text-[10px] uppercase tracking-widest font-bold">
            Coming Soon to India
          </div>
          <h1 className="font-headline text-4xl md:text-7xl font-extrabold tracking-tight text-primary mb-6 leading-tight">
            Never miss the best <br className="hidden md:block" /> card offer again.
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
            Mera Card helps you find the best credit card to use for every purchase, track offers in one
            place, and maximize cashback and rewards.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary rounded-xl font-headline font-bold text-lg ambient-shadow premium-gradient hover:opacity-90 transition-all active:scale-95 text-center"
              href="#waitlist"
            >
              Join the Waitlist
            </a>
            <a
              className="flex items-center justify-center gap-2 font-headline font-bold text-primary hover:text-secondary transition-colors group"
              href="#how-it-works"
            >
              See how it works
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-2 text-on-surface-variant/60 font-label text-sm">
            <span className="material-symbols-outlined text-base">verified_user</span>
            Built for Indian credit card users.
          </div>
        </section>

        {/* Product Preview (Bento-style Card) */}
        <section className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-surface-container-lowest rounded-[2.5rem] p-8 md:p-12 ambient-shadow overflow-hidden group">
              {/* Decorative Gradient */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary-fixed rounded-full blur-[80px] opacity-40"></div>
              <div className="relative grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed font-label text-xs font-bold mb-4">
                    OPTIMIZED RECOMMENDATION
                  </span>
                  <h2 className="font-headline text-3xl font-bold text-primary mb-4 leading-snug">
                    The right card for every cart.
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed">
                    Stop guessing which card to swipe. Our smart engine analyzes 100+ Indian credit card offers
                    in real-time to maximize your savings.
                  </p>
                </div>
                {/* Mockup Card */}
                <div className="bg-surface-container-low rounded-3xl p-6 ambient-shadow border border-white/40">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-orange-500">shopping_bag</span>
                      </div>
                      <div>
                        <div className="font-headline font-bold text-on-surface">Amazon</div>
                        <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                          Merchant
                        </div>
                      </div>
                    </div>
                    <div className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 rounded-full text-[10px] font-black">
                      SAVE RS. 500
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-outline-variant/10">
                      <div className="w-12 h-8 bg-blue-800 rounded-md relative overflow-hidden shrink-0">
                        <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] text-on-surface-variant font-bold">RECOMMENDED CARD</div>
                        <div className="font-headline font-bold text-sm text-primary">HDFC Millennia</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-surface-container-highest/40 rounded-2xl p-3">
                        <div className="text-[10px] text-on-surface-variant font-bold mb-1">OFFER</div>
                        <div className="font-headline font-bold text-xs text-primary">10% cashback</div>
                      </div>
                      <div className="bg-surface-container-highest/40 rounded-2xl p-3">
                        <div className="text-[10px] text-on-surface-variant font-bold mb-1">EXPIRES</div>
                        <div className="font-headline font-bold text-xs text-error">12 days left</div>
                      </div>
                    </div>
                    <div className="bg-secondary-fixed/50 rounded-2xl p-4 text-center">
                      <div className="text-[10px] text-secondary font-black uppercase tracking-widest mb-1">
                        REWARD VALUE
                      </div>
                      <div className="font-headline font-extrabold text-2xl text-secondary">
                        Rs. 350 <span className="text-sm font-medium opacity-60 italic">est.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works & Benefits */}
        <section className="px-6 py-20 bg-surface-container-low" id="how-it-works">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-primary mb-4">
                Smart spending made simple.
              </h2>
              <p className="text-on-surface-variant">The only tool you need to master your wallet.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-surface rounded-3xl p-8 transition-transform hover:-translate-y-2 duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">search</span>
                </div>
                <h3 className="font-headline font-bold text-xl mb-3">Search Merchant</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Looking for a new gadget or dinner? Just search the merchant or category in the vault.
                </p>
              </div>
              {/* Step 2 */}
              <div className="bg-surface rounded-3xl p-8 transition-transform hover:-translate-y-2 duration-300">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-secondary text-3xl">magic_button</span>
                </div>
                <h3 className="font-headline font-bold text-xl mb-3">See Best Card</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Instantly see which of your cards offers the highest discount or reward points for that specific
                  buy.
                </p>
              </div>
              {/* Step 3 */}
              <div className="bg-surface rounded-3xl p-8 transition-transform hover:-translate-y-2 duration-300">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-on-tertiary-fixed text-3xl">
                    notifications_active
                  </span>
                </div>
                <h3 className="font-headline font-bold text-xl mb-3">Save & Remind</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Save trending offers and get automated reminders before they expire. Never miss a 10% off again.
                </p>
              </div>
            </div>
            <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">check_circle</span>
                <div>
                  <div className="font-bold text-primary">Save money automatically</div>
                  <div className="text-xs text-on-surface-variant mt-1">Average users save Rs. 1,200/mo</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">check_circle</span>
                <div>
                  <div className="font-bold text-primary">Stop missing discounts</div>
                  <div className="text-xs text-on-surface-variant mt-1">Real-time bank offer alerts</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">check_circle</span>
                <div>
                  <div className="font-bold text-primary">Track multiple cards</div>
                  <div className="text-xs text-on-surface-variant mt-1">One dashboard for all banks</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">check_circle</span>
                <div>
                  <div className="font-bold text-primary">Clear reward value</div>
                  <div className="text-xs text-on-surface-variant mt-1">Point-to-rupee calculations</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Form Section */}
        <section className="px-6 py-24" id="waitlist">
          <div className="max-w-xl mx-auto bg-surface-container-lowest rounded-[3rem] p-10 md:p-14 ambient-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <span className="material-symbols-outlined text-6xl text-primary/5">lock</span>
            </div>
            <div className="relative text-center mb-10">
              <h2 className="font-headline text-3xl font-extrabold text-primary mb-2">Reserve your spot.</h2>
              <p className="text-on-surface-variant">Get early access and founding member updates.</p>
            </div>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-tertiary-fixed text-on-tertiary-fixed rounded-2xl text-center font-bold">
                {message}
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-2xl text-center font-bold">
                {message}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                  Full Name
                </label>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-secondary focus:bg-secondary-fixed transition-all text-on-surface placeholder:text-outline"
                  placeholder="John Doe"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                  Email Address
                </label>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-secondary focus:bg-secondary-fixed transition-all text-on-surface placeholder:text-outline"
                  placeholder="john@example.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                  Mobile Number (Optional)
                </label>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-secondary focus:bg-secondary-fixed transition-all text-on-surface placeholder:text-outline"
                  placeholder="+91 XXXXX XXXXX"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <button
                className="w-full py-5 bg-primary text-on-primary rounded-2xl font-headline font-bold text-lg ambient-shadow premium-gradient hover:opacity-90 active:scale-95 transition-all mt-4 disabled:opacity-50"
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Submitting...' : 'Reserve My Spot'}
              </button>
            </form>
            {/* Referral Section */}
            <div className="mt-12 pt-10 border-t border-outline-variant/10">
              <div className="flex items-center justify-between mb-4">
                <div className="font-headline font-bold text-primary">Share and move up.</div>
                <div className="text-[10px] font-bold text-secondary uppercase tracking-tighter">
                  Referral Status
                </div>
              </div>
              <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-1/3 rounded-full relative">
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-bold text-on-surface-variant">
                <span>YOU</span>
                <span>NEXT MILESTONE</span>
              </div>
              <p className="mt-6 text-center text-xs text-on-surface-variant">
                Early access is granted in batches. Refer 3 friends to skip 5,000 spots instantly.
              </p>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full py-12 bg-slate-100">
        <div className="flex flex-col items-center space-y-6 px-8 text-center max-w-7xl mx-auto">
          <div className="text-lg font-black text-blue-900 tracking-tighter font-headline">Mera Card</div>
          <p className="text-slate-500 max-w-md text-sm">
            We respect your privacy. No spam. Your details are used only for early access updates.
          </p>
          <div className="flex gap-8">
            <a
              className="text-slate-500 hover:text-blue-600 transition-colors font-label text-xs font-medium uppercase tracking-widest"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-slate-500 hover:text-blue-600 transition-colors font-label text-xs font-medium uppercase tracking-widest"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-slate-500 hover:text-blue-600 transition-colors font-label text-xs font-medium uppercase tracking-widest"
              href="#"
            >
              Security
            </a>
          </div>
          <div className="pt-8 border-t border-slate-200 w-full">
            <p className="text-slate-400 font-label text-[10px] font-medium uppercase tracking-[0.2em]">
              © 2024 Mera Card. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
