(function (global) {
  "use strict";

  var TEAMS = [
    {
      "id": "penarol",
      "name": "Peñarol",
      "shortName": "PEÑ",
      "classicRivalId": "nacional",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-penarol\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#f6c600\"/><g clip-path=\"url(#b-penarol)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#f6c600",
        "c2": "#111111",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#ffffff",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#f6c600",
          "c2": "#111111"
        },
        "flags": {
          "n": 2,
          "c1": "#f6c600",
          "c2": "#111111"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "SILVEIRA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "RODRÍGUEZ",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "MARTÍNEZ",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "ACOSTA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "TORRES",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "VARELA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "CORREA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "CARDOZO",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "FRANCO",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "IGLESIAS",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "LÓPEZ",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "OLIVERA",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "REYES",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "URIARTE",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "ZEBALLOS",
          "starter": false
        }
      ]
    },
    {
      "id": "nacional",
      "name": "Nacional",
      "shortName": "NAC",
      "classicRivalId": "penarol",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-nacional\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#ffffff\"/><g clip-path=\"url(#b-nacional)\"><polygon points=\"32.0,20.0 34.9,28.0 43.4,28.3 36.8,33.5 39.1,41.7 32.0,37.0 24.9,41.7 27.2,33.5 20.6,28.3 29.1,28.0\" fill=\"#0a3c8f\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 1,
        "c1": "#ffffff",
        "st": "v1"
      },
      "kitAway": {
        "n": 1,
        "c1": "#0a3c8f",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 1,
          "c1": "#ffffff"
        },
        "flags": {
          "n": 1,
          "c1": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "GONZÁLEZ",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "BENÍTEZ",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "CASTRO",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "LEMOS",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "ALMADA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "DELGADO",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "GADEA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "JAURÉS",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "MACHADO",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "PAIVA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "SUÁREZ",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "VIERA",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "AGUIRRE",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "DÍAZ",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "GRANDI",
          "starter": false
        }
      ]
    },
    {
      "id": "defensor",
      "name": "Defensor Sporting",
      "shortName": "DEF",
      "classicRivalId": "danubio",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-defensor\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#5b2c86\"/><g clip-path=\"url(#b-defensor)\"><polygon points=\"32.0,20.0 34.9,28.0 43.4,28.3 36.8,33.5 39.1,41.7 32.0,37.0 24.9,41.7 27.2,33.5 20.6,28.3 29.1,28.0\" fill=\"#ffffff\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 1,
        "c1": "#5b2c86",
        "st": "v1"
      },
      "kitAway": {
        "n": 1,
        "c1": "#ffffff",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 1,
          "c1": "#5b2c86"
        },
        "flags": {
          "n": 1,
          "c1": "#5b2c86"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "RAMOS",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "PEREYRA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "BARRIOS",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "ESTÉVEZ",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "HERNÁNDEZ",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "KOLLER",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "NÚÑEZ",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "QUEIROLO",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "TECHERA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "YAPUR",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "BRUNO",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "ECHEVERRÍA",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "HARRETCHE",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "MORALES",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "PINTOS",
          "starter": false
        }
      ]
    },
    {
      "id": "danubio",
      "name": "Danubio",
      "shortName": "DAN",
      "classicRivalId": "defensor",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-danubio\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#ffffff\"/><g clip-path=\"url(#b-danubio)\"><polygon points=\"0,0 18,0 64,46 64,64 46,64 0,18\" fill=\"#111111\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#ffffff",
        "c2": "#111111",
        "st": "dg"
      },
      "kitAway": {
        "n": 1,
        "c1": "#111111",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#111111"
        },
        "flags": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#111111"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "CARDOZO",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "FRANCO",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "IGLESIAS",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "LÓPEZ",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "OLIVERA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "REYES",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "URIARTE",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "ZEBALLOS",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "CAMEJO",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "FLEITAS",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "INZAURRALDE",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "NIETO",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "RIVERO",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "SILVEIRA",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "RODRÍGUEZ",
          "starter": false
        }
      ]
    },
    {
      "id": "liverpool",
      "name": "Liverpool",
      "shortName": "LIV",
      "classicRivalId": "wanderers",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-liverpool\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#0a3c8f\"/><g clip-path=\"url(#b-liverpool)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#0a3c8f",
        "c2": "#111111",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#ffffff",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#0a3c8f",
          "c2": "#111111"
        },
        "flags": {
          "n": 2,
          "c1": "#0a3c8f",
          "c2": "#111111"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "JAURÉS",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "MACHADO",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "PAIVA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "SUÁREZ",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "VIERA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "AGUIRRE",
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
          "name": "GRANDI",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "LEITES",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "ORTIZ",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "SALDAÑA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "MUÑOZ",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "CABRERA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "GONZÁLEZ",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "BENÍTEZ",
          "starter": false
        }
      ]
    },
    {
      "id": "wanderers",
      "name": "Montevideo Wanderers",
      "shortName": "WAN",
      "classicRivalId": "liverpool",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-wanderers\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#ffffff\"/><g clip-path=\"url(#b-wanderers)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#ffffff",
        "c2": "#111111",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#0a3c8f",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#111111"
        },
        "flags": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#111111"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "QUEIROLO",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "TECHERA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "YAPUR",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "BRUNO",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "ECHEVERRÍA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "HARRETCHE",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "MORALES",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "PINTOS",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "TABÁREZ",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "FERREIRA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "PEREIRA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "SOSA",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "MÉNDEZ",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "RAMOS",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "PEREYRA",
          "starter": false
        }
      ]
    },
    {
      "id": "cerro",
      "name": "Cerro",
      "shortName": "CER",
      "classicRivalId": "racing_uru",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-cerro\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#5bc2e7\"/><g clip-path=\"url(#b-cerro)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#5bc2e7",
        "c2": "#ffffff",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#0a3c8f",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#5bc2e7",
          "c2": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#5bc2e7",
          "c2": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "ZEBALLOS",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "CAMEJO",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "FLEITAS",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "INZAURRALDE",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "NIETO",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "RIVERO",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "SILVEIRA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "RODRÍGUEZ",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "MARTÍNEZ",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "ACOSTA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "TORRES",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "VARELA",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "CORREA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "CARDOZO",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "FRANCO",
          "starter": false
        }
      ]
    },
    {
      "id": "racing_uru",
      "name": "Racing (Montevideo)",
      "shortName": "RAC",
      "classicRivalId": "cerro",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-racing_uru\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#007a33\"/><g clip-path=\"url(#b-racing_uru)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#007a33",
        "c2": "#ffffff",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#ffffff",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#007a33",
          "c2": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#007a33",
          "c2": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "GRANDI",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "LEITES",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "ORTIZ",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "SALDAÑA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "MUÑOZ",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "CABRERA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "GONZÁLEZ",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "BENÍTEZ",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "CASTRO",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "LEMOS",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "ALMADA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "DELGADO",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "GADEA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "JAURÉS",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "MACHADO",
          "starter": false
        }
      ]
    },
    {
      "id": "boston_river",
      "name": "Boston River",
      "shortName": "BOS",
      "classicRivalId": "city_torque",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-boston_river\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#007a33\"/><g clip-path=\"url(#b-boston_river)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#007a33",
        "c2": "#e30613",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#ffffff",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#007a33",
          "c2": "#e30613"
        },
        "flags": {
          "n": 2,
          "c1": "#007a33",
          "c2": "#e30613"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "PINTOS",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "TABÁREZ",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "FERREIRA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "PEREIRA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "SOSA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "MÉNDEZ",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "RAMOS",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "PEREYRA",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "BARRIOS",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "ESTÉVEZ",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "HERNÁNDEZ",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "KOLLER",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "NÚÑEZ",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "QUEIROLO",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "TECHERA",
          "starter": false
        }
      ]
    },
    {
      "id": "city_torque",
      "name": "Montevideo City Torque",
      "shortName": "MCT",
      "classicRivalId": "boston_river",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-city_torque\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#5bc2e7\"/><g clip-path=\"url(#b-city_torque)\"><polygon points=\"32.0,20.0 34.9,28.0 43.4,28.3 36.8,33.5 39.1,41.7 32.0,37.0 24.9,41.7 27.2,33.5 20.6,28.3 29.1,28.0\" fill=\"#ffffff\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 1,
        "c1": "#5bc2e7",
        "st": "v1"
      },
      "kitAway": {
        "n": 1,
        "c1": "#0b1f3a",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 1,
          "c1": "#5bc2e7"
        },
        "flags": {
          "n": 1,
          "c1": "#5bc2e7"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "RODRÍGUEZ",
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
          "name": "ACOSTA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "TORRES",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "VARELA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "CORREA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "CARDOZO",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "FRANCO",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "IGLESIAS",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "LÓPEZ",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "OLIVERA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "REYES",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "URIARTE",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "ZEBALLOS",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "CAMEJO",
          "starter": false
        }
      ]
    },
    {
      "id": "progreso",
      "name": "Progreso",
      "shortName": "PRO",
      "classicRivalId": "central_espanol",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-progreso\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#f6c600\"/><g clip-path=\"url(#b-progreso)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#f6c600",
        "c2": "#e30613",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#ffffff",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#f6c600",
          "c2": "#e30613"
        },
        "flags": {
          "n": 2,
          "c1": "#f6c600",
          "c2": "#e30613"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "BENÍTEZ",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "CASTRO",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "LEMOS",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "ALMADA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "DELGADO",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "GADEA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "JAURÉS",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "MACHADO",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "PAIVA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "SUÁREZ",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "VIERA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "AGUIRRE",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "DÍAZ",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "GRANDI",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "LEITES",
          "starter": false
        }
      ]
    },
    {
      "id": "central_espanol",
      "name": "Central Español",
      "shortName": "CES",
      "classicRivalId": "progreso",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-central_espanol\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#e30613\"/><g clip-path=\"url(#b-central_espanol)\"><rect x=\"21.33\" y=\"0\" width=\"21.34\" height=\"64\" fill=\"#0a3c8f\"/><rect x=\"42.67\" y=\"0\" width=\"21.33\" height=\"64\" fill=\"#f6c600\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 3,
        "c1": "#e30613",
        "c2": "#0a3c8f",
        "c3": "#f6c600",
        "st": "bv"
      },
      "kitAway": {
        "n": 1,
        "c1": "#ffffff",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 3,
          "c1": "#e30613",
          "c2": "#0a3c8f",
          "c3": "#f6c600"
        },
        "flags": {
          "n": 3,
          "c1": "#e30613",
          "c2": "#0a3c8f",
          "c3": "#f6c600"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "PEREYRA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "BARRIOS",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "ESTÉVEZ",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "HERNÁNDEZ",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "KOLLER",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "NÚÑEZ",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "QUEIROLO",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "TECHERA",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "YAPUR",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "BRUNO",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "ECHEVERRÍA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "HARRETCHE",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "MORALES",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "PINTOS",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "TABÁREZ",
          "starter": false
        }
      ]
    },
    {
      "id": "cerro_largo",
      "name": "Cerro Largo",
      "shortName": "CLA",
      "classicRivalId": "juventud",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-cerro_largo\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#0a3c8f\"/><g clip-path=\"url(#b-cerro_largo)\"><rect x=\"0\" y=\"26.5\" width=\"64\" height=\"11\" fill=\"#ffffff\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#0a3c8f",
        "c2": "#ffffff",
        "st": "h1"
      },
      "kitAway": {
        "n": 1,
        "c1": "#ffffff",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#0a3c8f",
          "c2": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#0a3c8f",
          "c2": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "FRANCO",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "IGLESIAS",
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
          "name": "OLIVERA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "REYES",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "URIARTE",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "ZEBALLOS",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "CAMEJO",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "FLEITAS",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "INZAURRALDE",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "NIETO",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "RIVERO",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "SILVEIRA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "RODRÍGUEZ",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "MARTÍNEZ",
          "starter": false
        }
      ]
    },
    {
      "id": "juventud",
      "name": "Juventud (Las Piedras)",
      "shortName": "JUV",
      "classicRivalId": "cerro_largo",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-juventud\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#004b9b\"/><g clip-path=\"url(#b-juventud)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#004b9b",
        "c2": "#ffffff",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#0b1f3a",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#004b9b",
          "c2": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#004b9b",
          "c2": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "MACHADO",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "PAIVA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "SUÁREZ",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "VIERA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "AGUIRRE",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "DÍAZ",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "GRANDI",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "LEITES",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "ORTIZ",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "SALDAÑA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "MUÑOZ",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "CABRERA",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "GONZÁLEZ",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "BENÍTEZ",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "CASTRO",
          "starter": false
        }
      ]
    },
    {
      "id": "maldonado",
      "name": "Deportivo Maldonado",
      "shortName": "MAL",
      "classicRivalId": "albion",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-maldonado\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#007a33\"/><g clip-path=\"url(#b-maldonado)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#e30613\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#007a33",
        "c2": "#e30613",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#ffffff",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#007a33",
          "c2": "#e30613"
        },
        "flags": {
          "n": 2,
          "c1": "#007a33",
          "c2": "#e30613"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "TECHERA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "YAPUR",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "BRUNO",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "ECHEVERRÍA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "HARRETCHE",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "MORALES",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "PINTOS",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "TABÁREZ",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "FERREIRA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "PEREIRA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "SOSA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "MÉNDEZ",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "RAMOS",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "PEREYRA",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "BARRIOS",
          "starter": false
        }
      ]
    },
    {
      "id": "albion",
      "name": "Albion",
      "shortName": "ALB",
      "classicRivalId": "maldonado",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-albion\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#e30613\"/><g clip-path=\"url(#b-albion)\"><rect x=\"32\" y=\"0\" width=\"32\" height=\"64\" fill=\"#0a3c8f\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#e30613",
        "c2": "#0a3c8f",
        "st": "mv"
      },
      "kitAway": {
        "n": 1,
        "c1": "#ffffff",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#e30613",
          "c2": "#0a3c8f"
        },
        "flags": {
          "n": 2,
          "c1": "#e30613",
          "c2": "#0a3c8f"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "CAMEJO",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "FLEITAS",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "INZAURRALDE",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "NIETO",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "RIVERO",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "SILVEIRA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "RODRÍGUEZ",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "MARTÍNEZ",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "ACOSTA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "DEF",
          "name": "TORRES",
          "starter": false
        },
        {
          "number": 6,
          "pos": "MID",
          "name": "VARELA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "CORREA",
          "starter": false
        },
        {
          "number": 20,
          "pos": "MID",
          "name": "CARDOZO",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "FRANCO",
          "starter": false
        },
        {
          "number": 19,
          "pos": "FWD",
          "name": "IGLESIAS",
          "starter": false
        }
      ]
    }
  ];

  var CLASSIC_PAIRS = [["nacional", "penarol"], ["danubio", "defensor"], ["liverpool", "wanderers"], ["cerro", "racing_uru"], ["boston_river", "city_torque"], ["central_espanol", "progreso"], ["cerro_largo", "juventud"], ["albion", "maldonado"]];

  function getTeam(id) {
    for (var i = 0; i < TEAMS.length; i++) if (TEAMS[i].id === id) return TEAMS[i];
    return null;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var byId = {};
  TEAMS.forEach(function (t) { byId[t.id] = t; });

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

  global.LIGA_URUGUAY_DATA = {
    country: { id: "UY", name: "Uruguay", flag: "\uD83C\uDDFA\uD83C\uDDFE" },
    league: { id: "uruguaya", name: "Liga AUF Uruguaya", teams: 16, zones: 1, fechas: 15, playoffs: true },
    CLASSIC_PAIRS: CLASSIC_PAIRS,
    teams: TEAMS,
    getTeam: getTeam,
    generarZonasAleatorias: generarZonasAleatorias,
    resolverPlantelCancha: resolverPlantelCancha,
    aplicarPlantelABots: aplicarPlantelABots
  };
})(typeof window !== "undefined" ? window : globalThis);
