/* =====================================================================
 LigaData.js · window.LIGA_ARGENTINA_DATA · Primera División (30 equipos)
 ---------------------------------------------------------------------
 ⚠ Los PLANTELES (squad) son una base de trabajo: varios clubes llevan
   apellidos de relleno (GARCÍA, ROMERO, SOSA, ORTIZ...) y los dorsales
   no están verificados contra las listas oficiales. Hay que revisarlos
   club por club antes de darlos por reales.
 Estructuras compatibles con index.html:
   kitHome/kitAway = {n,c1,c2,c3,st}  (n = 1|2|3 colores; st = diseño)
   stadium         = {enabled,seats:{n,c1,c2,c3},flags:{n,c1,c2,c3}}
 ===================================================================== */
(function(){
 const TEAMS=[
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "boca",
  "name": "Boca Juniors",
  "shortName": "BOC",
  "classicRivalId": "river",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-boca\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><g clip-path=\"url(#b-boca)\"><rect width=\"64\" height=\"64\" fill=\"#0a3c8f\"/><rect y=\"22\" width=\"64\" height=\"20\" fill=\"#f6c600\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#00338d",
   "c2": "#f3b229",
   "c3": "#22c55e",
   "st": "h1"
  },
  "kitAway": {
   "n": 3,
   "c1": "#ffffff",
   "c2": "#ffffff",
   "c3": "#00338d",
   "st": "bv"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#0a3c8f",
    "c2": "#f6c600",
    "c3": "#f6c600"
   },
   "flags": {
    "n": 2,
    "c1": "#0a3c8f",
    "c2": "#f6c600",
    "c3": "#f6c600"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "MONTERO",
    "starter": true
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "BLANCO",
    "starter": true
   },
   {
    "number": 32,
    "pos": "DEF",
    "name": "COSTA",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "PAREDES",
    "starter": true
   },
   {
    "number": 18,
    "pos": "MID",
    "name": "DELGADO",
    "starter": true
   },
   {
    "number": 16,
    "pos": "FWD",
    "name": "MERENTIEL",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "BREY",
    "starter": false
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "DI LOLLO",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "FIGAL",
    "starter": false
   },
   {
    "number": 26,
    "pos": "DEF",
    "name": "PELLEGRINO",
    "starter": false
   },
   {
    "number": 6,
    "pos": "MID",
    "name": "BATTAGLIA",
    "starter": false
   },
   {
    "number": 25,
    "pos": "MID",
    "name": "ASCACIBAR",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "BELMONTE",
    "starter": false
   },
   {
    "number": 22,
    "pos": "FWD",
    "name": "VILLA",
    "starter": false
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "GIMÉNEZ",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "river",
  "name": "River Plate",
  "shortName": "RIV",
  "classicRivalId": "boca",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-river\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><g clip-path=\"url(#b-river)\"><rect width=\"64\" height=\"64\" fill=\"#ffffff\"/><path d=\"M-4 4L4 -4L68 60L60 68Z\" fill=\"#e30613\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"28.6\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#ffffff",
   "c2": "#e30613",
   "c3": "#22c55e",
   "st": "dg"
  },
  "kitAway": {
   "n": 2,
   "c1": "#e30613",
   "c2": "#111111",
   "c3": "#22c55e",
   "st": "vs"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#ffffff",
    "c2": "#e30613",
    "c3": "#e30613"
   },
   "flags": {
    "n": 2,
    "c1": "#ffffff",
    "c2": "#e30613",
    "c3": "#e30613"
   }
  },
  "squad": [
   {
    "number": 33,
    "pos": "GK",
    "name": "CENTURIÓN",
    "starter": true
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "RIVERO",
    "starter": true
   },
   {
    "number": 28,
    "pos": "DEF",
    "name": "M. QUARTA",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "ARAMBARRI",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "QUINTERO",
    "starter": true
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "DRIUSSI",
    "starter": true
   },
   {
    "number": 25,
    "pos": "GK",
    "name": "S. BELTRÁN",
    "starter": false
   },
   {
    "number": 29,
    "pos": "DEF",
    "name": "MONTIEL",
    "starter": false
   },
   {
    "number": 21,
    "pos": "DEF",
    "name": "ACUÑA",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "ORTEGA",
    "starter": false
   },
   {
    "number": 30,
    "pos": "DEF",
    "name": "OTAMENDI",
    "starter": false
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "PORTILLO",
    "starter": false
   },
   {
    "number": 27,
    "pos": "MID",
    "name": "ESPÍNDOLA",
    "starter": false
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "L. BELTRÁN",
    "starter": false
   },
   {
    "number": 19,
    "pos": "FWD",
    "name": "BORRÉ",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-lista-usuario",
  "id": "independiente",
  "name": "Independiente",
  "shortName": "IND",
  "classicRivalId": "racing",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-independiente\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><g clip-path=\"url(#b-independiente)\"><rect width=\"64\" height=\"64\" fill=\"#d8001c\"/><path d=\"M32 22l3 7 8 .6-6 5 2 8-7-4.3-7 4.3 2-8-6-5 8-.6z\" fill=\"#fff\" opacity=\".9\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 1,
   "c1": "#e30613",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "kitAway": {
   "n": 1,
   "c1": "#ffffff",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 1,
    "c1": "#d8001c",
    "c2": "#d8001c",
    "c3": "#d8001c"
   },
   "flags": {
    "n": 2,
    "c1": "#d8001c",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 77,
    "pos": "GK",
    "name": "MELE",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ARIAS",
    "starter": true
   },
   {
    "number": 36,
    "pos": "DEF",
    "name": "VALDÉZ",
    "starter": true
   },
   {
    "number": 23,
    "pos": "MID",
    "name": "MARCONE",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "MEZA",
    "starter": true
   },
   {
    "number": 6,
    "pos": "FWD",
    "name": "ÁVILA",
    "starter": true
   },
   {
    "number": 33,
    "pos": "GK",
    "name": "REY",
    "starter": false
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "CALDERÓN",
    "starter": false
   },
   {
    "number": 22,
    "pos": "DEF",
    "name": "ZABALA",
    "starter": false
   },
   {
    "number": 29,
    "pos": "DEF",
    "name": "GODOY",
    "starter": false
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "CABRAL",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "MILLÁN",
    "starter": false
   },
   {
    "number": 30,
    "pos": "MID",
    "name": "PARMO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "MONTIEL",
    "starter": false
   },
   {
    "number": 19,
    "pos": "FWD",
    "name": "ABALDO",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "racing",
  "name": "Racing Club",
  "shortName": "RAC",
  "classicRivalId": "independiente",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-racing\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><g clip-path=\"url(#b-racing)\"><rect width=\"64\" height=\"64\" fill=\"#6ecff6\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#6cabdd",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 1,
   "c1": "#0b1f3a",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#6ecff6",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#6ecff6",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 25,
    "pos": "GK",
    "name": "CAMBESES",
    "starter": true
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "DI CÉSARE",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "ROJO",
    "starter": true
   },
   {
    "number": 11,
    "pos": "MID",
    "name": "ZARACHO",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "MILJEVIC",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "A. MARTÍNEZ",
    "starter": true
   },
   {
    "number": 30,
    "pos": "GK",
    "name": "TAGLIAMONTE",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "CANNAVO",
    "starter": false
   },
   {
    "number": 23,
    "pos": "DEF",
    "name": "COLOMBO",
    "starter": false
   },
   {
    "number": 27,
    "pos": "DEF",
    "name": "ROJAS",
    "starter": false
   },
   {
    "number": 13,
    "pos": "MID",
    "name": "S. SOSA",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "ORTEGOZA",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "B. RODRÍGUEZ",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "VERGARA",
    "starter": false
   },
   {
    "number": 17,
    "pos": "FWD",
    "name": "CONECHNY",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "sanlorenzo",
  "name": "San Lorenzo",
  "shortName": "SLO",
  "classicRivalId": "huracan",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-sanlorenzo\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><g clip-path=\"url(#b-sanlorenzo)\"><rect width=\"64\" height=\"64\" fill=\"#0b2a6b\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#c8102e\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#c8102e\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"28.6\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#0a1d4e",
   "c2": "#d91e2a",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 3,
   "c1": "#ffffff",
   "c2": "#0a1d4e",
   "c3": "#d91e2a",
   "st": "cb"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#0b2a6b",
    "c2": "#c8102e",
    "c3": "#c8102e"
   },
   "flags": {
    "n": 2,
    "c1": "#0b2a6b",
    "c2": "#c8102e",
    "c3": "#c8102e"
   }
  },
  "squad": [
   {
    "number": 20,
    "pos": "GK",
    "name": "ALTAMIRANO",
    "starter": true
   },
   {
    "number": 24,
    "pos": "DEF",
    "name": "TRIPICHIO",
    "starter": true
   },
   {
    "number": 23,
    "pos": "DEF",
    "name": "HERNÁNDEZ",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "PERRUZZI",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "GULLI",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "CUELLO",
    "starter": true
   },
   {
    "number": 25,
    "pos": "GK",
    "name": "DEVECCHI",
    "starter": false
   },
   {
    "number": 19,
    "pos": "DEF",
    "name": "AMOR",
    "starter": false
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "ARBOLEDA",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "RODRÍGUEZ PAGANO",
    "starter": false
   },
   {
    "number": 38,
    "pos": "MID",
    "name": "FARÍAS",
    "starter": false
   },
   {
    "number": 28,
    "pos": "MID",
    "name": "BARRIOS",
    "starter": false
   },
   {
    "number": 26,
    "pos": "MID",
    "name": "ABREGO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "CERUTTI",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "REALI",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "huracan",
  "name": "Huracán",
  "shortName": "HUR",
  "classicRivalId": "sanlorenzo",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-huracan\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><g clip-path=\"url(#b-huracan)\"><rect width=\"64\" height=\"64\" fill=\"#ffffff\"/><rect x=\"22\" width=\"20\" height=\"64\" fill=\"#e30613\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#ffffff",
   "c2": "#e30613",
   "c3": "#22c55e",
   "st": "v1"
  },
  "kitAway": {
   "n": 1,
   "c1": "#e30613",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#ffffff",
    "c2": "#e30613",
    "c3": "#e30613"
   },
   "flags": {
    "n": 2,
    "c1": "#ffffff",
    "c2": "#e30613",
    "c3": "#e30613"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "GALÍNDEZ",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "BLONDEL",
    "starter": true
   },
   {
    "number": 21,
    "pos": "DEF",
    "name": "NERVO",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "GIL",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "Ó. ROMERO",
    "starter": true
   },
   {
    "number": 23,
    "pos": "FWD",
    "name": "PUSSETTO",
    "starter": true
   },
   {
    "number": 32,
    "pos": "GK",
    "name": "S. MEZA",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "PEREYRA",
    "starter": false
   },
   {
    "number": 25,
    "pos": "DEF",
    "name": "IBÁÑEZ",
    "starter": false
   },
   {
    "number": 22,
    "pos": "DEF",
    "name": "D. ZABALA",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "WALLER",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "OJEDA",
    "starter": false
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "FERNÁNDEZ CEDRÉS",
    "starter": false
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "CAICEDO",
    "starter": false
   },
   {
    "number": 33,
    "pos": "FWD",
    "name": "BARTICCIOTTO",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "estudiantes",
  "name": "Estudiantes (LP)",
  "shortName": "EST",
  "classicRivalId": "gimnasia",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-estudiantes\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><g clip-path=\"url(#b-estudiantes)\"><rect width=\"64\" height=\"64\" fill=\"#e30613\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#d91e2a",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 1,
   "c1": "#ffffff",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#e30613",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#e30613",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 16,
    "pos": "GK",
    "name": "MUSLERA",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "S. NÚÑEZ",
    "starter": true
   },
   {
    "number": 5,
    "pos": "DEF",
    "name": "M. ROJO",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "NEVES",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "T. PALACIOS",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "CARRILLO",
    "starter": true
   },
   {
    "number": 1,
    "pos": "GK",
    "name": "IACOVICH",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "BENEDETTI",
    "starter": false
   },
   {
    "number": 20,
    "pos": "DEF",
    "name": "E. MEZA",
    "starter": false
   },
   {
    "number": 15,
    "pos": "DEF",
    "name": "ARZAMENDIA",
    "starter": false
   },
   {
    "number": 21,
    "pos": "MID",
    "name": "PIOVI",
    "starter": false
   },
   {
    "number": 7,
    "pos": "MID",
    "name": "J. SOSA",
    "starter": false
   },
   {
    "number": 11,
    "pos": "MID",
    "name": "FARÍAS",
    "starter": false
   },
   {
    "number": 18,
    "pos": "FWD",
    "name": "CETRÉ",
    "starter": false
   },
   {
    "number": 27,
    "pos": "FWD",
    "name": "ALARIO",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "gimnasia",
  "name": "Gimnasia (LP)",
  "shortName": "GLP",
  "classicRivalId": "estudiantes",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-gimnasia\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><g clip-path=\"url(#b-gimnasia)\"><rect width=\"64\" height=\"64\" fill=\"#0b3d91\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"28.6\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#ffffff",
   "c2": "#0b1f3a",
   "c3": "#22c55e",
   "st": "h1"
  },
  "kitAway": {
   "n": 3,
   "c1": "#0b1f3a",
   "c2": "#0b1f3a",
   "c3": "#ffffff",
   "st": "bh"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#0b3d91",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#0b3d91",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 23,
    "pos": "GK",
    "name": "INSFRÁN",
    "starter": true
   },
   {
    "number": 15,
    "pos": "DEF",
    "name": "PINTADO",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "GIAMPAOLI",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "I. FERNÁNDEZ",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "MIRAMÓN",
    "starter": true
   },
   {
    "number": 32,
    "pos": "FWD",
    "name": "TORRES",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "CASTILLO",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "CONTI",
    "starter": false
   },
   {
    "number": 22,
    "pos": "DEF",
    "name": "MELLUSO",
    "starter": false
   },
   {
    "number": 24,
    "pos": "DEF",
    "name": "SILVA TORREJÓN",
    "starter": false
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "A. SOSA",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "MAX",
    "starter": false
   },
   {
    "number": 7,
    "pos": "MID",
    "name": "PANARO",
    "starter": false
   },
   {
    "number": 17,
    "pos": "FWD",
    "name": "JANSON",
    "starter": false
   },
   {
    "number": 29,
    "pos": "FWD",
    "name": "AUZMENDI",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "newells",
  "name": "Newell's Old Boys",
  "shortName": "NOB",
  "classicRivalId": "rosario",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-newells\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><g clip-path=\"url(#b-newells)\"><rect width=\"64\" height=\"64\" fill=\"#e30613\"/><rect x=\"32\" width=\"32\" height=\"64\" fill=\"#111111\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#e30613",
   "c2": "#111111",
   "c3": "#22c55e",
   "st": "mv"
  },
  "kitAway": {
   "n": 3,
   "c1": "#ffffff",
   "c2": "#e30613",
   "c3": "#111111",
   "st": "cb"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#e30613",
    "c2": "#111111",
    "c3": "#111111"
   },
   "flags": {
    "n": 2,
    "c1": "#e30613",
    "c2": "#111111",
    "c3": "#111111"
   }
  },
  "squad": [
   {
    "number": 12,
    "pos": "GK",
    "name": "ESPÍNOLA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "GLAVINOVICH",
    "starter": true
   },
   {
    "number": 17,
    "pos": "DEF",
    "name": "GIANNETTI",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "REGIARDO",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ACUÑA",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "CÓCCARO",
    "starter": true
   },
   {
    "number": 21,
    "pos": "GK",
    "name": "G. ARIAS",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "LUCIANO",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "MONTERO",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "ORTEGA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "SOTELO",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "SOÑORA",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "GUCH",
    "starter": false
   },
   {
    "number": 18,
    "pos": "FWD",
    "name": "MAZZANTTI",
    "starter": false
   },
   {
    "number": 99,
    "pos": "FWD",
    "name": "J. RAMÍREZ",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "rosario",
  "name": "Rosario Central",
  "shortName": "ROS",
  "classicRivalId": "newells",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-rosario\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><g clip-path=\"url(#b-rosario)\"><rect width=\"64\" height=\"64\" fill=\"#0b3d91\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#f6c600\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#f6c600\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#002d72",
   "c2": "#f7b500",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 1,
   "c1": "#ffffff",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#0b3d91",
    "c2": "#f6c600",
    "c3": "#f6c600"
   },
   "flags": {
    "n": 2,
    "c1": "#0b3d91",
    "c2": "#f6c600",
    "c3": "#f6c600"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "WERNER",
    "starter": true
   },
   {
    "number": 15,
    "pos": "DEF",
    "name": "MALLO",
    "starter": true
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "G. ÁVILA",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "IBARRA",
    "starter": true
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "PIZARRO",
    "starter": true
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "DI MARÍA",
    "starter": true
   },
   {
    "number": 23,
    "pos": "GK",
    "name": "LEDESMA",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "SÁNDEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "KOMAR",
    "starter": false
   },
   {
    "number": 32,
    "pos": "DEF",
    "name": "CORONEL",
    "starter": false
   },
   {
    "number": 28,
    "pos": "MID",
    "name": "G. FERNÁNDEZ",
    "starter": false
   },
   {
    "number": 19,
    "pos": "MID",
    "name": "SEGOVIA",
    "starter": false
   },
   {
    "number": 31,
    "pos": "MID",
    "name": "NAVARRO",
    "starter": false
   },
   {
    "number": 8,
    "pos": "FWD",
    "name": "CAMPAZ",
    "starter": false
   },
   {
    "number": 22,
    "pos": "FWD",
    "name": "COPETTI",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "talleres",
  "name": "Talleres (C)",
  "shortName": "TAL",
  "classicRivalId": "belgrano",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-talleres\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><g clip-path=\"url(#b-talleres)\"><rect width=\"64\" height=\"64\" fill=\"#0b1f4a\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"28.6\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#0b1f3a",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 1,
   "c1": "#0055a4",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#0b1f4a",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#0b1f4a",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "BARBI",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "CATALÁN",
    "starter": true
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "GUTH",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "GALARZA",
    "starter": true
   },
   {
    "number": 33,
    "pos": "MID",
    "name": "REYNOSO",
    "starter": true
   },
   {
    "number": 77,
    "pos": "FWD",
    "name": "R. MARTÍNEZ",
    "starter": true
   },
   {
    "number": 32,
    "pos": "GK",
    "name": "UNSAIN",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "SUÁREZ",
    "starter": false
   },
   {
    "number": 19,
    "pos": "DEF",
    "name": "PALOMINO",
    "starter": false
   },
   {
    "number": 20,
    "pos": "DEF",
    "name": "SCHOTT",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "SFORZA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "ORTEGOZA",
    "starter": false
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "BARONI",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "VALOYES",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "DEPIETRI",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "belgrano",
  "name": "Belgrano (C)",
  "shortName": "BEL",
  "classicRivalId": "talleres",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-belgrano\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><g clip-path=\"url(#b-belgrano)\"><rect width=\"64\" height=\"64\" fill=\"#4aa8e8\"/><path d=\"M32 22l3 7 8 .6-6 5 2 8-7-4.3-7 4.3 2-8-6-5 8-.6z\" fill=\"#fff\" opacity=\".9\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 1,
   "c1": "#5bc2e7",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "kitAway": {
   "n": 1,
   "c1": "#111111",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#4aa8e8",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#4aa8e8",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 25,
    "pos": "GK",
    "name": "CARDOZO",
    "starter": true
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "MORALES",
    "starter": true
   },
   {
    "number": 17,
    "pos": "DEF",
    "name": "L. LÓPEZ",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "LONGO",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ZELARAYÁN",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "PASSERINI",
    "starter": true
   },
   {
    "number": 23,
    "pos": "GK",
    "name": "VICENTINI",
    "starter": false
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "MALDONADO",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "SPÖRLE",
    "starter": false
   },
   {
    "number": 16,
    "pos": "DEF",
    "name": "RICCA",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "F. VÁZQUEZ",
    "starter": false
   },
   {
    "number": 21,
    "pos": "MID",
    "name": "A. SÁNCHEZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "MID",
    "name": "METILLI",
    "starter": false
   },
   {
    "number": 24,
    "pos": "FWD",
    "name": "RIGONI",
    "starter": false
   },
   {
    "number": 22,
    "pos": "FWD",
    "name": "N. FERNÁNDEZ",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "lanus",
  "name": "Lanús",
  "shortName": "LAN",
  "classicRivalId": "banfield",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-lanus\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><g clip-path=\"url(#b-lanus)\"><rect width=\"64\" height=\"64\" fill=\"#7a0f2e\"/><path d=\"M32 22l3 7 8 .6-6 5 2 8-7-4.3-7 4.3 2-8-6-5 8-.6z\" fill=\"#fff\" opacity=\".9\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 1,
   "c1": "#7a1c32",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "kitAway": {
   "n": 2,
   "c1": "#ffffff",
   "c2": "#7a1c32",
   "c3": "#22c55e",
   "st": "h1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 1,
    "c1": "#7a0f2e",
    "c2": "#7a0f2e",
    "c3": "#7a0f2e"
   },
   "flags": {
    "n": 2,
    "c1": "#7a0f2e",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 26,
    "pos": "GK",
    "name": "LOSADA",
    "starter": true
   },
   {
    "number": 24,
    "pos": "DEF",
    "name": "IZQUIERDOZ",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "MUÑOZ",
    "starter": true
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "LOAIZA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "MORENO",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "BOU",
    "starter": true
   },
   {
    "number": 1,
    "pos": "GK",
    "name": "AGUIRRE",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "CÁCERES",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "SOLER",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "LUCIATTI",
    "starter": false
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "PEÑA BIAFORE",
    "starter": false
   },
   {
    "number": 32,
    "pos": "MID",
    "name": "CARRERA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "SALVIO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "TORRES",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "banfield",
  "name": "Banfield",
  "shortName": "BAN",
  "classicRivalId": "lanus",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-banfield\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><g clip-path=\"url(#b-banfield)\"><rect width=\"64\" height=\"64\" fill=\"#0a9a45\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"28.6\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#007a33",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 2,
   "c1": "#111111",
   "c2": "#004d20",
   "c3": "#22c55e",
   "st": "dg"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#0a9a45",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#0a9a45",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "SANGUINETTI",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "MACIEL",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "MALDONADO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "NÚÑEZ",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ÁLVAREZ",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "SEPÚLVEDA",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "FACUNDO",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "BONIFACIO",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "INSÚA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "ARANDA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "RODRÍGUEZ",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "SORAIDE",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "GALVÁN",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "BISANZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "GIMÉNEZ",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "velez",
  "name": "Vélez Sarsfield",
  "shortName": "VEL",
  "classicRivalId": "tigre",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-velez\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><g clip-path=\"url(#b-velez)\"><rect width=\"64\" height=\"64\" fill=\"#ffffff\"/><path d=\"M4 18L32 44L60 18\" fill=\"none\" stroke=\"#0b3d91\" stroke-width=\"13\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#ffffff",
   "c2": "#004b9b",
   "c3": "#22c55e",
   "st": "vv"
  },
  "kitAway": {
   "n": 2,
   "c1": "#0b1f3a",
   "c2": "#0055a4",
   "c3": "#22c55e",
   "st": "vv"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#ffffff",
    "c2": "#0b3d91",
    "c3": "#0b3d91"
   },
   "flags": {
    "n": 2,
    "c1": "#ffffff",
    "c2": "#0b3d91",
    "c3": "#0b3d91"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "MARCHIORI",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "MAMMANA",
    "starter": true
   },
   {
    "number": 16,
    "pos": "DEF",
    "name": "MAGALLÁN",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "ROBERTONE",
    "starter": true
   },
   {
    "number": 22,
    "pos": "MID",
    "name": "LANZINI",
    "starter": true
   },
   {
    "number": 77,
    "pos": "FWD",
    "name": "R. MARTÍNEZ",
    "starter": true
   },
   {
    "number": 23,
    "pos": "GK",
    "name": "SANGUINETTI",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "E. GÓMEZ",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "J. GARCÍA",
    "starter": false
   },
   {
    "number": 21,
    "pos": "DEF",
    "name": "GORDON",
    "starter": false
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "VALDÉS",
    "starter": false
   },
   {
    "number": 29,
    "pos": "MID",
    "name": "ALIENDRO",
    "starter": false
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "BAEZA",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "PELLEGRINI",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "SANTOS",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "tigre",
  "name": "Tigre",
  "shortName": "TIG",
  "classicRivalId": "velez",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-tigre\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><g clip-path=\"url(#b-tigre)\"><rect width=\"64\" height=\"64\" fill=\"#0a2a6b\"/><rect y=\"22\" width=\"64\" height=\"20\" fill=\"#e30613\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#004b9b",
   "c2": "#e30613",
   "c3": "#22c55e",
   "st": "h1"
  },
  "kitAway": {
   "n": 1,
   "c1": "#ffffff",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#0a2a6b",
    "c2": "#e30613",
    "c3": "#e30613"
   },
   "flags": {
    "n": 2,
    "c1": "#0a2a6b",
    "c2": "#e30613",
    "c3": "#e30613"
   }
  },
  "squad": [
   {
    "number": 12,
    "pos": "GK",
    "name": "ZENOBIO",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "PAZ",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "LASO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "CARDONA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "MARONI",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "CONTÍN",
    "starter": true
   },
   {
    "number": 1,
    "pos": "GK",
    "name": "SOSA",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ORTEGA",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "MARCHEGIANI",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "BANEGAS",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "GARAY",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "GALVÁN",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "SCIPIONI",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ARMANDO",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "PROTTI",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "argentinos",
  "name": "Argentinos Juniors",
  "shortName": "ARG",
  "classicRivalId": "platense",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-argentinos\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><g clip-path=\"url(#b-argentinos)\"><rect width=\"64\" height=\"64\" fill=\"#d71920\"/><rect x=\"22\" width=\"20\" height=\"64\" fill=\"#ffffff\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"28.6\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#e30613",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "dg"
  },
  "kitAway": {
   "n": 1,
   "c1": "#ffffff",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#d71920",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#d71920",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 50,
    "pos": "GK",
    "name": "D. RODRÍGUEZ",
    "starter": true
   },
   {
    "number": 16,
    "pos": "DEF",
    "name": "F. ÁLVAREZ",
    "starter": true
   },
   {
    "number": 20,
    "pos": "DEF",
    "name": "PRIETO",
    "starter": true
   },
   {
    "number": 24,
    "pos": "MID",
    "name": "E. PÉREZ",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "LESCANO",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "M. ROMERO",
    "starter": true
   },
   {
    "number": 1,
    "pos": "GK",
    "name": "SIRI",
    "starter": false
   },
   {
    "number": 17,
    "pos": "DEF",
    "name": "PAREDES",
    "starter": false
   },
   {
    "number": 26,
    "pos": "DEF",
    "name": "BRAVO",
    "starter": false
   },
   {
    "number": 23,
    "pos": "DEF",
    "name": "MENDOZA",
    "starter": false
   },
   {
    "number": 11,
    "pos": "MID",
    "name": "MANCUELLO",
    "starter": false
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "FATTORI",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "OROZ",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "HERRERA",
    "starter": false
   },
   {
    "number": 19,
    "pos": "FWD",
    "name": "VERÓN",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "platense",
  "name": "Platense",
  "shortName": "PLA",
  "classicRivalId": "argentinos",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-platense\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><g clip-path=\"url(#b-platense)\"><rect width=\"64\" height=\"64\" fill=\"#5b3a29\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#ffffff",
   "c2": "#5c3a21",
   "c3": "#22c55e",
   "st": "h1"
  },
  "kitAway": {
   "n": 2,
   "c1": "#5c3a21",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "h1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#5b3a29",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#5b3a29",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 31,
    "pos": "GK",
    "name": "COZZANI",
    "starter": true
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "VÁZQUEZ",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "SUSO",
    "starter": true
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "PICCO",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "TABORDA",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "PELLEGRINO",
    "starter": true
   },
   {
    "number": 1,
    "pos": "GK",
    "name": "DESÁBATO",
    "starter": false
   },
   {
    "number": 25,
    "pos": "DEF",
    "name": "SABORIDO",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "MARCIANO",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "LOZANO",
    "starter": false
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "JUÁREZ",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "GÓMEZ",
    "starter": false
   },
   {
    "number": 7,
    "pos": "MID",
    "name": "SCHOR",
    "starter": false
   },
   {
    "number": 21,
    "pos": "FWD",
    "name": "MAINERO",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "RONALDO",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "union",
  "name": "Unión (SF)",
  "shortName": "UNI",
  "classicRivalId": "instituto",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-union\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><g clip-path=\"url(#b-union)\"><rect width=\"64\" height=\"64\" fill=\"#e30613\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#e30613",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 3,
   "c1": "#0b1f3a",
   "c2": "#e30613",
   "c3": "#ffffff",
   "st": "cb"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#e30613",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#e30613",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 25,
    "pos": "GK",
    "name": "CARDOZO",
    "starter": true
   },
   {
    "number": 34,
    "pos": "DEF",
    "name": "PARDO",
    "starter": true
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "CORVALÁN",
    "starter": true
   },
   {
    "number": 28,
    "pos": "MID",
    "name": "PITTON",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "VECCHIO",
    "starter": true
   },
   {
    "number": 77,
    "pos": "FWD",
    "name": "BALBOA",
    "starter": true
   },
   {
    "number": 1,
    "pos": "GK",
    "name": "MEULI",
    "starter": false
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "PAZ",
    "starter": false
   },
   {
    "number": 26,
    "pos": "DEF",
    "name": "FASCENDINI",
    "starter": false
   },
   {
    "number": 16,
    "pos": "DEF",
    "name": "VARGAS",
    "starter": false
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "MARTÍNEZ",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "MOSQUEIRA",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "ROLDÁN",
    "starter": false
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "DOMINA",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "ORTIZ",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "instituto",
  "name": "Instituto (C)",
  "shortName": "INS",
  "classicRivalId": "union",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-instituto\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><g clip-path=\"url(#b-instituto)\"><rect width=\"64\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#e30613\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#e30613\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"28.6\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#e30613",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 2,
   "c1": "#111111",
   "c2": "#e30613",
   "c3": "#22c55e",
   "st": "h1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#e30613",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#e30613",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 28,
    "pos": "GK",
    "name": "ROFFO",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "ALARCÓN",
    "starter": true
   },
   {
    "number": 31,
    "pos": "DEF",
    "name": "REQUENA",
    "starter": true
   },
   {
    "number": 19,
    "pos": "MID",
    "name": "LODICO",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "PUEBLA",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "SUÁREZ",
    "starter": true
   },
   {
    "number": 1,
    "pos": "GK",
    "name": "PAPALEO",
    "starter": false
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "FRANCO",
    "starter": false
   },
   {
    "number": 18,
    "pos": "DEF",
    "name": "L. RODRÍGUEZ",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "CERATO",
    "starter": false
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "MOREYRA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "DUBERSARSKY",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "ACEVEDO",
    "starter": false
   },
   {
    "number": 22,
    "pos": "FWD",
    "name": "LUNA",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "ROMERO",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "atletico_tucuman",
  "name": "Atlético Tucumán",
  "shortName": "ATU",
  "classicRivalId": "central_cordoba",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-atletico_tucuman\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><g clip-path=\"url(#b-atletico_tucuman)\"><rect width=\"64\" height=\"64\" fill=\"#6ecff6\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#5bc2e7",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 2,
   "c1": "#004b9b",
   "c2": "#111111",
   "c3": "#22c55e",
   "st": "vs"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#6ecff6",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#6ecff6",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "DURSO",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "FERRARI",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "ROMERO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "ACOSTA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "PEREYRA",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "ESTIGARRIBIA",
    "starter": true
   },
   {
    "number": 25,
    "pos": "GK",
    "name": "GONZÁLEZ",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "BRANDÁN",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "INFANTE",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "DE LOS SANTOS",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "SÁNCHEZ",
    "starter": false
   },
   {
    "number": 18,
    "pos": "MID",
    "name": "TESURI",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "CASTRO",
    "starter": false
   },
   {
    "number": 37,
    "pos": "FWD",
    "name": "CORONEL",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "RODRÍGUEZ",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-sin-verificar",
  "id": "central_cordoba",
  "name": "Central Córdoba (SdE)",
  "shortName": "CCO",
  "classicRivalId": "atletico_tucuman",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-central_cordoba\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><g clip-path=\"url(#b-central_cordoba)\"><rect width=\"64\" height=\"64\" fill=\"#111111\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#111111",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 1,
   "c1": "#7a1c32",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#111111",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#111111",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "INGROSSO",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "ABASCIA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "VALDEZ",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "ATENCIO",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "FLORENTÍN",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "VARALDO",
    "starter": true
   },
   {
    "number": 25,
    "pos": "GK",
    "name": "BURSICH",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "PILLUD",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "RAK",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "MANSILLA",
    "starter": false
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "VÁZQUEZ",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "VEGA",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "CABRERA",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ANGULO",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "CABRAL",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-relleno",
  "id": "gimnasia_mza",
  "name": "Gimnasia (Mendoza)",
  "shortName": "GME",
  "classicRivalId": "independiente_riv",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-gimnasia_mza\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><g clip-path=\"url(#b-gimnasia_mza)\"><rect width=\"64\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#111111\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#111111\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"28.6\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#ffffff",
   "c2": "#111111",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 2,
   "c1": "#111111",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "h1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#ffffff",
    "c2": "#0b3d91",
    "c3": "#0b3d91"
   },
   "flags": {
    "n": 2,
    "c1": "#ffffff",
    "c2": "#0b3d91",
    "c3": "#0b3d91"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "OJEDA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "PADILLA",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "MONDINO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "ANTONIO",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ROMANO",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "SILBA",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "PETRUCHI",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "NADALÍN",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "RECALDE",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "MERITELO",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "CORTÉS",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "SOLÍS",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "CICCOLINI",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "CASTRO",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "SPETALE",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-relleno",
  "id": "independiente_riv",
  "name": "Independiente Rivadavia",
  "shortName": "IRI",
  "classicRivalId": "gimnasia_mza",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-independiente_riv\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><g clip-path=\"url(#b-independiente_riv)\"><rect width=\"64\" height=\"64\" fill=\"#0a3a8f\"/><rect y=\"22\" width=\"64\" height=\"20\" fill=\"#ffffff\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 1,
   "c1": "#0b1f3a",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "kitAway": {
   "n": 2,
   "c1": "#ffffff",
   "c2": "#0b1f3a",
   "c3": "#22c55e",
   "st": "dg"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#0a3a8f",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#0a3a8f",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "CENTURIÓN",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "VILLALBA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "BIANCHI",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "ROMERO",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "SEQUEIRA",
    "starter": true
   },
   {
    "number": 22,
    "pos": "FWD",
    "name": "VILLA",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "MARINELLI",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "RUIZ DÍAZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "OSTCHEGA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "STUDER",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "TONETTO",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "HAM",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "RÍOS",
    "starter": false
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "RAMIS",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "SARTORI",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-relleno",
  "id": "defensa",
  "name": "Defensa y Justicia",
  "shortName": "DYJ",
  "classicRivalId": "barracas",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-defensa\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><g clip-path=\"url(#b-defensa)\"><rect width=\"64\" height=\"64\" fill=\"#0b8f3c\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#f6c600\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#f6c600\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#f7d117",
   "c2": "#007a33",
   "c3": "#22c55e",
   "st": "h1"
  },
  "kitAway": {
   "n": 2,
   "c1": "#007a33",
   "c2": "#f7d117",
   "c3": "#22c55e",
   "st": "h1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#0b8f3c",
    "c2": "#f6c600",
    "c3": "#f6c600"
   },
   "flags": {
    "n": 2,
    "c1": "#0b8f3c",
    "c2": "#f6c600",
    "c3": "#f6c600"
   }
  },
  "squad": [
   {
    "number": 25,
    "pos": "GK",
    "name": "BOLOGNA",
    "starter": true
   },
   {
    "number": 21,
    "pos": "DEF",
    "name": "RAMOS MINGO",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "AGUILERA",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "GUTIÉRREZ",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "MOLINAS",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "OSORIO",
    "starter": true
   },
   {
    "number": 1,
    "pos": "GK",
    "name": "FIERMARÍN",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "CANNAVO",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "SOTO",
    "starter": false
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "FERREIRA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "MID",
    "name": "PALAVECINO",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "SCHAMINE",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "TOGNI",
    "starter": false
   },
   {
    "number": 19,
    "pos": "FWD",
    "name": "MIRITELLO",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-relleno",
  "id": "barracas",
  "name": "Barracas Central",
  "shortName": "BAR",
  "classicRivalId": "defensa",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-barracas\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><g clip-path=\"url(#b-barracas)\"><rect width=\"64\" height=\"64\" fill=\"#d52b1e\"/><rect y=\"12.8\" width=\"64\" height=\"12.8\" fill=\"#ffffff\"/><rect y=\"38.4\" width=\"64\" height=\"12.8\" fill=\"#ffffff\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"28.6\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#e30613",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 3,
   "c1": "#004b9b",
   "c2": "#e30613",
   "c3": "#ffffff",
   "st": "cb"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#d52b1e",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#d52b1e",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 28,
    "pos": "GK",
    "name": "MIÑO",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "CAPRARO",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "GOÑI",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "HERRERA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "TAPIA",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "BRUERA",
    "starter": true
   },
   {
    "number": 1,
    "pos": "GK",
    "name": "MOYANO",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "MATER",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "INSÚA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "DEMARTINI",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "ROSANÉ",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "MILOC",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "DUARTE",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ZALAZAR",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "CANDIA",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-relleno",
  "id": "sarmiento",
  "name": "Sarmiento (J)",
  "shortName": "SAR",
  "classicRivalId": "aldosivi",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-sarmiento\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><g clip-path=\"url(#b-sarmiento)\"><rect width=\"64\" height=\"64\" fill=\"#0a8f3c\"/><path d=\"M32 22l3 7 8 .6-6 5 2 8-7-4.3-7 4.3 2-8-6-5 8-.6z\" fill=\"#fff\" opacity=\".9\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 1,
   "c1": "#007a33",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "kitAway": {
   "n": 2,
   "c1": "#ffffff",
   "c2": "#007a33",
   "c3": "#22c55e",
   "st": "h1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 1,
    "c1": "#0a8f3c",
    "c2": "#0a8f3c",
    "c3": "#0a8f3c"
   },
   "flags": {
    "n": 2,
    "c1": "#0a8f3c",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 42,
    "pos": "GK",
    "name": "ACOSTA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "PAREDES",
    "starter": true
   },
   {
    "number": 32,
    "pos": "DEF",
    "name": "INSAURRALDE",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "MENDEZ",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "GAITAN",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "LÓPEZ",
    "starter": true
   },
   {
    "number": 1,
    "pos": "GK",
    "name": "POURTAU",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ELÍAS LÓPEZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "DÍAZ",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "RONCAGLIA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "GARCÍA",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "BURGOA",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "GUDIÑO",
    "starter": false
   },
   {
    "number": 18,
    "pos": "FWD",
    "name": "MORALES",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "HAUCHE",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-relleno",
  "id": "aldosivi",
  "name": "Aldosivi",
  "shortName": "ALD",
  "classicRivalId": "sarmiento",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-aldosivi\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><g clip-path=\"url(#b-aldosivi)\"><rect width=\"64\" height=\"64\" fill=\"#f6c600\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#0a8f3c\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#0a8f3c\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 2,
   "c1": "#007a33",
   "c2": "#f7d117",
   "c3": "#22c55e",
   "st": "vs"
  },
  "kitAway": {
   "n": 3,
   "c1": "#ffffff",
   "c2": "#007a33",
   "c3": "#f7d117",
   "st": "cb"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#f6c600",
    "c2": "#0a8f3c",
    "c3": "#0a8f3c"
   },
   "flags": {
    "n": 2,
    "c1": "#f6c600",
    "c2": "#0a8f3c",
    "c3": "#0a8f3c"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "CARRANZA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "SOTO",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "MOTTES",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "ESQUIVEL",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "PIÑEIRO",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "TORRES",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "ATAMAÑUK",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "IÑIGUEZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "GUERRICO",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "GONZÁLEZ",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "LARRALDE",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "SOSA",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "ALONSO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "COLAZO",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "LAMÉNDOLLA",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-relleno",
  "id": "riestra",
  "name": "Deportivo Riestra",
  "shortName": "RIE",
  "classicRivalId": "estudiantes_rc",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-riestra\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><g clip-path=\"url(#b-riestra)\"><rect width=\"64\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#111111\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#111111\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"28.6\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 1,
   "c1": "#111111",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "kitAway": {
   "n": 2,
   "c1": "#ffffff",
   "c2": "#111111",
   "c3": "#22c55e",
   "st": "h1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#ffffff",
    "c2": "#111111",
    "c3": "#111111"
   },
   "flags": {
    "n": 2,
    "c1": "#ffffff",
    "c2": "#111111",
    "c3": "#111111"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "ARCE",
    "starter": true
   },
   {
    "number": 24,
    "pos": "DEF",
    "name": "CARO TORRES",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "BARRIONUEVO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "CELIZ",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "BRAVO",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "HERRERA",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "DOBBOLETTA",
    "starter": false
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "SANSOTRE",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "RAMÍREZ",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "MINERVINO",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "GOITIA",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "PEREIRA",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "LANDRIEL",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "BENEGAS",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "FERNÁNDEZ",
    "starter": false
   }
  ]
 },
 {
  "squadStatus": "2026/27-relleno",
  "id": "estudiantes_rc",
  "name": "Estudiantes (Río Cuarto)",
  "shortName": "ERC",
  "classicRivalId": "riestra",
  "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><defs><clipPath id=\"b-estudiantes_rc\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><g clip-path=\"url(#b-estudiantes_rc)\"><rect width=\"64\" height=\"64\" fill=\"#5ec2f2\"/><rect x=\"12.8\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" width=\"12.8\" height=\"64\" fill=\"#ffffff\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
  "kitHome": {
   "n": 1,
   "c1": "#5bc2e7",
   "c2": "#ffffff",
   "c3": "#22c55e",
   "st": "v1"
  },
  "kitAway": {
   "n": 2,
   "c1": "#111111",
   "c2": "#5bc2e7",
   "c3": "#22c55e",
   "st": "h1"
  },
  "stadium": {
   "enabled": true,
   "seats": {
    "n": 2,
    "c1": "#5ec2f2",
    "c2": "#ffffff",
    "c3": "#ffffff"
   },
   "flags": {
    "n": 2,
    "c1": "#5ec2f2",
    "c2": "#ffffff",
    "c3": "#ffffff"
   }
  },
  "squad": [
   {
    "number": 1,
    "pos": "GK",
    "name": "BARLASINA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "MAFFINI",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "ARTÚNDO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "CABRERA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "VALIENTE",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "BAJAMIICH",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "STRUMIA",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "BONACORSO",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "ABRAHAM",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "MARCIANO",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "ROMERO",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "BLANCO",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "PAVÓN",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "REYNAGA",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "GALVÁN",
    "starter": false
   }
  ]
 }
];
 const CLASSIC_PAIRS=[["boca", "river"], ["independiente", "racing"], ["sanlorenzo", "huracan"], ["estudiantes", "gimnasia"], ["newells", "rosario"], ["talleres", "belgrano"], ["lanus", "banfield"], ["velez", "tigre"], ["argentinos", "platense"], ["union", "instituto"], ["atletico_tucuman", "central_cordoba"], ["gimnasia_mza", "independiente_riv"], ["defensa", "barracas"], ["sarmiento", "aldosivi"], ["riestra", "estudiantes_rc"]];
 const byId={};TEAMS.forEach(t=>byId[t.id]=t);
 const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

 /* Sorteo de Zonas A y B: cada clásico queda siempre en zonas opuestas (15 + 15) */
 function generarZonasAleatorias(){
  const A=[],B=[];
  CLASSIC_PAIRS.forEach(([x,y])=>{if(Math.random()<.5){A.push(x);B.push(y)}else{A.push(y);B.push(x)}});
  const zonaDe={};A.forEach(id=>zonaDe[id]='A');B.forEach(id=>zonaDe[id]='B');
  return{A:shuffle(A),B:shuffle(B),zonaDe};
 }

 /* Plantel para cancha: apellidos y dorsales reales del club. Si algún jugador
    (titular o suplente) tiene el mismo dorsal que eligió el usuario, se le asigna
    un dorsal libre (no usado por el plantel ni por el usuario). */
 function resolverPlantelCancha(teamId,userNum){
  const t=byId[teamId];if(!t)return null;
  const u=parseInt(userNum,10),user=Number.isFinite(u)?u:null;
  const roster=t.squad.map(p=>Object.assign({},p,{reassigned:false}));
  const used=new Set(roster.map(p=>p.number));if(user!==null)used.add(user);
  const free=()=>{for(let n=12;n<=99;n++)if(!used.has(n))return n;for(let n=2;n<=11;n++)if(!used.has(n))return n;return 0};
  roster.forEach(p=>{if(user!==null&&p.number===user){const n=free();p.original=p.number;p.number=n;p.reassigned=true;used.add(n)}});
  return{teamId,starters:roster.filter(p=>p.starter),subs:roster.filter(p=>!p.starter),reassigned:roster.filter(p=>p.reassigned)};
 }

 /* Aplica nombres/dorsales reales a los bots de un equipo (campos del juego: nick, num) */
 function aplicarPlantelABots(bots,teamId,userNum){
  const r=resolverPlantelCancha(teamId,userNum);if(!r)return bots;
  const pool=r.starters.concat(r.subs);
  bots.forEach((b,i)=>{const p=pool[i%pool.length];b.nick=p.name;b.num=String(p.number);b.pos=p.pos});
  return bots;
 }

 window.LIGA_ARGENTINA_DATA={
  country:{id:'AR',name:'Argentina',flag:'🇦🇷'},
  league:{id:'primera',name:'Primera División',teams:30,zones:2,fechas:16,playoffs:true},
  CLASSIC_PAIRS,teams:TEAMS,
  getTeam:id=>byId[id]||null,
  generarZonasAleatorias,resolverPlantelCancha,aplicarPlantelABots
 };
})();
