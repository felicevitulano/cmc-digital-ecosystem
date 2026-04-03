import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { userMachines } from '../data/mockData';
import { Truck, Clock, Shield, AlertTriangle, ChevronRight, Plus } from 'lucide-react';

export default function Machines() {
  const { t, locale } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-cmc-text">{t('myMachines')}</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-cmc-lime text-white font-bold rounded-xl hover:bg-cmc-lime/80 transition-colors">
          <Plus size={18} /> {t('registerMachine')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userMachines.map((machine) => {
          const warrantyValid = new Date(machine.warrantyExpiry) > new Date();
          const urgentAlerts = machine.nextMaintenanceDue.filter((a) => a.status !== 'OK');

          return (
            <Link
              key={machine.id}
              to={`/machines/${machine.id}`}
              className="g-card p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cmc-lime/15 flex items-center justify-center">
                    <Truck size={24} className="text-cmc-darker" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-cmc-text">{machine.model}</h3>
                    <p className="text-xs text-cmc-text-light font-mono">{machine.serialNumber}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-cmc-mid group-hover:text-cmc-darker transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-cmc-gray rounded-xl p-3">
                  <span className="text-xs text-cmc-text-light">{t('hoursOperated')}</span>
                  <div className="flex items-center gap-1 font-bold text-cmc-text">
                    <Clock size={14} className="text-cmc-darker" />
                    {machine.hoursOperated}h
                  </div>
                </div>
                <div className="bg-cmc-gray rounded-xl p-3">
                  <span className="text-xs text-cmc-text-light">{t('warrantyStatus')}</span>
                  <div className={`flex items-center gap-1 font-bold text-sm ${warrantyValid ? 'text-cmc-success' : 'text-cmc-danger'}`}>
                    <Shield size={14} />
                    {warrantyValid ? t('warrantyValid') : t('warrantyExpired')}
                  </div>
                </div>
              </div>

              {urgentAlerts.length > 0 && (
                <div className="border-t border-cmc-border pt-3 space-y-1.5">
                  {urgentAlerts.map((alert, i) => (
                    <div key={i} className={`flex items-center gap-2 text-xs px-3 py-2 rounded-xl border-l-3 ${
                      alert.status === 'SCADUTO' ? 'bg-red-50 text-red-700 border-l-red-500' : 'bg-amber-50 text-amber-700 border-l-amber-500'
                    }`}>
                      <AlertTriangle size={12} />
                      <span className="font-semibold">{locale === 'it' ? alert.type : alert.typeEn}</span>
                      <span className="ml-auto font-bold">{t(alert.status)}</span>
                    </div>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
