import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { faqs } from '../data/mockData';
import { Bot, Play, Search, Wrench, Shield, Settings, AlertTriangle, HelpCircle } from 'lucide-react';
import EmptyState from '../components/EmptyState';

const categoryIcons = {
  maintenance: Wrench,
  safety: Shield,
  operations: Settings,
  troubleshooting: AlertTriangle,
};

export default function Tutorials() {
  const { t, locale } = useTranslation();
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [search, setSearch] = useState('');

  const categories = ['maintenance', 'safety', 'operations', 'troubleshooting'];

  const filtered = faqs
    .filter((f) => !categoryFilter || f.category === categoryFilter)
    .filter((f) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (locale === 'it' ? f.question : f.questionEn).toLowerCase().includes(q);
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-cmc-text">{t('tutorials')}</h1>
        <Link
          to="/tutorial/assistant"
          className="btn-press flex items-center gap-2 px-4 py-2.5 bg-cmc-lime text-white font-bold rounded-xl hover:bg-cmc-lime/80 transition-colors"
        >
          <Bot size={18} /> {t('aiAssistant')}
        </Link>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 stagger">
        {categories.map((cat) => {
          const Icon = categoryIcons[cat as keyof typeof categoryIcons];
          const count = faqs.filter((f) => f.category === cat).length;
          const isActive = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(isActive ? '' : cat)}
              className={`btn-press g-card p-4 text-left transition-all ${isActive ? 'ring-2 ring-cmc-lime bg-cmc-lime/10' : 'hover:shadow-md'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${isActive ? 'bg-cmc-lime' : 'bg-cmc-gray'}`}>
                <Icon size={20} className={isActive ? 'text-cmc-darker' : 'text-cmc-text-light'} />
              </div>
              <div className="font-bold text-sm text-cmc-text">{t(cat)}</div>
              <div className="text-xs text-cmc-text-light mt-0.5">{count} FAQ</div>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cmc-text-light" />
        <input
          type="text"
          placeholder={t('search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="g-search"
        />
      </div>

      {/* FAQ list */}
      <div className="space-y-3 stagger">
        {filtered.map((faq) => {
          const Icon = categoryIcons[faq.category as keyof typeof categoryIcons];
          return (
            <div key={faq.id} className="g-card p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-cmc-gray flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={16} className="text-cmc-darker" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-cmc-text mb-2">{locale === 'it' ? faq.question : faq.questionEn}</h3>
                  <p className="text-sm text-cmc-text-light whitespace-pre-line leading-relaxed">
                    {locale === 'it' ? faq.answer : faq.answerEn}
                  </p>
                  {faq.videoTitle && (
                    <div className="mt-3 flex items-center gap-2 p-2.5 bg-cmc-gray rounded-xl w-fit">
                      <Play size={14} className="text-cmc-darker" />
                      <span className="text-xs font-semibold">{faq.videoTitle}</span>
                      {faq.videoTimestamp && (
                        <span className="text-xs text-cmc-lime bg-cmc-darker px-2 py-0.5 rounded-full font-mono">
                          {faq.videoTimestamp}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <EmptyState icon={HelpCircle} title={t('noResults')} description={locale === 'it' ? 'Nessun tutorial trovato per questa ricerca' : 'No tutorials found for this search'} />
        )}
      </div>
    </div>
  );
}
