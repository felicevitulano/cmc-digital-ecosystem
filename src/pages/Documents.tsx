import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useStore } from '../hooks/useStore';
import { documents, type DocCategory } from '../data/mockData';
import { Search, FileText, Download, Lock, Film, FileSpreadsheet, File } from 'lucide-react';
import EmptyState from '../components/EmptyState';

const fileIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  video: Film,
  xlsx: FileSpreadsheet,
  docx: File,
  zip: File,
};

export default function Documents() {
  const { t, locale } = useTranslation();
  const { user } = useStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [modelFilter, setModelFilter] = useState<string>('');

  const categories: DocCategory[] = ['MANUALE_UTENTE', 'SCHEDA_TECNICA', 'LISTINO_PREZZI', 'MATERIALE_MARKETING', 'BRAND_KIT', 'CERTIFICAZIONI', 'COMUNICATO_PRODOTTO'];
  const models = [...new Set(documents.flatMap((d) => d.modelTags))].sort();

  const filtered = documents
    .filter((d) => !d.restricted || user?.role !== 'UTENTE_FINALE')
    .filter((d) => !categoryFilter || d.category === categoryFilter)
    .filter((d) => !modelFilter || d.modelTags.includes(modelFilter))
    .filter((d) => !search || d.title.toLowerCase().includes(search.toLowerCase()));

  const categoryColors: Record<string, string> = {
    MANUALE_UTENTE: 'bg-blue-50 text-blue-700',
    SCHEDA_TECNICA: 'bg-purple-50 text-purple-700',
    LISTINO_PREZZI: 'bg-amber-50 text-amber-700',
    MATERIALE_MARKETING: 'bg-emerald-50 text-emerald-700',
    BRAND_KIT: 'bg-pink-50 text-pink-700',
    CERTIFICAZIONI: 'bg-cyan-50 text-cyan-700',
    COMUNICATO_PRODOTTO: 'bg-emerald-50 text-emerald-700',
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-cmc-text">{t('documentHub')}</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cmc-text-light" />
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="g-search"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 bg-cmc-gray border border-cmc-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cmc-lime/30 focus:border-cmc-lime transition-all"
        >
          <option value="">{t('all')} — {t('category')}</option>
          {categories.map((c) => (
            <option key={c} value={c}>{t(c)}</option>
          ))}
        </select>
        <select
          value={modelFilter}
          onChange={(e) => setModelFilter(e.target.value)}
          className="px-4 py-2.5 bg-cmc-gray border border-cmc-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cmc-lime/30 focus:border-cmc-lime transition-all"
        >
          <option value="">{t('all')} — {t('model')}</option>
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Documents grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
        {filtered.map((doc) => {
          const Icon = fileIcons[doc.fileType] || FileText;
          return (
            <div key={doc.id} className="g-card p-5 hover:shadow-md transition-all group">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cmc-gray flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-cmc-darker" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-1.5 truncate text-cmc-text">{doc.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className={`g-badge text-[10px] ${categoryColors[doc.category]}`}>
                      {t(doc.category)}
                    </span>
                    {doc.restricted && (
                      <span className="g-badge text-[10px] bg-red-50 text-red-700 flex items-center gap-0.5">
                        <Lock size={8} /> {locale === 'it' ? 'Riservato' : 'Restricted'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-cmc-text-light">
                    <span>{doc.languageTags.join(', ').toUpperCase()}</span>
                    <span>{doc.fileSizeMb} MB</span>
                    <span>v{doc.version}</span>
                  </div>
                  {doc.modelTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {doc.modelTags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-cmc-gray px-2 py-0.5 rounded-lg font-medium">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-cmc-border flex items-center justify-between">
                <span className="text-xs text-cmc-text-light">{t('updated')}: {doc.updatedAt}</span>
                <button className="btn-press flex items-center gap-1.5 text-sm font-bold text-cmc-darker hover:text-cmc-text transition-colors bg-cmc-gray px-3 py-1.5 rounded-lg hover:bg-cmc-lime/20">
                  <Download size={14} /> {t('download')}
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full">
            <EmptyState icon={FileText} title={t('noResults')} description={locale === 'it' ? 'Prova a modificare i filtri di ricerca' : 'Try adjusting your search filters'} />
          </div>
        )}
      </div>
    </div>
  );
}
