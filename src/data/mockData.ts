// ============================================================
// MOCK DATA — CMC Digital Ecosystem
// ============================================================

// --- Orders ---
export interface ProductionPhase {
  name: string;
  completedAt?: string;
  status: 'COMPLETATO' | 'IN_CORSO' | 'ATTESA';
  note?: string;
}

export type OrderStatus =
  | 'CONFERMATO'
  | 'IN_PRODUZIONE'
  | 'COLLAUDO'
  | 'PRONTO_SPEDIZIONE'
  | 'SPEDITO'
  | 'CONSEGNATO';

export interface Order {
  id: string;
  dealerId: string;
  machineModel: string;
  serialNumber?: string;
  quantity: number;
  status: OrderStatus;
  phases: ProductionPhase[];
  estimatedDelivery: string;
  trackingCode?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const fullPhases = (completedCount: number, currentIndex: number, notes?: Record<number, string>): ProductionPhase[] => {
  const names = [
    'Ricezione materiali',
    'Saldatura struttura',
    'Verniciatura',
    'Cablaggio elettronico',
    'Montaggio sistema SCS',
    'Test funzionale',
    'Collaudo finale',
    'Preparazione spedizione',
  ];
  return names.map((name, i) => ({
    name,
    status: i < completedCount ? 'COMPLETATO' as const : i === currentIndex ? 'IN_CORSO' as const : 'ATTESA' as const,
    completedAt: i < completedCount ? `2026-03-${String(10 + i).padStart(2, '0')}` : undefined,
    note: notes?.[i],
  }));
};

export const orders: Order[] = [
  {
    id: 'ORD-2026-001',
    dealerId: 'dealer-rossi',
    machineModel: 'S27 DP',
    serialNumber: 'CMC-2026-0312',
    quantity: 1,
    status: 'SPEDITO',
    phases: fullPhases(8, -1),
    estimatedDelivery: '2026-04-05',
    trackingCode: 'DHL-IT-9876543210',
    notes: 'Configurazione speciale RAL 7016',
    createdAt: '2026-02-15',
    updatedAt: '2026-03-28',
  },
  {
    id: 'ORD-2026-002',
    dealerId: 'dealer-rossi',
    machineModel: 'S23 LP',
    quantity: 1,
    status: 'IN_PRODUZIONE',
    phases: fullPhases(3, 3, { 3: 'Cablaggio in corso — completamento previsto 4 aprile' }),
    estimatedDelivery: '2026-04-20',
    notes: '',
    createdAt: '2026-03-01',
    updatedAt: '2026-04-01',
  },
  {
    id: 'ORD-2026-003',
    dealerId: 'dealer-rossi',
    machineModel: 'S18 FH',
    quantity: 1,
    status: 'CONFERMATO',
    phases: fullPhases(0, -1),
    estimatedDelivery: '2026-05-10',
    notes: 'Attesa conferma colore da cliente',
    createdAt: '2026-03-20',
    updatedAt: '2026-03-20',
  },
  {
    id: 'ORD-2026-004',
    dealerId: 'dealer-abc',
    machineModel: 'S32 DP',
    serialNumber: 'CMC-2026-0298',
    quantity: 1,
    status: 'COLLAUDO',
    phases: fullPhases(5, 5),
    estimatedDelivery: '2026-04-12',
    notes: '',
    createdAt: '2026-02-20',
    updatedAt: '2026-04-01',
  },
  {
    id: 'ORD-2026-005',
    dealerId: 'dealer-rossi',
    machineModel: 'S27 DP',
    serialNumber: 'CMC-2026-0287',
    quantity: 2,
    status: 'CONSEGNATO',
    phases: fullPhases(8, -1),
    estimatedDelivery: '2026-03-15',
    trackingCode: 'DHL-IT-1234567890',
    notes: 'Consegna completata il 14 marzo',
    createdAt: '2026-01-28',
    updatedAt: '2026-03-14',
  },
];

// --- Parts ---
export type PartCategory =
  | 'SISTEMA_OLEODINAMICO'
  | 'STRUTTURA_BRACCI'
  | 'CINGOLI_STABILIZZATORI'
  | 'SISTEMA_ELETTRONICO_SCS'
  | 'MOTORE_PROPULSIONE'
  | 'CESTELLO_ACCESSORI'
  | 'CONSUMABILI';

export interface Part {
  code: string;
  description: string;
  descriptionEn: string;
  modelCompatibility: string[];
  category: PartCategory;
  price: number;
  currency: 'EUR';
  stockStatus: 'DISPONIBILE' | 'SU_ORDINE' | 'ESAURITO';
  leadTimeDays?: number;
  relatedParts: string[];
  svgElementId: string;
}

export const parts: Part[] = [
  { code: 'CMC-HYD-001', description: 'Cilindro idraulico braccio principale', descriptionEn: 'Main boom hydraulic cylinder', modelCompatibility: ['S27 DP', 'S27'], category: 'SISTEMA_OLEODINAMICO', price: 2850, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-HYD-002', 'CMC-HYD-010'], svgElementId: 'hydraulic-cylinder' },
  { code: 'CMC-HYD-002', description: 'Pompa idraulica principale', descriptionEn: 'Main hydraulic pump', modelCompatibility: ['S27 DP', 'S23 LP', 'S32 DP'], category: 'SISTEMA_OLEODINAMICO', price: 3200, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-HYD-001'], svgElementId: 'hydraulic-pump' },
  { code: 'CMC-HYD-010', description: 'Valvola di sicurezza circuito idraulico', descriptionEn: 'Hydraulic circuit safety valve', modelCompatibility: ['S27 DP', 'S23 LP'], category: 'SISTEMA_OLEODINAMICO', price: 420, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-HYD-001'], svgElementId: 'safety-valve' },
  { code: 'CMC-STR-001', description: 'Sezione braccio telescopico inferiore', descriptionEn: 'Lower telescopic boom section', modelCompatibility: ['S27 DP'], category: 'STRUTTURA_BRACCI', price: 5600, currency: 'EUR', stockStatus: 'SU_ORDINE', leadTimeDays: 21, relatedParts: ['CMC-STR-002'], svgElementId: 'lower-boom' },
  { code: 'CMC-STR-002', description: 'Sezione braccio telescopico superiore', descriptionEn: 'Upper telescopic boom section', modelCompatibility: ['S27 DP'], category: 'STRUTTURA_BRACCI', price: 4800, currency: 'EUR', stockStatus: 'SU_ORDINE', leadTimeDays: 21, relatedParts: ['CMC-STR-001'], svgElementId: 'upper-boom' },
  { code: 'CMC-STR-003', description: 'Perno snodo braccio', descriptionEn: 'Boom pivot pin', modelCompatibility: ['S27 DP', 'S23 LP', 'S32 DP'], category: 'STRUTTURA_BRACCI', price: 180, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-STR-001'], svgElementId: 'pivot-pin' },
  { code: 'CMC-TRK-001', description: 'Cingolo in gomma destro', descriptionEn: 'Right rubber track', modelCompatibility: ['S27 DP', 'S23 LP'], category: 'CINGOLI_STABILIZZATORI', price: 1950, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-TRK-002'], svgElementId: 'right-track' },
  { code: 'CMC-TRK-002', description: 'Cingolo in gomma sinistro', descriptionEn: 'Left rubber track', modelCompatibility: ['S27 DP', 'S23 LP'], category: 'CINGOLI_STABILIZZATORI', price: 1950, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-TRK-001'], svgElementId: 'left-track' },
  { code: 'CMC-TRK-003', description: 'Stabilizzatore anteriore destro', descriptionEn: 'Front right stabilizer', modelCompatibility: ['S27 DP', 'S32 DP'], category: 'CINGOLI_STABILIZZATORI', price: 2200, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-TRK-004', 'CMC-HYD-010'], svgElementId: 'front-right-stab' },
  { code: 'CMC-TRK-004', description: 'Stabilizzatore anteriore sinistro', descriptionEn: 'Front left stabilizer', modelCompatibility: ['S27 DP', 'S32 DP'], category: 'CINGOLI_STABILIZZATORI', price: 2200, currency: 'EUR', stockStatus: 'ESAURITO', leadTimeDays: 30, relatedParts: ['CMC-TRK-003'], svgElementId: 'front-left-stab' },
  { code: 'CMC-SCS-001', description: 'Centralina SCS (Safety Control System)', descriptionEn: 'SCS Control Unit (Safety Control System)', modelCompatibility: ['S27 DP', 'S23 LP', 'S32 DP'], category: 'SISTEMA_ELETTRONICO_SCS', price: 4500, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-SCS-002'], svgElementId: 'scs-unit' },
  { code: 'CMC-SCS-002', description: 'Sensore inclinazione piattaforma', descriptionEn: 'Platform tilt sensor', modelCompatibility: ['S27 DP', 'S23 LP', 'S32 DP'], category: 'SISTEMA_ELETTRONICO_SCS', price: 680, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-SCS-001'], svgElementId: 'tilt-sensor' },
  { code: 'CMC-ENG-001', description: 'Motore diesel Kubota', descriptionEn: 'Kubota diesel engine', modelCompatibility: ['S27 DP'], category: 'MOTORE_PROPULSIONE', price: 7800, currency: 'EUR', stockStatus: 'SU_ORDINE', leadTimeDays: 35, relatedParts: ['CMC-CON-002'], svgElementId: 'engine' },
  { code: 'CMC-BSK-001', description: 'Cestello operatore 1.8m', descriptionEn: 'Operator basket 1.8m', modelCompatibility: ['S27 DP', 'S23 LP'], category: 'CESTELLO_ACCESSORI', price: 3400, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-BSK-002'], svgElementId: 'basket' },
  { code: 'CMC-BSK-002', description: 'Protezione cestello in acciaio', descriptionEn: 'Steel basket guard', modelCompatibility: ['S27 DP', 'S23 LP', 'S32 DP'], category: 'CESTELLO_ACCESSORI', price: 890, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-BSK-001'], svgElementId: 'basket-guard' },
  { code: 'CMC-CON-001', description: 'Filtro olio idraulico', descriptionEn: 'Hydraulic oil filter', modelCompatibility: ['S27 DP', 'S23 LP', 'S32 DP', 'S18 FH'], category: 'CONSUMABILI', price: 45, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-CON-002', 'CMC-CON-003'], svgElementId: 'oil-filter' },
  { code: 'CMC-CON-002', description: 'Filtro gasolio', descriptionEn: 'Diesel fuel filter', modelCompatibility: ['S27 DP', 'S32 DP'], category: 'CONSUMABILI', price: 38, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-CON-001'], svgElementId: 'fuel-filter' },
  { code: 'CMC-CON-003', description: 'Grasso lubrificante EP2 (cartuccia 400g)', descriptionEn: 'EP2 lubricant grease (400g cartridge)', modelCompatibility: ['S27 DP', 'S23 LP', 'S32 DP', 'S18 FH'], category: 'CONSUMABILI', price: 12, currency: 'EUR', stockStatus: 'DISPONIBILE', relatedParts: ['CMC-CON-001'], svgElementId: 'grease' },
];

// --- Documents ---
export type DocCategory =
  | 'MANUALE_UTENTE'
  | 'SCHEDA_TECNICA'
  | 'LISTINO_PREZZI'
  | 'MATERIALE_MARKETING'
  | 'BRAND_KIT'
  | 'CERTIFICAZIONI'
  | 'COMUNICATO_PRODOTTO';

export interface Document {
  id: string;
  title: string;
  category: DocCategory;
  modelTags: string[];
  languageTags: string[];
  fileType: 'pdf' | 'docx' | 'xlsx' | 'zip' | 'video';
  fileSizeMb: number;
  version: string;
  publishedAt: string;
  updatedAt: string;
  restricted: boolean;
}

export const documents: Document[] = [
  { id: 'doc-1', title: 'Manuale Utente S27 DP', category: 'MANUALE_UTENTE', modelTags: ['S27 DP'], languageTags: ['it', 'en'], fileType: 'pdf', fileSizeMb: 12.4, version: '3.1', publishedAt: '2025-11-15', updatedAt: '2026-01-20', restricted: false },
  { id: 'doc-2', title: 'Scheda Tecnica S27 DP', category: 'SCHEDA_TECNICA', modelTags: ['S27 DP'], languageTags: ['it', 'en'], fileType: 'pdf', fileSizeMb: 2.1, version: '2.0', publishedAt: '2025-09-01', updatedAt: '2026-02-10', restricted: false },
  { id: 'doc-3', title: 'Manuale Utente S23 LP', category: 'MANUALE_UTENTE', modelTags: ['S23 LP'], languageTags: ['it'], fileType: 'pdf', fileSizeMb: 10.8, version: '2.5', publishedAt: '2025-06-20', updatedAt: '2025-12-01', restricted: false },
  { id: 'doc-4', title: 'Listino Prezzi 2026', category: 'LISTINO_PREZZI', modelTags: ['S18 FH', 'S23 LP', 'S27 DP', 'S32 DP'], languageTags: ['it'], fileType: 'xlsx', fileSizeMb: 1.2, version: '1.0', publishedAt: '2026-01-05', updatedAt: '2026-01-05', restricted: true },
  { id: 'doc-5', title: 'CMC Brand Guidelines', category: 'BRAND_KIT', modelTags: [], languageTags: ['en'], fileType: 'pdf', fileSizeMb: 8.5, version: '1.2', publishedAt: '2025-03-01', updatedAt: '2025-10-15', restricted: false },
  { id: 'doc-6', title: 'Video Tutorial: Procedura di avvio S27', category: 'MANUALE_UTENTE', modelTags: ['S27 DP'], languageTags: ['it'], fileType: 'video', fileSizeMb: 245, version: '1.0', publishedAt: '2025-12-10', updatedAt: '2025-12-10', restricted: false },
  { id: 'doc-7', title: 'Certificazione CE S27 DP', category: 'CERTIFICAZIONI', modelTags: ['S27 DP'], languageTags: ['it', 'en'], fileType: 'pdf', fileSizeMb: 0.8, version: '1.0', publishedAt: '2025-08-01', updatedAt: '2025-08-01', restricted: false },
  { id: 'doc-8', title: 'Comunicato Prodotto: Model Year 2026', category: 'COMUNICATO_PRODOTTO', modelTags: ['S27 DP', 'S32 DP'], languageTags: ['it', 'en'], fileType: 'pdf', fileSizeMb: 3.4, version: '1.0', publishedAt: '2026-03-01', updatedAt: '2026-03-01', restricted: false },
];

// --- Messages ---
export interface Message {
  id: string;
  campaignTitle: string;
  subject: string;
  body: string;
  bodyEn: string;
  from: string;
  date: string;
  read: boolean;
  archived: boolean;
  attachmentDocId?: string;
  type: 'product_update' | 'order_update' | 'general';
}

export const messages: Message[] = [
  {
    id: 'msg-1',
    campaignTitle: 'Model Year 2026',
    subject: 'Nuova S27 DP Model Year 2026 — Scopri le novità',
    body: 'Gentile Rivenditore,\n\nsiamo lieti di presentare la S27 DP Model Year 2026 con le seguenti novità:\n\n• Nuovo sistema SCS 4.0 con sensori di ultima generazione\n• Motore Kubota Stage V con consumi ridotti del 12%\n• Cestello maggiorato a 2.0m di larghezza\n• Nuovo display touch a colori in cabina\n\nTroverete in allegato il comunicato prodotto completo con tutte le specifiche tecniche.\n\nCordiali saluti,\nTeam CMC',
    bodyEn: 'Dear Dealer,\n\nWe are pleased to introduce the S27 DP Model Year 2026 with the following highlights:\n\n• New SCS 4.0 system with latest-gen sensors\n• Kubota Stage V engine with 12% lower fuel consumption\n• Enlarged 2.0m basket\n• New color touch display\n\nPlease find attached the full product release with technical specifications.\n\nBest regards,\nCMC Team',
    from: 'CMC Product Team',
    date: '2026-03-01',
    read: false,
    archived: false,
    attachmentDocId: 'doc-8',
    type: 'product_update',
  },
  {
    id: 'msg-2',
    campaignTitle: 'Aggiornamento Ordine',
    subject: 'Il tuo ordine ORD-2026-001 è stato spedito!',
    body: 'Buone notizie! La tua S27 DP (ordine ORD-2026-001) è stata spedita oggi.\n\nCodice tracking DHL: DHL-IT-9876543210\nConsegna prevista: 5 aprile 2026\n\nPuoi seguire lo stato della spedizione direttamente dalla sezione Ordini della piattaforma.\n\nGrazie per la fiducia,\nTeam CMC',
    bodyEn: 'Great news! Your S27 DP (order ORD-2026-001) was shipped today.\n\nDHL tracking code: DHL-IT-9876543210\nEstimated delivery: April 5, 2026\n\nYou can track the shipment status directly from the Orders section.\n\nThank you for your trust,\nCMC Team',
    from: 'CMC Logistics',
    date: '2026-03-28',
    read: true,
    archived: false,
    type: 'order_update',
  },
  {
    id: 'msg-3',
    campaignTitle: 'Fiera Intermat 2026',
    subject: 'Vi aspettiamo a Intermat 2026 — Pad. 5, Stand C42',
    body: 'CMC sarà presente a Intermat 2026 (Parigi, 27-30 aprile) con tutta la gamma aggiornata.\n\nVi aspettiamo al Padiglione 5, Stand C42 per:\n• Demo live della S27 DP MY2026\n• Presentazione del nuovo configuratore ricambi digitale\n• Incontri B2B con il team commerciale\n\nConfermate la vostra presenza rispondendo a questo messaggio.\n\nA presto,\nTeam CMC',
    bodyEn: 'CMC will be at Intermat 2026 (Paris, April 27-30) with the full updated range.\n\nVisit us at Hall 5, Stand C42 for:\n• Live demo of the S27 DP MY2026\n• Presentation of the new digital spare parts configurator\n• B2B meetings with the sales team\n\nPlease confirm your attendance by replying to this message.\n\nSee you there,\nCMC Team',
    from: 'CMC Marketing',
    date: '2026-03-15',
    read: false,
    archived: false,
    type: 'general',
  },
];

// --- FAQ / Tutorial AI ---
export interface FAQ {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  category: 'maintenance' | 'safety' | 'operations' | 'troubleshooting';
  machineModels: string[];
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  videoTitle?: string;
  videoTimestamp?: string;
  proactiveSuggestion?: string;
  proactiveSuggestionEn?: string;
}

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Come regolo gli stabilizzatori in pendenza?',
    questionEn: 'How do I adjust the stabilizers on a slope?',
    answer: 'Per regolare gli stabilizzatori in pendenza:\n\n1. Posizionare la macchina con il lato più lungo parallelo alla pendenza\n2. Estendere prima gli stabilizzatori a valle, poi quelli a monte\n3. Utilizzare la livella a bolla integrata nel pannello comandi\n4. Verificare che tutti e 4 gli stabilizzatori siano a contatto pieno con il terreno\n5. Controllare che l\'indicatore SCS mostri "verde" prima di estendere il braccio',
    answerEn: 'To adjust stabilizers on a slope:\n\n1. Position the machine with the longer side parallel to the slope\n2. Extend downhill stabilizers first, then uphill ones\n3. Use the built-in bubble level on the control panel\n4. Verify all 4 stabilizers have full ground contact\n5. Check that the SCS indicator shows "green" before extending the boom',
    category: 'operations',
    machineModels: ['S27 DP', 'S23 LP', 'S32 DP'],
    confidence: 'HIGH',
    videoTitle: 'Procedura di avvio e stabilizzazione S27',
    videoTimestamp: '4:23',
    proactiveSuggestion: 'La S27 DP può operare fino a 5° di pendenza laterale con il sistema SCS attivo. Oltre i 3° è consigliato ridurre l\'altezza massima di lavoro del 20%.',
    proactiveSuggestionEn: 'The S27 DP can operate up to 5° lateral slope with the SCS system active. Beyond 3° it is recommended to reduce maximum working height by 20%.',
  },
  {
    id: 'faq-2',
    question: 'La macchina non scende, cosa faccio?',
    questionEn: 'The machine won\'t come down, what do I do?',
    answer: 'Se il braccio non scende:\n\n1. NON farsi prendere dal panico — la macchina ha un sistema di discesa di emergenza\n2. Verificare che non ci sia un allarme SCS attivo (led rosso lampeggiante)\n3. Se l\'SCS è in allarme: stabilizzare la base, poi premere il pulsante di override sul pannello cestello\n4. Se non c\'è allarme: controllare il livello dell\'olio idraulico nel serbatoio\n5. Utilizzare la pompa manuale di emergenza (leva rossa sotto il pannello base) per la discesa manuale\n6. Contattare il rivenditore se il problema persiste',
    answerEn: 'If the boom won\'t come down:\n\n1. DO NOT panic — the machine has an emergency descent system\n2. Check if there is an active SCS alarm (flashing red LED)\n3. If SCS is alarming: stabilize the base, then press the override button on the basket panel\n4. If no alarm: check hydraulic oil level in the tank\n5. Use the manual emergency pump (red lever under the base panel) for manual descent\n6. Contact your dealer if the issue persists',
    category: 'troubleshooting',
    machineModels: ['S27 DP', 'S23 LP', 'S32 DP', 'S18 FH'],
    confidence: 'HIGH',
    videoTitle: 'Procedure di emergenza piattaforme CMC',
    videoTimestamp: '12:45',
    proactiveSuggestion: 'La pompa manuale di emergenza richiede circa 50 pompate per riportare il braccio in posizione di riposo. È fondamentale verificarne il funzionamento ogni 30 giorni.',
    proactiveSuggestionEn: 'The manual emergency pump requires about 50 strokes to return the boom to rest position. It is essential to test it every 30 days.',
  },
  {
    id: 'faq-3',
    question: 'Che grasso uso per la lubrificazione?',
    questionEn: 'What grease should I use for lubrication?',
    answer: 'Per la S27 DP utilizzare esclusivamente grasso EP2 a base di litio (NLGI grado 2).\n\nPunti di ingrassaggio principali:\n• Perni bracci (6 punti) — ogni 50 ore\n• Slitte telescopiche (4 punti) — ogni 50 ore\n• Perni stabilizzatori (4 punti) — ogni 100 ore\n• Ralla di rotazione — ogni 100 ore\n• Cingoli (ingrassatori tendicingolo) — ogni 200 ore\n\nQuantità: circa 2-3 pompate per ingrassatore con pistola standard.',
    answerEn: 'For the S27 DP use exclusively lithium-based EP2 grease (NLGI grade 2).\n\nMain greasing points:\n• Boom pins (6 points) — every 50 hours\n• Telescopic slides (4 points) — every 50 hours\n• Stabilizer pins (4 points) — every 100 hours\n• Slewing ring — every 100 hours\n• Tracks (track tensioner greasers) — every 200 hours\n\nAmount: approximately 2-3 pumps per grease fitting with standard grease gun.',
    category: 'maintenance',
    machineModels: ['S27 DP'],
    confidence: 'HIGH',
    videoTitle: 'Lubrificazione e manutenzione ordinaria S27',
    videoTimestamp: '2:10',
  },
  {
    id: 'faq-4',
    question: 'Come verifico il livello dell\'olio idraulico?',
    questionEn: 'How do I check the hydraulic oil level?',
    answer: 'Per controllare il livello dell\'olio idraulico:\n\n1. Posizionare la macchina su una superficie piana\n2. Ritrarre completamente tutti i bracci e gli stabilizzatori\n3. Spegnere il motore e attendere 5 minuti\n4. Individuare l\'oblò di ispezione sul serbatoio idraulico (lato destro della base)\n5. Il livello deve essere tra le tacche MIN e MAX\n6. Se sotto MIN: rabboccare con olio HLP 46 (o HLP 32 sotto i -10°C)',
    answerEn: 'To check hydraulic oil level:\n\n1. Position the machine on a flat surface\n2. Fully retract all booms and stabilizers\n3. Turn off the engine and wait 5 minutes\n4. Locate the inspection sight glass on the hydraulic tank (right side of base)\n5. Level should be between MIN and MAX marks\n6. If below MIN: top up with HLP 46 oil (or HLP 32 below -10°C)',
    category: 'maintenance',
    machineModels: ['S27 DP', 'S23 LP', 'S32 DP'],
    confidence: 'HIGH',
    videoTitle: 'Controlli giornalieri piattaforma CMC',
    videoTimestamp: '7:30',
  },
  {
    id: 'faq-5',
    question: 'Cosa significa l\'errore E-042 sul display?',
    questionEn: 'What does error E-042 on the display mean?',
    answer: 'L\'errore E-042 indica un problema al sensore di inclinazione della piattaforma.\n\nAzioni da eseguire:\n1. Spegnere e riaccendere la macchina (reset)\n2. Verificare che il cestello non sia sovraccarico (max 230 kg per S27 DP)\n3. Controllare il connettore del sensore (sotto il cestello, connettore nero a 4 pin)\n4. Se l\'errore persiste dopo il reset: il sensore potrebbe richiedere sostituzione\n5. Contattare il rivenditore con codice errore e numero seriale',
    answerEn: 'Error E-042 indicates a platform tilt sensor issue.\n\nActions to take:\n1. Turn off and restart the machine (reset)\n2. Verify the basket is not overloaded (max 230 kg for S27 DP)\n3. Check the sensor connector (under the basket, black 4-pin connector)\n4. If the error persists after reset: the sensor may need replacement\n5. Contact your dealer with error code and serial number',
    category: 'troubleshooting',
    machineModels: ['S27 DP', 'S23 LP', 'S32 DP'],
    confidence: 'MEDIUM',
    videoTitle: 'Diagnostica errori comuni piattaforme CMC',
    videoTimestamp: '18:20',
  },
  {
    id: 'faq-6',
    question: 'Qual è il peso massimo nel cestello?',
    questionEn: 'What is the maximum basket load?',
    answer: 'Capacità massima cestello per modello:\n\n• S18 FH: 200 kg (2 operatori)\n• S23 LP: 230 kg (2 operatori)\n• S27 DP: 230 kg (2 operatori)\n• S32 DP: 230 kg (2 operatori)\n\n⚠️ Il peso include operatori, attrezzi e materiali. Il sistema SCS blocca automaticamente i movimenti se il carico supera il 110% della capacità nominale.',
    answerEn: 'Maximum basket capacity by model:\n\n• S18 FH: 200 kg (2 operators)\n• S23 LP: 230 kg (2 operators)\n• S27 DP: 230 kg (2 operators)\n• S32 DP: 230 kg (2 operators)\n\n⚠️ Weight includes operators, tools and materials. The SCS system automatically blocks movements if load exceeds 110% of rated capacity.',
    category: 'safety',
    machineModels: ['S27 DP', 'S23 LP', 'S32 DP', 'S18 FH'],
    confidence: 'HIGH',
  },
  {
    id: 'faq-7',
    question: 'Come si avvia la macchina per la prima volta?',
    questionEn: 'How do I start the machine for the first time?',
    answer: 'Procedura di primo avvio S27 DP:\n\n1. Controllo pre-avvio: livello olio idraulico, livello gasolio, livello olio motore\n2. Verificare che tutti i bracci siano in posizione di riposo\n3. Inserire la chiave di contatto e girarla in posizione ON\n4. Attendere il completamento del self-test SCS (circa 10 secondi, led giallo)\n5. Quando il led diventa verde: avviare il motore\n6. Lasciar scaldare il motore per 3 minuti in inverno, 1 minuto in estate\n7. Testare tutti i movimenti a bassa velocità prima di procedere',
    answerEn: 'S27 DP first start-up procedure:\n\n1. Pre-start check: hydraulic oil level, diesel level, engine oil level\n2. Verify all booms are in rest position\n3. Insert the ignition key and turn to ON\n4. Wait for SCS self-test completion (about 10 seconds, yellow LED)\n5. When LED turns green: start the engine\n6. Let the engine warm up for 3 minutes in winter, 1 minute in summer\n7. Test all movements at low speed before proceeding',
    category: 'operations',
    machineModels: ['S27 DP'],
    confidence: 'HIGH',
    videoTitle: 'Procedura di avvio e stabilizzazione S27',
    videoTimestamp: '0:30',
  },
  {
    id: 'faq-8',
    question: 'Ogni quanto devo fare la manutenzione ordinaria?',
    questionEn: 'How often should I perform routine maintenance?',
    answer: 'Intervalli di manutenzione ordinaria S27 DP:\n\n• Ogni giorno: controllo visivo, livelli olio, pulizia\n• Ogni 50 ore: ingrassaggio bracci e slitte\n• Ogni 100 ore: ingrassaggio stabilizzatori e ralla\n• Ogni 250 ore: sostituzione filtro olio idraulico, controllo cinghie\n• Ogni 500 ore: revisione completa sistema idraulico, sostituzione olio\n• Ogni 1000 ore: revisione generale (da officina autorizzata)',
    answerEn: 'S27 DP routine maintenance intervals:\n\n• Daily: visual inspection, oil levels, cleaning\n• Every 50 hours: boom and slide greasing\n• Every 100 hours: stabilizer and slewing ring greasing\n• Every 250 hours: hydraulic oil filter replacement, belt inspection\n• Every 500 hours: full hydraulic system service, oil change\n• Every 1000 hours: general overhaul (authorized workshop)',
    category: 'maintenance',
    machineModels: ['S27 DP'],
    confidence: 'HIGH',
    videoTitle: 'Lubrificazione e manutenzione ordinaria S27',
    videoTimestamp: '0:15',
  },
  {
    id: 'faq-9',
    question: 'Posso usare la macchina con vento forte?',
    questionEn: 'Can I use the machine in strong wind?',
    answer: 'Limiti operativi per vento:\n\n• Fino a 45 km/h (forza 6): operatività normale\n• Da 45 a 60 km/h (forza 7): ridurre altezza di lavoro del 30%, movimenti lenti\n• Oltre 60 km/h (forza 8+): VIETATO operare — ritrarre il braccio immediatamente\n\n⚠️ Il sistema SCS della S27 DP NON include un anemometro di serie. Si consiglia l\'installazione dell\'anemometro opzionale (cod. CMC-ACC-012) per il monitoraggio automatico.',
    answerEn: 'Wind operational limits:\n\n• Up to 45 km/h (force 6): normal operation\n• 45 to 60 km/h (force 7): reduce working height by 30%, slow movements\n• Over 60 km/h (force 8+): PROHIBITED — retract boom immediately\n\n⚠️ The S27 DP SCS system does NOT include a standard anemometer. Optional anemometer installation (code CMC-ACC-012) is recommended for automatic monitoring.',
    category: 'safety',
    machineModels: ['S27 DP', 'S23 LP', 'S32 DP', 'S18 FH'],
    confidence: 'HIGH',
  },
  {
    id: 'faq-10',
    question: 'Come trasporto la macchina su un camion?',
    questionEn: 'How do I transport the machine on a truck?',
    answer: 'Procedura di carico su camion per S27 DP:\n\n1. Verificare che il camion abbia portata minima 6.5 tonnellate\n2. Ritrarre completamente bracci, cestello e stabilizzatori\n3. Posizionare i cingoli in direzione di marcia del camion\n4. Utilizzare rampe con angolo massimo 15° e larghezza minima 80 cm\n5. Salire a velocità minima sui cingoli\n6. Una volta posizionata: spegnere il motore\n7. Ancorare con 4 cinghie da 5 tonnellate sui punti di ancoraggio marcati in giallo\n8. Posizionare cunei sotto i cingoli',
    answerEn: 'S27 DP loading procedure on truck:\n\n1. Verify truck has minimum 6.5 ton capacity\n2. Fully retract booms, basket and stabilizers\n3. Position tracks in truck travel direction\n4. Use ramps with maximum 15° angle and minimum 80 cm width\n5. Drive up at minimum speed on tracks\n6. Once positioned: turn off engine\n7. Secure with 4 x 5-ton straps on yellow-marked anchor points\n8. Place wedges under tracks',
    category: 'operations',
    machineModels: ['S27 DP'],
    confidence: 'HIGH',
    videoTitle: 'Trasporto e movimentazione piattaforme CMC',
    videoTimestamp: '1:00',
  },
];

// --- User Machines (end user) ---
export interface UserMachine {
  id: string;
  serialNumber: string;
  model: string;
  purchaseDate: string;
  warrantyExpiry: string;
  hoursOperated: number;
  lastMaintenanceDate: string;
  nextMaintenanceDue: MaintenanceAlert[];
  maintenanceHistory: MaintenanceRecord[];
}

export interface MaintenanceAlert {
  type: string;
  typeEn: string;
  dueDate: string;
  dueHours?: number;
  status: 'OK' | 'IMMINENTE' | 'SCADUTO';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface MaintenanceRecord {
  id: string;
  type: string;
  typeEn: string;
  date: string;
  notes: string;
  notesEn: string;
  performedBy: string;
}

export const userMachines: UserMachine[] = [
  {
    id: 'mach-1',
    serialNumber: 'CMC-2024-0847',
    model: 'S27 DP',
    purchaseDate: '2024-06-15',
    warrantyExpiry: '2026-06-15',
    hoursOperated: 342,
    lastMaintenanceDate: '2026-02-20',
    nextMaintenanceDue: [
      { type: 'Revisione 500 ore', typeEn: '500-hour service', dueDate: '2026-05-01', dueHours: 500, status: 'IMMINENTE', priority: 'HIGH' },
      { type: 'Sostituzione filtro olio idraulico', typeEn: 'Hydraulic oil filter replacement', dueDate: '2026-04-15', dueHours: 375, status: 'IMMINENTE', priority: 'MEDIUM' },
      { type: 'Ingrassaggio ralla', typeEn: 'Slewing ring greasing', dueDate: '2026-04-05', dueHours: 350, status: 'SCADUTO', priority: 'HIGH' },
    ],
    maintenanceHistory: [
      { id: 'mh-1', type: 'Ingrassaggio completo', typeEn: 'Full greasing', date: '2026-02-20', notes: 'Tutti i punti di ingrassaggio completati', notesEn: 'All greasing points completed', performedBy: 'Officina Rossi' },
      { id: 'mh-2', type: 'Sostituzione filtro olio', typeEn: 'Oil filter replacement', date: '2025-11-10', notes: 'Sostituito filtro olio idraulico + rabbocco olio', notesEn: 'Replaced hydraulic oil filter + oil top-up', performedBy: 'Fai da te' },
      { id: 'mh-3', type: 'Revisione 250 ore', typeEn: '250-hour service', date: '2025-08-05', notes: 'Revisione completa sistema idraulico, sostituzione cinghie', notesEn: 'Full hydraulic system service, belt replacement', performedBy: 'Centro CMC autorizzato' },
    ],
  },
  {
    id: 'mach-2',
    serialNumber: 'CMC-2023-1203',
    model: 'S18 FH',
    purchaseDate: '2023-03-10',
    warrantyExpiry: '2025-03-10',
    hoursOperated: 1240,
    lastMaintenanceDate: '2026-01-15',
    nextMaintenanceDue: [
      { type: 'Revisione generale 1000 ore', typeEn: '1000-hour general overhaul', dueDate: '2026-02-01', dueHours: 1000, status: 'SCADUTO', priority: 'HIGH' },
    ],
    maintenanceHistory: [
      { id: 'mh-4', type: 'Revisione 500 ore', typeEn: '500-hour service', date: '2024-09-20', notes: 'Revisione completa, sostituzione olio idraulico', notesEn: 'Full service, hydraulic oil change', performedBy: 'Centro CMC autorizzato' },
      { id: 'mh-5', type: 'Ingrassaggio completo', typeEn: 'Full greasing', date: '2026-01-15', notes: 'Manutenzione ordinaria', notesEn: 'Routine maintenance', performedBy: 'Fai da te' },
    ],
  },
];

// --- Machine models for selection ---
export interface MachineModel {
  id: string;
  name: string;
  family: string;
  heightMin: number;
  heightMax: number;
  weight: number;
}

export const machineModels: MachineModel[] = [
  { id: 's18-fh', name: 'S18 FH', family: 'Compact', heightMin: 0, heightMax: 18, weight: 2800 },
  { id: 's23-lp', name: 'S23 LP', family: 'Medium', heightMin: 0, heightMax: 23, weight: 4200 },
  { id: 's27-dp', name: 'S27 DP', family: 'Medium', heightMin: 0, heightMax: 27, weight: 5800 },
  { id: 's32-dp', name: 'S32 DP', family: 'Heavy', heightMin: 0, heightMax: 32, weight: 7500 },
];
