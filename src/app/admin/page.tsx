import connectToDatabase from '@/lib/mongodb';
import { Analytics } from '@/models/Analytics';
import { Visitor } from '@/models/Visitor';
import { ContactMessage } from '@/models/ContactMessage';
import { IdeaAnalysis } from '@/models/IdeaAnalysis';

// This forces the admin page to be dynamically rendered
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await connectToDatabase();

  const totalVisitors = await Visitor.countDocuments();
  const totalMessages = await ContactMessage.countDocuments();
  const totalIdeas = await IdeaAnalysis.countDocuments();
  
  const rawMetrics = await Analytics.find({});
  let totalChats = 0;
  rawMetrics.forEach(m => {
    if (m.metricKey === 'total_chats') totalChats = m.count;
  });

  const recentVisitors = await Visitor.find({}).sort({ createdAt: -1 }).limit(10);
  const recentMessages = await ContactMessage.find({}).sort({ createdAt: -1 }).limit(5);

  return (
    <div className="min-h-screen bg-background p-8 pt-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 text-primary">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card border border-border p-6 shadow-[4px_4px_0_0_var(--primary)]">
            <h3 className="text-muted-foreground font-bold uppercase tracking-widest text-sm mb-2">Total Visitors</h3>
            <p className="text-4xl font-black">{totalVisitors}</p>
          </div>
          <div className="bg-card border border-border p-6 shadow-[4px_4px_0_0_var(--primary)]">
            <h3 className="text-muted-foreground font-bold uppercase tracking-widest text-sm mb-2">Contact Messages</h3>
            <p className="text-4xl font-black">{totalMessages}</p>
          </div>
          <div className="bg-card border border-border p-6 shadow-[4px_4px_0_0_var(--primary)]">
            <h3 className="text-muted-foreground font-bold uppercase tracking-widest text-sm mb-2">Ideas Analyzed</h3>
            <p className="text-4xl font-black">{totalIdeas}</p>
          </div>
          <div className="bg-card border border-border p-6 shadow-[4px_4px_0_0_var(--primary)]">
            <h3 className="text-muted-foreground font-bold uppercase tracking-widest text-sm mb-2">Total Chats</h3>
            <p className="text-4xl font-black">{totalChats}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
             <h2 className="text-2xl font-bold uppercase tracking-wider mb-6">Recent Visitors</h2>
             <div className="bg-card border border-border flex flex-col gap-2 p-4">
                {recentVisitors.map((v, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-border/50 pb-2 mb-2 last:border-0 last:pb-0 last:mb-0">
                    <div>
                      <span className="font-bold">{v.nickname}</span>
                      <span className="text-sm text-muted-foreground ml-2">from {v.country}</span>
                    </div>
                    <span className="text-primary font-bold">{v.xp} XP</span>
                  </div>
                ))}
             </div>
          </div>
          <div>
             <h2 className="text-2xl font-bold uppercase tracking-wider mb-6">Recent Messages</h2>
             <div className="bg-card border border-border flex flex-col gap-4 p-4">
                {recentMessages.map((m, i) => (
                  <div key={i} className="flex flex-col gap-1 border-b border-border/50 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
                    <div className="flex justify-between">
                       <span className="font-bold">{m.name}</span>
                       <a href={`mailto:${m.email}`} className="text-sm text-primary underline">{m.email}</a>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed bg-background p-3 border border-border mt-2">{m.message}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
