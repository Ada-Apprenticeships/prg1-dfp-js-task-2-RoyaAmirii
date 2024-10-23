const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') { 
  if (!fs.existsSync (indata)) {     //'existsSync' checks if input file exists
    return -1;                   //this returns -1 if input file does not exist
  }
if (fs.existsSync(outdata)) {
  fs.unlinkSync(outdata);        // if output file already exists, its deleted using fs.unlinksync()
}
let recordcount = 0;            //initialises a variable to count the number of records processed
try  { //handles any errors that might occur during file reading 
  const fileContent = fs.readFileSync(indata, 'utf-8'); //reads the entire input file synchronously into 'fileContent' as a string using utf-8 encoding
  const lines = fileContent.split(/\n/);      //splits file content by new line characters to create an array where each elememt is a line
  for (let i = 1; i < lines.length; i++) {    //starts a loop that skips the first line:the header and iterates throug the remaining lines
    const line = lines [i].trim();   //trims whitespace
    if(line === '') continue;     // if line is empty after trimming, move to next iteration
    const [review,sentiment] = line.split(delimiter).map(item=>item.trim());  //split line by delimiter into review and sentiment, then trim white spece
      const shortReview =review.substring(0, 20);   //store first 20 characters of the review string in 'shortReview'
      console.log(shortReview) //prints short verion of the review to the console
      fs.appendFileSync (outdata, `${sentiment}${delimiter}${shortReview}\n`, 'utf-8'); //appends sentiment and shortReview (seperated by delimiter) to the output file
      recordcount ++; //increment record count by 1 for each valid line processed 
    }
  }
  catch (err) {
    console.error('error parsing file:', err);
    return -1; //return -1 to indicate if errors occurred 
  }
  return recordcount; //returns total number of recrods successfully processed
  }
  parseFile('./dataFile.csv','./outputFile.csv')


//const data = fs.readFileSync(indata, 'utf-8')      //input file is being read using utf encoding
//const lines = data.split('\n');        //input data split into array of lines to process each row
//const transformedLines = [];             //initialises an array to store processed lines

//let totalRecordsExported = 0;

/*for (let i = 1 ; i< lines.length; i++) {      //loops through each line starting from the second, skips header
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
fs.appendFileSync(outdata, transformedLines.join('\n'), 'utf-8');  //write transformed line to the output file, joining with new line character
return totalRecordsExported; //return the total number of records exported
}*/
module.exports = {
  parseFile,
}