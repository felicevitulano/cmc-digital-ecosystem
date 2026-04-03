import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { orders, type OrderStatus } from '../data/mockData';
import { Search, Clock, ChevronRight } from 'lucide-react';

const statusColors: Record<OrderStatus, string> = {
  CONFERMATO: 'bg-blue-50 text-blue-700',
  IN_PRODUZIONE: 'bg-amber-50 text-amber-700',
  COLLAUDO: 'bg-purple-50 text-purple-700',
  PRONTO_SPEDIZIONE: 'bg-cyan-50 text-cyan-700',
  SPEDITO: 'bg-emerald-50 text-emerald-700',
  CONSEGNATO: 'bg-gray-100 text-gray-600',
};

export default function Orders() {
  const { user } = useStore();
  const { t } = useTranslation();
  const [tab, setTab] = useState<'active' | 'history'>('active');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [search, setSearch] = useState('');

  const dealerOrders = user?.role === 'CMC_ADMIN'
    ? orders
    : orders.filter((o) => o.dealerId === user?.dealerId);

  const filtered = dealerOrders
    .filter((o) => tab === 'active' ? o.status !== 'CONSEGNATO' : o.status === 'CONSEGNATO')
    .filter((o) => !statusFilter || o.status === statusFilter)
    .filter((o) => !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.machineModel.toLowerCase().includes(search.toLowerCase()));

  const allStatuses: OrderStatus[] = ['CONFERMATO', 'IN_PRODUZIONE', 'COLLAUDO', 'PRONTO_SPEDIZIONE', 'SPEDITO', 'CONSEGNATO'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-cmc-text">{t('orderList')}</h1>

      {/* Pill Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1.5 w-fit" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <button
          onClick={() => setTab('active')}
          className={`g-pill ${tab === 'active' ? 'g-pill-active' : 'g-pill-inactive'}`}
        >
          {t('activeOrdersTab')}
        </button>
        <button
          onClick={() => setTab('history')}
          className={`g-pill ${tab === 'history' ? 'g-pill-active' : 'g-pill-inactive'}`}
        >
          {t('historyTab')}
        </button>
      </div>

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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-cmc-gray border border-cmc-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cmc-lime/30 focus:border-cmc-lime transition-all"
        >
          <option value="">{t('allStatuses')}</option>
          {allStatuses.map((s) => (
            <option key={s} value={s}>{t(s)}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="g-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cmc-border">
              <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('orderNumber')}</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('machineModel')}</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('quantity')}</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('status')}</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('estimatedDelivery')}</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-cmc-border/50 g-table-row">
                <td className="px-6 py-4">
                  <span className="font-bold text-sm text-cmc-text">{order.id}</span>
                </td>
                <td className="px-6 py-4 text-sm text-cmc-text">{order.machineModel}</td>
                <td className="px-6 py-4 text-sm text-cmc-text">{order.quantity}</td>
                <td className="px-6 py-4">
                  <span className={`g-badge ${statusColors[order.status]}`}>
                    {t(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-cmc-text-light flex items-center gap-1.5">
                    <Clock size={14} /> {order.estimatedDelivery}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/orders/${order.id}`} className="text-cmc-text-light hover:text-cmc-darker transition-colors">
                    <ChevronRight size={18} />
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-cmc-text-light">{t('noResults')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
