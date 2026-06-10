/**
 * Závodní díly na motorky - Databáze dílů, motocyklů a výrobců
 */

export const CATEGORIES = [
  { id: 'exhaust', name: 'Výfukové systémy', icon: '💨' },
  { id: 'brakes', name: 'Brzdové systémy', icon: '🛑' },
  { id: 'suspension', name: 'Odpružení a tlumení', icon: '⚙️' },
  { id: 'chassis', name: 'Podvozek a kola', icon: '🏍️' },
  { id: 'bodywork', name: 'Kapotáže a karbon', icon: '🛡️' },
  { id: 'engine', name: 'Motor a spojka', icon: '🔥' },
  { id: 'electronics', name: 'Elektronika a telemetrie', icon: '💻' }
];

export const MOTORCYCLES = [
  { id: 'yamaha-r1', brand: 'Yamaha', model: 'YZF-R1 / R1M', year: '2020-2024', engine: '998cc', class: 'Superbike' },
  { id: 'ducati-panigale-v4', brand: 'Ducati', model: 'Panigale V4 R', year: '2021-2024', engine: '998cc', class: 'Superbike' },
  { id: 'kawasaki-zx10r', brand: 'Kawasaki', model: 'Ninja ZX-10RR', year: '2021-2024', engine: '998cc', class: 'Superbike' },
  { id: 'bmw-s1000rr', brand: 'BMW', model: 'S 1000 RR / M 1000 RR', year: '2019-2024', engine: '999cc', class: 'Superbike' },
  { id: 'honda-cbr1000rr', brand: 'Honda', model: 'CBR1000RR-R Fireblade SP', year: '2020-2024', engine: '999cc', class: 'Superbike' }
];

export const MANUFACTURERS = [
  {
    id: 'akrapovic',
    name: 'Akrapovič',
    url: 'https://www.akrapovic.com',
    origin: 'Slovinsko',
    description: 'Přední výrobce prémiových výfukových systémů z titanu a karbonu pro motorsport.'
  },
  {
    id: 'brembo',
    name: 'Brembo',
    url: 'https://www.brembo.com',
    origin: 'Itálie',
    description: 'Světový lídr v designu a výrobě vysoce výkonných brzdových systémů pro závodní účely.'
  },
  {
    id: 'ohlins',
    name: 'Öhlins',
    url: 'https://www.ohlins.com',
    origin: 'Švédsko',
    description: 'Legendární značka specializující se na odpružení a tlumení nejvyšší úrovně pro MotoGP a WSBK.'
  },
  {
    id: 'gilles-tooling',
    name: 'Gilles Tooling',
    url: 'https://www.gillestooling.com',
    origin: 'Lucembursko',
    description: 'Výrobce špičkových frézovaných CNC doplňků, stupaček a chráničů pro závodní motocykly.'
  },
  {
    id: 'bst',
    name: 'BST (Blackstone Tek)',
    url: 'https://blackstonetek.com',
    origin: 'Jižní Afrika',
    description: 'Průkopník ve výrobě ultralehkých karbonových kol pro závodní a sportovní motocykly.'
  },
  {
    id: 'stm',
    name: 'STM Italy',
    url: 'https://www.stmitaly.com',
    origin: 'Itálie',
    description: 'Specialista na antihoppingové spojky a precizní CNC komponenty pohonu.'
  },
  {
    id: 'carbonin',
    name: 'Carbonin',
    url: 'https://carbonin.com',
    origin: 'Slovinsko',
    description: 'Výrobce špičkových laminátových a karbonových závodních kapotáží s rychloupínáním.'
  },
  {
    id: 'aim',
    name: 'AiM Tech',
    url: 'https://www.aim-sportline.com',
    origin: 'Itálie',
    description: 'Lídr v oblasti dataloggerů, závodních displejů a telemetrických systémů.'
  }
];

