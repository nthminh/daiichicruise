/* ============================================================
   DAIICHI — cultural themes per language
   vi = brand heritage · en = international minimal · ja = zen washi
   ko = taegeuk modern · zh = festive elegance · fr = élégance
   Applies CSS variables on <html>; reacts to dt:lang.
   ============================================================ */
(function () {
  /* load CJK display fonts once */
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500;600;700&family=Noto+Sans+KR:wght@500;700;800&family=Noto+Serif+SC:wght@500;600;700&display=swap';
  document.head.appendChild(l);

  var VARS = ['--ivory', '--sand', '--line', '--line-2', '--navy', '--navy-800', '--navy-700', '--navy-soft', '--gold', '--gold-bright', '--gold-soft', '--red', '--red-bright', '--red-soft', '--font-display', '--r-sm', '--r-md', '--r-lg', '--accent-bar'];

  var T = {
    /* international minimal — cool neutrals, flat red CTA, sans display */
    en: { '--ivory': '#F6F7F9', '--sand': '#ECEEF2', '--line': '#E1E5EB', '--line-2': '#CCD3DD',
      '--navy': '#1C2533', '--navy-800': '#27313F', '--navy-700': '#33404F', '--navy-soft': '#E8ECF2',
      '--gold': '#5B6B82', '--gold-bright': '#8E9FB8', '--gold-soft': '#E8ECF2',
      '--red': '#D81F2A', '--red-bright': '#E8333E', '--red-soft': '#FCE9EA',
      '--font-display': "'Be Vietnam Pro', system-ui, sans-serif",
      '--r-sm': '10px', '--r-md': '14px', '--r-lg': '18px', '--accent-bar': 'linear-gradient(90deg,#5B6B82,#8E9FB8)' },
    /* zen washi — sumi ink, vermilion, serif, sharp corners */
    ja: { '--ivory': '#F7F4EC', '--sand': '#EFE9DC', '--line': '#E3DCCB', '--line-2': '#D0C7AF',
      '--navy': '#23221E', '--navy-800': '#34322C', '--navy-700': '#45423A', '--navy-soft': '#ECE7DA',
      '--gold': '#8C7B4F', '--gold-bright': '#AD9A6A', '--gold-soft': '#F0EAD8',
      '--red': '#B23A2A', '--red-bright': '#C7472F', '--red-soft': '#F7E7E2',
      '--font-display': "'Noto Serif JP', serif",
      '--r-sm': '4px', '--r-md': '6px', '--r-lg': '8px', '--accent-bar': '#C7472F' },
    /* taegeuk modern — cheong blue + hong red, big radii */
    ko: { '--ivory': '#F5F8FC', '--sand': '#E9F0F8', '--line': '#DCE5F0', '--line-2': '#C3D2E5',
      '--navy': '#15356B', '--navy-800': '#1D4485', '--navy-700': '#27539E', '--navy-soft': '#E3EDF9',
      '--gold': '#2E6BB8', '--gold-bright': '#5E97DD', '--gold-soft': '#E3EDF9',
      '--red': '#CD2E3A', '--red-bright': '#DC3D49', '--red-soft': '#FBE7E9',
      '--font-display': "'Noto Sans KR', sans-serif",
      '--r-sm': '12px', '--r-md': '16px', '--r-lg': '24px', '--accent-bar': 'linear-gradient(90deg,#CD2E3A 0 50%,#0047A0 50% 100%)' },
    /* festive elegance — China red + imperial gold, serif SC */
    zh: { '--ivory': '#FBF6ED', '--sand': '#F3E9D7', '--line': '#EADDC2', '--line-2': '#D9C49C',
      '--navy': '#7E1A16', '--navy-800': '#92231E', '--navy-700': '#A52E27', '--navy-soft': '#F6E3D9',
      '--gold': '#C9962E', '--gold-bright': '#E0B045', '--gold-soft': '#F7ECD2',
      '--red': '#C8102E', '--red-bright': '#DA1F3D', '--red-soft': '#FAE3E5',
      '--font-display': "'Noto Serif SC', serif",
      '--r-sm': '6px', '--r-md': '10px', '--r-lg': '14px', '--accent-bar': 'linear-gradient(90deg,#C9962E,#E0B045,#C9962E)' },
    /* élégance française — crème, bleu nuit, bordeaux, tricolore */
    fr: { '--ivory': '#F8F6F1', '--sand': '#EFEAE0', '--line': '#E4DFD2', '--line-2': '#D0C9B7',
      '--navy': '#1F2A44', '--navy-800': '#2A3756', '--navy-700': '#364569', '--navy-soft': '#E9EEF6',
      '--gold': '#A8853B', '--gold-bright': '#C4A04F', '--gold-soft': '#F3EBD9',
      '--red': '#9D2235', '--red-bright': '#B22D42', '--red-soft': '#F6E5E8',
      '--font-display': "'Playfair Display', 'Times New Roman', serif",
      '--r-sm': '8px', '--r-md': '12px', '--r-lg': '18px', '--accent-bar': 'linear-gradient(90deg,#0055A4 0 34%,#F6F4EE 34% 66%,#EF4135 66%)' },
  };

  function apply() {
    var lang = (window.I18N && window.I18N.lang) || 'vi';
    var r = document.documentElement.style;
    VARS.forEach(function (k) { r.removeProperty(k); });
    document.documentElement.setAttribute('data-theme', lang);
    var t = T[lang];
    if (t) Object.keys(t).forEach(function (k) { r.setProperty(k, t[k]); });
  }
  apply();
  window.addEventListener('dt:lang', apply);
  window.DT_THEMES = { apply, T };
})();
