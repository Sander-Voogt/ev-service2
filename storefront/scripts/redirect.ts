const fs = require('fs');
const path = require('path');

function cleanSource(input) {
  let s = input.trim();

  // TAB of comma support
  s = s.split(/\t|,/)[0];

  // protocol weg
  s = s.replace(/^https?:\/\//, '');

  // domein weg (www. / portal. / etc)
  s = s.replace(/^[^/]+/, '');

  // querystring weg → Next.js accepteert dit niet in source
  s = s.split('?')[0];

  // hash weg
  s = s.split('#')[0];

  // force leading slash
  if (!s.startsWith('/')) {
    s = '/' + s;
  }

  // optioneel: trailing slash weg
  if (s.length > 1 && s.endsWith('/')) {
    s = s.slice(0, -1);
  }

  return s;
}

function loadRedirects() {
  const csvPath = path.join(process.cwd(), 'scripts/redirects.csv');
  const csv = fs.readFileSync(csvPath, 'utf8');

  const lines = csv.replace(/^\uFEFF/, '').split(/\r?\n/);

  const redirects = [];
  let skipped = 0;

  for (const line of lines) {
    if (!line.trim()) continue;

    const [source, destination] = line.split(/\t|,/);

    if (!destination || !destination.trim()) {
      skipped++;
      continue;
    }

    const src = cleanSource(source);
    const dest = destination.trim();

    // Skip index redirects
    if (src === '/') {
      skipped++;
      continue;
    }

    // Skip self-redirects
    if (src === dest) {
      skipped++;
      continue;
    }

    redirects.push({
      source: src,
      destination: dest,
      permanent: true,
    });
  }

  console.log(
    `Redirects geladen: ${redirects.length} (overgeslagen: ${skipped})`
  );

  return redirects;
}

module.exports = loadRedirects;
