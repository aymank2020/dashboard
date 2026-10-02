'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const root = path.resolve(process.argv[2] || path.join(__dirname, '../dist'));
const pages = ['index.html', 'user_profile.html'];
for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert(html.includes('<title>'), `${page}: missing title`);
    const assets = [...html.matchAll(/<(?:script|link|img)\b[^>]*\b(?:src|href)="([^"]+)"/g)]
        .map(match => match[1]).filter(url => !/^(?:https?:|data:|#)/.test(url));
    assert(assets.length > 0, `${page}: no local assets`);
    for (const asset of assets) {
        assert(fs.existsSync(path.join(root, asset)), `${page}: missing ${asset}`);
    }
    console.log(`${page}: ${assets.length} local assets verified`);
}
