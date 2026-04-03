import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { userMachines } from '../data/mockData';
import { ArrowLeft, Clock, Shield, AlertTriangle, Wrench, Camera, Activity, Calendar, CheckCircle2 } from 'lucide-react';

export default function MachineDetail() {
  const { id } = useParams();
  const { t, locale } = useTranslation();

  const machine = userMachines.find((m) => m.id === id);
  if (!machine) {
    return <div className="text-center py-20 text-cmc-text-light">{t('noResults')}</div>;
  }

  const warrantyValid = new Date(machine.warrantyExpiry) > new Date();

  // Mock diagnostics
  const diagnostics = [
    { label: locale === 'it' ? 'Sistema idraulico' : 'Hydraulic system', status: 'OK', color: 'text-cmc-success' },
    { label: locale === 'it' ? 'Sistema SCS' : 'SCS System', status: 'OK', color: 'text-cmc-success' },
    { label: locale === 'it' ? 'Motore' : 'Engine', status: 'OK', color: 'text-cmc-success' },
    { label: locale === 'it' ? 'Batteria' : 'Battery', status: locale === 'it' ? 'Attenzione' : 'Warning', color: 'text-cmc-warning' },
  ];

  return (
    <div className="space-y-6">
      <Link to="/machines" className="flex items-center gap-2 text-sm text-cmc-text-light hover:text-cmc-darker transition-colors font-semibold">
        <ArrowLeft size={16} /> {t('back')}
      </Link>

      {/* Header */}
      <div className="g-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-cmc-text mb-1">{machine.model}</h1>
            <p className="text-cmc-text-light text-sm font-mono">{t('serialNumber')}: {machine.serialNumber}</p>
          </div>
          <span className={`g-badge text-sm font-bold px-4 py-2 ${warrantyValid ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {warrantyValid ? t('warrantyValid') : t('warrantyExpired')}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <InfoBox icon={Calendar} label={t('purchaseDate')} value={machine.purchaseDate} />
          <InfoBox icon={Shield} label={locale === 'it' ? 'Scadenza garanzia' : 'Warranty expiry'} value={machine.warrantyExpiry} />
          <InfoBox icon={Clock} label={t('hoursOperated')} value={`${machine.hoursOperated}h`} />
          <InfoBox icon={Wrench} label={locale === 'it' ? 'Ultima manutenzione' : 'Last maintenance'} value={machine.lastMaintenanceDate} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance alerts */}
        <div className="g-card p-6">
          <h2 className="text-lg font-bold text-cmc-text mb-4 flex items-center gap-2">
            <AlertTriangle size={20} /> {t('maintenanceSchedule')}
          </h2>
          <div className="space-y-3">
            {machine.nextMaintenanceDue.map((alert, i) => (
              <div key={i} className={`p-4 rounded-xl border-l-4 ${
                alert.status === 'SCADUTO' ? 'bg-red-50 border-red-500' :
                alert.status === 'IMMINENTE' ? 'bg-amber-50 border-amber-500' :
                'bg-emerald-50 border-emerald-500'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{locale === 'it' ? alert.type : alert.typeEn}</span>
                  <span className={`g-badge ${
                    alert.status === 'SCADUTO' ? 'bg-red-100 text-red-700' :
                    alert.status === 'IMMINENTE' ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {t(alert.status)}
                  </span>
                </div>
                <div className="text-xs text-cmc-text-light">
                  {alert.dueHours && `${alert.dueHours}h — `}{alert.dueDate}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2.5 bg-cmc-lime text-white font-bold rounded-xl hover:bg-cmc-lime/80 transition-colors flex items-center justify-center gap-2">
            <Wrench size={16} /> {t('addMaintenance')}
          </button>
        </div>

        {/* Diagnostics */}
        <div className="g-card p-6">
          <h2 className="text-lg font-bold text-cmc-text mb-4 flex items-center gap-2">
            <Activity size={20} /> {t('diagnostics')}
          </h2>
          <div className="space-y-3">
            {diagnostics.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-cmc-gray rounded-xl">
                <span className="text-sm font-semibold text-cmc-text">{d.label}</span>
                <span className={`text-sm font-bold ${d.color}`}>{d.status}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-sm text-cmc-text mb-3">{t('uploadMedia')}</h3>
            <div className="border-2 border-dashed border-cmc-border rounded-xl p-8 text-center">
              <Camera size={32} className="mx-auto text-cmc-mid mb-2" />
              <p className="text-sm text-cmc-text-light">
                {locale === 'it' ? 'Trascina o clicca per caricare' : 'Drag or click to upload'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance History */}
      <div className="g-card p-6">
        <h2 className="text-lg font-bold text-cmc-text mb-4">{t('maintenanceHistory')}</h2>
        <div className="space-y-3">
          {machine.maintenanceHistory.map((record) => (
            <div key={record.id} className="flex items-start gap-4 p-4 bg-cmc-gray rounded-xl">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 size={16} className="text-cmc-success" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-cmc-text">{locale === 'it' ? record.type : record.typeEn}</span>
                  <span className="text-xs text-cmc-text-light">{record.date}</span>
                </div>
                <p className="text-xs text-cmc-text-light">{locale === 'it' ? record.notes : record.notesEn}</p>
                <p className="text-xs text-cmc-text-light mt-1">
                  {locale === 'it' ? 'Eseguito da' : 'Performed by'}: <span className="font-semibold">{record.performedBy}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoBox({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3.5 bg-cmc-gray rounded-xl">
      <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <Icon size={16} className="text-cmc-darker" />
      </div>
      <div>
        <div className="text-xs text-cmc-text-light">{label}</div>
        <div className="text-sm font-bold text-cmc-text">{value}</div>
      </div>
    </div>
  );
}
