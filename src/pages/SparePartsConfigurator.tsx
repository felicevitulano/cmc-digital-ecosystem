import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { parts, machineModels, type Part } from '../data/mockData';
import { ArrowLeft, ShoppingCart, Search, Check } from 'lucide-react';
import { useToast } from '../components/Toast';

export default function SparePartsConfigurator() {
  const { modelId } = useParams();
  const { addToCart } = useStore();
  const { t, locale } = useTranslation();
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [search, setSearch] = useState('');
  const [addedFeedback, setAddedFeedback] = useState<string | null>(null);
  const toast = useToast();

  const model = machineModels.find((m) => m.id === modelId);
  const modelParts = parts.filter((p) =>
    p.modelCompatibility.includes(model?.name || '')
  ).filter((p) =>
    !search || p.description.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase()) || p.descriptionEn.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (part: Part) => {
    addToCart({ partCode: part.code, description: locale === 'it' ? part.description : part.descriptionEn, price: part.price });
    setAddedFeedback(part.code);
    toast.add(locale === 'it' ? `${part.code} aggiunto al carrello` : `${part.code} added to cart`, 'success');
    setTimeout(() => setAddedFeedback(null), 1500);
  };

  const stockColors: Record<string, string> = {
    DISPONIBILE: 'text-cmc-success bg-emerald-50',
    SU_ORDINE: 'text-cmc-warning bg-amber-50',
    ESAURITO: 'text-cmc-danger bg-red-50',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/parts" className="flex items-center gap-2 text-sm text-cmc-text-light hover:text-cmc-darker transition-colors font-semibold">
          <ArrowLeft size={16} /> {t('back')}
        </Link>
        <h1 className="text-2xl font-extrabold text-cmc-text">{model?.name} — {t('explodedView')}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Exploded View */}
        <div className="lg:col-span-2 g-card p-6">
          <svg viewBox="0 0 800 600" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Base / Tracks */}
            <g id="tracks-group">
              <rect id="left-track" x="80" y="480" width="260" height="45" rx="22" fill={selectedPart?.svgElementId === 'left-track' ? '#E7FF89' : '#4e5964'} stroke="#3C3950" strokeWidth="2" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'left-track') || null)} />
              <rect id="right-track" x="460" y="480" width="260" height="45" rx="22" fill={selectedPart?.svgElementId === 'right-track' ? '#E7FF89' : '#4e5964'} stroke="#3C3950" strokeWidth="2" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'right-track') || null)} />
            </g>

            {/* Base platform */}
            <rect x="120" y="420" width="560" height="60" rx="8" fill="#5a6670" stroke="#3C3950" strokeWidth="2" />

            {/* Engine */}
            <rect id="engine" x="520" y="370" width="130" height="50" rx="6" fill={selectedPart?.svgElementId === 'engine' ? '#E7FF89' : '#6b7580'} stroke="#3C3950" strokeWidth="2" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'engine') || null)} />
            <text x="585" y="400" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" className="pointer-events-none">ENGINE</text>

            {/* Hydraulic pump */}
            <circle id="hydraulic-pump" cx="470" cy="395" r="25" fill={selectedPart?.svgElementId === 'hydraulic-pump' ? '#E7FF89' : '#7a8490'} stroke="#3C3950" strokeWidth="2" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'hydraulic-pump') || null)} />
            <text x="470" y="399" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" className="pointer-events-none">PUMP</text>

            {/* Oil filter area */}
            <rect id="oil-filter" x="430" y="435" width="30" height="20" rx="4" fill={selectedPart?.svgElementId === 'oil-filter' ? '#E7FF89' : '#8a9199'} stroke="#3C3950" strokeWidth="1.5" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'oil-filter') || null)} />

            {/* Fuel filter */}
            <rect id="fuel-filter" x="550" y="435" width="30" height="20" rx="4" fill={selectedPart?.svgElementId === 'fuel-filter' ? '#E7FF89' : '#8a9199'} stroke="#3C3950" strokeWidth="1.5" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'fuel-filter') || null)} />

            {/* SCS Unit */}
            <rect id="scs-unit" x="200" y="380" width="80" height="40" rx="6" fill={selectedPart?.svgElementId === 'scs-unit' ? '#E7FF89' : '#4a7c59'} stroke="#3C3950" strokeWidth="2" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'scs-unit') || null)} />
            <text x="240" y="404" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" className="pointer-events-none">SCS</text>

            {/* Stabilizers */}
            <g id="stabilizers">
              <rect id="front-right-stab" x="680" y="400" width="15" height="130" rx="4" fill={selectedPart?.svgElementId === 'front-right-stab' ? '#E7FF89' : '#e8a030'} stroke="#3C3950" strokeWidth="2" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'front-right-stab') || null)} />
              <rect id="front-left-stab" x="105" y="400" width="15" height="130" rx="4" fill={selectedPart?.svgElementId === 'front-left-stab' ? '#E7FF89' : '#e8a030'} stroke="#3C3950" strokeWidth="2" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'front-left-stab') || null)} />
            </g>

            {/* Slewing ring area */}
            <circle cx="350" cy="400" r="35" fill="none" stroke="#3C3950" strokeWidth="2" strokeDasharray="4 4" />

            {/* Tilt sensor */}
            <circle id="tilt-sensor" cx="310" cy="385" r="10" fill={selectedPart?.svgElementId === 'tilt-sensor' ? '#E7FF89' : '#d45050'} stroke="#3C3950" strokeWidth="1.5" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'tilt-sensor') || null)} />

            {/* Safety valve */}
            <circle id="safety-valve" cx="420" cy="370" r="12" fill={selectedPart?.svgElementId === 'safety-valve' ? '#E7FF89' : '#c07030'} stroke="#3C3950" strokeWidth="1.5" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'safety-valve') || null)} />

            {/* Lower boom */}
            <rect id="lower-boom" x="320" y="250" width="40" height="140" rx="8" fill={selectedPart?.svgElementId === 'lower-boom' ? '#E7FF89' : '#4e5964'} stroke="#3C3950" strokeWidth="2" transform="rotate(-15 340 320)" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'lower-boom') || null)} />

            {/* Pivot pin */}
            <circle id="pivot-pin" cx="350" cy="370" r="8" fill={selectedPart?.svgElementId === 'pivot-pin' ? '#E7FF89' : '#aaa'} stroke="#3C3950" strokeWidth="2" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'pivot-pin') || null)} />

            {/* Upper boom */}
            <rect id="upper-boom" x="280" y="120" width="35" height="150" rx="8" fill={selectedPart?.svgElementId === 'upper-boom' ? '#E7FF89' : '#5a6670'} stroke="#3C3950" strokeWidth="2" transform="rotate(-10 297 195)" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'upper-boom') || null)} />

            {/* Hydraulic cylinder */}
            <rect id="hydraulic-cylinder" x="370" y="240" width="20" height="120" rx="6" fill={selectedPart?.svgElementId === 'hydraulic-cylinder' ? '#E7FF89' : '#7090b0'} stroke="#3C3950" strokeWidth="2" transform="rotate(-15 380 300)" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'hydraulic-cylinder') || null)} />

            {/* Basket */}
            <g id="basket-group">
              <rect id="basket" x="220" y="60" width="90" height="55" rx="4" fill={selectedPart?.svgElementId === 'basket' ? '#E7FF89' : '#e8a030'} stroke="#3C3950" strokeWidth="2" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'basket') || null)} />
              <rect id="basket-guard" x="220" y="55" width="90" height="10" rx="2" fill={selectedPart?.svgElementId === 'basket-guard' ? '#E7FF89' : '#c08020'} stroke="#3C3950" strokeWidth="1.5" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'basket-guard') || null)} />
              {/* Operator silhouette */}
              <circle cx="255" cy="50" r="8" fill="#3C3950" opacity="0.3" />
              <rect x="249" y="58" width="12" height="2" rx="1" fill="#3C3950" opacity="0.3" />
            </g>

            {/* Grease indicator */}
            <circle id="grease" cx="160" cy="440" r="8" fill={selectedPart?.svgElementId === 'grease' ? '#E7FF89' : '#90c060'} stroke="#3C3950" strokeWidth="1.5" className="cursor-pointer hover:fill-[#E7FF89] transition-colors" onClick={() => setSelectedPart(parts.find(p => p.svgElementId === 'grease') || null)} />

            {/* Labels */}
            <text x="400" y="25" textAnchor="middle" fill="#3C3950" fontSize="16" fontWeight="bold">{model?.name} — {t('explodedView')}</text>
          </svg>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cmc-text-light" />
            <input
              type="text"
              placeholder={t('searchParts')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="g-search"
            />
          </div>

          {/* Selected part detail */}
          {selectedPart ? (
            <div className="g-card p-5 border-2 border-cmc-lime">
              <h3 className="font-bold text-lg text-cmc-text mb-1">{t('partDetail')}</h3>
              <div className="space-y-3 mt-3">
                <div>
                  <span className="text-xs text-cmc-text-light">{t('partCode')}</span>
                  <div className="font-mono font-bold text-sm text-cmc-text">{selectedPart.code}</div>
                </div>
                <div>
                  <span className="text-xs text-cmc-text-light">{t('description')}</span>
                  <div className="text-sm text-cmc-text">{locale === 'it' ? selectedPart.description : selectedPart.descriptionEn}</div>
                </div>
                <div>
                  <span className="text-xs text-cmc-text-light">{t('category')}</span>
                  <div className="text-sm text-cmc-text">{t(selectedPart.category)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-cmc-text-light">{t('price')}</span>
                    <div className="font-extrabold text-lg text-cmc-text">&euro;{selectedPart.price.toLocaleString()}</div>
                  </div>
                  <span className={`g-badge ${stockColors[selectedPart.stockStatus]}`}>
                    {t(selectedPart.stockStatus)}
                  </span>
                </div>
                {selectedPart.leadTimeDays && (
                  <div className="text-xs text-cmc-text-light">
                    Lead time: {selectedPart.leadTimeDays} {locale === 'it' ? 'giorni' : 'days'}
                  </div>
                )}
                <button
                  onClick={() => handleAddToCart(selectedPart)}
                  disabled={selectedPart.stockStatus === 'ESAURITO'}
                  className="w-full py-2.5 bg-cmc-lime text-white font-bold rounded-xl hover:bg-cmc-lime/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {addedFeedback === selectedPart.code ? (
                    <><Check size={18} /> {locale === 'it' ? 'Aggiunto!' : 'Added!'}</>
                  ) : (
                    <><ShoppingCart size={18} /> {t('addToCart')}</>
                  )}
                </button>
                {selectedPart.relatedParts.length > 0 && (
                  <div>
                    <span className="text-xs text-cmc-text-light">{t('relatedParts')}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedPart.relatedParts.map((rp) => (
                        <button
                          key={rp}
                          onClick={() => setSelectedPart(parts.find(p => p.code === rp) || null)}
                          className="text-xs bg-cmc-gray px-2.5 py-1 rounded-lg hover:bg-cmc-lime/20 transition-colors font-medium"
                        >
                          {rp}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="g-card p-5 text-center text-cmc-text-light text-sm">
              {t('clickComponentHint')}
            </div>
          )}

          {/* Parts list */}
          <div className="g-card overflow-hidden max-h-[400px] overflow-y-auto">
            {modelParts.map((part) => (
              <button
                key={part.code}
                onClick={() => setSelectedPart(part)}
                className={`w-full text-left px-4 py-3.5 border-b border-cmc-border/50 hover:bg-cmc-lime/10 transition-colors ${selectedPart?.code === part.code ? 'bg-cmc-lime/15 border-l-3 border-l-cmc-lime' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-cmc-text-light">{part.code}</div>
                    <div className="text-sm font-semibold text-cmc-text">{locale === 'it' ? part.description : part.descriptionEn}</div>
                  </div>
                  <div className="text-sm font-bold text-cmc-text">&euro;{part.price.toLocaleString()}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
