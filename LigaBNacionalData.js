(function (global) {
  "use strict";

  var TEAMS = [
    {
      "id": "chacarita",
      "name": "Chacarita Juniors",
      "shortName": "CHA",
      "classicRivalId": "atlanta",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-chacarita\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#e30613\"/><g clip-path=\"url(#b-chacarita)\"><rect x=\"7.11\" y=\"0\" width=\"7.16\" height=\"64\" fill=\"#111111\"/><rect x=\"14.22\" y=\"0\" width=\"7.16\" height=\"64\" fill=\"#ffffff\"/><rect x=\"28.44\" y=\"0\" width=\"7.16\" height=\"64\" fill=\"#111111\"/><rect x=\"35.56\" y=\"0\" width=\"7.16\" height=\"64\" fill=\"#ffffff\"/><rect x=\"49.78\" y=\"0\" width=\"7.16\" height=\"64\" fill=\"#111111\"/><rect x=\"56.89\" y=\"0\" width=\"7.16\" height=\"64\" fill=\"#ffffff\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 3,
        "c1": "#e30613",
        "c2": "#111111",
        "c3": "#ffffff",
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
          "n": 3,
          "c1": "#d6001c",
          "c2": "#111111",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#d6001c",
          "c2": "#111111",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "LOBO",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "FERNÁNDEZ",
          "starter": true
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "GAITÁN",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "VILLALBA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "RÍOS",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "CUELLO",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "MONTENEGRO",
          "starter": false
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "PEREYRA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "SOSA",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "QUIROGA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "ACOSTA",
          "starter": false
        },
        {
          "number": 14,
          "pos": "MID",
          "name": "BENÍTEZ",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "LUNA",
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
          "name": "MAIDANA",
          "starter": false
        }
      ]
    },
    {
      "id": "atlanta",
      "name": "Atlanta",
      "shortName": "ATL",
      "classicRivalId": "chacarita",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-atlanta\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#ffd400\"/><g clip-path=\"url(#b-atlanta)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0b3d91\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0b3d91\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0b3d91\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0b3d91\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0b3d91\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#f6c600",
        "c2": "#0a3c8f",
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
          "n": 3,
          "c1": "#ffd400",
          "c2": "#0b3d91",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#ffd400",
          "c2": "#0b3d91",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "GIORDANO",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "CABRERA",
          "starter": true
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "ORTIGOZA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "MANSILLA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "PERALTA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "BOGADO",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "IBARRA",
          "starter": false
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "DOMÍNGUEZ",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "AGUIRRE",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "NAVARRO",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "ROLÓN",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "TORRES",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "SCHMIDT",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "CARDOZO",
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
      "id": "chicago",
      "name": "Nueva Chicago",
      "shortName": "CHI",
      "classicRivalId": "allboys",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-chicago\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#0a8a3c\"/><g clip-path=\"url(#b-chicago)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#0a8f3c",
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
          "n": 3,
          "c1": "#0a8a3c",
          "c2": "#111111",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#0a8a3c",
          "c2": "#111111",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "BARRIOS",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "ZÁRATE",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "MEDINA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "FRETES",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "CÁCERES",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "CHÁVEZ",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "ROJAS",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "PAZ",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "SALVATIERRA",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "NÚÑEZ",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "GODOY",
          "starter": false
        },
        {
          "number": 14,
          "pos": "MID",
          "name": "RAMÍREZ",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "LENCINA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "BUSTOS",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "SANDOVAL",
          "starter": false
        }
      ]
    },
    {
      "id": "allboys",
      "name": "All Boys",
      "shortName": "ALL",
      "classicRivalId": "chicago",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-allboys\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#ffffff\"/><g clip-path=\"url(#b-allboys)\"><rect x=\"0\" y=\"26.5\" width=\"64\" height=\"11\" fill=\"#111111\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#ffffff",
        "c2": "#111111",
        "st": "h1"
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
          "c2": "#111111",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#111111",
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
          "name": "VERA",
          "starter": true
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "CORTÉS",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "PIZARRO",
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
          "name": "FERREYRA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "MOLINA",
          "starter": false
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "ESCOBAR",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "AYALA",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "CORREA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "SILVA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "HERRERA",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "DUARTE",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "FRANCO",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "OJEDA",
          "starter": false
        }
      ]
    },
    {
      "id": "ferro",
      "name": "Ferro Carril Oeste",
      "shortName": "FER",
      "classicRivalId": "almagro",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-ferro\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#0a8a3c\"/><g clip-path=\"url(#b-ferro)\"><rect x=\"0\" y=\"26.5\" width=\"64\" height=\"11\" fill=\"#ffffff\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 1,
        "c1": "#007a33",
        "st": "v1"
      },
      "kitAway": {
        "n": 2,
        "c1": "#ffffff",
        "c2": "#007a33",
        "st": "h1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#0a8a3c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#0a8a3c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "SEQUEIRA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "LEDESMA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "BRITOS",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "CARDOZO",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "ALVARENGA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "MALDONADO",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "PEREIRA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "LUCERO",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "TOLEDO",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "BARRIENTOS",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "GÓMEZ",
          "starter": false
        },
        {
          "number": 14,
          "pos": "MID",
          "name": "IBÁÑEZ",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "SORIA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "VILLAGRA",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "CABRAL",
          "starter": false
        }
      ]
    },
    {
      "id": "almagro",
      "name": "Almagro",
      "shortName": "ALM",
      "classicRivalId": "ferro",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-almagro\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#004b9b\"/><g clip-path=\"url(#b-almagro)\"><rect x=\"7.11\" y=\"0\" width=\"7.16\" height=\"64\" fill=\"#111111\"/><rect x=\"14.22\" y=\"0\" width=\"7.16\" height=\"64\" fill=\"#ffffff\"/><rect x=\"28.44\" y=\"0\" width=\"7.16\" height=\"64\" fill=\"#111111\"/><rect x=\"35.56\" y=\"0\" width=\"7.16\" height=\"64\" fill=\"#ffffff\"/><rect x=\"49.78\" y=\"0\" width=\"7.16\" height=\"64\" fill=\"#111111\"/><rect x=\"56.89\" y=\"0\" width=\"7.16\" height=\"64\" fill=\"#ffffff\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 3,
        "c1": "#004b9b",
        "c2": "#111111",
        "c3": "#ffffff",
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
          "name": "PERALTA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "CUESTA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "MARCHESÍN",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "SÁNCHEZ",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "BAZÁN",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "VÁZQUEZ",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "LEIVA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "OLIVERA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "MUÑOZ",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "QUINTEROS",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "ARANDA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "SBRISSA",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "CARRIZO",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "PALAVECINO",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "MOREYRA",
          "starter": false
        }
      ]
    },
    {
      "id": "quilmes",
      "name": "Quilmes",
      "shortName": "QUI",
      "classicRivalId": "temperley",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-quilmes\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#ffffff\"/><g clip-path=\"url(#b-quilmes)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0b1f3a\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0b1f3a\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0b1f3a\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0b1f3a\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0b1f3a\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 1,
        "c1": "#ffffff",
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
          "n": 2,
          "c1": "#ffffff",
          "c2": "#6ec6f0",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#6ec6f0",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "BOLOGNA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "CÁCERES",
          "starter": true
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "CABRERA",
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
          "name": "LUGO",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "JARA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "PAREDES",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "FONTANA",
          "starter": false
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "MARTÍNEZ",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "VALDEZ",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "OROZ",
          "starter": false
        },
        {
          "number": 14,
          "pos": "MID",
          "name": "SEGOVIA",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "ACEVEDO",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "CABRERA FIORI",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "MENA",
          "starter": false
        }
      ]
    },
    {
      "id": "temperley",
      "name": "Temperley",
      "shortName": "TEM",
      "classicRivalId": "quilmes",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-temperley\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#6ec6f0\"/><g clip-path=\"url(#b-temperley)\"><rect x=\"32\" y=\"0\" width=\"32\" height=\"64\" fill=\"#ffffff\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 1,
        "c1": "#5bc2e7",
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
          "n": 2,
          "c1": "#6ec6f0",
          "c2": "#ffffff",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#6ec6f0",
          "c2": "#ffffff",
          "c3": "#ffffff"
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
          "name": "SALTO",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "BRÍTEZ",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "OLIVARES",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "ROSALES",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "SOSA",
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
          "name": "REYNOSO",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "ZALAZAR",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "HEREDIA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "ALTAMIRANO",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "PINO",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "MACIEL",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "ESCALANTE",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "RUIZ DÍAZ",
          "starter": false
        }
      ]
    },
    {
      "id": "moron",
      "name": "Deportivo Morón",
      "shortName": "MOR",
      "classicRivalId": "sanmiguel",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-moron\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#ffffff\"/><g clip-path=\"url(#b-moron)\"><rect x=\"0\" y=\"26.5\" width=\"64\" height=\"11\" fill=\"#d6001c\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#ffffff",
        "c2": "#e30613",
        "st": "h1"
      },
      "kitAway": {
        "n": 1,
        "c1": "#e30613",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#d6001c",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#d6001c",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "SERVETTO",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "LEDESMA",
          "starter": true
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "PERALTA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "AGUILAR",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "MENDOZA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "LEZCANO",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "FERNÁNDEZ",
          "starter": false
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "RAMOS",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "CUEVAS",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "BARRAZA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "VALLEJOS",
          "starter": false
        },
        {
          "number": 14,
          "pos": "MID",
          "name": "CORONEL",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "PONCE",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "QUIROZ",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "SENA",
          "starter": false
        }
      ]
    },
    {
      "id": "sanmiguel",
      "name": "San Miguel",
      "shortName": "SMI",
      "classicRivalId": "moron",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-sanmiguel\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#007a33\"/><g clip-path=\"url(#b-sanmiguel)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#007a33",
        "c2": "#ffffff",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#004d22",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 3,
          "c1": "#0b3d91",
          "c2": "#ffd400",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#0b3d91",
          "c2": "#ffd400",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "PELLEGRINO",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "TAPIA",
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
          "name": "RIVAS",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "NÚÑEZ",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "ALMIRÓN",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "CUELLO",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "BRAVO",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "JUÁREZ",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "DOMÍNGUEZ",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "ORELLANA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "PALACIOS",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "SANDOVAL",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "ARCE",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "BENÍTEZ",
          "starter": false
        }
      ]
    },
    {
      "id": "colon",
      "name": "Colón (Santa Fe)",
      "shortName": "COL",
      "classicRivalId": "patronato",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-colon\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#e30613\"/><g clip-path=\"url(#b-colon)\"><rect x=\"32\" y=\"0\" width=\"32\" height=\"64\" fill=\"#111111\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#e30613",
        "c2": "#111111",
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
          "n": 3,
          "c1": "#d6001c",
          "c2": "#111111",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#d6001c",
          "c2": "#111111",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "BURIÁN",
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
          "name": "MEZA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "PÉREZ",
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
          "name": "FARÍAS",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "WEIGANDT",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "GARCÉS",
          "starter": false
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "BIANCHI",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "ALCARAZ",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "RODRÍGUEZ",
          "starter": false
        },
        {
          "number": 14,
          "pos": "MID",
          "name": "ESCOBAR",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "LÉRTORA",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "BERNARDI",
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
      "id": "patronato",
      "name": "Patronato",
      "shortName": "PAT",
      "classicRivalId": "colon",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-patronato\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#e30613\"/><g clip-path=\"url(#b-patronato)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#e30613",
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
          "n": 3,
          "c1": "#d6001c",
          "c2": "#111111",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#d6001c",
          "c2": "#111111",
          "c3": "#ffffff"
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
          "name": "GALEANO",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "FERREYRA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "MARTÍNEZ",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "BONIFACIO",
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
          "name": "ALÍ",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "DÍAZ",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "CARRASCO",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "SILVERA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "CABRERA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "QUIROGA",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "CASTRO",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "SOÑORA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "CHAVARRÍA",
          "starter": false
        }
      ]
    },
    {
      "id": "sanmartin_tuc",
      "name": "San Martín (Tucumán)",
      "shortName": "SMT",
      "classicRivalId": "gimnasia_jujuy",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-sanmartin_tuc\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#d6001c\"/><g clip-path=\"url(#b-sanmartin_tuc)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#e30613",
        "c2": "#ffffff",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#e30613",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#d6001c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#d6001c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "ARDILES",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "LENCINA",
          "starter": true
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "OSORES",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "RODRÍGUEZ",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "TOLEDO",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "ROJAS",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "CABRERA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "HEREDIA",
          "starter": false
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "GARNICA",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "MEDINA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "BARBIERI",
          "starter": false
        },
        {
          "number": 14,
          "pos": "MID",
          "name": "AGUIRRE",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "SOSA",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "MENDOZA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "IBÁÑEZ",
          "starter": false
        }
      ]
    },
    {
      "id": "gimnasia_jujuy",
      "name": "Gimnasia y Esgrima (Jujuy)",
      "shortName": "GEJ",
      "classicRivalId": "sanmartin_tuc",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-gimnasia_jujuy\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#ffffff\"/><g clip-path=\"url(#b-gimnasia_jujuy)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#6ec6f0\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#6ec6f0\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#6ec6f0\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#6ec6f0\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#6ec6f0\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#5bc2e7",
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
          "c1": "#ffffff",
          "c2": "#6ec6f0",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#6ec6f0",
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
          "name": "VEGA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "GÓMEZ",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "ALANCAY",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "CRUZ",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "CAÑETE",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "CHOQUE",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "TOLABA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "MACHACA",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "GUZMÁN",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "VILCA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "PÉREZ",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "FLORES",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "COLQUE",
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
      "id": "godoy_cruz",
      "name": "Godoy Cruz",
      "shortName": "GOD",
      "classicRivalId": "sanmartin_sj",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-godoy_cruz\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#0b3d91\"/><g clip-path=\"url(#b-godoy_cruz)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#0a3c8f",
        "c2": "#ffffff",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#0a1a33",
        "st": "v1"
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
          "name": "PETROLI",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "ARCE",
          "starter": true
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "BRUNO",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "RODRÍGUEZ",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "OJEDA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "RAMÍREZ",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "PARDO",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "CAÑETE",
          "starter": false
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "CRUZ",
          "starter": false
        },
        {
          "number": 13,
          "pos": "DEF",
          "name": "ZAPATA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "RIVERO",
          "starter": false
        },
        {
          "number": 14,
          "pos": "MID",
          "name": "GÓMEZ",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "BUSTOS",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "QUINTANA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "VALENZUELA",
          "starter": false
        }
      ]
    },
    {
      "id": "sanmartin_sj",
      "name": "San Martín (San Juan)",
      "shortName": "SMS",
      "classicRivalId": "godoy_cruz",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-sanmartin_sj\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#0a8a3c\"/><g clip-path=\"url(#b-sanmartin_sj)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#007a33",
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
          "n": 3,
          "c1": "#0a8a3c",
          "c2": "#111111",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#0a8a3c",
          "c2": "#111111",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "IBÁÑEZ",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "FERRARI",
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
          "name": "BAZÁN",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "GIL",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "QUIROGA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "VIDELA",
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
          "name": "PÉREZ",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "AGUILERA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "ROJAS",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "ONTIVERO",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "MOYANO",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "OVIEDO",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "NAVARRO",
          "starter": false
        }
      ]
    },
    {
      "id": "almirante",
      "name": "Almirante Brown",
      "shortName": "ABR",
      "classicRivalId": "tristan_suarez",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-almirante\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#ffd400\"/><g clip-path=\"url(#b-almirante)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#f6c600",
        "c2": "#111111",
        "st": "vs"
      },
      "kitAway": {
        "n": 1,
        "c1": "#111111",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 3,
          "c1": "#ffd400",
          "c2": "#111111",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#ffd400",
          "c2": "#111111",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "SEQUEIRA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "LUNA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "ESPÍNDOLA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "CABRERA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "ROMERO",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "ESQUIVEL",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "AYALA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "LEIVA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "RUIZ",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "VILLARREAL",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "FLORES",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "ACOSTA",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "OLMEDO",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "GIMÉNEZ",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "PEREYRA",
          "starter": false
        }
      ]
    },
    {
      "id": "tristan_suarez",
      "name": "Tristán Suárez",
      "shortName": "TRI",
      "classicRivalId": "almirante",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-tristan_suarez\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#0b3d91\"/><g clip-path=\"url(#b-tristan_suarez)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
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
          "name": "ZÁRATE",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "MANSILLA",
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
          "name": "DUARTE",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "VÁZQUEZ",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "SANABRIA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "ROLÓN",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "CUENCA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "LEDESMA",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "PEÑA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "MAIDANA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "INSAURRALDE",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "GODOY",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "ARÉVALO",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "CAÑETE",
          "starter": false
        }
      ]
    },
    {
      "id": "agropecuario",
      "name": "Agropecuario",
      "shortName": "AGR",
      "classicRivalId": "defensores",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-agropecuario\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#007a33\"/><g clip-path=\"url(#b-agropecuario)\"><rect x=\"32\" y=\"0\" width=\"32\" height=\"64\" fill=\"#e30613\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#007a33",
        "c2": "#e30613",
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
          "c1": "#d6001c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#d6001c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "PÉREZ",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "CUELLO",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "MALDONADO",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "FERNÁNDEZ",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "ROLÓN",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "QUIROGA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "ORTIZ",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "BASUALDO",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "IBARRA",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "SANDEZ",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "CABRERA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "VILLALBA",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "LUNA",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "RUIZ",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "SOSA",
          "starter": false
        }
      ]
    },
    {
      "id": "defensores",
      "name": "Defensores de Belgrano",
      "shortName": "DEF",
      "classicRivalId": "agropecuario",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-defensores\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#111111\"/><g clip-path=\"url(#b-defensores)\"><rect x=\"0\" y=\"0\" width=\"64\" height=\"5.33\" fill=\"#d6001c\"/><rect x=\"0\" y=\"10.67\" width=\"64\" height=\"5.33\" fill=\"#d6001c\"/><rect x=\"0\" y=\"21.34\" width=\"64\" height=\"5.33\" fill=\"#d6001c\"/><rect x=\"0\" y=\"32.01\" width=\"64\" height=\"5.33\" fill=\"#d6001c\"/><rect x=\"0\" y=\"42.68\" width=\"64\" height=\"5.33\" fill=\"#d6001c\"/><rect x=\"0\" y=\"53.35\" width=\"64\" height=\"5.33\" fill=\"#d6001c\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#e30613",
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
          "n": 3,
          "c1": "#111111",
          "c2": "#d6001c",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#111111",
          "c2": "#d6001c",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "LEDESMA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "AGUIRRE",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "BUSTOS",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "RAMÍREZ",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "GÓMEZ",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "CASTRO",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "TORRES",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "CORONEL",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "VERA",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "PERALTA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "MEDINA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "OJEDA",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "ROJAS",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "DUARTE",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "BENÍTEZ",
          "starter": false
        }
      ]
    },
    {
      "id": "chaco_forever",
      "name": "Chaco For Ever",
      "shortName": "CFE",
      "classicRivalId": "mitre",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-chaco_forever\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#111111\"/><g clip-path=\"url(#b-chaco_forever)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#ffffff",
        "c2": "#111111",
        "st": "vs"
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
          "name": "BRITEZ",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "AYALA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "CÁCERES",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "VILLALBA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "ROMERO",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "GIMÉNEZ",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "ACOSTA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "FERNÁNDEZ",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "RÍOS",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "MEZA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "BÁEZ",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "INSFRÁN",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "DUARTE",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "CARDOZO",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "VALLEJOS",
          "starter": false
        }
      ]
    },
    {
      "id": "mitre",
      "name": "Mitre (SdE)",
      "shortName": "MIT",
      "classicRivalId": "chaco_forever",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-mitre\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#ffd400\"/><g clip-path=\"url(#b-mitre)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#111111\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
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
          "n": 3,
          "c1": "#ffd400",
          "c2": "#111111",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#ffd400",
          "c2": "#111111",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "SEQUEIRA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "LUGO",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "CARABAJAL",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "CORONEL",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "PALAVECINO",
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
          "name": "PAZ",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "LEIVA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "LEDESMA",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "JUÁREZ",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "GEREZ",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "HERRERA",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "SANTILLÁN",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "ALDERETE",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "ROJAS",
          "starter": false
        }
      ]
    },
    {
      "id": "guemes",
      "name": "Güemes (SdE)",
      "shortName": "GUE",
      "classicRivalId": "gimnasia_salta",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-guemes\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#0a3c8f\"/><g clip-path=\"url(#b-guemes)\"><rect x=\"32\" y=\"0\" width=\"32\" height=\"64\" fill=\"#e30613\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#0a3c8f",
        "c2": "#e30613",
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
          "name": "MONTENEGRO",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "SUÁREZ",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "IBÁÑEZ",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "CARRIZO",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "LUCERO",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "SÁNCHEZ",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "BARRAZA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "NAVARRO",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "TOLEDO",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "GRAMAJO",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "FIGUEROA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "ROLDÁN",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "RODRÍGUEZ",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "SORIA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "PÁEZ",
          "starter": false
        }
      ]
    },
    {
      "id": "gimnasia_salta",
      "name": "Gimnasia y Tiro (Salta)",
      "shortName": "GTS",
      "classicRivalId": "guemes",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-gimnasia_salta\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#ffffff\"/><g clip-path=\"url(#b-gimnasia_salta)\"><rect x=\"32\" y=\"0\" width=\"32\" height=\"64\" fill=\"#6ec6f0\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#ffffff",
        "c2": "#5bc2e7",
        "st": "dg"
      },
      "kitAway": {
        "n": 1,
        "c1": "#0a1a33",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#6ec6f0",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#6ec6f0",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "VILLEGAS",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "ZERPA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "CRUZ",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "ARAMAYO",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "COLQUE",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "MAMANÍ",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "GUTIÉRREZ",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "TAPIA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "VILTE",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "CABANA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "ARJONA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "GUAYMÁS",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "SALVA",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "CHOQUE",
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
      "id": "central_norte",
      "name": "Central Norte (Salta)",
      "shortName": "CNO",
      "classicRivalId": "alvarado",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-central_norte\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#111111\"/><g clip-path=\"url(#b-central_norte)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 1,
        "c1": "#111111",
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
          "name": "ORELLANA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "CARDOZO",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "MENDOZA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "ÁVILA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "NIEVA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "ORTEGA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "QUISPE",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "LAMAS",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "PASTRANA",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "TORRES",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "PALACIOS",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "VILLAGRÁN",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "CUELLAR",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "GÓMEZ",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "BURGOS",
          "starter": false
        }
      ]
    },
    {
      "id": "alvarado",
      "name": "Alvarado",
      "shortName": "ALV",
      "classicRivalId": "central_norte",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-alvarado\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#004b9b\"/><g clip-path=\"url(#b-alvarado)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
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
          "c1": "#d6001c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#d6001c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "SORIA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "PEDRAZA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "RIVERO",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "SBUTTONI",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "CABRERA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "MAIDANA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "FERNÁNDEZ",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "LEDESMA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "ARRIETA",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "MORENO",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "SILVA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "DOMÍNGUEZ",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "BILBAO",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "PEREYRA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "CUEVAS",
          "starter": false
        }
      ]
    },
    {
      "id": "racing_cba",
      "name": "Racing (Córdoba)",
      "shortName": "RCC",
      "classicRivalId": "maipu",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-racing_cba\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#6ec6f0\"/><g clip-path=\"url(#b-racing_cba)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#5bc2e7",
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
          "c1": "#6ec6f0",
          "c2": "#ffffff",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#6ec6f0",
          "c2": "#ffffff",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "GABARINI",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "FERREYRA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "OVIEDO",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "LUCERO",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "BUSTAMANTE",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "VERA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "AGUIRRE",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "HEREDIA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "MORALES",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "CARRANZA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "BRITOS",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "ALLENDE",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "OLMEDO",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "RIVAROLA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "QUIROGA",
          "starter": false
        }
      ]
    },
    {
      "id": "maipu",
      "name": "Deportivo Maipú",
      "shortName": "MAI",
      "classicRivalId": "racing_cba",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-maipu\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#e30613\"/><g clip-path=\"url(#b-maipu)\"><polygon points=\"0,0 18,0 64,46 64,64 46,64 0,18\" fill=\"#ffffff\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#e30613",
        "c2": "#ffffff",
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
          "c2": "#d6001c",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#d6001c",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "IÑIGUEZ",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "VIDELA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "PÉREZ",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "ZÁRATE",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "MOLINA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "GAITÁN",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "CUELLO",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "FUNES",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "ABALLAY",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "ROJAS",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "GODOY",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "MANZUR",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "ONTIVEROS",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "PERALTA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "BUSTOS",
          "starter": false
        }
      ]
    },
    {
      "id": "san_telmo",
      "name": "San Telmo",
      "shortName": "STE",
      "classicRivalId": "arsenal",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-san_telmo\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#5bc2e7\"/><g clip-path=\"url(#b-san_telmo)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0a3c8f\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0a3c8f\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0a3c8f\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0a3c8f\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#0a3c8f\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#5bc2e7",
        "c2": "#0a3c8f",
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
          "n": 3,
          "c1": "#0b3d91",
          "c2": "#ffd400",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#0b3d91",
          "c2": "#ffd400",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "FERRARI",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "CABRAL",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "BRACAMONTE",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "NÚÑEZ",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "VERÓN",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "SANABRIA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "LOMBARDO",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "LEDESMA",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "RAMOS",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "PALACIOS",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "VILLARREAL",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "GÓMEZ",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "FRANCO",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "DUARTE",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "CAÑETE",
          "starter": false
        }
      ]
    },
    {
      "id": "arsenal",
      "name": "Arsenal",
      "shortName": "ARS",
      "classicRivalId": "san_telmo",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-arsenal\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#6ec6f0\"/><g clip-path=\"url(#b-arsenal)\"><rect x=\"32\" y=\"0\" width=\"32\" height=\"64\" fill=\"#d6001c\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#5bc2e7",
        "c2": "#e30613",
        "st": "dg"
      },
      "kitAway": {
        "n": 1,
        "c1": "#0a1a33",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 3,
          "c1": "#6ec6f0",
          "c2": "#d6001c",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#6ec6f0",
          "c2": "#d6001c",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "CAMPISI",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "LEIVA",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "CUESTA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "RODRÍGUEZ",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "HERRERA",
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
          "name": "MANSILLA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "POZZO",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "TORANZO",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "ALARCÓN",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "SOSA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "MENDOZA",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "SPINELLI",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "GIMÉNEZ",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "IBÁÑEZ",
          "starter": false
        }
      ]
    },
    {
      "id": "brown_adrogue",
      "name": "Brown de Adrogué",
      "shortName": "BRO",
      "classicRivalId": "talleres_re",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-brown_adrogue\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#5bc2e7\"/><g clip-path=\"url(#b-brown_adrogue)\"><rect x=\"21.33\" y=\"0\" width=\"21.34\" height=\"64\" fill=\"#e30613\"/><rect x=\"42.67\" y=\"0\" width=\"21.33\" height=\"64\" fill=\"#111111\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 3,
        "c1": "#5bc2e7",
        "c2": "#e30613",
        "c3": "#111111",
        "st": "cb"
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
          "c1": "#ffffff",
          "c2": "#0b3d91",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#ffffff",
          "c2": "#0b3d91",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "GIMÉNEZ",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "ZÁRATE",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "PEREYRA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "OVIEDO",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "FERREYRA",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "OJEDA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "BARRIOS",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "CÁCERES",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "FIGUEROA",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "MEDINA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "AGUIRRE",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "LENCINA",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "SANABRIA",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "CUELLO",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "VILLALBA",
          "starter": false
        }
      ]
    },
    {
      "id": "talleres_re",
      "name": "Talleres (RdE)",
      "shortName": "TRE",
      "classicRivalId": "brown_adrogue",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-talleres_re\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#e30613\"/><g clip-path=\"url(#b-talleres_re)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#e30613",
        "c2": "#ffffff",
        "st": "vs"
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
          "name": "SERVETTO",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "CORONEL",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "PERALTA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "RAMOS",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "BRÍTEZ",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "ACOSTA",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "LUNA",
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
          "name": "BÁEZ",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "LEZCANO",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "MACIEL",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "RIVAS",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "GODOY",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "MENA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "ARÉVALO",
          "starter": false
        }
      ]
    },
    {
      "id": "los_andes",
      "name": "Los Andes",
      "shortName": "LOS",
      "classicRivalId": "colegiales",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-los_andes\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#d6001c\"/><g clip-path=\"url(#b-los_andes)\"><rect x=\"0\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"12.8\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"25.6\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"38.4\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/><rect x=\"51.2\" y=\"0\" width=\"6.4\" height=\"64\" fill=\"#ffffff\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#e30613",
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
          "c1": "#d6001c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#d6001c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "VEGA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "CABRERA",
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
          "name": "SALVATIERRA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "ROLÓN",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "FRETES",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "AYALA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "SANDOVAL",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "PAVÓN",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "QUIROGA",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "DUARTE",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "INSAURRALDE",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "CARRIZO",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "PERALTA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "MALDONADO",
          "starter": false
        }
      ]
    },
    {
      "id": "colegiales",
      "name": "Colegiales",
      "shortName": "COL",
      "classicRivalId": "los_andes",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-colegiales\"><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\"/></clipPath></defs><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"#0a3c8f\"/><g clip-path=\"url(#b-colegiales)\"><rect x=\"21.33\" y=\"0\" width=\"21.34\" height=\"64\" fill=\"#f6c600\"/><rect x=\"42.67\" y=\"0\" width=\"21.33\" height=\"64\" fill=\"#e30613\"/></g><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M8 6h48v26c0 14-10 22-24 28C18 54 8 46 8 32z\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 3,
        "c1": "#0a3c8f",
        "c2": "#f6c600",
        "c3": "#e30613",
        "st": "cb"
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
          "c1": "#0a8a3c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#0a8a3c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "LOBOS",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "AGUILAR",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "ESCOBAR",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "VALLEJOS",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "SUÁREZ",
          "starter": true
        },
        {
          "number": 9,
          "pos": "FWD",
          "name": "CARDOZO",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "PIZARRO",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "BONET",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "CUENCA",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "ORTIZ",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "FRANCO",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "ACEVEDO",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "BENÍTEZ",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "GIMÉNEZ",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "LEIVA",
          "starter": false
        }
      ]
    },
    {
      "id": "madryn",
      "name": "Deportivo Madryn",
      "shortName": "MAD",
      "classicRivalId": "brown_madryn",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-madryn\"><circle cx=\"32\" cy=\"32\" r=\"27\"/></clipPath></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"#f6c600\"/><g clip-path=\"url(#b-madryn)\"><rect x=\"0\" y=\"26.5\" width=\"64\" height=\"11\" fill=\"#111111\"/></g><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#f6c600",
        "c2": "#111111",
        "st": "h1"
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
          "c1": "#0a8a3c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 2,
          "c1": "#0a8a3c",
          "c2": "#ffffff",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "MARTÍNEZ",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "CUEVAS",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "IBARRA",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "QUIROGA",
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
          "name": "MOREL",
          "starter": true
        },
        {
          "number": 12,
          "pos": "GK",
          "name": "PERALTA",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "FERNÁNDEZ",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "CABRERA",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "RUIZ",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "SOSA",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "AGUIRRE",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "HERRERA",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "VILLAGRA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "SALINAS",
          "starter": false
        }
      ]
    },
    {
      "id": "brown_madryn",
      "name": "Guillermo Brown",
      "shortName": "GBM",
      "classicRivalId": "madryn",
      "badgeSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\"><defs><clipPath id=\"b-brown_madryn\"><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\"/></clipPath></defs><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"#ffffff\"/><g clip-path=\"url(#b-brown_madryn)\"><polygon points=\"0,0 18,0 64,46 64,64 46,64 0,18\" fill=\"#0a3c8f\"/></g><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\"/><polygon points=\"32,4 57,18 57,46 32,60 7,46 7,18\" fill=\"none\" stroke=\"#0b1220\" stroke-width=\"1.2\" opacity=\".6\"/></svg>",
      "kitHome": {
        "n": 2,
        "c1": "#ffffff",
        "c2": "#0a3c8f",
        "st": "dg"
      },
      "kitAway": {
        "n": 1,
        "c1": "#0b1f3a",
        "st": "v1"
      },
      "stadium": {
        "enabled": true,
        "seats": {
          "n": 3,
          "c1": "#ffd400",
          "c2": "#111111",
          "c3": "#ffffff"
        },
        "flags": {
          "n": 3,
          "c1": "#ffd400",
          "c2": "#111111",
          "c3": "#ffffff"
        }
      },
      "squad": [
        {
          "number": 1,
          "pos": "GK",
          "name": "FERREYRA",
          "starter": true
        },
        {
          "number": 2,
          "pos": "DEF",
          "name": "BASUALDO",
          "starter": true
        },
        {
          "number": 4,
          "pos": "DEF",
          "name": "PAREDES",
          "starter": true
        },
        {
          "number": 5,
          "pos": "MID",
          "name": "MAIDANA",
          "starter": true
        },
        {
          "number": 8,
          "pos": "MID",
          "name": "LEDESMA",
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
          "name": "GÓMEZ",
          "starter": false
        },
        {
          "number": 3,
          "pos": "DEF",
          "name": "CÁCERES",
          "starter": false
        },
        {
          "number": 6,
          "pos": "DEF",
          "name": "LUCERO",
          "starter": false
        },
        {
          "number": 14,
          "pos": "DEF",
          "name": "TORRES",
          "starter": false
        },
        {
          "number": 10,
          "pos": "MID",
          "name": "ZALAZAR",
          "starter": false
        },
        {
          "number": 15,
          "pos": "MID",
          "name": "CANO",
          "starter": false
        },
        {
          "number": 16,
          "pos": "MID",
          "name": "MIRANDA",
          "starter": false
        },
        {
          "number": 7,
          "pos": "FWD",
          "name": "OJEDA",
          "starter": false
        },
        {
          "number": 11,
          "pos": "FWD",
          "name": "PEREYRA",
          "starter": false
        }
      ]
    }
  ];

  var CLASSIC_PAIRS = [
    [
      "chacarita",
      "atlanta"
    ],
    [
      "chicago",
      "allboys"
    ],
    [
      "ferro",
      "almagro"
    ],
    [
      "quilmes",
      "temperley"
    ],
    [
      "moron",
      "sanmiguel"
    ],
    [
      "colon",
      "patronato"
    ],
    [
      "sanmartin_tuc",
      "gimnasia_jujuy"
    ],
    [
      "godoy_cruz",
      "sanmartin_sj"
    ],
    [
      "almirante",
      "tristan_suarez"
    ],
    [
      "agropecuario",
      "defensores"
    ],
    [
      "chaco_forever",
      "mitre"
    ],
    [
      "guemes",
      "gimnasia_salta"
    ],
    [
      "central_norte",
      "alvarado"
    ],
    [
      "racing_cba",
      "maipu"
    ],
    [
      "san_telmo",
      "arsenal"
    ],
    [
      "brown_adrogue",
      "talleres_re"
    ],
    [
      "los_andes",
      "colegiales"
    ],
    [
      "madryn",
      "brown_madryn"
    ]
  ];

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

  global.LIGA_BNACIONAL_DATA = {
    country: { id: "AR", name: "Argentina", flag: "\uD83C\uDDE6\uD83C\uDDF7" },
    league: { id: "bnacional", name: "Primera Nacional", teams: 36, zones: 2, fechas: 17, playoffs: true },
    CLASSIC_PAIRS: CLASSIC_PAIRS,
    teams: TEAMS,
    getTeam: getTeam,
    generarZonasAleatorias: generarZonasAleatorias,
    resolverPlantelCancha: resolverPlantelCancha,
    aplicarPlantelABots: aplicarPlantelABots
  };
})(typeof window !== "undefined" ? window : globalThis);
