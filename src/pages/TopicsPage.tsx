import { Link } from 'react-router-dom';
import { topics } from '@/data/sampleData';

export default function TopicsPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">Browse by Topic</h1>
        <p className="text-muted-foreground">Find stories, playbooks, and guides on the topics that matter to you.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map(t => (
          <Link to={`/stories`} key={t.name} className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all hover:-translate-y-0.5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-semibold">{t.name}</h3>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{t.count}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
