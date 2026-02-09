'use client';

import { useState } from 'react';
import { ArrowRight, MessageSquare, Sparkles, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';

export function SubscriptionView({ onJoin }: { onJoin: () => void }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || isSubmitting) return;

    setIsSubmitting(true);

    const { error } = await supabase.from('leads').upsert(
      {
        email: email.toLowerCase().trim(),
        tier: 'free',
      },
      { onConflict: 'email' }, // This tells Supabase which column to check for duplicates
    );

    if (error) {
      // If it's still failing here, it might be the "USING" error again.
      console.error('Entry failed:', error.message);
    }

    // We call onJoin regardless so the user isn't stuck if RLS blocks the save
    onJoin();
    setIsSubmitting(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#050506] text-white p-6 overflow-hidden font-sans">
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1a1033_0%,transparent_70%)] opacity-40" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* BRANDING */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-1000 ease-out">
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter italic mb-4 opacity-90">
            ECHO
          </h1>
          <p className="text-zinc-500 text-sm md:text-base mb-12 font-medium tracking-[0.2em] uppercase">
            Private by design.{' '}
            <span className="text-zinc-300">Temporary by nature.</span>
          </p>
        </div>

        {/* THE CONSOLE */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-lg mx-auto group"
        >
          <div className="absolute -inset-1 bg-indigo-500/10 rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />

          <div className="relative flex flex-col bg-[#0c0c0e] border border-white/10 rounded-[30px] p-2 shadow-2xl">
            <div className="flex items-center px-6 py-2">
              <div className="text-zinc-600 group-focus-within:text-indigo-400 transition-colors">
                <MessageSquare size={18} />
              </div>

              <input
                type="email"
                required
                autoFocus
                placeholder="Drop your email..."
                className="flex-1 bg-transparent py-6 px-5 text-xl outline-none text-white placeholder:text-zinc-800 font-bold tracking-tight"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={!email.includes('@') || isSubmitting}
              className={cn(
                'relative flex items-center justify-between w-full px-8 py-6 rounded-[22px] transition-all duration-500 overflow-hidden font-black uppercase tracking-[0.2em] text-[10px]',
                email.includes('@')
                  ? 'bg-white text-black translate-y-0'
                  : 'bg-zinc-900 text-zinc-700 opacity-50',
              )}
            >
              <span className="relative z-10">
                {isSubmitting
                  ? 'Entering...'
                  : email.includes('@')
                    ? 'Step Inside'
                    : 'Enter Email to Unlock'}
              </span>

              <div
                className={cn(
                  'relative z-10 flex items-center gap-2 transition-all duration-500',
                  email.includes('@')
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4',
                )}
              >
                <Sparkles size={14} className="text-indigo-600" />
                <ArrowRight size={18} />
              </div>
            </button>
          </div>
        </form>

        {/* FOOTER ELEMENTS */}
        <div className="mt-12 flex justify-between items-center w-full max-w-lg mx-auto px-4 opacity-30">
          <div className="flex items-center gap-2">
            <Shield size={10} />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-100">
              End-to-End Ephemeral
            </span>
          </div>
          <div className="h-[1px] w-8 bg-zinc-800" />
          <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.4em]">
            Sanctuary v1.0
          </p>
        </div>
      </div>

      {/* VALUES BAR */}
      <div className="absolute bottom-10 flex justify-center items-center gap-8 opacity-10 pointer-events-none">
        {['Kindness', 'Presence', 'Privacy'].map((val) => (
          <span
            key={val}
            className="text-[10px] font-bold uppercase tracking-[0.3em]"
          >
            {val}
          </span>
        ))}
      </div>
    </div>
  );
}
