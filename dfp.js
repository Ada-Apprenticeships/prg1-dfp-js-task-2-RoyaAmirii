const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') { 
  if (!fs.existsSync (indata)) {     //'existsSync' checks if input file exists
    return -1;                   //this returns -1 if input file does not exist
  }
if (fs.existsSync(outdata)) {
  fs.unlinkSync(outdata);        // if output file already exists, its deleted using fs.unlinksync()
}
const data = fs.readFileSync(indata, 'utf-8')      //input file is being read using utf encoding
const lines = data.split('\n');        //input data split into array of lines to process each row
const transformedLines = [];             //initialises an array to store processed lines

let totalRecordsExported = 0;

for (let i = 1 ; i< lines.length; i++) {      //loops through each line starting from the second, skips header
  const line = lines[i].trim();           //trim whitespace from line
  if (line === '') continue ;             //skip empty lines
  const elements = line.split(delimiter)   //splits the lines into columns based on specified delimiter
  if (elements.length < 2) continue;       //ensures the line contain atleast 2 elements
  
  let review = elements[0].trim();        //first column review
  const sentiment = elements [1].trim();  //second column sentiment
  review = review.slice(0,20);            //trim review to 20 characters

  const transformedLine = `${sentiment}${delimiter}${review}`; //reverse column order for output(1st sentiment, then trimmed review)
  transformedLines.push(transformedLine)      //add transformed line to array
  totalRecordsExported++; //increment the counter for each valid record 
}
fs.writeFileSync(outdata, transformedLines.join('\n'), 'utf-8');  //write transformed line to the output file, joining with new line character
return totalRecordsExported; //return the total number of records exported
}
module.exports = {
  parseFile,
}