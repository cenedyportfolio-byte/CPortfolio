"use client";

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useVisitor } from '@/components/providers/VisitorProvider';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function AiAssistantSection() {
  const visitor = useVisitor();
  const [input, setInput] = useState('');
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: {
        visitorId: visitor?.visitorId || 'anonymous'
      }
    })
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const suggestions = [
    "What are Cenedy's top skills?",
    "Tell me about Cenedy's experience.",
    "What is Cenedy's approach to problem solving?",
  ];

  return (
    <SectionWrapper id="ai-assistant">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto items-start">
        
        {/* Left Side: Header & Info */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
              Ask <br/> Cenedy AI <Sparkles className="text-primary w-8 h-8" />
            </h2>
            <p className="text-muted-foreground text-lg">
              Got questions about my experience, projects, or technical background? 
              Chat with my AI assistant to get instant answers.
            </p>
          </div>
          
          <div className="bg-card/50 p-6 border border-border">
            <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Suggested Prompts</h3>
            <div className="flex flex-col gap-2">
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => setInput(s)}
                  className="text-left text-sm p-3 bg-background hover:bg-primary hover:text-primary-foreground transition-colors border border-border"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Chat Interface */}
        <div className="md:w-2/3 w-full bg-card/20 border border-border flex flex-col h-[600px]">
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground gap-4">
                <Bot className="w-12 h-12 opacity-50" />
                <p>Hello {visitor?.nickname || 'Wanderer'}! <br/> I am Cenedy&apos;s AI Assistant. How can I help you today?</p>
              </div>
            )}
            
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-4 max-w-[80%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 shrink-0 flex items-center justify-center border ${m.role === 'user' ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border'}`}>
                  {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`p-4 text-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'} leading-relaxed`}>
                  {m.parts.filter(p => p.type === 'text').map(p => (p as { text: string }).text).join('')}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex gap-4 max-w-[80%]">
                 <div className="w-10 h-10 shrink-0 flex items-center justify-center border bg-card border-border animate-pulse">
                   <Bot size={20} />
                 </div>
                 <div className="p-4 text-sm bg-card border border-border animate-pulse w-32 h-10">
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border bg-background">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                className="flex-1 bg-transparent border border-border px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                value={input}
                placeholder="Ask something..."
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-primary text-primary-foreground px-6 py-3 hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
