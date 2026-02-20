// Each item defines whether it counts in US GDP and/or US GNP.
// - GDP: production within US borders (location-based), ONLY for "production" items.
// - GNP: production by US residents anywhere + net factor income for US residents (ownership/residency-based).
//
// type: "production" | "factor" | "nonoutput"
// value: magnitude in millions (keep small & readable)
// gdpCounts: true/false
// gnpCounts: true/false
// gnpSign: +1 or -1 (only used for factor payments; production is always +1)

const ITEM_BANK = [
  {
    id: "p1",
    type: "production",
    title: "Foreign-owned factory in U.S.",
    value: 50,
    desc: "A German-owned factory located in the U.S. produces $50m of cars this year.",
    gdpCounts: true,
    gnpCounts: false,
    explain: "Production is inside the U.S. → GDP. But the owner is foreign → not U.S. GNP."
  },
  {
    id: "p2",
    type: "production",
    title: "U.S.-owned factory abroad",
    value: 30,
    desc: "A U.S.-owned factory located in Mexico produces $30m of appliances this year.",
    gdpCounts: false,
    gnpCounts: true,
    explain: "Production is outside the U.S. → not GDP. Owned by U.S. residents → counts in U.S. GNP."
  },
  {
    id: "p3",
    type: "production",
    title: "U.S.-owned firm in U.S.",
    value: 22,
    desc: "A U.S.-owned firm in Texas produces $22m of software services.",
    gdpCounts: true,
    gnpCounts: true,
    explain: "Inside borders and owned by U.S. residents → counts in both GDP and GNP."
  },
  {
    id: "p4",
    type: "production",
    title: "Foreign tourism spending in U.S.",
    value: 8,
    desc: "Visitors from abroad buy $8m of U.S.-produced services while traveling in the U.S.",
    gdpCounts: true,
    gnpCounts: true,
    explain: "The services are produced in the U.S. → GDP. Produced by U.S. residents/firms → also in GNP."
  },
  {
    id: "p5",
    type: "production",
    title: "Foreign-owned restaurant abroad",
    value: 12,
    desc: "A French-owned restaurant in Canada produces $12m of meals.",
    gdpCounts: false,
    gnpCounts: false,
    explain: "Not produced in the U.S. and not produced by U.S. residents → neither U.S. GDP nor U.S. GNP."
  },
  {
    id: "f1",
    type: "factor",
    title: "U.S. receives dividends from abroad",
    value: 6,
    gnpSign: +1,
    desc: "U.S. residents receive $6m in dividends from shares they own in a foreign company.",
    gdpCounts: false,
    gnpCounts: true,
    explain: "Dividends are factor income to U.S. residents from abroad → part of GNP (via NFIA), not GDP."
  },
  {
    id: "f2",
    type: "factor",
    title: "Foreign owners receive profits from U.S.",
    value: 9,
    gnpSign: -1,
    desc: "Foreign residents receive $9m in profit income from U.S. production (the production itself is already counted in U.S. GDP).",
    gdpCounts: false,
    gnpCounts: true,
    explain: "This is factor income paid to foreigners. It does not add to GDP (to avoid double counting), but it reduces U.S. GNP via NFIA."
  },
  {
    id: "f3",
    type: "factor",
    title: "U.S. earns wages abroad",
    value: 4,
    gnpSign: +1,
    desc: "A U.S. resident earns $4m in wages working for a company in the U.K. this year.",
    gdpCounts: false,
    gnpCounts: true,
    explain: "Wages earned by U.S. residents abroad raise U.S. GNP (NFIA), not U.S. GDP."
  },
  {
    id: "f4",
    type: "factor",
    title: "Foreign earns wages in U.S.",
    value: 5,
    gnpSign: -1,
    desc: "A foreign resident earns $5m in wage income from U.S. production (the production itself is already counted in U.S. GDP).",
    gdpCounts: false,
    gnpCounts: true,
    explain: "This is factor income paid to foreigners. It does not add to GDP separately, but it reduces U.S. GNP via NFIA."
  },
  {
    id: "n1",
    type: "nonoutput",
    title: "Used car sale",
    value: 7,
    desc: "A used car is sold for $7m total across transactions this year.",
    gdpCounts: false,
    gnpCounts: false,
    explain: "Used goods sales are not current production → neither GDP nor GNP."
  },
  {
    id: "n2",
    type: "nonoutput",
    title: "Stock purchase",
    value: 15,
    desc: "Households buy $15m of existing shares on the stock market.",
    gdpCounts: false,
    gnpCounts: false,
    explain: "Financial asset exchanges are not production → neither GDP nor GNP."
  },
  {
    id: "n3",
    type: "nonoutput",
    title: "Government transfer payment",
    value: 10,
    desc: "The government pays $10m in unemployment benefits (a transfer).",
    gdpCounts: false,
    gnpCounts: false,
    explain: "Transfers are not payment for current production → neither GDP nor GNP."
  },
  {
    id: "p6",
    type: "production",
    title: "Foreign-owned mine in U.S.",
    value: 18,
    desc: "A Canadian-owned mine in Nevada produces $18m of minerals.",
    gdpCounts: true,
    gnpCounts: false,
    explain: "Produced in the U.S. → GDP. Foreign-owned → not U.S. GNP."
  },
  {
    id: "p7",
    type: "production",
    title: "U.S. owned services in Ireland",
    value: 14,
    desc: "A U.S.-owned services subsidiary in Ireland produces $14m of output.",
    gdpCounts: false,
    gnpCounts: true,
    explain: "Outside U.S. borders → not GDP. Owned by U.S. residents → U.S. GNP."
  },

  // ---------- ADDITIONS (16 new cards) ----------

// Production (final goods/services)
{
  id: "p8",
  type: "production",
  title: "Foreign-owned hotel in U.S.",
  value: 16,
  desc: "A Japanese-owned hotel in the U.S. provides $16m of lodging services this year.",
  gdpCounts: true,
  gnpCounts: false,
  explain: "Production occurs in the U.S. → GDP. Ownership is foreign → not U.S. GNP."
},
{
  id: "p9",
  type: "production",
  title: "U.S.-owned factory in Germany",
  value: 26,
  desc: "A U.S.-owned factory located in Germany produces $26m of machinery this year.",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Production is outside the U.S. → not GDP. Produced by U.S.-owned factors → U.S. GNP."
},
{
  id: "p10",
  type: "production",
  title: "New home construction in U.S.",
  value: 19,
  desc: "A U.S. construction firm builds new homes worth $19m in the U.S. this year.",
  gdpCounts: true,
  gnpCounts: true,
  explain: "Newly produced final goods/services in the U.S. → GDP; produced by U.S. residents → also GNP."
},
{
  id: "p11",
  type: "production",
  title: "Foreign-owned streaming service in U.S.",
  value: 9,
  desc: "A foreign-owned streaming company produces $9m of services using staff and studios located in the U.S.",
  gdpCounts: true,
  gnpCounts: false,
  explain: "Production in the U.S. → GDP. Foreign-owned → not U.S. GNP."
},
{
  id: "p12",
  type: "production",
  title: "U.S. resident produces services abroad",
  value: 5,
  desc: "A U.S. resident working in Singapore produces $5m of consulting services there this year.",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Production abroad → not U.S. GDP. Produced by a U.S. resident → U.S. GNP."
},
{
  id: "p13",
  type: "production",
  title: "Foreign-owned farm abroad",
  value: 13,
  desc: "A Brazilian-owned farm in Brazil produces $13m of soybeans this year.",
  gdpCounts: false,
  gnpCounts: false,
  explain: "Not produced in the U.S., and not produced by U.S. residents → neither."
},
{
  id: "p14",
  type: "production",
  title: "U.S.-owned airline flight abroad",
  value: 7,
  desc: "A U.S.-owned airline provides $7m of transportation services on routes entirely outside the U.S.",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Production occurs outside the U.S. → not GDP. Produced by a U.S. firm → U.S. GNP."
},
{
  id: "p15",
  type: "production",
  title: "Foreign-owned R&D lab in U.S.",
  value: 11,
  desc: "A Swiss-owned R&D lab located in the U.S. produces $11m of R&D services this year.",
  gdpCounts: true,
  gnpCounts: false,
  explain: "Production in the U.S. → GDP. Foreign-owned → not U.S. GNP."
},

// Factor income (NFIA components; NOT extra GDP items)
{
  id: "f5",
  type: "factor",
  title: "U.S. receives interest from abroad",
  value: 4,
  gnpSign: +1,
  desc: "U.S. residents receive $4m of interest income from foreign bonds (not additional U.S. production).",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Factor income received by U.S. residents from abroad raises U.S. GNP via NFIA; it is not counted in GDP."
},
{
  id: "f6",
  type: "factor",
  title: "U.S. pays interest to foreigners",
  value: 3,
  gnpSign: -1,
  desc: "Foreign residents receive $3m of interest income from U.S. bonds (not additional U.S. production).",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Factor income paid to foreigners reduces U.S. GNP via NFIA; it is not counted in GDP."
},
{
  id: "f7",
  type: "factor",
  title: "U.S. receives rent from abroad",
  value: 2,
  gnpSign: +1,
  desc: "U.S. residents receive $2m in rental income from property they own abroad (not additional U.S. production).",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Factor income received from abroad raises NFIA and therefore raises U.S. GNP."
},
{
  id: "f8",
  type: "factor",
  title: "Foreign receives rent from U.S.",
  value: 2,
  gnpSign: -1,
  desc: "Foreign residents receive $2m in rental income from property they own in the U.S. (not additional U.S. production).",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Factor income paid to foreigners lowers NFIA and therefore lowers U.S. GNP."
},

// Nonoutput / excluded items (to prevent double counting or because not production)
{
  id: "n4",
  type: "nonoutput",
  title: "Intermediate goods sale",
  value: 9,
  desc: "A U.S. steel mill sells $9m of steel to a U.S. car maker (the steel is used to make cars).",
  gdpCounts: false,
  gnpCounts: false,
  explain: "Intermediate goods are excluded to avoid double counting; the value is captured in the final good."
},
{
  id: "n5",
  type: "nonoutput",
  title: "Sale of existing home",
  value: 20,
  desc: "An existing home is sold for $20m total this year.",
  gdpCounts: false,
  gnpCounts: false,
  explain: "Used assets are not current production, so the home’s sale itself is excluded."
},
{
  id: "n6",
  type: "nonoutput",
  title: "Transfer payment",
  value: 6,
  desc: "The government pays $6m in Social Security benefits (a transfer).",
  gdpCounts: false,
  gnpCounts: false,
  explain: "Transfers are not payments for current production."
},
{
  id: "n7",
  type: "nonoutput",
  title: "Purchase of imported final good",
  value: 12,
  desc: "U.S. households buy $12m of cars produced in Japan.",
  gdpCounts: false,
  gnpCounts: false,
  explain: "The production occurs abroad and is not produced by U.S. factors; it is not U.S. GDP or U.S. GNP."
},

  // ---------- ADDITIONS (20 more cards) ----------

// Production (final goods/services)
{
  id: "p16",
  type: "production",
  title: "Foreign-owned warehouse services in U.S.",
  value: 10,
  desc: "A Dutch-owned logistics company provides $10m of warehousing services using facilities located in the U.S.",
  gdpCounts: true,
  gnpCounts: false,
  explain: "Production occurs in the U.S. → GDP. Foreign-owned factors → not U.S. GNP."
},
{
  id: "p17",
  type: "production",
  title: "U.S.-owned app services in Canada",
  value: 8,
  desc: "A U.S.-owned firm provides $8m of app services using staff located in Canada.",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Production outside U.S. borders → not GDP. Produced by U.S. factors → U.S. GNP."
},
{
  id: "p18",
  type: "production",
  title: "Foreign-owned film production in U.S.",
  value: 21,
  desc: "A U.K.-owned studio produces $21m of film services in the U.S. using U.S.-based crews and stages.",
  gdpCounts: true,
  gnpCounts: false,
  explain: "Production in the U.S. → GDP. Foreign-owned → not U.S. GNP."
},
{
  id: "p19",
  type: "production",
  title: "U.S. resident produces software abroad",
  value: 6,
  desc: "A U.S. resident living in France produces $6m of software services there this year.",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Production abroad → not U.S. GDP. Produced by a U.S. resident → U.S. GNP."
},
{
  id: "p20",
  type: "production",
  title: "U.S.-owned manufacturing in Vietnam",
  value: 28,
  desc: "A U.S.-owned plant in Vietnam produces $28m of final consumer electronics this year.",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Production occurs outside the U.S. → not GDP. Owned/controlled by U.S. factors → U.S. GNP."
},
{
  id: "p21",
  type: "production",
  title: "Foreign-owned retail services in U.S.",
  value: 12,
  desc: "A Spanish-owned retail chain provides $12m of retail services in the U.S. this year.",
  gdpCounts: true,
  gnpCounts: false,
  explain: "Services produced inside the U.S. → GDP. Foreign-owned → not U.S. GNP."
},
{
  id: "p22",
  type: "production",
  title: "U.S.-owned engineering services in Japan",
  value: 9,
  desc: "A U.S.-owned engineering firm provides $9m of services in Japan using Japan-based engineers.",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Production outside U.S. borders → not GDP. Produced by U.S.-owned factors → U.S. GNP."
},
{
  id: "p23",
  type: "production",
  title: "U.S. university teaches in U.S.",
  value: 7,
  desc: "A U.S. university provides $7m of educational services in the U.S. this year.",
  gdpCounts: true,
  gnpCounts: true,
  explain: "Produced in the U.S. → GDP and produced by U.S. residents → GNP."
},
{
  id: "p24",
  type: "production",
  title: "Foreign-owned university campus in U.S.",
  value: 6,
  desc: "A foreign-owned university campus located in the U.S. provides $6m of educational services this year.",
  gdpCounts: true,
  gnpCounts: false,
  explain: "Production in the U.S. → GDP. Foreign-owned factors → not U.S. GNP."
},
{
  id: "p25",
  type: "production",
  title: "Foreign-owned solar farm in U.S.",
  value: 15,
  desc: "A Danish-owned solar farm located in the U.S. produces electricity services worth $15m this year.",
  gdpCounts: true,
  gnpCounts: false,
  explain: "Production occurs in the U.S. → GDP. Foreign-owned → not U.S. GNP."
},

// Factor income (NFIA components; NOT extra GDP items)
{
  id: "f9",
  type: "factor",
  title: "U.S. receives profit income from abroad",
  value: 7,
  gnpSign: +1,
  desc: "U.S. residents receive $7m in profit income from businesses they own abroad (not additional U.S. production).",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Factor income received from abroad raises NFIA → raises U.S. GNP; it is not counted in GDP."
},
{
  id: "f10",
  type: "factor",
  title: "Foreigners receive profit income from U.S.",
  value: 6,
  gnpSign: -1,
  desc: "Foreign residents receive $6m in profit income generated by U.S. production (the production is already in U.S. GDP).",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Profit income paid to foreigners lowers NFIA → lowers U.S. GNP; do not add separately to GDP (avoid double counting)."
},
{
  id: "f11",
  type: "factor",
  title: "U.S. receives wages from abroad",
  value: 3,
  gnpSign: +1,
  desc: "U.S. residents earn $3m in wages while working abroad (not additional U.S. production).",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Wage income earned abroad by U.S. residents raises NFIA → raises U.S. GNP."
},
{
  id: "f12",
  type: "factor",
  title: "Foreigners receive wages from U.S.",
  value: 4,
  gnpSign: -1,
  desc: "Foreign residents earn $4m in wages from U.S. production (the production is already in U.S. GDP).",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Wages paid to foreigners lower NFIA → lower U.S. GNP; they are not an extra GDP item."
},
{
  id: "f13",
  type: "factor",
  title: "U.S. receives interest from foreign loans",
  value: 5,
  gnpSign: +1,
  desc: "U.S. residents receive $5m of interest income from loans made to foreign borrowers (not additional U.S. production).",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Interest received from abroad raises NFIA → raises U.S. GNP."
},
{
  id: "f14",
  type: "factor",
  title: "Foreigners receive interest from U.S. loans",
  value: 5,
  gnpSign: -1,
  desc: "Foreign residents receive $5m of interest income from loans made to U.S. borrowers (not additional U.S. production).",
  gdpCounts: false,
  gnpCounts: true,
  explain: "Interest paid to foreigners lowers NFIA → lowers U.S. GNP."
},

// Nonoutput / excluded items (avoid double counting / not production)
{
  id: "n8",
  type: "nonoutput",
  title: "Bond purchase (financial asset)",
  value: 18,
  desc: "Households buy $18m of newly issued government bonds.",
  gdpCounts: false,
  gnpCounts: false,
  explain: "Buying financial assets is not production of goods/services → excluded from GDP and GNP."
},
{
  id: "n9",
  type: "nonoutput",
  title: "Gift transfer between households",
  value: 4,
  desc: "One household gives another household $4m as a gift (a transfer).",
  gdpCounts: false,
  gnpCounts: false,
  explain: "Transfers are not payment for current production → excluded."
},
{
  id: "n10",
  type: "nonoutput",
  title: "Pure import purchase",
  value: 10,
  desc: "U.S. households buy $10m of wine produced in France.",
  gdpCounts: false,
  gnpCounts: false,
  explain: "Production occurs abroad and is not produced by U.S. factors → neither U.S. GDP nor U.S. GNP."
},
{
  id: "n11",
  type: "nonoutput",
  title: "Resale of used smartphone",
  value: 2,
  desc: "A used smartphone is resold for $2m across transactions this year.",
  gdpCounts: false,
  gnpCounts: false,
  explain: "Used goods are not current production → excluded."
}
,
{
  id: "n12",
  type: "nonoutput",
  title: "Business buys intermediate inputs",
  value: 14,
  desc: "A U.S. bakery buys $14m of flour from a U.S. mill to bake bread.",
  gdpCounts: false,
  gnpCounts: false,
  explain: "Intermediate inputs are excluded to prevent double counting; their value appears in the final good."
},
{
  id: "n13",
  type: "nonoutput",
  title: "Capital gains on stock",
  value: 9,
  desc: "Households realize $9m in capital gains by selling stocks at a higher price.",
  gdpCounts: false,
  gnpCounts: false,
  explain: "Capital gains reflect asset price changes, not current production → excluded."
}


  
];
