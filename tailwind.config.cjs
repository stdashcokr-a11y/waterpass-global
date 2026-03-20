"use strict";

const path = require("path");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        "deep-blue": "#003366",
        "tech-charcoal": "#333333",
        "graphene-black": "#1A1A1A",
        "water-blue": "#00AEEF",
      },
    },
  },
  plugins: [],
};
