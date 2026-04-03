import { useTranslation } from '../hooks/useTranslation';
import { messages } from '../data/mockData';
import { Mail, Send, Eye, Plus } from 'lucide-react';

export default function AdminCampaigns() {
  const { t, locale } = useTranslation();

  const typeColors = {
    product_update: 'bg-blue-50 text-blue-700',
    order_update: 'bg-emerald-50 text-emerald-700',
    general: 'bg-purple-50 text-purple-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-cmc-text">{t('manageCampaigns')}</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-cmc-lime text-white font-bold rounded-xl hover:bg-cmc-lime/80 transition-colors">
          <Plus size={18} /> {locale === 'it' ? 'Nuova Campagna' : 'New Campaign'}
        </button>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="g-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cmc-gray flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-cmc-darker" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-cmc-text mb-1">{msg.campaignTitle}</h3>
                  <p className="text-sm text-cmc-text-light">{msg.subject}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`g-badge ${typeColors[msg.type]}`}>
                      {msg.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-cmc-text-light">{msg.date}</span>
                    <span className="text-xs text-cmc-text-light">{t('from')}: {msg.from}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2.5 bg-cmc-gray rounded-xl hover:bg-cmc-lime/20 transition-colors">
                  <Eye size={16} className="text-cmc-darker" />
                </button>
                <button className="p-2.5 bg-cmc-gray rounded-xl hover:bg-cmc-lime/20 transition-colors">
                  <Send size={16} className="text-cmc-darker" />
                </button>
              </div>
            </div>

            {/* Mock analytics */}
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-cmc-border">
              <div className="text-center p-3 bg-cmc-gray rounded-xl">
                <div className="text-lg font-extrabold text-cmc-text">87%</div>
                <div className="text-xs text-cmc-text-light">{locale === 'it' ? 'Tasso apertura' : 'Open rate'}</div>
              </div>
              <div className="text-center p-3 bg-cmc-gray rounded-xl">
                <div className="text-lg font-extrabold text-cmc-text">42%</div>
                <div className="text-xs text-cmc-text-light">{locale === 'it' ? 'Tasso click' : 'Click rate'}</div>
              </div>
              <div className="text-center p-3 bg-cmc-gray rounded-xl">
                <div className="text-lg font-extrabold text-cmc-text">15</div>
                <div className="text-xs text-cmc-text-light">{locale === 'it' ? 'Download allegati' : 'Attachment downloads'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
