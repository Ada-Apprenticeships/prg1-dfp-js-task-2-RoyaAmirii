const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') { 
  if (!fs.existsSync (indata)) {//'existsSync' checks if input file exists
    return -1; //this returns -1 if input file does not exist
  }
if (fs.existsSync(outdata)) {
  fs.unlinkSync(outdata); // if output file already exists, its deleted using fs.unlinksync()
}
const data = fs.readFileSync(indata, 'utf-8') //input file is being read using utf encoding
const lines = data.split('\n');//input data split into array of lines to process each row
const transformedLines = [];
let totalRecordsExported = 0;
}



  



module.exports = {
  parseFile,
}