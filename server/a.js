var json = { word_count: 196,
    word_count_message: 'Havia 196 palavras na entrada. É necessário um mínimo de 600, preferencialmente 1,200 ou mais, para calcular estatisticamente as estimativas significativas',
    processed_language: 'en',
    personality: 
     [ { trait_id: 'big5_openness',
         name: 'Abertura',
         category: 'personality',
         percentile: 0.04508709621246659,
         raw_score: 0.6945524523213161,
         children: [Array] },
       { trait_id: 'big5_conscientiousness',
         name: 'Escrupulosidade',
         category: 'personality',
         percentile: 0.240883336905784,
         raw_score: 0.5952408473360369,
         children: [Array] },
       { trait_id: 'big5_extraversion',
         name: 'Extroversão',
         category: 'personality',
         percentile: 0.34483218122327786,
         raw_score: 0.5331874776080546,
         children: [Array] },
       { trait_id: 'big5_agreeableness',
         name: 'Amabilidade',
         category: 'personality',
         percentile: 0.26044935751612935,
         raw_score: 0.7166775697712255,
         children: [Array] },
       { trait_id: 'big5_neuroticism',
         name: 'Faixa emocional',
         category: 'personality',
         percentile: 0.9385054401307751,
         raw_score: 0.6592374572953238,
         children: [Array] } ],
    needs: 
     [ { trait_id: 'need_challenge',
         name: 'Desafio',
         category: 'needs',
         percentile: 0.2976367791540574,
         raw_score: 0.7079603672764715 },
       { trait_id: 'need_closeness',
         name: 'Retraimento',
         category: 'needs',
         percentile: 0.3516706826042737,
         raw_score: 0.7764579932656515 },
       { trait_id: 'need_curiosity',
         name: 'Curiosidade',
         category: 'needs',
         percentile: 0.631980016310541,
         raw_score: 0.8255224322798621 },
       { trait_id: 'need_excitement',
         name: 'Empolgação',
         category: 'needs',
         percentile: 0.41878356394407656,
         raw_score: 0.6689200658266271 },
       { trait_id: 'need_harmony',
         name: 'Harmonia',
         category: 'needs',
         percentile: 0.27091296766019857,
         raw_score: 0.7881924165578876 },
       { trait_id: 'need_ideal',
         name: 'Ideal',
         category: 'needs',
         percentile: 0.38669092032458524,
         raw_score: 0.6773703619091374 },
       { trait_id: 'need_liberty',
         name: 'Liberdade',
         category: 'needs',
         percentile: 0.518297801530071,
         raw_score: 0.7382304574746346 },
       { trait_id: 'need_love',
         name: 'Amor',
         category: 'needs',
         percentile: 0.45001872413185934,
         raw_score: 0.7625492792954048 },
       { trait_id: 'need_practicality',
         name: 'Natureza prática',
         category: 'needs',
         percentile: 0.5483508860064036,
         raw_score: 0.7303983011530049 },
       { trait_id: 'need_self_expression',
         name: 'Expressão da própria personalidade',
         category: 'needs',
         percentile: 0.3301335756274734,
         raw_score: 0.6598767889374336 },
       { trait_id: 'need_stability',
         name: 'Estabilidade',
         category: 'needs',
         percentile: 0.2287970464567678,
         raw_score: 0.71079261389942 },
       { trait_id: 'need_structure',
         name: 'Estrutura',
         category: 'needs',
         percentile: 0.2764558711789988,
         raw_score: 0.6799992009759159 } ],
    values: 
     [ { trait_id: 'value_conservation',
         name: 'Conservação',
         category: 'values',
         percentile: 0.22862117182421293,
         raw_score: 0.6319596717678017 },
       { trait_id: 'value_openness_to_change',
         name: 'Abertura à mudança',
         category: 'values',
         percentile: 0.42394356228969876,
         raw_score: 0.7768715340087059 },
       { trait_id: 'value_hedonism',
         name: 'Hedonismo',
         category: 'values',
         percentile: 0.49443091632658703,
         raw_score: 0.7373018730131532 },
       { trait_id: 'value_self_enhancement',
         name: 'Autocrescimento',
         category: 'values',
         percentile: 0.3278829938399277,
         raw_score: 0.686774017707585 },
       { trait_id: 'value_self_transcendence',
         name: 'Autotranscendência',
         category: 'values',
         percentile: 0.08780311409111496,
         raw_score: 0.8108985400761333 } ],
    consumption_preferences: 
     [ { consumption_preference_category_id: 'consumption_preferences_shopping',
         name: 'Preferências de compra',
         consumption_preferences: [Array] },
       { consumption_preference_category_id: 'consumption_preferences_health_and_activity',
         name: 'Preferências de saúde e atividade',
         consumption_preferences: [Array] },
       { consumption_preference_category_id: 'consumption_preferences_environmental_concern',
         name: 'Preferências de preocupações ambientais',
         consumption_preferences: [Array] },
       { consumption_preference_category_id: 'consumption_preferences_entrepreneurship',
         name: 'Preferências de empreendedorismo',
         consumption_preferences: [Array] },
       { consumption_preference_category_id: 'consumption_preferences_movie',
         name: 'Preferências de filmes',
         consumption_preferences: [Array] },
       { consumption_preference_category_id: 'consumption_preferences_music',
         name: 'Preferências de música',
         consumption_preferences: [Array] },
       { consumption_preference_category_id: 'consumption_preferences_reading',
         name: 'Preferências de leitura',
         consumption_preferences: [Array] },
       { consumption_preference_category_id: 'consumption_preferences_volunteering',
         name: 'Preferências de voluntariado',
         consumption_preferences: [Array] } ],
    warnings: 
     [ { warning_id: 'WORD_COUNT_MESSAGE',
         message: 'Havia 196 palavras na entrada. É necessário um mínimo de 600, preferencialmente 1,200 ou mais, para calcular estatisticamente as estimativas significativas' } ] }


console.log("Big Five");
json.personality.forEach(personality => {
    console.log(personality.name);
    console.log(parseFloat((personality.percentile * 100).toFixed(2)))
});
console.log("Needs");
json.needs.forEach(needs => {
    console.log(needs.name);
    console.log(parseFloat((needs.percentile * 100).toFixed(2)))
});
console.log("Values");

json.values.forEach(values => {
    console.log(values.name);
    console.log(parseFloat((values.percentile * 100).toFixed(2)))
});