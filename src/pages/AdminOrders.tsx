import { useTranslation } from '../hooks/useTranslation';
import { orders, type OrderStatus } from '../data/mockData';
import { Clock } from 'lucide-react';

export default function AdminOrders() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-cmc-text">{t('manageOrders')}</h1>
      <div className="g-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cmc-border">
              <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('orderNumber')}</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">Dealer</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('machineModel')}</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('status')}</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('estimatedDelivery')}</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-cmc-border/50 g-table-row">
                <td className="px-6 py-4 font-bold text-sm text-cmc-text">{order.id}</td>
                <td className="px-6 py-4 text-sm text-cmc-text">{order.dealerId === 'dealer-rossi' ? 'Rossi Macchine' : 'ABC Lifting'}</td>
                <td className="px-6 py-4 text-sm text-cmc-text">{order.machineModel}</td>
                <td className="px-6 py-4">
                  <select
                    defaultValue={order.status}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-cmc-border cursor-pointer bg-cmc-gray focus:outline-none focus:ring-2 focus:ring-cmc-lime/30"
                  >
                    {(['CONFERMATO', 'IN_PRODUZIONE', 'COLLAUDO', 'PRONTO_SPEDIZIONE', 'SPEDITO', 'CONSEGNATO'] as OrderStatus[]).map((s) => (
                      <option key={s} value={s}>{t(s)}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-cmc-text-light flex items-center gap-1.5">
                  <Clock size={14} /> {order.estimatedDelivery}
                </td>
                <td className="px-6 py-4">
                  <button className="text-xs font-bold text-cmc-darker bg-cmc-gray px-4 py-2 rounded-xl hover:bg-cmc-lime/20 transition-colors">
                    {t('save')}
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
