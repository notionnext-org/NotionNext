export function buildThemePrimaryCss(rootSelector, primaryVar) {
  const primary = `var(${primaryVar})`

  return `
    ${rootSelector} a:hover,
    ${rootSelector} .nav:hover,
    ${rootSelector} .text-red-400,
    ${rootSelector} .text-red-500,
    ${rootSelector} .text-blue-500,
    ${rootSelector} .text-blue-600,
    ${rootSelector} .text-green-500,
    ${rootSelector} .text-green-600,
    ${rootSelector} .text-indigo-500,
    ${rootSelector} .text-indigo-600,
    ${rootSelector} [class*='hover:text-red-']:hover,
    ${rootSelector} [class*='hover:text-blue-']:hover,
    ${rootSelector} [class*='hover:text-green-']:hover,
    ${rootSelector} [class*='hover:text-indigo-']:hover,
    ${rootSelector} [class*='hover:text-gray-']:hover,
    ${rootSelector} [class*='hover:text-black']:hover {
      color: ${primary} !important;
    }

    ${rootSelector} .bg-red-500,
    ${rootSelector} .bg-red-600,
    ${rootSelector} .bg-blue-500,
    ${rootSelector} .bg-blue-600,
    ${rootSelector} .bg-green-500,
    ${rootSelector} .bg-green-600,
    ${rootSelector} .bg-indigo-500,
    ${rootSelector} .bg-indigo-600,
    ${rootSelector} [class*='hover:bg-red-']:hover,
    ${rootSelector} [class*='hover:bg-blue-']:hover,
    ${rootSelector} [class*='hover:bg-green-']:hover,
    ${rootSelector} [class*='hover:bg-indigo-']:hover,
    ${rootSelector} [class*='hover:bg-gray-']:hover,
    ${rootSelector} [class*='hover:bg-black']:hover {
      background-color: ${primary} !important;
      color: white !important;
    }

    ${rootSelector} .border-red-400,
    ${rootSelector} .border-red-500,
    ${rootSelector} .border-blue-400,
    ${rootSelector} .border-blue-500,
    ${rootSelector} .border-green-400,
    ${rootSelector} .border-green-500,
    ${rootSelector} .border-indigo-400,
    ${rootSelector} .border-indigo-500,
    ${rootSelector} [class*='hover:border-red-']:hover,
    ${rootSelector} [class*='hover:border-blue-']:hover,
    ${rootSelector} [class*='hover:border-green-']:hover,
    ${rootSelector} [class*='hover:border-indigo-']:hover,
    ${rootSelector} [class*='hover:border-gray-']:hover {
      border-color: ${primary} !important;
    }

    ${rootSelector} input:focus,
    ${rootSelector} textarea:focus,
    ${rootSelector} select:focus {
      outline-color: ${primary} !important;
      box-shadow: 0 0 0 2px ${primary};
    }
  `
}
