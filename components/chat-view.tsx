'use client';

import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Send, ShieldCheck, Zap } from 'lucide-react';

export function ChatView({
  username,
  messages,
  onSendMessage,
}: {
  username: string;
  messages: Message[];
  onSendMessage: (text: string) => void;
}) {
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Improved Auto-scroll targeting the viewport specifically
  useEffect(() => {
    const viewport = scrollRef.current?.querySelector(
      '[data-radix-scroll-area-viewport]',
    );
    if (viewport) {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: messages.length <= 1 ? 'auto' : 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#09090b] text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Header - Fixed height */}
      <header className="relative z-20 h-16 flex-none flex items-center px-6 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-5xl w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-black tracking-tighter italic">ECHO</h1>
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500/80">
                Live
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-zinc-400">
            <span className="text-[10px] font-bold tracking-tight uppercase">
              {username}
            </span>
            <ShieldCheck size={12} />
          </div>
        </div>
      </header>

      {/* Main Chat Space - This now consumes all remaining space correctly */}
      <main className="relative flex-1 min-h-0 z-10">
        <ScrollArea className="h-full w-full" ref={scrollRef}>
          <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
            {messages.map((msg, i) => {
              const isMe = msg.username === username;
              // Use Supabase created_at or fallback to local time
              const date = (msg as any).created_at
                ? new Date((msg as any).created_at)
                : new Date();

              return (
                <div
                  key={msg.id || i}
                  className={cn(
                    'flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300',
                    isMe ? 'items-end' : 'items-start',
                  )}
                >
                  <div className="flex items-center gap-2 px-1 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                    <span>{isMe ? 'Local' : msg.username}</span>
                    <span className="opacity-30">•</span>
                    <span className="tabular-nums">
                      {date.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div
                    className={cn(
                      'px-4 py-3 rounded-2xl max-w-[85%] text-[15px] leading-relaxed shadow-lg transition-all',
                      isMe
                        ? 'bg-zinc-100 text-zinc-950 rounded-tr-none'
                        : 'bg-zinc-900 text-zinc-200 border border-white/5 rounded-tl-none',
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </main>

      {/* Input Area - Fixed height at bottom */}
      <footer className="relative z-20 flex-none p-4 md:pb-8 bg-gradient-to-t from-[#09090b] via-[#09090b] to-transparent">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-zinc-900/90 border border-white/10 rounded-2xl p-1.5 backdrop-blur-lg focus-within:border-indigo-500/40 transition-all shadow-2xl"
          >
            <input
              autoFocus
              placeholder="Broadcast a thought..."
              className="flex-1 bg-transparent py-3 px-3 outline-none text-zinc-100 placeholder:text-zinc-700 text-sm md:text-base"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className={cn(
                'p-3 rounded-xl transition-all active:scale-95 flex items-center justify-center',
                message.trim()
                  ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]'
                  : 'bg-zinc-800 text-zinc-600 opacity-50',
              )}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
