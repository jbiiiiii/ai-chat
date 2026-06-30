const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'index.html',
  'manifest.webmanifest',
  'sw.js',
  'robot-2-fill.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png'
];

function read(file) {
  return fs.readFileSync(path.join(root, file));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function getPngSize(file) {
  const buffer = read(file);
  assert(buffer.toString('ascii', 1, 4) === 'PNG', `${file} is not a PNG file`);
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

for (const file of requiredFiles) {
  assert(fs.existsSync(path.join(root, file)), `Missing ${file}`);
}

const html = read('index.html').toString('utf8');
assert(html.includes('rel="manifest"'), 'index.html is missing manifest link');
assert(html.includes('apple-mobile-web-app-capable'), 'index.html is missing iOS web app meta');
assert(html.includes('serviceWorker'), 'index.html is missing service worker registration');

const manifest = JSON.parse(read('manifest.webmanifest').toString('utf8'));
assert(manifest.display === 'standalone', 'manifest display must be standalone');
assert(manifest.start_url === './index.html', 'manifest start_url should point at index.html');
assert(Array.isArray(manifest.icons) && manifest.icons.length >= 2, 'manifest needs PWA icons');

const icon192 = getPngSize('icons/icon-192.png');
const icon512 = getPngSize('icons/icon-512.png');
const appleIcon = getPngSize('icons/apple-touch-icon.png');
assert(icon192.width === 192 && icon192.height === 192, 'icon-192.png must be 192x192');
assert(icon512.width === 512 && icon512.height === 512, 'icon-512.png must be 512x512');
assert(appleIcon.width === 180 && appleIcon.height === 180, 'apple-touch-icon.png must be 180x180');

console.log('PWA check passed.');
