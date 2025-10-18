document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        title: document.getElementById('title'),
        footer: document.getElementById('footer'),
        feelsLikeLabel: document.getElementById('feelsLikeLabel'),
        humidityLabel: document.getElementById('humidityLabel'),
        windLabel: document.getElementById('windLabel'),
        waterTempHeader: document.getElementById('waterTempHeader'),
        waterPhHeader: document.getElementById('waterPhHeader'),
        soilMoistureHeader: document.getElementById('soilMoistureHeader'),
        pumpControlHeader: document.getElementById('pumpControlHeader'),
        pumpSwitch: document.getElementById('pumpSwitch'),
        tempValue: document.getElementById('tempValue'), phValue: document.getElementById('phValue'), moistureValue: document.getElementById('moistureValue'),
        tempAlert: document.getElementById('tempAlert'), phAlert: document.getElementById('phAlert'), moistureAlert: document.getElementById('moistureAlert'),
        tempCard: document.getElementById('tempCard'), phCard: document.getElementById('phCard'), moistureCard: document.getElementById('moistureCard'),
        weatherTemp: document.getElementById('weatherTemp'), weatherDesc: document.getElementById('weatherDesc'),
        weatherFeelsLike: document.getElementById('weatherFeelsLike'), weatherHumidity: document.getElementById('weatherHumidity'),
        weatherWind: document.getElementById('weatherWind'), weatherIcon: document.getElementById('weatherIcon'),
        botMessage: document.getElementById('botMessage'), botLogTooltip: document.getElementById('botLogTooltip'),
        botAvatar: document.getElementById('botAvatar'), botContainer: document.getElementById('botContainer'),
        languageSelect: document.getElementById('languageSelect')
    };

    // Add chat elements dynamically for better bot interaction
    const chatContainer = document.createElement('div');
    chatContainer.id = 'botChatContainer';
    chatContainer.className = 'bot-chat-container';
    chatContainer.innerHTML = `
        <div class="bot-chat-header">
            <span class="bot-chat-title">AgriBot Assistant</span>
            <button id="closeChat" class="close-chat-btn">&times;</button>
        </div>
        <div id="chatMessages" class="chat-messages"></div>
        <div class="chat-input-container">
            <input type="text" id="chatInput" placeholder="Ask me about your system... (e.g., 'status', 'tip', 'pH advice')" maxlength="200">
            <button id="sendMessage">Send</button>
        </div>
    `;
    elements.botContainer.appendChild(chatContainer);
    chatContainer.style.display = 'none';

    const chatElements = {
        chatContainer: chatContainer,
        closeChat: chatContainer.querySelector('#closeChat'),
        chatMessages: chatContainer.querySelector('#chatMessages'),
        chatInput: chatContainer.querySelector('#chatInput'),
        sendMessage: chatContainer.querySelector('#sendMessage')
    };

    let currentLanguage = 'en';

    const translations = {
        en: {
            title: 'Waste to Taste - Agriculture Monitoring System',
            footer: 'Waste to Taste | Real-Time Clean Agriculture Monitoring System',
            feelsLike: 'Feels Like',
            humidity: 'Humidity',
            wind: 'Wind',
            waterTemperature: 'Water Temperature',
            waterPhLevel: 'Water pH Level',
            soilMoisture: 'Soil Moisture',
            pumpControl: 'Pump Control',
            tempTooLow: 'Temperature too low!',
            tempTooHigh: 'Temperature too high!',
            phAcidic: 'pH is acidic!',
            phAlkaline: 'pH is alkaline!',
            moistureTooLow: 'Moisture too low!',
            moistureTooHigh: 'Moisture too low!',
            time: 'Time',
            weatherConditions: {
                Clear: 'Clear',
                Clouds: 'Clouds',
                Rain: 'Rain',
                Drizzle: 'Drizzle',
                Thunderstorm: 'Thunderstorm',
                Snow: 'Snow',
                Fog: 'Fog',
                Unknown: 'Unknown'
            },
            proactiveTips: [
                "Remember to check plant leaves for any signs of pests or nutrient deficiencies.",
                "Clean water is happy water! Ensure your reservoir is clean to prevent algae growth.",
                "Proper airflow is important. Make sure the area around the plants is well-ventilated.",
                "Have you checked nutrient solution levels recently? Topping up is key for steady growth.",
                "Rotate the plants if possible to ensure they get even light exposure.",
                "Monitor EC levels alongside pH to avoid imbalances.",
                "Consider adding beneficial microbes to boost root health.",
                "Prune dead leaves to improve light penetration and reduce disease risk."
            ],
            botMessages: {
                phLowCritical: "🚨 CRITICAL: pH is dangerously low (acidic)! This can lock out nutrients—add pH up solution immediately and test again.",
                phHighCritical: "🚨 CRITICAL: pH is dangerously high (alkaline)! Risk of nutrient lockout—add pH down and monitor closely.",
                tempLowCritical: "🚨 CRITICAL: Water temp too cold! Roots may shock; use a heater or insulate the reservoir ASAP.",
                tempHighCritical: "🚨 CRITICAL: Water too hot! Oxygen levels dropping—add aeration or cool the system to protect roots.",
                phLowWarning: "⚠️ pH slightly acidic. Watch for yellowing leaves; consider a small dose of pH adjuster.",
                phHighWarning: "⚠️ pH slightly alkaline. Nutrient uptake might suffer; test and adjust if needed.",
                wateringTimeOff: "💧 Watering time! Pump is off—turn it on to keep your plants hydrated during peak hours.",
                wateringDoneOn: "✅ Watering cycle complete. Pump on unnecessarily? Turn off to conserve energy and prevent overwatering.",
                hotSunnyPumpOff: "☀️💧 Hot & sunny during watering slot! Activate the pump now to combat evaporation stress.",
                goodMorning: "🌅 Good morning! Systems stable—perfect day for growth. Quick tip: Check for morning dew on leaves.",
                goodEvening: "🌙 Good evening. All good here. Wind down by inspecting for evening pests.",
                status: "📊 Current status: Temp: {temp}°C, pH: {ph}, Moisture: {moisture}%. Weather: {weather}. Pump: {pump}. All looks optimal!",
                tip: "💡 {tip}",
                phAdvice: "🧪 Ideal pH for hydroponics: 5.5-6.5. Yours at {ph}—if off, adjust gradually (0.2-0.3 units) and retest in 30 min.",
                tempAdvice: "🌡️ Optimal water temp: 18-24°C. At {temp}°C, ensure good oxygenation to avoid root rot.",
                moistureAdvice: "💦 Soil moisture ideal: 40-60%. At {moisture}%, {moistureAdvice}.",
                weatherImpact: "☁️ With {weather} at {weatherTemp}°C, {weatherTip}.",
                unknown: "🤔 Sorry, I didn't catch that. Try 'status', 'tip', 'pH advice', or describe an issue!"
            },
            botInit: `Hello! AgriBot activated at ${time}. I'm here to monitor, advise, and chat about your grow op. Click me anytime!`,
            chatPlaceholder: "Ask me about your system... (e.g., 'status', 'tip', 'pH advice')"
        },
        hi: {
            // ... (keep existing Hindi translations, add new ones similarly)
            title: 'Waste to Taste - कृषि निगरानी प्रणाली',
            footer: 'Waste to Taste | वास्तविक समय स्वच्छ कृषि निगरानी प्रणाली',
            feelsLike: 'ऐसा लगता है',
            humidity: 'आर्द्रता',
            wind: 'हवा',
            waterTemperature: 'जल तापमान',
            waterPhLevel: 'जल पीएच स्तर',
            soilMoisture: 'मिट्टी की नमी',
            pumpControl: 'पंप नियंत्रण',
            tempTooLow: 'तापमान बहुत कम है!',
            tempTooHigh: 'तापमान बहुत अधिक है!',
            phAcidic: 'पीएच अम्लीय है!',
            phAlkaline: 'पीएच क्षारीय है!',
            moistureTooLow: 'नमी बहुत कम है!',
            moistureTooHigh: 'नमी बहुत अधिक है!',
            time: 'समय',
            weatherConditions: {
                Clear: 'साफ़',
                Clouds: 'बादल',
                Rain: 'बारिश',
                Drizzle: 'बूंदाबांदी',
                Thunderstorm: 'आंधी',
                Snow: 'बर्फबारी',
                Fog: 'कोहरा',
                Unknown: 'अज्ञात'
            },
            proactiveTips: [
                "पौधों की पत्तियों पर कीटों या पोषक तत्वों की कमी के किसी भी संकेत की जांच करना याद रखें।",
                "स्वच्छ पानी खुश पानी है! शैवाल के विकास को रोकने के लिए अपने जलाशय को साफ रखें।",
                "उचित वायु प्रवाह महत्वपूर्ण है। सुनिश्चित करें कि पौधों के आसपास का क्षेत्र अच्छी तरह हवादार हो।",
                "क्या आपने हाल ही में पोषक घोल के स्तर की जांच की है? स्थिर विकास के लिए टॉपिंग अप महत्वपूर्ण है।",
                "यदि संभव हो तो पौधों को घुमाएं ताकि उन्हें समान प्रकाश मिले।",
                "पीएच के साथ ईसी स्तर की निगरानी करें असंतुलन से बचने के लिए।",
                "जड़ स्वास्थ्य बढ़ाने के लिए लाभकारी सूक्ष्मजीव जोड़ने पर विचार करें।",
                "प्रकाश प्रवेश में सुधार और रोग जोखिम कम करने के लिए मृत पत्तियों को छांटें।"
            ],
            botMessages: {
                phLowCritical: "🚨 गंभीर: पीएच खतरनाक रूप से कम (अम्लीय)! पोषक तत्व लॉकआउट हो सकता है—तुरंत पीएच अप जोड़ें और दोबारा परीक्षण करें।",
                phHighCritical: "🚨 गंभीर: पीएच खतरनाक रूप से उच्च (क्षारीय)! पोषक लॉकआउट का जोखिम—पीएच डाउन जोड़ें और नजदीकी निगरानी करें।",
                tempLowCritical: "🚨 गंभीर: जल तापमान बहुत ठंडा! जड़ें झटका खा सकती हैं; हीटर का उपयोग करें या जलाशय को इंसुलेट करें।",
                tempHighCritical: "🚨 गंभीर: जल बहुत गर्म! ऑक्सीजन कम हो रहा—एरेशन जोड़ें या सिस्टम को ठंडा करें।",
                phLowWarning: "⚠️ पीएच थोड़ा अम्लीय। पीली पत्तियों पर नजर रखें; पीएच एडजस्टर की छोटी खुराक पर विचार करें।",
                phHighWarning: "⚠️ पीएच थोड़ा क्षारीय। पोषक अवशोषण प्रभावित हो सकता है; परीक्षण और समायोजन करें।",
                wateringTimeOff: "💧 पानी देने का समय! पंप बंद है—पीक घंटों में पौधों को हाइड्रेटेड रखने के लिए चालू करें।",
                wateringDoneOn: "✅ पानी चक्र पूरा। पंप अनावश्यक रूप से चालू? ऊर्जा बचाने और अधिक पानी से बचने के लिए बंद करें।",
                hotSunnyPumpOff: "☀️💧 पानी स्लॉट के दौरान गर्म और धूप! वाष्पीकरण तनाव से लड़ने के लिए अब पंप सक्रिय करें।",
                goodMorning: "🌅 सुप्रभात! सिस्टम स्थिर—वृद्धि के लिए सही दिन। टिप: सुबह की ओस पर नजर रखें।",
                goodEvening: "🌙 शुभ संध्या। सब ठीक। शाम के कीटों की जांच करके रिलैक्स करें।",
                status: "📊 वर्तमान स्थिति: तापमान: {temp}°C, पीएच: {ph}, नमी: {moisture}%. मौसम: {weather}. पंप: {pump}. सब इष्टतम लग रहा है!",
                tip: "💡 {tip}",
                phAdvice: "🧪 हाइड्रोपोनिक्स के लिए आदर्श पीएच: 5.5-6.5। आपका {ph} पर—यदि ऑफ, धीरे-धीरे समायोजित करें (0.2-0.3 इकाई) और 30 मिनट में दोबारा परीक्षण करें।",
                tempAdvice: "🌡️ इष्टतम जल तापमान: 18-24°C। {temp}°C पर, जड़ सड़न से बचने के लिए अच्छी ऑक्सीजनेशन सुनिश्चित करें।",
                moistureAdvice: "💦 मिट्टी नमी आदर्श: 40-60%। {moisture}% पर, {moistureAdvice}।",
                weatherImpact: "☁️ {weatherTemp}°C पर {weather} के साथ, {weatherTip}।",
                unknown: "🤔 माफ़ कीजिए, मैंने वह नहीं समझा। 'status', 'tip', 'पीएच सलाह' आज़माएं या समस्या वर्णन करें!"
            },
            botInit: `नमस्ते! AgriBot ${time} पर सक्रिय। मैं निगरानी, सलाह और आपके ग्रो ऑप के बारे में चैट करने के लिए यहाँ हूँ। कहीं भी क्लिक करें!`,
            chatPlaceholder: "अपने सिस्टम के बारे में पूछें... (उदाहरण: 'status', 'tip', 'पीएच सलाह')"
        },
        gu: {
            // ... (keep existing Gujarati translations, add new ones similarly)
            title: 'Waste to Taste - કૃષિ મોનિટરિંગ સિસ્ટમ',
            footer: 'Waste to Taste | વાસ્તવિક સમય સ્વચ્છ કૃષિ મોનિટરિંગ સિસ્ટમ',
            feelsLike: 'અનુભવાય છે',
            humidity: 'ભેજ',
            wind: 'પવન',
            waterTemperature: 'પાણીનું તાપમાન',
            waterPhLevel: 'પાણીનું pH સ્તર',
            soilMoisture: 'માટીની ભેજ',
            pumpControl: 'પંપ નિયંત્રણ',
            tempTooLow: 'તાપમાન ખૂબ નીચું છે!',
            tempTooHigh: 'તાપમાન ખૂબ ઊંચું છે!',
            phAcidic: 'pH એસિડિક છે!',
            phAlkaline: 'pH આલ્કલાઇન છે!',
            moistureTooLow: 'ભેજ ખૂબ નીચું છે!',
            moistureTooHigh: 'ભેજ ખૂબ ઊંચું છે!',
            time: 'સમય',
            weatherConditions: {
                Clear: 'સ્પષ્ટ',
                Clouds: 'વાદળો',
                Rain: 'વરસાદ',
                Drizzle: 'ઝરમર',
                Thunderstorm: 'તોફાન',
                Snow: 'હિમવર્ષા',
                Fog: 'ધુમ્મસ',
                Unknown: 'અજાણ્યું'
            },
            proactiveTips: [
                "પૌધાના પાંદડા પર કીટકો અથવા પોષક તત્વોની ઉણપના કોઈપણ ચિહ્નો તપાસવાનું યાદ રાખો.",
                "સ્વચ્છ પાણી ખુશ પાણી છે! શેવાળ વૃદ્ધિ અટકાવવા માટી તમારા જળાશયને સાફ રાખો.",
                "યોગ્ય હવા પ્રવાહ મહત્વપૂર્ણ છે. ખાતરી કરો કે પૌધા આસપાસનો વિસ્તાર સારી રીતે વેન્ટિલેટેડ છે.",
                "શું તમે તાજેતરમાં પોષક દ્રાવણ સ્તર તપાસ્યું છે? સ્થિર વૃદ્ધિ માટી ટોપિંગ અપ કી છે.",
                "જો શક્ય હોય તો પૌધાને ફેરવો જેથી તેઓને સમાન પ્રકાશ મળે.",
                "અસંતુલન ટાળવા માટી pH સાથે EC સ્તરનું નિરીક્ષણ કરો.",
                "મૂળ આરોગ્ય વધારવા માટી લાભદાયી માઇક્રોબ્સ ઉમેરવા વિચારો.",
                "પ્રકાશ પ્રવેશમાં સુધારો અને રોગ જોખમ ઘટાડવા માટી મૃત પાંદડા કાપો."
            ],
            botMessages: {
                phLowCritical: "🚨 ગંભીર: pH જોખમી રીતે નીચું (એસિડિક)! પોષક લોકઆઉટ થઈ શકે—તરત pH અપ ઉમેરો અને ફરી તપાસો.",
                phHighCritical: "🚨 ગંભીર: pH જોખમી રીતે ઊંચું (આલ્કલાઇન)! પોષક લોકઆઉટ જોખમ—pH ડાઉન ઉમેરો અને નજીકથી નિરીક્ષણ કરો.",
                tempLowCritical: "🚨 ગંભીર: પાણીનું તાપમાન ખૂબ ઠંડું! મૂળ આઘાત મળી શકે; હીટર વાપરો અથવા જળાશયને ઇન્સ્યુલેટ કરો.",
                tempHighCritical: "🚨 ગંભીર: પાણી ખૂબ ગરમ! ઓક્સિજન સ્તર ઘટી રહ્યું—એરેશન ઉમેરો અથવા સિસ્ટમને ઠંડી કરો.",
                phLowWarning: "⚠️ pH થોડું એસિડિક. પીળા પાંદડા પર નજર રાખો; pH એડજસ્ટરની નાની ડોઝ વિચારો.",
                phHighWarning: "⚠️ pH થોડું આલ્કલાઇન. પોષક શોષણ ખરાબ થઈ શકે; તપાસો અને સમાયોજિત કરો.",
                wateringTimeOff: "💧 પાણી આપવાનો સમય! પંપ બંધ છે—પીક કલાકો દરમિયાન પૌધાઓને હાઇડ્રેટેડ રાખવા માટી ચાલુ કરો.",
                wateringDoneOn: "✅ પાણી ચક્ર પૂર્ણ. પંપ અનાવશ્યક રીતે ચાલુ? ઊર્જા બચાવવા અને વધારે પાણીથી બચવા માટી બંધ કરો.",
                hotSunnyPumpOff: "☀️💧 પાણી સ્લોટ દરમિયાન ગરમ અને સૂર્યાલોકિત! બાષ્પીકરણ તણાવ સામે લડવા માટી હવે પંપ સક્રિય કરો.",
                goodMorning: "🌅 સુપ્રભાત! સિસ્ટમ સ્થિર—વૃદ્ધિ માટી સંપૂર્ણ દિવસ. ઝડપી ટિપ: સવારની કાજલ પર તપાસો.",
                goodEvening: "🌙 શુભ સાંજ. અહીં બધું સારું. સાંજના કીટકો તપાસીને આરામ કરો.",
                status: "📊 વર્તમાન સ્થિતિ: તાપમાન: {temp}°C, pH: {ph}, ભેજ: {moisture}%. હવામાન: {weather}. પંપ: {pump}. બધું ઑપ્ટિમલ લાગે છે!",
                tip: "💡 {tip}",
                phAdvice: "🧪 હાઇડ્રોપોનિક્સ માટી આદર્શ pH: 5.5-6.5। તમારું {ph} પર—જો ઑફ, ધીમે ધીમે સમાયોજિત કરો (0.2-0.3 એકમ) અને 30 મિનિટમાં ફરી તપાસો.",
                tempAdvice: "🌡️ ઑપ્ટિમલ પાણી તાપમાન: 18-24°C। {temp}°C પર, મૂળ સડવાથી બચવા માટી સારી ઑક્સિજનેશન સુનિશ્ચિત કરો.",
                moistureAdvice: "💦 માટી ભેજ આદર્શ: 40-60%। {moisture}% પર, {moistureAdvice}।",
                weatherImpact: "☁️ {weatherTemp}°C પર {weather} સાથે, {weatherTip}।",
                unknown: "🤔 માફ કરશો, હું સમજી નથી. 'status', 'tip', 'pH સલાહ' અજમાવો અથવા સમસ્યા વર્ણન કરો!"
            },
            botInit: `નમસ્કાર! AgriBot ${time} પર સક્રિય. હું નિરીક્ષણ, સલાહ અને તમારા ગ્રો ઑપ વિશે વાત કરવા માટી અહીં છું. કોઈપણ સમયે મને ક્લિક કરો!`,
            chatPlaceholder: "તમારા સિસ્ટમ વિશે પૂછો... (ઉદાહરણ: 'status', 'tip', 'pH સલાહ')"
        }
    };

    // Enhanced bot state with chat history
    const botState = { 
        messageLog: [], 
        chatHistory: [],
        MAX_LOG_MESSAGES: 20, 
        MAX_CHAT_HISTORY: 50,
        tipIndex: 0, 
        lastGreetingHour: -1 
    };

    const isWateringTime = hour => (hour >= 7 && hour < 9) || (hour >= 12 && hour < 14) || (hour >= 17 && hour < 19);

    // Enhanced weather tips
    const weatherTips = {
        Clear: "Clear skies—great for growth, but watch for heat stress if sunny.",
        Clouds: "Cloudy—ideal for reducing transpiration; no extra watering needed.",
        Rain: "Rainy—check for overwatering; ensure good drainage.",
        Drizzle: "Light drizzle—mild boost; monitor humidity spikes.",
        Thunderstorm: "Stormy—secure setup; pause watering to avoid flooding.",
        Snow: "Snowy—insulate roots; low light, consider supplements.",
        Fog: "Foggy—high humidity; ventilate to prevent mold."
    };

    const getTextFromKey = (key, dynamicData = {}) => {
        const trans = translations[currentLanguage];
        let message = trans.botMessages[key] || trans.botMessages.unknown;

        // Replace placeholders
        Object.keys(dynamicData).forEach(placeholder => {
            const regex = new RegExp(`{${placeholder}}`, 'g');
            message = message.replace(regex, dynamicData[placeholder]);
        });

        if (key === 'init') {
            return trans.botInit.replace('${time}', dynamicData.time || '');
        } else if (key.startsWith('tip')) {
            const index = parseInt(key.slice(3)) % trans.proactiveTips.length;
            return trans.botMessages.tip.replace('{tip}', trans.proactiveTips[index]);
        } else if (key === 'moistureAdvice') {
            const moisture = dynamicData.moisture || 0;
            return moisture < 40 ? "increase watering frequency." : moisture > 60 ? "reduce to prevent root rot." : "steady as she goes.";
        } else if (key === 'weatherImpact') {
            const weather = dynamicData.weatherCondition || 'Unknown';
            const temp = dynamicData.weatherTemp || '--';
            return trans.botMessages.weatherImpact.replace('{weather}', weather).replace('{weatherTemp}', temp).replace('{weatherTip}', weatherTips[weather] || 'keep monitoring.');
        }

        return message;
    };

    const renderBotLog = () => {
        elements.botLogTooltip.innerHTML = '';
        botState.messageLog.slice(0, botState.MAX_LOG_MESSAGES).forEach((msg) => {
            const text = getTextFromKey(msg.key, msg.dynamicData || {});
            const newLogEntry = document.createElement('div');
            newLogEntry.className = 'bot-log-message';
            newLogEntry.innerHTML = `<span>${text}</span><span class="timestamp">${msg.timestamp} - ${msg.type}</span>`;
            elements.botLogTooltip.appendChild(newLogEntry);
        });
        elements.botLogTooltip.scrollTop = 0; // Auto-scroll to top for newest
    };

    const logBotMessage = (key, type, dynamicData = {}) => {
        const currentText = getTextFromKey(key, dynamicData);
        if (botState.messageLog.length > 0 && getTextFromKey(botState.messageLog[0].key, botState.messageLog[0].dynamicData) === currentText) return;
        const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        botState.messageLog.unshift({ key, type, timestamp, dynamicData });
        if (botState.messageLog.length > botState.MAX_LOG_MESSAGES) botState.messageLog.pop();
        renderBotLog();
        updateBotMessage();
    };

    const updateBotMessage = () => {
        const latestCritical = botState.messageLog.find(msg => msg.type === 'critical');
        if (latestCritical) {
            elements.botMessage.innerHTML = getTextFromKey(latestCritical.key, latestCritical.dynamicData);
            elements.botMessage.classList.add('visible');
        } else {
            elements.botMessage.classList.remove('visible');
        }
    };

    // New: Chat functionality
    const addChatMessage = (text, isUser = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `<span>${text}</span>`;
        chatElements.chatMessages.appendChild(messageDiv);
        chatElements.chatMessages.scrollTop = chatElements.chatMessages.scrollHeight;
        botState.chatHistory.push({ text, isUser, timestamp: new Date().toISOString() });
        if (botState.chatHistory.length > botState.MAX_CHAT_HISTORY) botState.chatHistory.shift();
    };

    const processUserInput = (input, data) => {
        const lowerInput = input.toLowerCase().trim();
        let responseKey = 'unknown';
        let dynamicData = { ...data };

        if (lowerInput.includes('status') || lowerInput.includes('report')) {
            responseKey = 'status';
            dynamicData.pump = elements.pumpSwitch.checked ? 'ON' : 'OFF';
        } else if (lowerInput.includes('tip') || lowerInput.includes('advice')) {
            responseKey = 'tip' + Math.floor(Math.random() * translations[currentLanguage].proactiveTips.length);
        } else if (lowerInput.includes('ph') || lowerInput.includes('acid') || lowerInput.includes('alkaline')) {
            responseKey = 'phAdvice';
        } else if (lowerInput.includes('temp') || lowerInput.includes('temperature')) {
            responseKey = 'tempAdvice';
        } else if (lowerInput.includes('moisture') || lowerInput.includes('soil')) {
            responseKey = 'moistureAdvice';
        } else if (lowerInput.includes('weather') || lowerInput.includes('rain')) {
            responseKey = 'weatherImpact';
        } else if (lowerInput.includes('pump') || lowerInput.includes('water')) {
            responseKey = isWateringTime(new Date().getHours()) ? 'wateringTimeOff' : 'wateringDoneOn';
        }

        const response = getTextFromKey(responseKey, dynamicData);
        addChatMessage(response, false);
        logBotMessage(responseKey, 'chat', dynamicData); // Log chat responses too
    };

    const toggleChat = () => {
        const isVisible = chatElements.chatContainer.style.display === 'block';
        chatElements.chatContainer.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            chatElements.chatInput.focus();
            addChatMessage("Hi! I'm AgriBot. How can I help with your farm today? Try 'status' for a quick overview.", false);
        }
    };

    chatElements.sendMessage.addEventListener('click', () => {
        const input = chatElements.chatInput.value.trim();
        if (input) {
            addChatMessage(input, true);
            processUserInput(input, { temp: parseFloat(elements.tempValue.textContent), ph: parseFloat(elements.phValue.textContent), moisture: parseFloat(elements.moistureValue.textContent), weatherCondition: elements.weatherDesc.textContent, weatherTemp: parseFloat(elements.weatherTemp.textContent) });
            chatElements.chatInput.value = '';
        }
    });

    chatElements.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') chatElements.sendMessage.click();
    });

    chatElements.closeChat.addEventListener('click', () => {
        chatElements.chatContainer.style.display = 'none';
    });

    const setLanguage = (lang) => {
        currentLanguage = lang;
        const trans = translations[lang];
        elements.title.innerText = trans.title;
        elements.footer.innerText = trans.footer;
        elements.feelsLikeLabel.innerText = trans.feelsLike;
        elements.humidityLabel.innerText = trans.humidity;
        elements.windLabel.innerText = trans.wind;
        elements.waterTempHeader.innerText = trans.waterTemperature;
        elements.waterPhHeader.innerText = trans.waterPhLevel;
        elements.soilMoistureHeader.innerText = trans.soilMoisture;
        elements.pumpControlHeader.innerText = trans.pumpControl;
        tempChart.options.scales.x.title.text = trans.time;
        tempChart.options.scales.y.title.text = `${trans.waterTemperature} (°C)`;
        tempChart.data.datasets[0].label = `${trans.waterTemperature} (°C)`;
        tempChart.update();
        phChart.options.scales.x.title.text = trans.time;
        phChart.options.scales.y.title.text = trans.waterPhLevel;
        phChart.data.datasets[0].label = trans.waterPhLevel;
        phChart.update();
        chatElements.chatInput.placeholder = trans.chatPlaceholder;
        renderBotLog();
        updateBotMessage();
    };

    elements.languageSelect.addEventListener('change', () => setLanguage(elements.languageSelect.value));

    function updateBotLogic(data) {
        const { temp, ph, weatherCondition, weatherTemp, pumpIsOn } = data;
        const currentHour = new Date().getHours();
        let message = null;
        let dynamicData = { temp, ph, weatherCondition, weatherTemp };

        // Priority: Criticals
        if (ph < 4) { message = { key: 'phLowCritical', type: "critical", dynamicData }; }
        else if (ph > 8) { message = { key: 'phHighCritical', type: "critical", dynamicData }; }
        else if (temp < 15) { message = { key: 'tempLowCritical', type: "critical", dynamicData }; }
        else if (temp > 35) { message = { key: 'tempHighCritical', type: "critical", dynamicData }; }
        // Warnings
        else if (ph < 4.5) { message = { key: 'phLowWarning', type: "warning", dynamicData }; }
        else if (ph > 7.5) { message = { key: 'phHighWarning', type: "warning", dynamicData }; }
        // Suggestions with weather integration
        else if (isWateringTime(currentHour) && !pumpIsOn) { message = { key: 'wateringTimeOff', type: "suggestion", dynamicData }; }
        else if (!isWateringTime(currentHour) && pumpIsOn) { message = { key: 'wateringDoneOn', type: "suggestion", dynamicData }; }
        else if (weatherCondition === 'Clear' && weatherTemp > 29 && !pumpIsOn && isWateringTime(currentHour)) { 
            message = { key: 'hotSunnyPumpOff', type: "suggestion", dynamicData }; 
        }
        // Greetings & Tips
        else {
            if (currentHour >= 6 && currentHour < 12 && botState.lastGreetingHour !== currentHour) {
                message = { key: 'goodMorning', type: "greeting", dynamicData };
                botState.lastGreetingHour = currentHour;
            } else if (currentHour >= 18 && currentHour < 22 && botState.lastGreetingHour !== currentHour) {
                message = { key: 'goodEvening', type: "greeting", dynamicData };
                botState.lastGreetingHour = currentHour;
            } else if (Math.random() < 0.3 && (!botState.messageLog.length || botState.messageLog[0].type !== 'tip')) { // 30% chance for random tip
                message = { key: `tip${botState.tipIndex}`, type: "tip", dynamicData };
                botState.tipIndex = (botState.tipIndex + 1) % translations[currentLanguage].proactiveTips.length;
            }
        }
        if (message) logBotMessage(message.key, message.type, message.dynamicData);
    }

    const throttle = (func, limit) => { 
        let inThrottle; 
        return function() { 
            if (!inThrottle) { 
                func.apply(this, arguments); 
                inThrottle = true; 
                setTimeout(() => inThrottle = false, limit); 
            } 
        } 
    };

    const updateUI = (data) => {
        const { temp, ph, moisture, weatherTemp, weatherFeelsLike, weatherHumidity, weatherCondition, weatherWind } = data;
        const trans = translations[currentLanguage];
        elements.tempValue.textContent = (temp ?? '--').toFixed ? temp.toFixed(2) : '--';
        elements.phValue.textContent = (ph ?? '--').toFixed ? ph.toFixed(2) : '--';
        elements.moistureValue.textContent = (moisture ?? '--').toFixed ? moisture.toFixed(2) : '--';
        elements.weatherTemp.textContent = `${(weatherTemp ?? '--').toFixed ? weatherTemp.toFixed(1) : '--'}°C`;
        elements.weatherFeelsLike.textContent = `${(weatherFeelsLike ?? '--').toFixed ? weatherFeelsLike.toFixed(1) : '--'}°C`;
        elements.weatherHumidity.textContent = `${parseInt(weatherHumidity) || '--'}%`;
        elements.weatherWind.textContent = `${(weatherWind ?? '--').toFixed ? weatherWind.toFixed(1) : '--'} km/h`;
        elements.weatherDesc.textContent = trans.weatherConditions[weatherCondition] || weatherCondition || 'Unknown';
        elements.weatherIcon.innerHTML = weatherIcons[weatherCondition] || weatherIcons['Unknown'];

        const time = new Date().toLocaleTimeString();
        const updateChartData = (chart, value) => {
            if (chart.data.labels.length > 20) { 
                chart.data.labels.shift(); 
                chart.data.datasets[0].data.shift(); 
            }
            chart.data.labels.push(time);
            chart.data.datasets[0].data.push(value);
            if (value !== null && value < chart.options.scales.y.min) chart.options.scales.y.min = Math.floor(value - 1);
            if (value !== null && value > chart.options.scales.y.max) chart.options.scales.y.max = Math.ceil(value + 1);
            chart.update('none');
        };
        updateChartData(tempChart, temp);
        updateChartData(phChart, ph);

        elements.tempCard.classList.toggle('card--alert', temp < 15 || temp > 35);
        elements.tempAlert.textContent = temp < 15 ? trans.tempTooLow : temp > 35 ? trans.tempTooHigh : '';
        elements.phCard.classList.toggle('card--alert', ph < 4.5 || ph > 7.5);
        elements.phAlert.textContent = ph < 4.5 ? trans.phAcidic : ph > 7.5 ? trans.phAlkaline : '';
        elements.moistureCard.classList.toggle('card--alert', moisture < 20 || moisture > 80);
        elements.moistureAlert.textContent = moisture < 20 ? trans.moistureTooLow : moisture > 80 ? trans.moistureTooHigh : '';
        
        updateBotLogic({ ...data, pumpIsOn: elements.pumpSwitch.checked });
    };

    const throttledUpdateUI = throttle(updateUI, 1000);

    function connectWebSocket() {
        const ws = new WebSocket('https://0m4jwn6h-6789.inc1.devtunnels.ms/'); // Use WSS for security
        ws.onopen = () => console.log('WebSocket connected');
        ws.onmessage = (event) => {
            const data = event.data.split(',');
            if (data.length >= 8) {
                const [sensorTemp, sensorPh, moisture, weatherTemp, weatherFeelsLike, weatherHumidity, weatherCondition, weatherWind] = data;
                throttledUpdateUI({
                    temp: parseFloat(sensorTemp) || null,
                    ph: parseFloat(sensorPh) || null,
                    moisture: parseFloat(moisture) || null,
                    weatherTemp: parseFloat(weatherTemp) || null,
                    weatherFeelsLike: parseFloat(weatherFeelsLike) || null,
                    weatherHumidity: parseFloat(weatherHumidity) || null,
                    weatherCondition: weatherCondition.trim() || 'Unknown',
                    weatherWind: parseFloat(weatherWind) || null
                });
            }
        };
        ws.onclose = () => { 
            console.log('WebSocket disconnected, reconnecting...'); 
            setTimeout(connectWebSocket, 5000); 
        };
        ws.onerror = (error) => console.error('WebSocket error:', error);
        elements.pumpSwitch.onchange = () => { 
            if (ws && ws.readyState === WebSocket.OPEN) { 
                ws.send(elements.pumpSwitch.checked ? 'ON' : 'OFF'); 
            } 
        };
    }
    
    // Enhanced interactions
    elements.botAvatar.addEventListener('click', toggleChat);
    document.addEventListener('click', (e) => {
        if (!elements.botContainer.contains(e.target) && !chatElements.chatContainer.contains(e.target)) {
            chatElements.chatContainer.style.display = 'none';
            elements.botLogTooltip.classList.remove('visible');
        }
    });

    // Rotate tips more dynamically
    setInterval(() => { 
        botState.tipIndex = (botState.tipIndex + 1) % translations[currentLanguage].proactiveTips.length; 
    }, 45000); // Slightly longer interval

    setLanguage('en');
    const initTime = new Date().toLocaleTimeString('en-US');
    logBotMessage('init', "greeting", { time: initTime });
    connectWebSocket();
});