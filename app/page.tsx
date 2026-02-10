'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { handleWaitlist, getRealtimeStats } from '@/app/actions/waitlist';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox'; // Ensure this shadcn component exists
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Ghost,
  CheckCircle,
  ArrowRight,
  Zap,
  Eye,
  History,
  UserX,
  MessageSquareQuote,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';

export default function EchoFullWaitlist() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [stats, setStats] = useState({ count: 42, remaining: 8 });
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [shake, setShake] = useState(false);

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    getRealtimeStats().then(setStats);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
        }
        return { minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  async function onSubmit(formData: FormData) {
    if (!acceptedLegal) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setStatus('loading');
    const res = await handleWaitlist(formData);
    if (res.success) {
      setStatus('success');
      setStats((prev) => ({
        count: prev.count + 1,
        remaining: Math.max(0, prev.remaining - 1),
      }));
    } else {
      setStatus('idle');
    }
  }

  const flicker = {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: {
      opacity: [0, 0.4, 0.2, 0.8, 0.5, 1],
      filter: ['blur(10px)', 'blur(0px)', 'blur(4px)', 'blur(0px)'],
      transition: { duration: 1.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div
      ref={targetRef}
      className="min-h-screen w-full bg-background text-foreground selection:bg-primary/30 relative"
    >
      {/* FLOATING CONVERSION BAR */}
      <motion.div
        style={{ opacity }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md bg-card/80 backdrop-blur-xl border border-primary/20 p-4 rounded-2xl shadow-2xl flex items-center justify-between"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">
            Founding Batch
          </span>
          <span className="text-xs font-bold">
            {stats.remaining} spots left
          </span>
        </div>
        <Button
          size="sm"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="rounded-xl font-bold gap-2"
        >
          Claim Spot <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* TOP URGENCY BANNER */}
      <div className="sticky top-0 z-[100] w-full bg-destructive py-2 text-center text-[10px] font-black tracking-[0.2em] text-destructive-foreground uppercase">
        <span className="animate-pulse">
          ● CRITICAL: SERVER WIPE IN {timeLeft.minutes}:
          {timeLeft.seconds.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative">
        <header className="flex items-center justify-between py-12 md:py-20">
          <motion.div
            variants={flicker}
            initial="initial"
            animate="animate"
            className="flex items-center gap-3"
          >
            <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40">
              <Ghost className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="font-black text-2xl tracking-tighter uppercase">
              ECHO
            </h1>
          </motion.div>
          <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
            <Eye className="h-3 w-3 text-primary" /> {stats.count + 62} Viewing
            Now
          </div>
        </header>

        <section className="grid lg:grid-cols-12 gap-16 items-center pb-32">
          <div className="lg:col-span-7 space-y-8">
            <motion.h2
              variants={flicker}
              initial="initial"
              animate="animate"
              className="text-6xl md:text-[6.5rem] font-black tracking-tighter leading-[0.85]"
            >
              Don't leave a <br />
              <span className="text-muted-foreground/20 italic">trace.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-muted-foreground leading-relaxed max-w-lg"
            >
              Imagine a world where your past doesn't follow you. A space for
              the{' '}
              <span className="text-foreground font-bold">
                raw, the unfiltered, and the temporary
              </span>
              .
            </motion.p>
          </div>

          {/* SIGNUP CARD WITH LEGAL TRAP */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-primary/20 bg-card/40 backdrop-blur-3xl shadow-[0_0_50px_-12px_rgba(var(--primary),0.2)] overflow-hidden">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      className="p-12 text-center space-y-6"
                    >
                      <CheckCircle className="h-16 w-16 text-primary mx-auto" />
                      <h3 className="text-3xl font-black uppercase italic">
                        Ghosted.
                      </h3>
                      <p className="text-muted-foreground font-medium">
                        You are Founding Member #{stats.count}. Watch the
                        shadows for our signal.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      exit={{ opacity: 0, filter: 'blur(20px)' }}
                    >
                      <CardHeader className="pb-8">
                        <CardTitle className="text-3xl font-black italic tracking-tighter uppercase text-balance">
                          Join the Founding 50
                        </CardTitle>
                        <CardDescription>
                          Zero data. Zero logs. Zero regrets.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-muted-foreground">
                              Slots Filled
                            </span>
                            <span className="text-primary">
                              {stats.count}/50
                            </span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden border border-border">
                            <motion.div
                              initial={{ width: '0%' }}
                              animate={{
                                width: `${(stats.count / 50) * 100}%`,
                              }}
                              className="h-full bg-primary"
                              transition={{ duration: 1.5 }}
                            />
                          </div>
                        </div>

                        <form action={onSubmit} className="space-y-4">
                          <Input
                            name="email"
                            type="email"
                            required
                            placeholder="your.email@example.com"
                            className="h-14 bg-background/50 rounded-xl focus-visible:ring-primary"
                          />

                          <Button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full h-14 bg-primary text-primary-foreground font-black text-lg rounded-xl group relative overflow-hidden transition-transform active:scale-95"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              {status === 'loading'
                                ? 'PROCESSING...'
                                : `SECURE POSITION #${stats.count + 1}`}
                              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </Button>
                        </form>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FEATURES: THE CONTRAST TRAP */}
        <section className="py-32 border-t border-border/50">
          <div className="text-center space-y-4 mb-20">
            <motion.h3
              {...fadeInUp}
              className="text-4xl font-black tracking-tighter uppercase italic"
            >
              The Anti-Social Network
            </motion.h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              History is a burden. We help you drop it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <History className="h-8 w-8 text-primary" />,
                title: 'Memory Wipe',
                desc: 'Total server destruction at 12:00 AM. No backups. No recovery. No trace.',
              },
              {
                icon: <UserX className="h-8 w-8 text-primary" />,
                title: 'Identity Optional',
                desc: 'Speak without the weight of a profile. No bios, no metrics, just presence.',
              },
              {
                icon: <MessageSquareQuote className="h-8 w-8 text-primary" />,
                title: 'Ephemeral Truth',
                desc: 'Real talk happens when there is no record. Echo is for now, not forever.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-secondary/10 border border-border/50 hover:border-primary/20 transition-all group"
              >
                <div className="h-16 w-16 rounded-2xl bg-background flex items-center justify-center border border-border group-hover:scale-110 transition-transform shadow-xl mb-6">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight italic mb-2">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* THE FINAL CALL */}
        <section className="py-32 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[3rem] bg-primary p-12 md:p-24 text-center space-y-8 text-primary-foreground relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Ghost className="h-64 w-64" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-none">
              Don't be a spectator. <br /> Be a ghost.
            </h2>
            <p className="text-xl font-medium opacity-90 max-w-xl mx-auto italic">
              Founding benefits vanish when Batch 01 closes.
            </p>
            <Button
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary-foreground text-primary hover:bg-white h-16 px-12 rounded-2xl font-black text-xl shadow-2xl"
            >
              CLAIM FOUNDER STATUS
            </Button>
          </motion.div>
        </section>

        <footer className="py-12 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-center md:text-left">
            ECHO BY MNDLY // OPERATING IN THE SHADOWS // 2026
          </p>
          <div className="flex gap-8">
            <Link
              href="/legal"
              className="text-[10px] font-black tracking-widest uppercase hover:text-primary transition-colors"
            >
              Legal Protocol
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
