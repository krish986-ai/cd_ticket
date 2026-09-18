const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const cssLinks = data.match(/\/(\_next\/static\/css\/[a-zA-Z0-9_-]+\.css)/g);
    console.log('Found CSS links:', cssLinks);
    if (cssLinks && cssLinks[0]) {
      http.get('http://localhost:3000' + cssLinks[0], (cssRes) => {
        let cssData = '';
        cssRes.on('data', chunk => cssData += chunk);
        cssRes.on('end', () => {
          console.log('CSS length:', cssData.length);
          console.log('Has flex:', cssData.includes('.flex'));
          console.log('Has justify-between:', cssData.includes('.justify-between'));
          console.log('Has max-w-7xl:', cssData.includes('.max-w-7xl'));
          console.log('Has items-center:', cssData.includes('.items-center'));
          console.log('Has mx-auto:', cssData.includes('.mx-auto'));
        });
      });
    }
  });
});
