type Locales = 'en' | 'es' | 'eu';

const translations: Record<Locales, Record<string, string>> = {
	en: {
		en: 'English',
		es: 'Spanish',
		eu: 'Basque',
		expand: 'Expand',
		collapse: 'Collapse',
		'homepage.title': 'Home',
		'chat.initial.systemPrompt':
			"You are a helpful assistant specialized in public contracts here's what you know about public contracts: ",
		'chatbot.input': 'Ask me anything',
		'chatbot.send': 'Send',
		'chatbot.uploadPdf': 'Upload PDF',
		'chatbot.uploadingPdf': 'Uploading PDF...',
		'chatbot.uploadPdfError': 'Error uploading PDF',
		'chatbot.preview': 'Preview :',
		'context-provider': 'Context provider',
		'chatbot.placeholder': 'Type your question here...',
		chat: 'Chat',
		'pdf-uploader': 'PDF Uploader',
		'pdf-select': 'Select a PDF file',
		'pdf-preview': 'to preview and upload',
		'pdf-choose': 'Choose PDF file',
		'pdf-selected': 'PDF selected. Click "Upload" to proceed or select another file.',
		'pdf-preview-text': 'DF preview will appear here.',
		'generic.error': 'Error',
		'server.response': 'Server response',
		loading: 'Loading...',
		'drag-pdf': 'Drag your PDF here or',
		'max-size': 'Supports PDF files up to',
		footer: "Master's Final Project 2025 - Silvia Rodríguez Bares",
		'main-page-subtitle': 'Transform Your Documents Into Conversations',
		'main-page-button': 'Start Chatting with Your Documents',
		'main-page-text':
			"Unlock the power of AI-driven document analysis. Upload any PDF and engage in intelligent conversations about its content. Whether it's research papers, reports, or complex documents, DocuChat makes information accessible through natural language interactions. Experience the future of document intelligence.",
		'chat-question': 'What are the requirements to participate in a public works tender?',
		'chat-answer':
			'To participate, you need to be registered as a contractor, meet the technical criteria, and submit the required documents within the deadline.'
	},
	es: {
		en: 'Inglés',
		es: 'Español',
		eu: 'Euskera',
		expand: 'Expandir',
		collapse: 'Colapsar',
		'homepage.title': 'Inicio',
		'chat.initial.systemPrompt':
			'Eres un asistente útil especializado en contratos públicos aquí está lo que sabes sobre contratos públicos: ',
		'chatbot.input': 'Pregúntame cualquier cosa',
		'chatbot.send': 'Enviar',
		'chatbot.uploadPdf': 'Subir PDF',
		'chatbot.uploadingPdf': 'Subiendo PDF...',
		'chatbot.preview': 'VIsta previa :',
		'context-provider': 'Proveedor de contexto',
		'chatbot.placeholder': 'Escribe tu pregunta aquí...',
		chat: 'Chat',
		'pdf-uploader': 'Cargador de PDF',
		'pdf-select': 'Selecciona un archivo PDF',
		'pdf-preview': 'para vista previa y carga',
		'pdf-choose': 'Elige un PDF',
		'pdf-selected':
			'PDF seleccionado. Haz clic en "Subir" para continuar o selecciona otro archivo.',
		'pdf-preview-text': 'La vista previa del PDF aparecerá aquí.',
		'generic.error': 'Error',
		'server.response': 'Respuesta del servidor',
		loading: 'Cargando...',
		'drag-pdf': 'Arrastra tu PDF aquí o',
		'max-size': 'Soporta archivos PDF hasta',
		footer: 'Trabajo final de máster 2025 - Silvia Rodríguez Bares',
		'main-page-subtitle': 'Transforma tus documentos en conversaciones',
		'main-page-button': 'Empieza a chatear con tus documentos',
		'main-page-text':
			'Descubre el poder del análisis de documentos impulsado por IA. Sube cualquier PDF y mantén conversaciones inteligentes sobre su contenido. Ya sean artículos académicos, informes o documentos complejos, DocuChat hace que la información sea accesible mediante lenguaje natural. Experimenta el futuro de la inteligencia documental.',
		'chat-question':
			'¿Cuáles son los requisitos para participar en una licitación de obra pública?',
		'chat-answer':
			'Para participar, necesitas estar registrado como contratista, cumplir con los criterios técnicos y presentar la documentación requerida dentro del plazo.'
	},
	eu: {
		en: 'Ingelesa',
		es: 'Espainiera',
		eu: 'Euskara',
		expand: 'Expanditu',
		collapse: 'Kolapsatu',
		'homepage.title': 'Hasiera',
		'chat.initial.systemPrompt':
			'Zure litzatekeena kontratuen publikoen espezializatua da, hemen zure kontratuen publikoen erabilgarritasuna: ',
		'chatbot.input': 'Preguntatu bat',
		'chatbot.send': 'Bidali',
		'chatbot.uploadPdf': 'PDF bat igo',
		'chatbot.uploadingPdf': 'PDFa igotzen...',
		'chatbot.preview': 'Aurrebista :',
		'context-provider': 'Testuinguru hornitzailea',
		'chatbot.placeholder': 'Idatzi zure galdera hemen...',
		chat: 'Txata',
		'pdf-uploader': 'PDF igotzailea',
		'pdf-select': 'Hautatu PDF fitxategi bat',
		'pdf-preview': 'aurrebista eta igoera egiteko',
		'pdf-choose': 'Hautatu PDF fitxategia',
		'pdf-selected': 'PDF hautatuta. Egin klik "Igo" jarraitzeko edo hautatu beste fitxategi bat.',
		'pdf-preview-text': 'PDF aurrebista hemen agertuko da.',
		'generic.error': 'Errorea',
		'server.response': 'Zerbitzariaren erantzuna',
		loading: 'Kargatzen...',
		'drag-pdf': 'Arrastatu zure PDFa hemen edo',
		'max-size': 'Onartutako gehienezko tamaina',
		footer: 'Master Amaierako Lana 2025 - Silvia Rodríguez Bares',
		'main-page-subtitle': 'Bihurtu zure dokumentuak elkarrizketetan',
		'main-page-button': 'Hasi zure dokumentuekin berriketan',
		'main-page-text':
			'Deskubritu adimen artifizialak bultzatutako dokumentu-analisia. Igo edozein PDF eta izan elkarrizketa adimendunak haren edukiarekin. Ikerketa-artikuluak, txostenak edo dokumentu konplexuak izan, DocuChat-ek informazioa eskuragarri bihurtzen du hizkuntza naturalaren bidez. Esperimentatu dokumentu-adimenaren etorkizuna.',
		'chat-question': 'Zein dira obra publikoetako lizitazio batean parte hartzeko baldintzak?',
		'chat-answer':
			'Parte hartzeko, kontratista gisa erregistratuta egon behar duzu, irizpide teknikoak bete eta eskatutako dokumentazioa epearen barruan aurkeztu.'
	}
};

export default translations;
export type { Locales };
