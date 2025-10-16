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
                    moistureTooHigh: 'Moisture too high!',
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
                        "Rotate the plants if possible to ensure they get even light exposure."
                    ],
                    botMessages: {
                        phLowCritical: "CRITICAL: pH is dangerously low (acidic)! Correct immediately.",
                        phHighCritical: "CRITICAL: pH is dangerously high (alkaline)! Nutrient lockout risk.",
                        tempLowCritical: "CRITICAL: Water is too cold! This can shock plant roots.",
                        tempHighCritical: "CRITICAL: Water is too hot! Reduces oxygen, harms roots.",
                        phLowWarning: "pH is slightly acidic. Keep an eye on it.",
                        phHighWarning: "pH is slightly alkaline. Monitor for nutrient absorption issues.",
                        wateringTimeOff: "It's watering time! The pump is off, consider turning it on.",
                        wateringDoneOn: "Watering schedule is complete. You can turn the pump off to save energy.",
                        hotSunnyPumpOff: "Hot and sunny day during watering time! You should activate the pump.",
                        goodMorning: "Good morning! All systems look stable.",
                        goodEvening: "Good evening. Conditions are normal. Time to check plant leaves."
                    },
                    botInit: `Hello! System initialized at \${time}. Monitoring now...`
                },
                hi: {
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
                        "यदि संभव हो तो पौधों को घुमाएं ताकि उन्हें समान प्रकाश मिले।"
                    ],
                    botMessages: {
                        phLowCritical: "गंभीर: पीएच खतरनाक रूप से कम (अम्लीय) है! तुरंत सुधारें।",
                        phHighCritical: "गंभीर: पीएच खतरनाक रूप से उच्च (क्षारीय) है! पोषक तत्व लॉकआउट का जोखिम।",
                        tempLowCritical: "गंभीर: पानी बहुत ठंडा है! यह पौधों की जड़ों को झटका दे सकता है।",
                        tempHighCritical: "गंभीर: पानी बहुत गर्म है! ऑक्सीजन कम करता है, जड़ों को नुकसान पहुंचाता है।",
                        phLowWarning: "पीएच थोड़ा अम्लीय है। इस पर नजर रखें।",
                        phHighWarning: "पीएच थोड़ा क्षारीय है। पोषक तत्व अवशोषण समस्याओं के लिए निगरानी करें।",
                        wateringTimeOff: "यह पानी देने का समय है! पंप बंद है, इसे चालू करने पर विचार करें।",
                        wateringDoneOn: "पानी देने का कार्यक्रम पूरा हो गया है। ऊर्जा बचाने के लिए पंप बंद कर सकते हैं।",
                        hotSunnyPumpOff: "पानी देने के समय गर्म और धूप वाला दिन! आपको पंप सक्रिय करना चाहिए।",
                        goodMorning: "सुप्रभात! सभी सिस्टम स्थिर दिख रहे हैं।",
                        goodEvening: "शुभ संध्या। स्थितियां सामान्य हैं। पौधों की पत्तियों की जांच करने का समय।"
                    },
                    botInit: `नमस्ते! सिस्टम \${time} पर प्रारंभ हुआ। अब निगरानी कर रहा है...`
                },
                gu: {
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
                        "સ્વચ્છ પાણી ખુશ પાણી છે! શેવાળ વૃદ્ધિ અટકાવવા માટે તમારા જળાશયને સાફ રાખો.",
                        "યોગ્ય હવા પ્રવાહ મહત્વપૂર્ણ છે. ખાતરી કરો કે પૌધા આસપાસનો વિસ્તાર સારી રીતે વેન્ટિલેટેડ છે.",
                        "શું તમે તાજેતરમાં પોષક દ્રાવણ સ્તર તપાસ્યું છે? સ્થિર વૃદ્ધિ માટે ટોપિંગ અપ કી છે.",
                        "જો શક્ય હોય તો પૌધાને ફેરવો જેથી તેઓને સમાન પ્રકાશ મળે."
                    ],
                    botMessages: {
                        phLowCritical: "ગંભીર: pH જોખમી રીતે નીચું (એસિડિક) છે! તરત જ સુધારો.",
                        phHighCritical: "ગંભીર: pH જોખમી રીતે ઉંચું (આલ્કલાઇન) છે! પોષક લોકઆઉટ જોખમ.",
                        tempLowCritical: "ગંભીર: પાણી ખૂબ ઠંડું છે! આ પ્લાન્ટના મૂળને આઘાત આપી શકે છે.",
                        tempHighCritical: "ગંભીર: પાણી ખૂબ ગરમ છે! ઓક્સિજન ઘટાડે છે, મૂળને નુકસાન પહોંચાડે છે.",
                        phLowWarning: "pH થોડું એસિડિક છે. તેના પર નજર રાખો.",
                        phHighWarning: "pH થોડું આલ્કલાઇન છે. પોષક શોષણ સમસ્યાઓ માટે મોનિટર કરો.",
                        wateringTimeOff: "તે પાણી આપવાનો સમય છે! પંપ બંધ છે, તેને ચાલુ કરવાનું વિચારો.",
                        wateringDoneOn: "પાણી આપવાનું શેડ્યૂલ પૂર્ણ થયું છે. ઊર્જા બચાવવા માટે તમે પંપ બંધ કરી શકો છો.",
                        hotSunnyPumpOff: "પાણી આપવાના સમયે ગરમ અને સન્ની દિવસ! તમારે પંપને સક્રિય કરવું જોઈએ.",
                        goodMorning: "સુપ્રભાત! તમામ સિસ્ટમ્સ સ્થિર લાગે છે.",
                        goodEvening: "શુભ સાંજ. પરિસ્થિતિઓ સામાન્ય છે. પ્લાન્ટના પાંદડા તપાસવાનો સમય."
                    },
                    botInit: `નમસ્તે! સિસ્ટમ \${time} પર શરૂ થઈ. હવે મોનિટરિંગ...`
                }
            };

            Chart.defaults.color = 'rgba(240, 240, 240, 0.8)';
            Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
            const rootStyles = getComputedStyle(document.documentElement);
            const createChart = (ctx, label, color, min, max) => new Chart(ctx, {
                type: 'line', data: { labels: [], datasets: [{ label, data: [], borderColor: color, backgroundColor: color + '33', fill: true, tension: 0.4, pointBackgroundColor: color, pointRadius: 0, pointHoverRadius: 6 }] },
                options: { responsive: true, maintainAspectRatio: false, animation: { duration: 400 }, interaction: { intersect: false, mode: 'index' }, scales: { y: { beginAtZero: false, title: { display: true, text: label }, min, max, grid: { color: 'rgba(255, 255, 255, 0.1)' } }, x: { title: { display: true, text: translations[currentLanguage].time }, grid: { display: false } } }, plugins: { legend: { labels: { usePointStyle: true } } } }
            });
            let tempChart = createChart(document.getElementById('tempChart').getContext('2d'), `${translations.en.waterTemperature} (°C)`, rootStyles.getPropertyValue('--accent-temp').trim(), 24, 36);
            let phChart = createChart(document.getElementById('phChart').getContext('2d'), translations.en.waterPhLevel, rootStyles.getPropertyValue('--accent-ph').trim(), 4, 8);

            const weatherIcons = { 'Clear': '<path d="M32 12a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z" fill="#fbb03b"/><path d="M32 8v-4M32 56v-4M12 12l-2.83-2.83M52 52l-2.83-2.83M8 32H4M60 32h-4M12 52l-2.83 2.83M52 12l-2.83 2.83" stroke="#fbb03b" stroke-width="4" stroke-linecap="round"/>', 'Clouds': '<path d="M41.5 15.5A14.5 14.5 0 0014.6 22a10.5 10.5 0 00-1.1 20.9h32.1a12.5 12.5 0 00.4-24.9z" fill="#e6e6e6" stroke="#e6e6e6" stroke-width="3"/>', 'Rain': '<path d="M41.5 15.5A14.5 14.5 0 0014.6 22a10.5 10.5 0 00-1.1 20.9h32.1a12.5 12.5 0 00.4-24.9z" fill="#e6e6e6" stroke="#e6e6e6" stroke-width="3"/><path d="M24 44l-2 8M32 44l-2 8M40 44l-2 8" stroke="#59a2ff" stroke-width="4" stroke-linecap="round"/>', 'Drizzle': '<path d="M41.5 15.5A14.5 14.5 0 0014.6 22a10.5 10.5 0 00-1.1 20.9h32.1a12.5 12.5 0 00.4-24.9z" fill="#e6e6e6" stroke="#e6e6e6" stroke-width="3"/><path d="M24 44l-1 4M32 44l-1 4M40 44l-1 4" stroke="#59a2ff" stroke-width="3" stroke-linecap="round"/>', 'Thunderstorm': '<path d="M41.5 15.5A14.5 14.5 0 0014.6 22a10.5 10.5 0 00-1.1 20.9h32.1a12.5 12.5 0 00.4-24.9z" fill="#e6e6e6" stroke="#e6e6e6" stroke-width="3"/><path d="M28 44l-4 8h4l-2 8l8-12h-4l4-4z" fill="#fbb03b" stroke="#fbb03b" stroke-width="2"/>', 'Snow': '<path d="M41.5 15.5A14.5 14.5 0 0014.6 22a10.5 10.5 0 00-1.1 20.9h32.1a12.5 12.5 0 00.4-24.9z" fill="#e6e6e6" stroke="#e6e6e6" stroke-width="3"/><path d="M32 44l-2 8M24 48l-4 4M40 48l4 4M28 44l4 8M24 48l4 4M36 48l-4 4" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>', 'Fog': '<path d="M41.5 15.5A14.5 14.5 0 0014.6 22a10.5 10.5 0 00-1.1 20.9h32.1a12.5 12.5 0 00.4-24.9z" fill="#e6e6e6" stroke="#e6e6e6" stroke-width="3"/><path d="M16 44h32M16 48h32M16 52h32" stroke="#b0b0b0" stroke-width="3"/>', 'Unknown': '<path d="M41.5 15.5A14.5 14.5 0 0014.6 22a10.5 10.5 0 00-1.1 20.9h32.1a12.5 12.5 0 00.4-24.9z" fill="#e6e6e6" stroke="#e6e6e6" stroke-width="3"/>'};

            const botState = { messageLog: [], MAX_LOG_MESSAGES: 15, tipIndex: 0, lastGreetingHour: -1 };
            const isWateringTime = hour => (hour >= 7 && hour < 9) || (hour >= 12 && hour < 14) || (hour >= 17 && hour < 19);

            const getTextFromKey = (key, dynamicTime = '') => {
                const trans = translations[currentLanguage];
                if (key === 'init') {
                    return trans.botInit.replace('${time}', dynamicTime);
                } else if (key.startsWith('tip')) {
                    const index = parseInt(key.slice(3));
                    return trans.proactiveTips[index];
                } else {
                    return trans.botMessages[key];
                }
            };

            const renderBotLog = () => {
                elements.botLogTooltip.innerHTML = '';
                botState.messageLog.forEach((msg) => {
                    const text = getTextFromKey(msg.key, msg.dynamicTime);
                    const newLogEntry = document.createElement('div');
                    newLogEntry.className = 'bot-log-message';
                    newLogEntry.innerHTML = `<span>${text}</span><span class="timestamp">${msg.timestamp} - ${msg.type}</span>`;
                    elements.botLogTooltip.appendChild(newLogEntry);
                });
            };

            const logBotMessage = (key, type, dynamicTime = '') => {
                const currentText = getTextFromKey(key, dynamicTime);
                if (botState.messageLog.length > 0 && getTextFromKey(botState.messageLog[0].key, botState.messageLog[0].dynamicTime) === currentText) return;
                const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                botState.messageLog.unshift({ key, type, timestamp, dynamicTime });
                if (botState.messageLog.length > botState.MAX_LOG_MESSAGES) botState.messageLog.pop();
                renderBotLog();
                updateBotMessage();
            };

            const updateBotMessage = () => {
                const latestCritical = botState.messageLog.find(msg => msg.type === 'critical');
                if (latestCritical) {
                    elements.botMessage.textContent = getTextFromKey(latestCritical.key, latestCritical.dynamicTime);
                    elements.botMessage.classList.add('visible');
                } else {
                    elements.botMessage.classList.remove('visible');
                }
            };

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
                renderBotLog();
                updateBotMessage();
            };

            elements.languageSelect.addEventListener('change', () => setLanguage(elements.languageSelect.value));

            function updateBotLogic(data) {
                const { temp, ph, weatherCondition, weatherTemp, pumpIsOn } = data;
                const currentHour = new Date().getHours();
                let message = null;

                if (ph < 4) message = { key: 'phLowCritical', type: "critical" };
                else if (ph > 8) message = { key: 'phHighCritical', type: "critical" };
                else if (temp < 15) message = { key: 'tempLowCritical', type: "critical" };
                else if (temp > 35) message = { key: 'tempHighCritical', type: "critical" };
                else if (ph < 4.5) message = { key: 'phLowWarning', type: "warning" };
                else if (ph > 7.5) message = { key: 'phHighWarning', type: "warning" };
                else if (isWateringTime(currentHour) && !pumpIsOn) message = { key: 'wateringTimeOff', type: "suggestion" };
                else if (!isWateringTime(currentHour) && pumpIsOn) message = { key: 'wateringDoneOn', type: "suggestion" };
                else if (weatherCondition === 'Clear' && weatherTemp > 29 && !pumpIsOn && isWateringTime(currentHour)) message = { key: 'hotSunnyPumpOff', type: "suggestion" };
                else {
                    if (currentHour >= 6 && currentHour < 12 && botState.lastGreetingHour !== currentHour) {
                        message = { key: 'goodMorning', type: "greeting" };
                        botState.lastGreetingHour = currentHour;
                    } else if (currentHour >= 18 && currentHour < 22 && botState.lastGreetingHour !== currentHour) {
                        message = { key: 'goodEvening', type: "greeting" };
                        botState.lastGreetingHour = currentHour;
                    } else if (!botState.messageLog.length || botState.messageLog[0].type !== 'tip') {
                        message = { key: `tip${botState.tipIndex}`, type: "tip" };
                    }
                }
                if (message) logBotMessage(message.key, message.type);
            }

            const throttle = (func, limit) => { let inThrottle; return function() { if (!inThrottle) { func.apply(this, arguments); inThrottle = true; setTimeout(() => inThrottle = false, limit); }}};

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
                    if (chart.data.labels.length > 20) { chart.data.labels.shift(); chart.data.datasets[0].data.shift(); }
                    chart.data.labels.push(time);
                    chart.data.datasets[0].data.push(value);
                    if (value < chart.options.scales.y.min) chart.options.scales.y.min = Math.floor(value - 1);
                    if (value > chart.options.scales.y.max) chart.options.scales.y.max = Math.ceil(value + 1);
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
                const ws = new WebSocket('https://0m4jwn6h-6789.inc1.devtunnels.ms/');
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
                ws.onclose = () => { console.log('WebSocket disconnected, reconnecting...'); setTimeout(connectWebSocket, 5000); };
                ws.onerror = (error) => console.error('WebSocket error:', error);
                elements.pumpSwitch.onchange = () => { if (ws && ws.readyState === WebSocket.OPEN) { ws.send(elements.pumpSwitch.checked ? 'ON' : 'OFF'); } };
            }
            
            elements.botAvatar.addEventListener('click', () => elements.botLogTooltip.classList.toggle('visible'));
            document.addEventListener('click', (e) => {
                if (!elements.botContainer.contains(e.target)) elements.botLogTooltip.classList.remove('visible');
            });
            setInterval(() => { botState.tipIndex = (botState.tipIndex + 1) % translations.en.proactiveTips.length; }, 30000);

            setLanguage('en');
            const initTime = new Date().toLocaleTimeString('en-US');
            logBotMessage('init', "greeting", initTime);
            connectWebSocket();
        });  
   
