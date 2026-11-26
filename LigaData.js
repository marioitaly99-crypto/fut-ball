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
    "name": "MARCHESÍN",
    "starter": true
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "ROJO",
    "starter": true
   },
   {
    "number": 20,
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
    "number": 21,
    "pos": "MID",
    "name": "HERRERA",
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
    "number": 3,
    "pos": "DEF",
    "name": "DI LOLLO",
    "starter": false
   },
   {
    "number": 15,
    "pos": "DEF",
    "name": "BLANCO",
    "starter": false
   },
   {
    "number": 18,
    "pos": "MID",
    "name": "DELGADO",
    "starter": false
   },
   {
    "number": 22,
    "pos": "FWD",
    "name": "ZENÓN",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ZEBALLOS",
    "starter": false
   },
   {
    "number": 17,
    "pos": "DEF",
    "name": "ADVÍNCULA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "FABRA",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ANSELMINO",
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
    "number": 1,
    "pos": "GK",
    "name": "ARMANI",
    "starter": true
   },
   {
    "number": 28,
    "pos": "DEF",
    "name": "QUARTA",
    "starter": true
   },
   {
    "number": 17,
    "pos": "DEF",
    "name": "DÍAZ",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "GALOPPO",
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
    "name": "COLIDIO",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "BELTRÁN",
    "starter": false
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "MONTIEL",
    "starter": false
   },
   {
    "number": 24,
    "pos": "MID",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 26,
    "pos": "MID",
    "name": "FERNÁNDEZ",
    "starter": false
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "BORJA",
    "starter": false
   },
   {
    "number": 20,
    "pos": "FWD",
    "name": "SUBIABRE",
    "starter": false
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "MAMMANA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "ACUÑA",
    "starter": false
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "KRANEVITTER",
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
    "number": 1,
    "pos": "GK",
    "name": "MELE",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "VALDEZ",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "GODOY",
    "starter": true
   },
   {
    "number": 5,
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
    "number": 9,
    "pos": "FWD",
    "name": "ABALDO",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "REY",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "ZABALA",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "CABRAL",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "ARIAS",
    "starter": false
   },
   {
    "number": 15,
    "pos": "DEF",
    "name": "MILLÁN",
    "starter": false
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ÁVILA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "CALDERÓN",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "PARMO",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "MONTIEL",
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
    "number": 1,
    "pos": "GK",
    "name": "ARIAS",
    "starter": true
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "ROJAS",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "DI CESARE",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "NARDONI",
    "starter": true
   },
   {
    "number": 7,
    "pos": "MID",
    "name": "SOLARI",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "MARAVILLA",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "GÓMEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "QUINTANA",
    "starter": false
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "ZUCULINI",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "FERNÁNDEZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "SALAS",
    "starter": false
   },
   {
    "number": 17,
    "pos": "FWD",
    "name": "CONECHNY",
    "starter": false
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "MURA",
    "starter": false
   },
   {
    "number": 22,
    "pos": "DEF",
    "name": "MARTIRENA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "SOSA",
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
    "number": 1,
    "pos": "GK",
    "name": "GILL",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "TRIPICHIO",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ROMERO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "BRAIDA",
    "starter": true
   },
   {
    "number": 7,
    "pos": "MID",
    "name": "MUNIAIN",
    "starter": true
   },
   {
    "number": 19,
    "pos": "FWD",
    "name": "VOMBERGAR",
    "starter": true
   },
   {
    "number": 25,
    "pos": "GK",
    "name": "MARTÍNEZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "HERRERA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "IRALA",
    "starter": false
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "CUELLO",
    "starter": false
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "REYNOSO",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "GÓMEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "GATTONI",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "PEÑA BIAFORE",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "CERUTTI",
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
    "number": 3,
    "pos": "DEF",
    "name": "GALVÁN",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ZAMBRANO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "CÁCERES",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "GUTIÉRREZ",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "DAMIÁN",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "CARLÓN",
    "starter": false
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "TOLEDO",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "ROMERO",
    "starter": false
   },
   {
    "number": 20,
    "pos": "MID",
    "name": "BOGADO",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "HELLER",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ZALAZAR",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "MEROLLA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "CECCHINI",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "CARDOZO",
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
    "number": 1,
    "pos": "GK",
    "name": "MUSSO",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "AMONDARAIN",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ÁLVAREZ",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "PIATTI",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "CETRÉ",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "CARRILLO",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "MEZA",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "LEDESMA",
    "starter": false
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "FERNÁNDEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "MID",
    "name": "MEDINA",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "BARCIA",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "GUZMÁN",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "MANCUSO",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "ASCACÍBAR",
    "starter": false
   },
   {
    "number": 15,
    "pos": "DEF",
    "name": "NÚÑEZ",
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
    "number": 1,
    "pos": "GK",
    "name": "INSFRÁN",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "PÉREZ",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "DOMÍNGUEZ",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "BERNARDI",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "MARIO",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "CARRIZO",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "BALBUENA",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "ENRIQUE",
    "starter": false
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "MORALES",
    "starter": false
   },
   {
    "number": 6,
    "pos": "MID",
    "name": "ROMERO",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "TORRES",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "SALVIO",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "CONTÍN",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "ROSALES",
    "starter": false
   },
   {
    "number": 15,
    "pos": "DEF",
    "name": "ALVARADO",
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
    "number": 1,
    "pos": "GK",
    "name": "ARIAS",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "VELÁZQUEZ",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "RODRÍGUEZ",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "GARCÍA",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "FERNÁNDEZ",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "TARRAGONA",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "MARTÍNEZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "SOSA",
    "starter": false
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "CAMPAZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "MID",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "SAN",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "HERRERA",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "BERNABEI",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "CORDERO",
    "starter": false
   },
   {
    "number": 15,
    "pos": "DEF",
    "name": "LOZANO",
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
    "name": "BROUN",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "ENRIQUE",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "QUIÑÓNEZ",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "FERREIRA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "LOVERA",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "VECCHIO",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "RAMÍREZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "MALCORRA",
    "starter": false
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "ÁVILA",
    "starter": false
   },
   {
    "number": 6,
    "pos": "MID",
    "name": "CAMPAZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "COPETTI",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "OVIEDO",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "SANDEZ",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "GAMBA",
    "starter": false
   },
   {
    "number": 15,
    "pos": "DEF",
    "name": "MALLO",
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
    "name": "HERRERA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "CATALÁN",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "KOCH",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "PORTILLO",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "BARTLETT",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "RUBÉN",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "GUZMÁN",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "GARCÍA",
    "starter": false
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "MID",
    "name": "SOSA",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "BARCELÓ",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "VALOYES",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "MORENO",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "DEPIETRI",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "ORTEGOZA",
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
    "number": 1,
    "pos": "GK",
    "name": "GÓMEZ",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "MUÑOZ",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "GARCÍA",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "LÓPEZ",
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
    "name": "LENCINA",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "LOZANO",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "RIVAROLA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "BARINAGA",
    "starter": false
   },
   {
    "number": 6,
    "pos": "MID",
    "name": "SOSA",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "LOVERA",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "VALDÉS",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "VÁZQUEZ",
    "starter": false
   },
   {
    "number": 13,
    "pos": "MID",
    "name": "NOVILLO",
    "starter": false
   },
   {
    "number": 15,
    "pos": "DEF",
    "name": "SUÁREZ",
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
    "number": 1,
    "pos": "GK",
    "name": "LOSADA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "SOSA",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "BURDISSO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "CARDOZO",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "CASTILLO",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "MARÍN",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "ANDRADA",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "CABRAL",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "PIZZINI",
    "starter": false
   },
   {
    "number": 6,
    "pos": "MID",
    "name": "ORTIZ",
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
    "name": "BELMONTE",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "ESQUIVEL",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "LOAIZA",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "MORENO",
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
    "name": "ARIAS",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "PAZ",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "LÓPEZ",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "CÁCERES",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "GALEANO",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "DURÁN",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "MARTÍNEZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "ALVAREZ",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "SOSA",
    "starter": false
   },
   {
    "number": 6,
    "pos": "MID",
    "name": "RUIZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "LEDESMA",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "VALDEZ",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "CORONEL",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "ESCALANTE",
    "starter": false
   },
   {
    "number": 15,
    "pos": "DEF",
    "name": "OLIVERA",
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
    "name": "HIGUITA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "GARCÍA",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "GODOY",
    "starter": true
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "FERNÁNDEZ",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "ROBERTONE",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "PIZZINI",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "LUCERO",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "LANZA",
    "starter": false
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "BALZARETTI",
    "starter": false
   },
   {
    "number": 6,
    "pos": "MID",
    "name": "ORTIZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "LEPAGE",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "CASTRO",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "GÓMEZ",
    "starter": false
   },
   {
    "number": 14,
    "pos": "DEF",
    "name": "QUIRÓS",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "AQUINO",
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
    "number": 1,
    "pos": "GK",
    "name": "MELGAREJO",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "PENNA",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "CARDOSO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "SOSA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ÁVILA",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "RETEGUI",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "DÍAZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "GARCÍA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "ROMERO",
    "starter": false
   },
   {
    "number": 6,
    "pos": "MID",
    "name": "RUIZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "PINO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "CAMPOS",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "PREDIGER",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "BLANCO",
    "starter": false
   },
   {
    "number": 15,
    "pos": "MID",
    "name": "MORALES",
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
    "number": 1,
    "pos": "GK",
    "name": "LANZILLOTTA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "SÁNCHEZ",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "MOLINA",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "MAC ALLISTER",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "RIQUELME",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "CAMPAZZO",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "VILLALBA",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "AVILÉS",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "VALENZUELA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "OROZ",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "BARROS",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "LUCERO",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "FERNÁNDEZ",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ROMERO",
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
    "number": 1,
    "pos": "GK",
    "name": "ARCE",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "SUSO",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "DEJESÚS",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "BALDASSARRA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "FERRERO",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "GONZÁLEZ",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "MAGGI",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "LAGO",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "VALDEZ",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "ROJAS",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "CÁCERES",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "MARTÍNEZ",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "ARIAS",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "GÓMEZ",
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
    "number": 1,
    "pos": "GK",
    "name": "MANSILLA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "BRUERA",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "BARBONA",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "DOMÍNGUEZ",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "CARDOZO",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "PINEDA",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "ROMERO",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "SANABRIA",
    "starter": false
   },
   {
    "number": 6,
    "pos": "MID",
    "name": "CHERRO",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "LUNA",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ROSALES",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "CALDERÓN",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "PITTÓN",
    "starter": false
   },
   {
    "number": 15,
    "pos": "DEF",
    "name": "ACOSTA",
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
    "number": 1,
    "pos": "GK",
    "name": "CARRANZA",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "MARTÍNEZ",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ESCUDERO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "BARÓN",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "CARRERA",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "LAMENDOLA",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "CONTI",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "SOSA",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "PEREYRA",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "FERREYRA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "ROMERO",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "ORTIZ",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "GUTIÉRREZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "GIL",
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
    "name": "LUCERO",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "MARTÍNEZ",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "BIANCHI",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "LUGONES",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "MIRANDA",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "HEREDIA",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "VILLALBA",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "RIVERO",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "SOSA",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "ORTIZ",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "ACOSTA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "GUZMÁN",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "CASTRO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "BENEDETTO",
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
    "name": "FERNÁNDEZ",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "SOSA",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ROMERO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "CORTÉS",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "TOLEDO",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "RIVAS",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "LUCERO",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "MORALES",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "GÓMEZ",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "BRAVO",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "GARCÍA",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "ORTIZ",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ARIAS",
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
    "name": "CHAVES",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "PÉREZ",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ROMERO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "GARCÍA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "MORALES",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "SILVA",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "SOSA",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "DÍAZ",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "FUNES",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "ORTIZ",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "LUNA",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "MORÁN",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "CASTRO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ARIAS",
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
    "number": 2,
    "pos": "DEF",
    "name": "BLANCO",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "BIANCHI",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "SOSA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ORTIZ",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "GONZÁLEZ",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "MARTÍNEZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "ROMERO",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "AGUIRRE",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "LUNA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "PAZ",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "VEGA",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "CASTRO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ARIAS",
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
    "number": 1,
    "pos": "GK",
    "name": "UNSAIN",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "GARCÍA",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ROMERO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "SOSA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ORTIZ",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "FERNÁNDEZ",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "MARTÍNEZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "IBÁÑEZ",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "RUIZ",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "LUNA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "GÓMEZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "CASTRO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ARIAS",
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
    "number": 1,
    "pos": "GK",
    "name": "RUIZ",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "GARCÍA",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ROMERO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "SOSA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ORTIZ",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "FERNÁNDEZ",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "MARTÍNEZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "IBÁÑEZ",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "VERA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "LUNA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "GÓMEZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "CASTRO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ARIAS",
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
    "number": 1,
    "pos": "GK",
    "name": "ARIAS",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "GARCÍA",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ROMERO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "SOSA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ORTIZ",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "FERNÁNDEZ",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "MARTÍNEZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "IBÁÑEZ",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "VERA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "LUNA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "GÓMEZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "CASTRO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ROJAS",
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
    "name": "DEVECCHI",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "GARCÍA",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ROMERO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "SOSA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ORTIZ",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "FERNÁNDEZ",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "MARTÍNEZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "IBÁÑEZ",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "VERA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "LUNA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "GÓMEZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "CASTRO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ROJAS",
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
    "name": "BRUNO",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "GARCÍA",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ROMERO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "SOSA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ORTIZ",
    "starter": true
   },
   {
    "number": 9,
    "pos": "FWD",
    "name": "FERNÁNDEZ",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "MARTÍNEZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "IBÁÑEZ",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "VERA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "LUNA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 16,
    "pos": "MID",
    "name": "GÓMEZ",
    "starter": false
   },
   {
    "number": 11,
    "pos": "FWD",
    "name": "CASTRO",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "ROJAS",
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
    "name": "GARNERONE",
    "starter": true
   },
   {
    "number": 2,
    "pos": "DEF",
    "name": "GARCÍA",
    "starter": true
   },
   {
    "number": 4,
    "pos": "DEF",
    "name": "ROMERO",
    "starter": true
   },
   {
    "number": 5,
    "pos": "MID",
    "name": "SOSA",
    "starter": true
   },
   {
    "number": 10,
    "pos": "MID",
    "name": "ORTIZ",
    "starter": true
   },
   {
    "number": 99,
    "pos": "FWD",
    "name": "ÁBILA",
    "starter": true
   },
   {
    "number": 12,
    "pos": "GK",
    "name": "MARTÍNEZ",
    "starter": false
   },
   {
    "number": 3,
    "pos": "DEF",
    "name": "LÓPEZ",
    "starter": false
   },
   {
    "number": 6,
    "pos": "DEF",
    "name": "IBÁÑEZ",
    "starter": false
   },
   {
    "number": 13,
    "pos": "DEF",
    "name": "VERA",
    "starter": false
   },
   {
    "number": 8,
    "pos": "MID",
    "name": "LUNA",
    "starter": false
   },
   {
    "number": 14,
    "pos": "MID",
    "name": "PÉREZ",
    "starter": false
   },
   {
    "number": 50,
    "pos": "MID",
    "name": "BAJAMICH",
    "starter": false
   },
   {
    "number": 32,
    "pos": "FWD",
    "name": "GALVÁN",
    "starter": false
   },
   {
    "number": 7,
    "pos": "FWD",
    "name": "GÓMEZ",
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