export const PARTS = [
  // EXHAUST
  {
    id: 'akrapovic-evo-r1',
    name: 'Akrapovič Evolution Line (Titanium) Full Exhaust',
    category: 'exhaust',
    manufacturerId: 'akrapovic',
    compatibilities: ['yamaha-r1'],
    sku: 'S-Y10E6-APLT',
    price: 'cca 85 000 Kč',
    description: 'Vlajková loď výfukových systémů Akrapovič. Používán továrními týmy v WSBK. Celotitanová konstrukce s karbonovou koncovkou zaručuje maximální nárůst výkonu a úsporu hmotnosti přes 5 kg oproti originálu.',
    specs: {
      'Materiál svodů': 'Titan',
      'Materiál koncovky': 'Titan s karbonovým víčkem',
      'Úspora hmotnosti': '-5.2 kg',
      'Nárůst výkonu': '+9.8 HP při 13,200 ot/min',
      'Hlučnost': '102 dB (závodní specifikace bez db-killeru)'
    },
    productUrl: 'https://www.akrapovic.com/en/moto/product/20658/Yamaha/YZF-R1-R1M/Evolution-Line-Titanium'
  },
  {
    id: 'akrapovic-evo-panigale',
    name: 'Akrapovič Evolution Line Full Titanium System',
    category: 'exhaust',
    manufacturerId: 'akrapovic',
    compatibilities: ['ducati-panigale-v4'],
    sku: 'S-D11E3-ACT',
    price: 'cca 135 000 Kč',
    description: 'Závodní výfukový systém vyvinutý přímo ve spolupráci s Ducati Corse pro Panigale V4. Zvyšuje točivý moment v celém rozsahu a dává motocyklu nekompromisní zvuk MotoGP.',
    specs: {
      'Materiál svodů': 'Titan',
      'Materiál koncovky': 'Dvojitá titanová koncovka pod sedlo',
      'Úspora hmotnosti': '-6.0 kg',
      'Nárůst výkonu': '+12.5 HP',
      'Hlučnost': '105 dB'
    },
    productUrl: 'https://www.akrapovic.com/en/moto/product/21262/Ducati/Panigale-V4/Evolution-Line-Titanium'
  },

  // BRAKES
  {
    id: 'brembo-gp4rx',
    name: 'Brembo GP4-RX Billet Radial Calipers (108mm)',
    category: 'brakes',
    manufacturerId: 'brembo',
    compatibilities: ['yamaha-r1', 'kawasaki-zx10r', 'honda-cbr1000rr', 'bmw-s1000rr'],
    sku: '220B01010',
    price: 'cca 42 000 Kč',
    description: 'Radiální čtyřpístkové třmeny frézované z jednoho kusu (billet) s niklovaným povrchem pro minimální roztahování při extrémních teplotách. Inspirovány třmeny z MotoGP a WSBK.',
    specs: {
      'Rozteč montáže': '108 mm',
      'Materiál': 'CNC hliník (billet)',
      'Povrchová úprava': 'Niklování',
      'Počet pístků': '4 (průměr 32 mm)',
      'Hmotnost třmenu': 'cca 710 g (bez destiček)'
    },
    productUrl: 'https://www.brembo.com/en/moto/racing/calipers'
  },
  {
    id: 'brembo-tdrive',
    name: 'Brembo T-Drive Racing Brake Discs (5.5mm)',
    category: 'brakes',
    manufacturerId: 'brembo',
    compatibilities: ['yamaha-r1', 'ducati-panigale-v4', 'bmw-s1000rr', 'honda-cbr1000rr'],
    sku: '208A98511',
    price: 'cca 19 500 Kč / pár',
    description: 'Závodní plovoucí kotouče využívající patentovaný systém spojení tlumicími kolíky ve tvaru T. Tento systém umožňuje efektivnější přenos brzdného momentu a lepší odolnost vůči tepelnému namáhání.',
    specs: {
      'Průměr kotouče': '320 mm / 330 mm',
      'Tloušťka kotouče': '5.5 mm',
      'Materiál': 'Martenzitická ocel',
      'Typ unášeče': 'T-Drive plovoucí systém',
      'Šířka činné plochy': '34 mm'
    },
    productUrl: 'https://www.brembo.com/en/moto/racing/discs'
  },

  // SUSPENSION
  {
    id: 'ohlins-fgr250',
    name: 'Öhlins FGR 250 Superbike Front Forks',
    category: 'suspension',
    manufacturerId: 'ohlins',
    compatibilities: ['yamaha-r1', 'ducati-panigale-v4', 'kawasaki-zx10r', 'bmw-s1000rr', 'honda-cbr1000rr'],
    sku: 'FGR250',
    price: 'cca 290 000 Kč',
    description: 'Uzavřené TTX25 tlakové cartridge v masivních vnějších tubusech. Absolutní špička odpružení pro národní šampionáty a WSBK. Nabízí bezkonkurenční zpětnou vazbu a možnost jemného doladění útlumu.',
    specs: {
      'Systém': 'TTX25 Pressurized Cartridge',
      'Průměr kluzáků': '43 mm',
      'Zdvih': '130 mm',
      'Nastavení': 'Předpětí pružiny, komprese, odskok',
      'Povrch kluzáků': 'TiN (nitrid titanu)'
    },
    productUrl: 'https://www.ohlins.com/product/fgr-250-superbike-fork/'
  },
  {
    id: 'ohlins-ttx-gp',
    name: 'Öhlins TTX GP Rear Shock Absorber',
    category: 'suspension',
    manufacturerId: 'ohlins',
    compatibilities: ['yamaha-r1', 'ducati-panigale-v4', 'bmw-s1000rr'],
    sku: 'YA568 / DU568',
    price: 'cca 38 000 Kč',
    description: 'Zadní tlumič s technologií dvouplášťové konstrukce TTX, která eliminuje riziko kavitace oleje. Navržen speciálně pro závodní okruhové použití s přesným hydraulickým seřizovačem předpětí.',
    specs: {
      'Technologie': 'TTX twin-tube',
      'Průměr pístu': '36 mm',
      'Nastavení': 'Komprese (20 kliků), Odskok (20 kliků), Výška, Předpětí',
      'Hydraulické předpětí': 'Integrované'
    },
    productUrl: 'https://www.ohlins.com/product/ttx-gp-shock-absorber/'
  },

  // CHASSIS
  {
    id: 'bst-rapidtek',
    name: 'BST Rapid TEK Carbon Fiber Wheels',
    category: 'chassis',
    manufacturerId: 'bst',
    compatibilities: ['yamaha-r1', 'ducati-panigale-v4', 'bmw-s1000rr', 'honda-cbr1000rr'],
    sku: 'BST-RT-17',
    price: 'cca 89 000 Kč / sada',
    description: 'Celokarbonová kola s jedinečným designem loukotí splňující nejpřísnější závodní homologace. Extrémní snížení neodpružené hmotnosti a rotační setrvačnosti radikálně zlepšuje ovladatelnost a akceleraci.',
    specs: {
      'Materiál': 'Karbon (letecká specifikace)',
      'Rozměr přední': '3.50" x 17"',
      'Rozměr zadní': '6.00" x 17"',
      'Hmotnost (přední)': 'cca 2.4 kg',
      'Hmotnost (zadní)': 'cca 3.2 kg (monokyvka)'
    },
    productUrl: 'https://blackstonetek.com/product/rapid-tek/'
  },
  {
    id: 'gilles-vcr38gt',
    name: 'Gilles Tooling VCR38GT Adjustable Rearsets',
    category: 'chassis',
    manufacturerId: 'gilles-tooling',
    compatibilities: ['yamaha-r1', 'bmw-s1000rr', 'kawasaki-zx10r'],
    sku: 'VCR38GT-Y01',
    price: 'cca 13 800 Kč',
    description: 'Plynule nastavitelné stupačky pomocí otočného mechanismu. Vysoce tuhá konstrukce z leteckého duralu, kuličková ložiska v řadicí i brzdové páce pro dokonale hladký chod. Umožňuje standardní i reverzní řazení (závodní schéma).',
    specs: {
      'Rozsah nastavení': 'Plynule stavitelné (stupačka, řadička, brzda)',
      'Materiál': 'Al7075 T6 dural',
      'Typ řazení': 'Standardní i reverzní (reverse-shifting GP pattern)',
      'Hmotnost': 'cca 980 g (pár)'
    },
    productUrl: 'https://www.gillestooling.com/products/footrest-systems/vcr38gt-footrest-system/'
  },

  // BODYWORK
  {
    id: 'carbonin-fairings',
    name: 'Carbonin Full Carbon Fiber Race Fairing Kit',
    category: 'bodywork',
    manufacturerId: 'carbonin',
    compatibilities: ['yamaha-r1', 'ducati-panigale-v4', 'bmw-s1000rr', 'honda-cbr1000rr'],
    sku: 'CB-C-10020',
    price: 'cca 55 000 Kč',
    description: 'Prémiová sada závodních kapot vyrobená z pre-preg karbonových vláken vytvrzovaných v autoklávu. Dodáváno s předinstalovanými Dzus rychloupínáky. Extrémní lehkost a pružnost zabraňující praskání při pádech.',
    specs: {
      'Materiál': 'Pre-preg Carbon Fiber (epoxidová pryskyřice)',
      'Povrch': 'Lesklý / matný karbon bez laku',
      'Rychloupínáky': 'Dzus (předinstalované stříbrné nebo černé)',
      'Komponenty v sadě': 'Přední maska, boky, spodní vana (oil container), podsedlovka'
    },
    productUrl: 'https://carbonin.com/race-fairings/'
  },

  // ENGINE & CLUTCH
  {
    id: 'stm-evo-clutch',
    name: 'STM Evo-GP Slipper Clutch',
    category: 'engine',
    manufacturerId: 'stm',
    compatibilities: ['yamaha-r1', 'ducati-panigale-v4', 'kawasaki-zx10r', 'bmw-s1000rr'],
    sku: 'FDU-S180',
    price: 'cca 24 500 Kč',
    description: 'Závodní antihoppingová spojka s talířovou pružinou. Zabraňuje zablokování zadního kola při prudkém podřazování před zatáčkou. Umožňuje jezdci agresivní nájezdy bez rizika ztráty kontroly nad zadní částí motocyklu.',
    specs: {
      'Typ spojky': 'Antihoppingová (Slipper clutch)',
      'Materiál': 'Ergal hliník s tvrdým eloxem',
      'Hlavní pružina': '90 mm talířová',
      'Antihoppingová pružina': 'Talířová s možností změny tuhosti'
    },
    productUrl: 'https://www.stmitaly.com/en/slipper-clutch-evogp/'
  },

  // ELECTRONICS
  {
    id: 'aim-solo2-dl',
    name: 'AiM Solo 2 DL GPS Lap Timer & Datalogger',
    category: 'electronics',
    manufacturerId: 'aim',
    compatibilities: ['yamaha-r1', 'ducati-panigale-v4', 'kawasaki-zx10r', 'bmw-s1000rr', 'honda-cbr1000rr'],
    sku: 'AIM-SOLO2-DL',
    price: 'cca 18 200 Kč',
    description: 'Závodní GPS lap timer, který se připojuje přímo do řídicí jednotky (ECU) motocyklu přes CAN/OBD sběrnici. Zaznamenává nejen časy na kolo s přesností na setiny sekundy, ale také telemetrická data (plyn, otáčky, zařazený převod, náklon, tlak brzd).',
    specs: {
      'GPS systém': 'GPS + Glonass (10Hz)',
      'Připojení k ECU': 'CAN, RS232, K-Line, OBDII',
      'Interní paměť': '4 GB',
      'Displej': 'Grafický s nastavitelným podsvícením (7 barev)',
      'Senzory': '3-osý akcelerometr, 3-osý gyroskop, magnetometr'
    },
    productUrl: 'https://www.aim-sportline.com/en/products/solo2-solo2dl/index.htm'
  }
];
