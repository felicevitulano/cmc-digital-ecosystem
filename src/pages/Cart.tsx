import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { ArrowLeft, Trash2, Plus, Minus, CheckCircle2, ShoppingCart } from 'lucide-react';
import { useToast } from '../components/Toast';
import EmptyState from '../components/EmptyState';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();
  const { t, locale } = useTranslation();
  const toast = useToast();
  const [orderSent, setOrderSent] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSendOrder = () => {
    setOrderSent(true);
    toast.add(locale === 'it' ? 'Ordine inviato con successo!' : 'Order sent successfully!', 'success');
    setTimeout(() => {
      clearCart();
      setOrderSent(false);
    }, 3000);
  };

  const handleRemove = (partCode: string) => {
    removeFromCart(partCode);
    toast.add(locale === 'it' ? 'Articolo rimosso dal carrello' : 'Item removed from cart', 'info');
  };

  if (orderSent) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="success-pop">
          <CheckCircle2 size={64} className="text-cmc-success mb-4" />
        </div>
        <h2 className="text-xl font-extrabold text-cmc-text mb-2 page-enter">{t('orderSent')}</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/parts" className="flex items-center gap-2 text-sm text-cmc-text-light hover:text-cmc-darker transition-colors font-semibold">
        <ArrowLeft size={16} /> {t('back')}
      </Link>
      <h1 className="text-2xl font-extrabold text-cmc-text">{t('cart')}</h1>

      {cart.length === 0 ? (
        <div className="g-card">
          <EmptyState icon={ShoppingCart} title={t('emptyCart')} description={locale === 'it' ? 'Aggiungi ricambi dal configuratore' : 'Add spare parts from the configurator'} actionLabel={locale === 'it' ? 'Vai ai ricambi' : 'Go to spare parts'} onAction={() => window.history.back()} />
        </div>
      ) : (
        <>
          <div className="g-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cmc-border">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('partCode')}</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('description')}</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('price')}</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('quantity')}</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-cmc-text-light uppercase tracking-wider">{t('total')}</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.partCode} className="border-b border-cmc-border/50 g-table-row">
                    <td className="px-6 py-4 font-mono text-sm font-bold text-cmc-text">{item.partCode}</td>
                    <td className="px-6 py-4 text-sm text-cmc-text">{item.description}</td>
                    <td className="px-6 py-4 text-sm text-cmc-text">&euro;{item.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateCartQuantity(item.partCode, item.quantity - 1)} className="w-8 h-8 rounded-lg bg-cmc-gray flex items-center justify-center hover:bg-cmc-lime/30 transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.partCode, item.quantity + 1)} className="w-8 h-8 rounded-lg bg-cmc-gray flex items-center justify-center hover:bg-cmc-lime/30 transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-sm text-cmc-text">&euro;{(item.price * item.quantity).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleRemove(item.partCode)} className="btn-press text-cmc-text-light hover:text-cmc-danger transition-colors p-1.5 hover:bg-red-50 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between g-card p-6">
            <div>
              <span className="text-sm text-cmc-text-light">{t('totalItems')}: {cart.reduce((s, c) => s + c.quantity, 0)}</span>
              <div className="text-2xl font-extrabold text-cmc-text">{t('total')}: &euro;{total.toLocaleString()}</div>
            </div>
            <button onClick={handleSendOrder} className="btn-press px-8 py-3 bg-cmc-lime text-white font-bold rounded-xl hover:bg-cmc-lime/80 transition-colors">
              {t('sendOrder')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
