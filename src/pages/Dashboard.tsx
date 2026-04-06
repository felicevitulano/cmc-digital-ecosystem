import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { orders, messages, documents } from '../data/mockData';
import { Package, Mail, FileText, Wrench, ArrowRight, TrendingUp, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { SkeletonStats } from '../components/Skeleton';

export default function Dashboard() {
  const { user } = useStore();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const dealerOrders = orders.filter((o) => o.dealerId === user?.dealerId);
  const activeOrders = dealerOrders.filter((o) => o.status !== 'CONSEGNATO');
  const unreadMessages = messages.filter((m) => !m.read);
  const recentDocs = documents.filter((d) => !d.restricted).slice(0, 3);

  const statusColor: Record<string, string> = {
    CONFERMATO: 'bg-blue-50 text-blue-700',
    IN_PRODUZIONE: 'bg-amber-50 text-amber-700',
    COLLAUDO: 'bg-purple-50 text-purple-700',
    PRONTO_SPEDIZIONE: 'bg-cyan-50 text-cyan-700',
    SPEDITO: 'bg-emerald-50 text-emerald-700',
    CONSEGNATO: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="g-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-cmc-text mb-1">{t('welcomeDealer')}, {user?.name}!</h1>
            <p className="text-cmc-text-light text-sm">{user?.dealerName} — {t('overviewTitle')}</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-cmc-text-light">
            <Clock size={14} />
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Stats */}
      {loading ? <SkeletonStats /> : null}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger ${loading ? 'hidden' : ''}`}>
        <StatCard
          icon={Package}
          label={t('activeOrders')}
          value={activeOrders.length}
          change="+12%"
          changeType="up"
          accentColor="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon={Mail}
          label={t('recentMessages')}
          value={unreadMessages.length}
          change="+3"
          changeType="up"
          accentColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          icon={Wrench}
          label={t('pendingParts')}
          value={2}
          change="-1"
          changeType="down"
          accentColor="bg-amber-50 text-amber-600"
        />
        <StatCard
          icon={FileText}
          label={t('docsUpdated')}
          value={recentDocs.length}
          change="+2"
          changeType="up"
          accentColor="bg-purple-50 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active orders */}
        <div className="g-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg text-cmc-text">{t('activeOrders')}</h2>
            <Link to="/orders" className="text-sm text-cmc-text-light hover:text-cmc-darker flex items-center gap-1 font-semibold transition-colors">
              {t('viewAllOrders')} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-2 stagger">
            {activeOrders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="flex items-center justify-between p-3.5 rounded-xl hover:bg-cmc-gray transition-colors"
              >
                <div>
                  <div className="font-semibold text-sm text-cmc-text">{order.id}</div>
                  <div className="text-xs text-cmc-text-light">{order.machineModel} {order.quantity > 1 ? `x${order.quantity}` : ''}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`g-badge ${statusColor[order.status]}`}>
                    {t(order.status)}
                  </span>
                  <div className="text-xs text-cmc-text-light flex items-center gap-1">
                    <Clock size={12} />
                    {order.estimatedDelivery}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick actions + messages */}
        <div className="space-y-6">
          {/* Quick actions */}
          <div className="g-card p-6">
            <h2 className="font-bold text-lg text-cmc-text mb-4">{t('quickActions')}</h2>
            <div className="grid grid-cols-1 gap-2">
              <Link to="/parts" className="flex items-center gap-3 p-3.5 rounded-xl bg-cmc-gray hover:bg-cmc-lime/20 transition-all">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <Wrench size={18} className="text-cmc-darker" />
                </div>
                <span className="text-sm font-semibold text-cmc-text">{t('newPartOrder')}</span>
              </Link>
              <Link to="/orders" className="flex items-center gap-3 p-3.5 rounded-xl bg-cmc-gray hover:bg-cmc-lime/20 transition-all">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <TrendingUp size={18} className="text-cmc-darker" />
                </div>
                <span className="text-sm font-semibold text-cmc-text">{t('viewAllOrders')}</span>
              </Link>
              <Link to="/docs" className="flex items-center gap-3 p-3.5 rounded-xl bg-cmc-gray hover:bg-cmc-lime/20 transition-all">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <FileText size={18} className="text-cmc-darker" />
                </div>
                <span className="text-sm font-semibold text-cmc-text">{t('browseDocuments')}</span>
              </Link>
            </div>
          </div>

          {/* Recent messages */}
          <div className="g-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-cmc-text">{t('recentMessages')}</h2>
              <Link to="/messages" className="text-sm text-cmc-text-light hover:text-cmc-darker flex items-center gap-1 font-semibold transition-colors">
                {t('viewDetails')} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-2">
              {messages.slice(0, 3).map((msg) => (
                <div key={msg.id} className={`p-3.5 rounded-xl ${msg.read ? 'bg-cmc-gray' : 'bg-cmc-lime/10 border border-cmc-lime/20'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-cmc-lime flex-shrink-0" />}
                      <span className="text-sm font-semibold text-cmc-text">{msg.from}</span>
                    </div>
                    <span className="text-xs text-cmc-text-light">{msg.date}</span>
                  </div>
                  <div className="text-sm text-cmc-text-light truncate">{msg.subject}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, changeType, accentColor }: {
  icon: typeof Package; label: string; value: number; change: string; changeType: 'up' | 'down'; accentColor: string;
}) {
  return (
    <div className="g-card p-5 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentColor}`}>
          <Icon size={20} />
        </div>
        <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full ${
          changeType === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
        }`}>
          {changeType === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </span>
      </div>
      <div className="text-3xl font-extrabold text-cmc-text">{value}</div>
      <div className="text-sm text-cmc-text-light mt-0.5">{label}</div>
    </div>
  );
}
