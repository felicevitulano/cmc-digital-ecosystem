import { useTranslation } from '../hooks/useTranslation';
import { orders, documents, messages, userMachines } from '../data/mockData';
import { Users, Truck, Mail, Package, FileText, ArrowRight, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { t, locale } = useTranslation();

  const activeOrders = orders.filter((o) => o.status !== 'CONSEGNATO');

  const stats = [
    { icon: Users, label: t('totalDealers'), value: 2, color: 'bg-blue-50 text-blue-600' },
    { icon: Users, label: t('totalEndUsers'), value: 3, color: 'bg-emerald-50 text-emerald-600' },
    { icon: Truck, label: t('totalMachines'), value: userMachines.length, color: 'bg-purple-50 text-purple-600' },
    { icon: Mail, label: t('activeCampaigns'), value: messages.length, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-cmc-text">{t('adminDashboard')}</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="g-card p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <div className="text-3xl font-extrabold text-cmc-text">{s.value}</div>
            <div className="text-sm text-cmc-text-light mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active orders overview */}
        <div className="g-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg text-cmc-text flex items-center gap-2"><Package size={20} /> {t('activeOrders')}</h2>
            <Link to="/admin/orders" className="text-sm text-cmc-text-light hover:text-cmc-darker flex items-center gap-1 font-semibold transition-colors">
              {t('viewDetails')} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-2">
            {activeOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-3.5 bg-cmc-gray rounded-xl">
                <div>
                  <span className="font-bold text-sm text-cmc-text">{o.id}</span>
                  <span className="text-xs text-cmc-text-light ml-2">{o.machineModel}</span>
                </div>
                <span className="g-badge bg-cmc-lime/20 text-cmc-lime">{t(o.status)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="g-card p-6">
          <h2 className="font-bold text-lg text-cmc-text mb-4 flex items-center gap-2"><BarChart3 size={20} /> {t('quickActions')}</h2>
          <div className="space-y-2">
            <Link to="/admin/orders" className="flex items-center gap-3 p-4 bg-cmc-gray rounded-xl hover:bg-cmc-lime/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <Package size={20} className="text-cmc-darker" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-cmc-text">{t('manageOrders')}</div>
                <div className="text-xs text-cmc-text-light">{activeOrders.length} {locale === 'it' ? 'ordini attivi' : 'active orders'}</div>
              </div>
              <ArrowRight size={16} className="text-cmc-mid" />
            </Link>
            <Link to="/admin/campaigns" className="flex items-center gap-3 p-4 bg-cmc-gray rounded-xl hover:bg-cmc-lime/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <Mail size={20} className="text-cmc-darker" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-cmc-text">{t('manageCampaigns')}</div>
                <div className="text-xs text-cmc-text-light">{messages.length} {locale === 'it' ? 'campagne' : 'campaigns'}</div>
              </div>
              <ArrowRight size={16} className="text-cmc-mid" />
            </Link>
            <Link to="/admin/catalog" className="flex items-center gap-3 p-4 bg-cmc-gray rounded-xl hover:bg-cmc-lime/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <FileText size={20} className="text-cmc-darker" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-cmc-text">{t('manageCatalog')}</div>
                <div className="text-xs text-cmc-text-light">{documents.length} {locale === 'it' ? 'documenti' : 'documents'}</div>
              </div>
              <ArrowRight size={16} className="text-cmc-mid" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
