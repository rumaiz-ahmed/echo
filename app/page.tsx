'use client';

import { useState, useEffect, useMemo } from 'react';
import { SubscriptionView } from '@/components/subscription-view';
import { ChatView } from '@/components/chat-view';
import { Message } from '@/lib/types';
import { createClient } from '@/utils/supabase/client';

export default function EchoApp() {
  const [username, setUsername] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const supabase = useMemo(() => {
    try {
      return createClient();
    } catch (e) {
      console.error('Supabase failed to initialize:', e);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!username || !supabase) return;

    const fetchExisting = async () => {
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) {
        console.error('Fetch error:', fetchError.message);
      } else if (data) {
        setMessages(data);
      }
    };

    fetchExisting();

    const channel = supabase
      .channel('lounge_stream')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages', // <--- MUST BE EXACT CASE AS DATABASE
        },
        (payload) => {
          console.log('Change received!', payload); // Add this log to debug
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [username, supabase]);

  if (!supabase) return <div className="bg-[#050506] min-h-screen" />;

  return (
    <main className="bg-[#050506] min-h-screen w-full selection:bg-indigo-500/30">
      {username ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
          <ChatView
            username={username}
            messages={messages}
            onSendMessage={(text) => {
              // 3. Send to Supabase in the background
              supabase
                .from('messages')
                .insert([{ username, text }])
                .then(({ error }) => {
                  if (error) {
                    console.error('Message failed:', error.message);
                  }
                });
            }}
          />
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-1000 ease-in-out">
          <SubscriptionView
            onJoin={() => {
              const descriptors = ['calm', 'soft', 'echo', 'still', 'near'];
              const selected =
                descriptors[Math.floor(Math.random() * descriptors.length)];
              setUsername(
                `${selected}_${Math.floor(100 + Math.random() * 899)}`,
              );
            }}
          />
        </div>
      )}
    </main>
  );
}
