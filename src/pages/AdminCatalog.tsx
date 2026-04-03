import { useTranslation } from '../hooks/useTranslation';
import { parts } from '../data/mockData';
import { Edit, Plus } from 'lucide-react';

export default function AdminCatalog() {
  const { t, locale } = useTranslation();

  const stockColors: Record<string, string> = {
    DISPONIBILE: 'bg-emerald-50 text-emerald-700',
    SU_ORDINE: 'bg-amber-50 text-amber-700',
    ESAURITO: 'bg-red-50 text-red-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-cmc-text">{t('manageCatalog')}</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-cmc-lime text-white font-bold rounded-xl hover:bg-cmc-lime/80 transition-colors">
          <Plus size={18} /> {locale === 'it' ? 'Aggiungi Componente' : 'Add Component'}
        </button>
      </div>

      <div className="g-card overflow-hidden overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cmc-border">
              <th className="text-left px-5 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('partCode')}</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('description')}</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('category')}</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('price')}</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('availability')}</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.code} className="border-b border-cmc-border/50 g-table-row">
                <td className="px-5 py-3.5 font-mono text-sm font-bold text-cmc-text">{part.code}</td>
                <td className="px-5 py-3.5 text-sm max-w-[200px] truncate text-cmc-text">{locale === 'it' ? part.description : part.descriptionEn}</td>
                <td className="px-5 py-3.5 text-xs text-cmc-text-light">{t(part.category)}</td>
                <td className="px-5 py-3.5 text-sm font-bold text-cmc-text">&euro;{part.price.toLocaleString()}</td>
                <td className="px-5 py-3.5">
                  <span className={`g-badge ${stockColors[part.stockStatus]}`}>
                    {t(part.stockStatus)}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button className="p-2 hover:bg-cmc-gray rounded-xl transition-colors">
                    <Edit size={14} className="text-cmc-darker" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
