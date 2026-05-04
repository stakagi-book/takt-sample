const { execSync } = require('child_process');
const assert = require('assert');
const out = execSync('node app/hello.js', { encoding: 'utf8' });
assert.strictEqual(out, 'Hello World\n');
