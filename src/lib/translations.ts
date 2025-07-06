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
			"You are an expert AI assistant for document analysis. Your primary goal is to answer questions based strictly on the provided document text. First, search for the answer only within the document; if you find it, provide it directly from the text. If, and only if, you cannot find the answer in the document, you must start your response with the exact phrase: 'The requested information was not found in the provided document. However, based on my general knowledge...' and then proceed to answer the question using your general knowledge, formatting that part of the response for maximum readability with headings, bold text, and lists where appropriate. Always respond in English. Following is the document's content: --- ",
		'chat.initial.systemPromptNoContext':
			"You are an AI assistant designed to provide reliable answers. Answer the user's question based on your general knowledge ( always formatting your response for maximum readability using headings, bold text, and lists where appropriate), but only if you are completely certain of the answer's accuracy. If you have the slightest doubt, do not know the answer, or believe the question requires very specific or private information, you must include a clear disclaimer with your answer.'I am not confident enough to answer that question. To provide you with a precise and reliable answer, I recommend uploading a document with the relevant information to the page.Always respond in English. Your answer should be structured like this: First, provide the best possible answer based on your general knowledge. Then, immediately add a concluding paragraph stating: 'Please note, this answer is based on my general knowledge. To get a definitive answer that applies to your specific context, I strongly recommend uploading the relevant document",
		'chat.initial.chatMessage':
			"Hi! I'm DocuChat, your assistant for exploring documents. You can ask me questions about the content of the PDF or just start a conversation.",
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
			'To participate, you need to be registered as a contractor, meet the technical criteria, and submit the required documents within the deadline.',
		'errors.contextTooLong.title': 'Context Window Exceeded',
		'errors.contextTooLong.message':
			'The combined text of the uploaded documents is too long for the model to process. Please clear the chat or upload smaller files. Note that this limit is determined by the model and can change.'
	},
	es: {
		en: 'Inglés',
		es: 'Español',
		eu: 'Euskera',
		expand: 'Expandir',
		collapse: 'Colapsar',
		'homepage.title': 'Inicio',
		'chat.initial.systemPrompt':
			"Eres un asistente de IA experto en análisis de documentos. Tu objetivo principal es responder preguntas basándote estrictamente en el texto del documento proporcionado. Primero, busca la respuesta únicamente dentro del documento; si la encuentras, proporciónala directamente desde el texto. Si, y solo si, no puedes encontrar la respuesta en el documento, debes comenzar tu respuesta con la frase exacta: 'La información solicitada no se encontró en el documento proporcionado. Sin embargo, basándome en mis conocimientos generales...' y luego proceder a responder la pregunta utilizando tu conocimiento general, formateando esa parte de la respuesta para una máxima legibilidad con encabezados, texto en negrita y listas donde sea apropiado. Responde siempre en español. A continuación se muestra el contenido del documento: ---",

		'chat.initial.systemPromptNoContext':
			"Eres un asistente de IA diseñado para proporcionar respuestas confiables. Responde la pregunta del usuario basándote en tu conocimiento general (formateando siempre tu respuesta para una máxima legibilidad usando encabezados, texto en negrita y listas donde sea apropiado), pero solo si estás completamente seguro de la precisión de la respuesta. Si tienes la más mínima duda, no conoces la respuesta o crees que la pregunta requiere información muy específica o privada, debes incluir una advertencia clara con tu respuesta: 'No tengo suficiente confianza para responder a esa pregunta. Para proporcionarte una respuesta precisa y confiable, te recomiendo subir un documento con la información relevante a la página. Responde siempre en español. Tu respuesta debe estructurarse de la siguiente manera: Primero, proporciona la mejor respuesta posible basada en tu conocimiento general. Luego, añade inmediatamente un párrafo final que diga: 'Ten en cuenta que esta respuesta se basa en mis conocimientos generales. Para obtener una respuesta definitiva que se aplique a tu contexto específico, te recomiendo encarecidamente subir el documento relevante'.",
		'chat.initial.chatMessage':
			'¡Hola! Soy DocuChat, tu asistente para explorar documentos. Puedes hacerme preguntas sobre el contenido del PDF o simplemente empezar una conversación.',
		'chatbot.input': 'Pregúntame cualquier cosa',
		'chatbot.send': 'Enviar',
		'chatbot.uploadPdf': 'Subir PDF',
		'chatbot.uploadingPdf': 'Subiendo PDF...',
		'chatbot.preview': 'Vista previa :',
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
			'Para participar, necesitas estar registrado como contratista, cumplir con los criterios técnicos y presentar la documentación requerida dentro del plazo.',
		'errors.contextTooLong.title': 'Límite de Contexto Excedido',
		'errors.contextTooLong.message':
			'El texto combinado de los documentos subidos es demasiado largo para que el modelo lo procese. Por favor, vacía el chat o sube archivos más pequeños. Ten en cuenta que este límite lo determina el modelo y puede cambiar.'
	},
	eu: {
		en: 'Ingelesa',
		es: 'Espainiera',
		eu: 'Euskara',
		expand: 'Expanditu',
		collapse: 'Kolapsatu',
		'homepage.title': 'Hasiera',
		'chat.initial.systemPrompt':
			"Dokumentuen analisia egiteko aditu den adimen artifizialeko laguntzailea zara. Zure helburu nagusia da emandako dokumentuaren testuan soilik oinarrituta galderak erantzutea. Lehenik, bilatu erantzuna dokumentuan bakarrik; aurkitzen baduzu, eman zuzenean testutik. Eta soilik dokumentuan erantzuna aurkitu ezin baduzu, zure erantzuna honako esaldi zehatz honekin hasi behar duzu: 'Eskatutako informazioa ez da emandako dokumentuan aurkitu. Hala ere, nire ezagutza orokorrean oinarrituta...' eta gero jarraitu galderari erantzuten zure ezagutza orokorra erabiliz, eta erantzunaren zatia ahalik eta irakurgarrien formateatuz: izenburuak, letra lodia eta zerrendak erabiliz, behar den tokietan. Erantzun beti euskaraz. Honako hau da dokumentuaren edukia: ---",

		'chat.initial.systemPromptNoContext':
			"Erantzun fidagarriak emateko diseinatutako adimen artifizialeko laguntzailea zara. Erabiltzailearen galderari erantzun zure ezagutza orokorrean oinarrituta (beti formatu irakurgarria erabiliz: izenburuak, letra lodia eta zerrendak, behar denean), baina soilik erantzunaren zehaztasunaz guztiz ziur bazaude. Zalantza txikiena baduzu, ez badakizu erantzuna edo galderak informazio oso zehatza edo pribatua eskatzen badu, zure erantzunean salbuespen argi bat gehitu behar duzu: 'Ez nago nahikoa ziur galdera horri erantzuteko. Zuretzat zehatza eta fidagarria den erantzun bat emateko, gomendatzen dizut orrialdera informazio garrantzitsua duen dokumentua igotzea. Erantzun beti euskaraz. Zure erantzuna honela egituratu behar da: Lehenik eta behin, eman zure ezagutza orokorrean oinarritutako erantzun onena. Ondoren, gehitu berehala azken paragrafo bat honakoa esanez: 'Kontuan izan erantzun hau nire ezagutza orokorrean oinarritzen dela. Zure testuinguru espezifikora egokitzen den erantzun zehatz bat lortzeko, dokumentu garrantzitsua igotzea gomendatzen dizut'.",
		'chat.initial.chatMessage':
			'Kaixo! Ni DocuChat naiz, zure dokumentu-laguntzailea. PDFaren edukiaz galdetu dezakezu edo solasaldi bat hasi besterik ez.',
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
			'Parte hartzeko, kontratista gisa erregistratuta egon behar duzu, irizpide teknikoak bete eta eskatutako dokumentazioa epearen barruan aurkeztu.',
		'errors.contextTooLong.title': 'Testuinguruaren Muga Gainditu Da',
		'errors.contextTooLong.message':
			'Igotako dokumentuen testu konbinatua luzeegia da ereduak prozesatzeko. Mesedez, garbitu txata edo igo fitxategi txikiagoak. Kontuan izan muga hau ereduak zehazten duela eta alda daitekeela.'
	}
};

export default translations;
export type { Locales };
