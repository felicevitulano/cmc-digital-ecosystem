import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { messages as messagesData } from '../data/mockData';
import { Mail, MailOpen, Paperclip, ChevronRight, ArrowLeft } from 'lucide-react';

export default function Messages() {
  const { t, locale } = useTranslation();
  const [msgs, setMsgs] = useState(messagesData);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<'inbox' | 'archived'>('inbox');

  const filtered = msgs.filter((m) => tab === 'inbox' ? !m.archived : m.archived);
  const selected = msgs.find((m) => m.id === selectedId);

  const markRead = (id: string) => {
    setMsgs((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const toggleArchive = (id: string) => {
    setMsgs((prev) => prev.map((m) => (m.id === id ? { ...m, archived: !m.archived } : m)));
    setSelectedId(null);
  };

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-sm text-cmc-text-light hover:text-cmc-darker transition-colors font-semibold">
          <ArrowLeft size={16} /> {t('back')}
        </button>

        <div className="g-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-xl font-extrabold text-cmc-text mb-1">{selected.subject}</h1>
              <div className="flex items-center gap-3 text-sm text-cmc-text-light">
                <span>{t('from')}: {selected.from}</span>
                <span>{selected.date}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleArchive(selected.id)}
                className="px-4 py-2 text-sm font-semibold bg-cmc-gray rounded-xl hover:bg-cmc-lime/20 transition-colors"
              >
                {t('archive')}
              </button>
            </div>
          </div>

          <div className="border-t border-cmc-border pt-4 whitespace-pre-line text-sm leading-relaxed text-cmc-text">
            {locale === 'it' ? selected.body : selected.bodyEn}
          </div>

          {selected.attachmentDocId && (
            <div className="mt-4 p-3.5 bg-cmc-gray rounded-xl flex items-center gap-2">
              <Paperclip size={16} className="text-cmc-darker" />
              <span className="text-sm font-semibold">{t('attachments')}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-cmc-text">{t('messages')}</h1>

      {/* Pill Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1.5 w-fit" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <button
          onClick={() => setTab('inbox')}
          className={`g-pill ${tab === 'inbox' ? 'g-pill-active' : 'g-pill-inactive'}`}
        >
          {t('inbox')} ({msgs.filter((m) => !m.archived).length})
        </button>
        <button
          onClick={() => setTab('archived')}
          className={`g-pill ${tab === 'archived' ? 'g-pill-active' : 'g-pill-inactive'}`}
        >
          {t('archived')}
        </button>
      </div>

      {/* Messages */}
      <div className="g-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-cmc-text-light">{t('noMessages')}</div>
        ) : (
          filtered.map((msg) => (
            <button
              key={msg.id}
              onClick={() => { setSelectedId(msg.id); markRead(msg.id); }}
              className={`w-full text-left px-6 py-4 border-b border-cmc-border/50 hover:bg-cmc-gray transition-colors flex items-center gap-4 ${!msg.read ? 'bg-cmc-lime/5' : ''}`}
            >
              <div className="flex-shrink-0">
                {msg.read ? (
                  <MailOpen size={20} className="text-cmc-text-light" />
                ) : (
                  <div className="relative">
                    <Mail size={20} className="text-cmc-darker" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cmc-lime border-2 border-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-sm ${!msg.read ? 'font-bold text-cmc-text' : 'font-medium text-cmc-text'}`}>{msg.from}</span>
                  {msg.attachmentDocId && <Paperclip size={12} className="text-cmc-text-light" />}
                </div>
                <div className={`text-sm truncate ${!msg.read ? 'font-semibold text-cmc-text' : 'text-cmc-text-light'}`}>
                  {msg.subject}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-cmc-text-light">{msg.date}</span>
                <ChevronRight size={16} className="text-cmc-mid" />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
