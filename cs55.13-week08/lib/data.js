//import fs from 'fs';
//import path from 'path';
import got from 'got';


//const dataDir= path.join(process.cwd(), 'data');
const dataURL = 'https://dev-cs5513-week11.pantheonsite.io/wp-json/twentytwentyone-child/v1/special';

export async function getAllIds() {
  // get filepath to json file
  //const filePath1 = path.join(dataDir, 'peeps.json');
  //const filePath2 = path.join(dataDir, 'others.json');
  // load json file contents
  //const jsonString1 = fs.readFileSync(filePath1, 'utf8');
  //const jsonString2 = fs.readFileSync(filePath2, 'utf8');

  let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  }catch (error){
    jsonString = [];
    console.log(error);
  }
  // convert string from file into json array object
  //const jsonObj1 = JSON.parse(jsonString1);
  //const jsonObj2 = JSON.parse(jsonString2);
  //const jsonObj = jsonObj1.concat(jsonObj2);

  const jsonObj = JSON.parse(jsonString.body);
  // use map() on array to extract just id properties into new array of obj values
  return jsonObj.map(item => {
    return {
      params: {
        id: item.ID.toString()
      }
    }
  });
}


export async function getSortedList() {
  // get filepath to json file
  //const filePath1 = path.join(dataDir, 'peeps.json');
  //const filePath2 = path.join(dataDir, 'others.json');
  // load json file contents
  //const jsonString1 = fs.readFileSync(filePath1, 'utf8');
  //const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  }catch (error){
    jsonString = [];
    console.log(error);
  }

  // convert string from file into json array object
  //const jsonObj1 = JSON.parse(jsonString1);
  //const jsonObj2 = JSON.parse(jsonString2);
  //const jsonObj = jsonObj1.concat(jsonObj2);
  const jsonObj = JSON.parse(jsonString.body);

  // sort json array by name property
  jsonObj.sort(function (a, b) {
      return a.post_title.localeCompare(b.post_title);
  });

  return jsonObj.map(item => {
    return {
      id: item.ID.toString(),
      name: item.post_title
    }
  });
}

export async function getPerson(IdRequested){
  //const filePath1= path.join(dataDir, 'peeps.json');
  //const filePath2= path.join(dataDir, 'others.json');
  //const jsonString1 = fs.readFileSync(filePath1, 'utf8');
 // const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  //const jsonObj1 = JSON.parse(jsonString1);
  //const jsonObj2 = JSON.parse(jsonString2);
  //const jsonObj = jsonObj1.concat(jsonObj2);
  let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  }catch (error){
    jsonString = [];
    console.log(error);
  }

  const jsonObj = JSON.parse(jsonString.body);

  const match = jsonObj.filter(obj => {
    return obj.ID.toString() === IdRequested;
  }
  );

  let value;
  if (match.length>0){
    value = match[0];
  }else{
    value ={};
  }

  return value;
}