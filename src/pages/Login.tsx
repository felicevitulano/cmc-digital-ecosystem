import { useNavigate } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { Shield, Package, Truck, Globe } from 'lucide-react';
import type { UserRole } from '../hooks/useStore';

const roles: { role: UserRole; icon: typeof Shield; home: string }[] = [
  { role: 'CMC_ADMIN', icon: Shield, home: '/admin' },
  { role: 'RIVENDITORE', icon: Package, home: '/dashboard' },
  { role: 'UTENTE_FINALE', icon: Truck, home: '/machines' },
];

const mockUsers: Record<UserRole, { id: string; name: string; email: string; dealerId?: string; dealerName?: string }> = {
  CMC_ADMIN: { id: 'admin-1', name: 'Marco Bianchi', email: 'admin@cmclift.com' },
  RIVENDITORE: { id: 'dealer-rossi', name: 'Luigi Rossi', email: 'luigi@rossimacchine.it', dealerId: 'dealer-rossi', dealerName: 'Rossi Macchine Srl' },
  UTENTE_FINALE: { id: 'user-1', name: 'Paolo Verdi', email: 'paolo.verdi@email.it' },
};

export default function Login() {
  const { login, locale, setLocale } = useStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole, home: string) => {
    const userData = mockUsers[role];
    login({ ...userData, role, locale });
    navigate(home);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 50%, #4e5964 100%)' }}>
      {/* Language toggle */}
      <button
        onClick={() => setLocale(locale === 'it' ? 'en' : 'it')}
        className="absolute top-6 right-6 flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
      >
        <Globe size={18} />
        <span className="text-sm font-semibold">{locale.toUpperCase()}</span>
      </button>

      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="login-hero text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-cmc-lime flex items-center justify-center" style={{ boxShadow: '0 8px 32px rgba(233, 30, 140, 0.3)' }}>
              <span className="text-white font-extrabold text-2xl">CMC</span>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Digital Ecosystem</h1>
          <p className="text-white/50 text-base">{t('selectRole')}</p>
        </div>

        {/* Role cards */}
        <div className="space-y-4 stagger">
          {roles.map(({ role, icon: Icon, home }) => (
            <button
              key={role}
              onClick={() => handleLogin(role, home)}
              className="login-card btn-press w-full bg-white rounded-2xl p-5 flex items-center gap-4 transition-all group hover:translate-y-[-2px] border-l-4 border-cmc-lime"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
            >
              <div className="w-12 h-12 rounded-xl bg-cmc-lime/15 flex items-center justify-center group-hover:bg-cmc-lime/30 transition-colors">
                <Icon size={24} className="text-cmc-darker" />
              </div>
              <div className="text-left flex-1">
                <div className="text-cmc-text font-bold text-lg">
                  {t(role === 'CMC_ADMIN' ? 'cmcAdmin' : role === 'RIVENDITORE' ? 'dealer' : 'endUser')}
                </div>
                <div className="text-cmc-text-light text-sm">
                  {t(role === 'CMC_ADMIN' ? 'cmcAdminDesc' : role === 'RIVENDITORE' ? 'dealerDesc' : 'endUserDesc')}
                </div>
              </div>
              <div className="text-cmc-mid group-hover:text-cmc-darker transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-white/25 text-xs mt-10">
          CMC Digital Ecosystem v1.0 — Mockup navigabile
        </p>
      </div>
    </div>
  );
}
