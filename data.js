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
    desc: "Foreign owners receive $9m in profits from a factory located in the U.S.",
    gdpCounts: false,
    gnpCounts: true,
    explain: "This is factor income paid to foreigners → it lowers U.S. GNP (NFIA is more negative). Not GDP."
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
    desc: "A foreign resident earns $5m in wages working in the U.S. this year.",
    gdpCounts: false,
    gnpCounts: true,
    explain: "Wages paid to foreigners from U.S. production reduce U.S. GNP (NFIA), not GDP."
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
  }
];
