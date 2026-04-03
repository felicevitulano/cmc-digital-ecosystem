import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { faqs, type FAQ } from '../data/mockData';
import { ArrowLeft, Send, Bot, User, Play, Lightbulb, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  faq?: FAQ;
}

export default function AIAssistant() {
  const { t, locale } = useTranslation();
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, isTyping]);

  const findBestMatch = (query: string): FAQ | null => {
    const q = query.toLowerCase();
    // Simple keyword matching for mockup
    const scored = faqs.map((faq) => {
      const words = q.split(/\s+/);
      const target = `${faq.question} ${faq.questionEn} ${faq.answer} ${faq.answerEn}`.toLowerCase();
      const score = words.filter((w) => w.length > 2 && target.includes(w)).length;
      return { faq, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.score > 0 ? scored[0].faq : null;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: input };
    setChat((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const match = findBestMatch(input);
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        text: match
          ? (locale === 'it' ? match.answer : match.answerEn)
          : (locale === 'it'
            ? 'Mi dispiace, non ho trovato informazioni specifiche per questa domanda. Prova a riformulare o contatta il tuo rivenditore CMC.'
            : 'Sorry, I couldn\'t find specific information for this question. Try rephrasing or contact your CMC dealer.'),
        faq: match || undefined,
      };
      setChat((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const confidenceColors = {
    HIGH: 'bg-emerald-50 text-emerald-700',
    MEDIUM: 'bg-amber-50 text-amber-700',
    LOW: 'bg-red-50 text-red-700',
  };

  // Suggested questions
  const suggestions = faqs.slice(0, 4).map((f) => locale === 'it' ? f.question : f.questionEn);

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link to="/tutorial" className="flex items-center gap-2 text-sm text-cmc-text-light hover:text-cmc-darker transition-colors font-semibold">
          <ArrowLeft size={16} /> {t('back')}
        </Link>
        <h1 className="text-2xl font-extrabold text-cmc-text flex items-center gap-2">
          <Bot size={24} className="text-cmc-darker" /> {t('aiAssistant')}
        </h1>
      </div>

      {/* Chat area */}
      <div className="flex-1 g-card overflow-y-auto p-6 space-y-4">
        {chat.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-cmc-gray flex items-center justify-center mx-auto mb-4">
              <Bot size={32} className="text-cmc-text-light" />
            </div>
            <h2 className="text-lg font-bold text-cmc-text mb-2">
              {locale === 'it' ? 'Come posso aiutarti?' : 'How can I help you?'}
            </h2>
            <p className="text-sm text-cmc-text-light mb-6">{t('askQuestion')}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(s); }}
                  className="text-xs bg-cmc-gray px-3.5 py-2 rounded-xl hover:bg-cmc-lime/20 transition-colors text-left max-w-[250px] font-medium"
                >
                  "{s}"
                </button>
              ))}
            </div>
          </div>
        )}

        {chat.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-cmc-darker flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-cmc-lime" />
              </div>
            )}
            <div className={`max-w-[70%] rounded-2xl p-4 ${
              msg.role === 'user'
                ? 'bg-cmc-lime text-white'
                : 'bg-cmc-gray text-cmc-text'
            }`}>
              <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>

              {msg.faq && (
                <div className="mt-3 space-y-2">
                  {/* Confidence */}
                  <div className="flex items-center gap-2">
                    <span className={`g-badge ${confidenceColors[msg.faq.confidence]}`}>
                      {t('confidence')}: {t(msg.faq.confidence)}
                    </span>
                  </div>

                  {/* Video reference */}
                  {msg.faq.videoTitle && (
                    <div className="flex items-center gap-2 p-2.5 bg-white rounded-xl">
                      <Play size={14} className="text-cmc-darker" />
                      <span className="text-xs font-semibold">{msg.faq.videoTitle}</span>
                      {msg.faq.videoTimestamp && (
                        <button className="text-xs text-cmc-lime bg-cmc-darker px-2 py-0.5 rounded-full font-mono hover:bg-cmc-dark transition-colors">
                          {t('goToTimestamp')} {msg.faq.videoTimestamp}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Proactive suggestion */}
                  {msg.faq.proactiveSuggestion && (
                    <div className="flex items-start gap-2 p-2.5 bg-cmc-lime/15 border border-cmc-lime/30 rounded-xl">
                      <Lightbulb size={14} className="text-cmc-warning mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-bold">{t('proactiveSuggestion')}</span>
                        <p className="text-xs mt-0.5">
                          {locale === 'it' ? msg.faq.proactiveSuggestion : msg.faq.proactiveSuggestionEn}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Feedback */}
                  <div className="flex items-center gap-2 pt-1">
                    <button className="p-1.5 hover:bg-white rounded-lg transition-colors">
                      <ThumbsUp size={14} className="text-cmc-text-light" />
                    </button>
                    <button className="p-1.5 hover:bg-white rounded-lg transition-colors">
                      <ThumbsDown size={14} className="text-cmc-text-light" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-cmc-darker flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-cmc-darker flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-cmc-lime" />
            </div>
            <div className="bg-cmc-gray rounded-2xl p-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-cmc-mid rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-cmc-mid rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-cmc-mid rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={chatEnd} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-3">
        <input
          type="text"
          placeholder={t('askQuestion')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-3 bg-white border border-cmc-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-cmc-lime/30 focus:border-cmc-lime transition-all"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="px-5 py-3 bg-cmc-darker text-white font-bold rounded-2xl hover:bg-cmc-dark transition-colors disabled:opacity-40"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
