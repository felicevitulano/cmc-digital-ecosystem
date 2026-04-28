import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { useTranslation } from '../hooks/useTranslation';
import {
  LayoutDashboard, Package, Wrench, FileText, Mail, GraduationCap,
  Bot, Truck, LogOut, Globe, Menu, Bell, ShoppingCart, Search, ChevronDown, X,
} from 'lucide-react';

export default function Layout() {
  const { user, logout, cart, sidebarOpen, toggleSidebar, locale, setLocale } = useStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const navItems = getNavItems(user.role, t);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = () => {
    // Auto-close sidebar on mobile after navigation
    if (isMobile && sidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-cmc-page-bg">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-40 h-full
          ${sidebarOpen ? 'w-[260px] translate-x-0' : 'w-0 -translate-x-full lg:w-[260px] lg:translate-x-0'}
          flex flex-col bg-white border-r border-cmc-border transition-all duration-300 flex-shrink-0 overflow-hidden
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-cmc-lime flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img src={import.meta.env.BASE_URL + 'cmc-logo-white.png'} alt="CMC" className="w-7 h-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; (e.target as HTMLImageElement).parentElement!.innerHTML='<span class=\"text-white font-extrabold text-sm\">CMC</span>'; }} />
          </div>
          <div className={`${sidebarOpen ? 'flex' : 'hidden lg:flex'} items-center justify-between flex-1`}>
            <span className="font-bold text-sm text-cmc-text whitespace-nowrap">Digital Ecosystem</span>
            <button onClick={toggleSidebar} className="lg:hidden p-1 hover:bg-cmc-gray rounded-lg">
              <X size={18} className="text-cmc-text-light" />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200 ${
                  isActive
                    ? 'g-nav-active'
                    : 'g-nav-inactive'
                }`
              }
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span className={sidebarOpen ? '' : 'hidden lg:inline'}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom user card */}
        <div className="p-3 flex-shrink-0">
          <div className="bg-cmc-gray rounded-xl p-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-cmc-darker text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className={`${sidebarOpen ? 'block' : 'hidden lg:block'} flex-1 min-w-0`}>
                <div className="text-sm font-bold text-cmc-text truncate">{user.name}</div>
                <div className="text-xs text-cmc-text-light truncate">
                  {t(user.role === 'CMC_ADMIN' ? 'cmcAdmin' : user.role === 'RIVENDITORE' ? 'dealer' : 'endUser')}
                </div>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-cmc-text-light hover:text-cmc-danger transition-colors w-full">
              <LogOut size={16} />
              <span className={sidebarOpen ? '' : 'hidden lg:inline'}>{t('logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 sm:h-16 bg-white border-b border-cmc-border flex items-center justify-between px-3 sm:px-6 flex-shrink-0" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={toggleSidebar} className="btn-press p-2 hover:bg-cmc-gray rounded-xl transition-colors">
              <Menu size={20} className="text-cmc-text-light" />
            </button>

            {/* Search bar */}
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cmc-text-light" />
              <input
                type="text"
                placeholder={t('search') + '...'}
                className="w-64 pl-10 pr-4 py-2 bg-cmc-gray border border-transparent rounded-xl text-sm focus:outline-none focus:border-cmc-lime focus:ring-2 focus:ring-cmc-lime/30 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            {/* Lang switch */}
            <button
              onClick={() => setLocale(locale === 'it' ? 'en' : 'it')}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-sm text-cmc-text-light hover:text-cmc-text hover:bg-cmc-gray rounded-xl transition-all"
            >
              <Globe size={16} />
              <span className="font-semibold hidden sm:inline">{locale.toUpperCase()}</span>
            </button>

            {/* Cart (dealer only) */}
            {user.role === 'RIVENDITORE' && (
              <button
                onClick={() => navigate('/parts/cart')}
                className="btn-press icon-pop relative p-2 hover:bg-cmc-gray rounded-xl transition-colors"
              >
                <ShoppingCart size={20} className="text-cmc-text-light" />
                {cart.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-cmc-lime text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cart.reduce((sum, c) => sum + c.quantity, 0)}
                  </span>
                )}
              </button>
            )}

            {/* Notifications */}
            <button className="btn-press icon-pop relative p-2 hover:bg-cmc-gray rounded-xl transition-colors">
              <Bell size={20} className="text-cmc-text-light" />
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-cmc-danger text-white text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* User avatar + name */}
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-cmc-border">
              <div className="w-8 h-8 rounded-full bg-cmc-darker text-white flex items-center justify-center text-sm font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="hidden lg:block">
                <div className="text-sm font-semibold text-cmc-text leading-tight">{user.name}</div>
                <div className="text-xs text-cmc-text-light leading-tight">
                  {t(user.role === 'CMC_ADMIN' ? 'cmcAdmin' : user.role === 'RIVENDITORE' ? 'dealer' : 'endUser')}
                </div>
              </div>
              <ChevronDown size={14} className="text-cmc-text-light" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function getNavItems(role: string, t: (k: string) => string) {
  const items = [];

  if (role === 'RIVENDITORE') {
    items.push(
      { to: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
      { to: '/orders', label: t('orders'), icon: Package },
      { to: '/parts', label: t('spareParts'), icon: Wrench },
      { to: '/docs', label: t('documents'), icon: FileText },
      { to: '/messages', label: t('messages'), icon: Mail },
      { to: '/tutorial', label: t('tutorials'), icon: GraduationCap },
    );
  } else if (role === 'UTENTE_FINALE') {
    items.push(
      { to: '/machines', label: t('myMachines'), icon: Truck },
      { to: '/tutorial', label: t('tutorials'), icon: GraduationCap },
      { to: '/tutorial/assistant', label: t('aiAssistant'), icon: Bot },
      { to: '/docs', label: t('documents'), icon: FileText },
    );
  } else if (role === 'CMC_ADMIN') {
    items.push(
      { to: '/admin', label: t('dashboard'), icon: LayoutDashboard },
      { to: '/admin/orders', label: t('manageOrders'), icon: Package },
      { to: '/admin/campaigns', label: t('manageCampaigns'), icon: Mail },
      { to: '/admin/catalog', label: t('manageCatalog'), icon: Wrench },
      { to: '/docs', label: t('documents'), icon: FileText },
    );
  }

  return items;
}
