const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') { 
  if (!fs.existsSync (indata)) {                        //'existsSync' checks if input file exists
    return -1;                                          //this returns -1 if input file does not exist
  }
if (fs.existsSync(outdata)) {
  fs.unlinkSync(outdata);                              // if output file already exists, its deleted using fs.unlinksync()
}
let recordcount = 0;                                   //initialises a variable to count the number of records processed

try  { //handles any errors that might occur during file reading 
  const fileContent = fs.readFileSync(indata, 'utf-8'); //reads the entire input file synchronously into 'fileContent' as a string using utf-8 encoding
  const lines = fileContent.split(/\n/);                //splits file content by new line characters to create an array where each elememt is a line
 
  for (let i = 1; i < lines.length; i++) {             //starts a loop that skips the first line:the header and iterates throug the remaining lines
    const line = lines [i].trim();                     //trims whitespace
    
    if(line === '') continue;                          // if line is empty after trimming, move to next iteration
    const [review,sentiment] = line.split(delimiter).map(item=>item.trim());  //split line by delimiter into review and sentiment, then trim white spece
      const shortReview =review.substring(0, 20);      //store first 20 characters of the review string in 'shortReview'
      console.log(shortReview)                        //prints short verion of the review to the console
      fs.appendFileSync (outdata, `${sentiment}${delimiter}${shortReview}\n`, 'utf-8'); //appends sentiment and shortReview (seperated by delimiter) to the output file
      recordcount ++;                             //increment record count by 1 for each valid line processed 
    }
  }
  catch (err) {
    console.error('error parsing file:', err);
    return -1;                                   //return -1 to indicate if errors occurred 
  }
  return recordcount;                           //returns total number of recrods successfully processed
  }
 
  parseFile('./dataFile.csv','./outputFile.csv')
module.exports = {
  parseFile,
}