import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { orders } from '../data/mockData';
import { ArrowLeft, CheckCircle2, Circle, Loader2, Clock, FileText, Truck } from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams();
  const { t, locale } = useTranslation();

  const order = orders.find((o) => o.id === id);
  if (!order) {
    return (
      <div className="text-center py-20 text-cmc-text-light">
        {t('noResults')}
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    CONFERMATO: 'bg-blue-50 text-blue-700',
    IN_PRODUZIONE: 'bg-amber-50 text-amber-700',
    COLLAUDO: 'bg-purple-50 text-purple-700',
    PRONTO_SPEDIZIONE: 'bg-cyan-50 text-cyan-700',
    SPEDITO: 'bg-emerald-50 text-emerald-700',
    CONSEGNATO: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="space-y-6">
      <Link to="/orders" className="flex items-center gap-2 text-sm text-cmc-text-light hover:text-cmc-darker transition-colors font-semibold">
        <ArrowLeft size={16} /> {t('back')}
      </Link>

      {/* Header */}
      <div className="g-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-cmc-text mb-1">{order.id}</h1>
            <p className="text-cmc-text-light text-sm">
              {order.machineModel} {order.quantity > 1 ? `x${order.quantity}` : ''}
              {order.serialNumber && ` — SN: ${order.serialNumber}`}
            </p>
          </div>
          <span className={`g-badge text-sm font-bold px-4 py-2 ${statusColors[order.status]}`}>
            {t(order.status)}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <InfoBox label={t('orderDate')} value={order.createdAt} />
          <InfoBox label={t('estimatedDelivery')} value={order.estimatedDelivery} />
          <InfoBox label={t('quantity')} value={String(order.quantity)} />
          {order.trackingCode && (
            <InfoBox label={t('trackingCode')} value={order.trackingCode} highlight />
          )}
        </div>

        {order.notes && (
          <div className="mt-4 p-3.5 bg-cmc-gray rounded-xl text-sm text-cmc-text-light">
            {order.notes}
          </div>
        )}
      </div>

      {/* Production Timeline */}
      <div className="g-card p-6">
        <h2 className="text-lg font-bold text-cmc-text mb-6">{t('productionTimeline')}</h2>
        <div className="relative">
          {order.phases.map((phase, i) => {
            const isLast = i === order.phases.length - 1;
            return (
              <div key={i} className="flex gap-4 pb-6 last:pb-0">
                {/* Line */}
                <div className="flex flex-col items-center">
                  {phase.status === 'COMPLETATO' ? (
                    <CheckCircle2 size={24} className="text-cmc-success flex-shrink-0" />
                  ) : phase.status === 'IN_CORSO' ? (
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-cmc-lime flex items-center justify-center flex-shrink-0">
                        <Loader2 size={14} className="text-cmc-darker animate-spin" />
                      </div>
                    </div>
                  ) : (
                    <Circle size={24} className="text-cmc-mid flex-shrink-0" />
                  )}
                  {!isLast && (
                    <div className={`w-0.5 flex-1 min-h-[24px] ${phase.status === 'COMPLETATO' ? 'bg-cmc-success' : 'bg-cmc-border'}`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className={`font-semibold text-sm ${phase.status === 'ATTESA' ? 'text-cmc-text-light' : 'text-cmc-text'}`}>
                    {t(phase.name)}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`g-badge ${
                      phase.status === 'COMPLETATO' ? 'bg-emerald-50 text-emerald-700' :
                      phase.status === 'IN_CORSO' ? 'bg-amber-50 text-amber-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {t(phase.status)}
                    </span>
                    {phase.completedAt && (
                      <span className="text-xs text-cmc-text-light flex items-center gap-1">
                        <Clock size={12} /> {phase.completedAt}
                      </span>
                    )}
                  </div>
                  {phase.note && (
                    <div className="mt-2 text-xs text-cmc-text-light bg-cmc-gray rounded-xl p-3">
                      {phase.note}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Documents */}
      <div className="g-card p-6">
        <h2 className="text-lg font-bold text-cmc-text mb-4">{t('orderDocuments')}</h2>
        <div className="space-y-2">
          <DocRow icon={FileText} name={locale === 'it' ? 'Conferma d\'ordine' : 'Order Confirmation'} type="PDF" />
          {order.status === 'CONSEGNATO' || order.status === 'SPEDITO' ? (
            <>
              <DocRow icon={Truck} name={locale === 'it' ? 'DDT — Documento di Trasporto' : 'Shipping Document'} type="PDF" />
              <DocRow icon={FileText} name={locale === 'it' ? 'Certificato CE' : 'CE Certificate'} type="PDF" />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-cmc-gray rounded-xl p-3.5">
      <div className="text-xs text-cmc-text-light mb-1">{label}</div>
      <div className={`text-sm font-bold ${highlight ? 'text-cmc-success' : 'text-cmc-text'}`}>{value}</div>
    </div>
  );
}

function DocRow({ icon: Icon, name, type }: { icon: typeof FileText; name: string; type: string }) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-cmc-gray transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-cmc-gray flex items-center justify-center">
          <Icon size={18} className="text-cmc-darker" />
        </div>
        <span className="text-sm font-semibold text-cmc-text">{name}</span>
      </div>
      <span className="text-xs font-semibold text-cmc-text-light bg-cmc-gray px-3 py-1 rounded-lg">{type}</span>
    </div>
  );
}
