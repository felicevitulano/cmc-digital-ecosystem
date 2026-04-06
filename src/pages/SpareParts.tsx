import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { machineModels } from '../data/mockData';
import { Wrench, ArrowRight } from 'lucide-react';

export default function SpareParts() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-cmc-text">{t('selectModel')}</h1>
      <p className="text-cmc-text-light text-sm">{t('clickComponentHint')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">
        {machineModels.map((m) => (
          <Link
            key={m.id}
            to={`/parts/${m.id}`}
            className="g-card p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cmc-lime/15 flex items-center justify-center mb-4 group-hover:bg-cmc-lime/30 transition-colors">
                  <Wrench size={24} className="text-cmc-darker" />
                </div>
                <h3 className="text-xl font-extrabold text-cmc-text mb-1">{m.name}</h3>
                <p className="text-sm text-cmc-text-light">{m.family} — {m.heightMax}m</p>
                <p className="text-xs text-cmc-text-light mt-1">{m.weight} kg</p>
              </div>
              <ArrowRight size={20} className="text-cmc-mid group-hover:text-cmc-darker transition-colors mt-2" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
