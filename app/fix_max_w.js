const fs = require('fs');
const path = require('path');

const map = {
  'max-w-xs': 'max-w-[20rem]',
  'max-w-sm': 'max-w-[24rem]',
  'max-w-md': 'max-w-[28rem]',
  'max-w-lg': 'max-w-[32rem]',
  'max-w-xl': 'max-w-[36rem]',
  'max-w-2xl': 'max-w-[42rem]',
  'max-w-3xl': 'max-w-[48rem]',
  'max-w-4xl': 'max-w-[56rem]',
  'max-w-5xl': 'max-w-[64rem]',
  'max-w-6xl': 'max-w-[72rem]',
  'max-w-7xl': 'max-w-[80rem]',
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  for (const [key, val] of Object.entries(map)) {
    // replace exact word matches, preventing max-w-sm from matching max-w-small
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    newContent = newContent.replace(regex, val);
  }

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Done. Modified ${changedCount} files.`);
