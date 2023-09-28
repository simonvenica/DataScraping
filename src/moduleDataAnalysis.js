/*Receives both lists with raw data and returns a coherent and clean list.*/

function dataAnalysis(dataList,symbolList){

    slicePosition = dataList.indexOf("BitcoinBTC"); //Due to the dynamic nature of the website, it may sometimes bring a variable amount of additional data to the beginning of the string.
    dataList = dataList.slice(slicePosition,-13);
    symbolList = symbolList.slice(6);

    if (dataList.length != 400 || symbolList.length != 100){ //2° security check.
        console.error("Error with lists length");
        console.log(dataList.length);
        console.log(symbolList.length);
    };

    const correctedList = correctList(dataList,symbolList);

    const correctedTable = listToTable(correctedList);
    
    return correctedTable;
;}

function correctList(dataList,symbolList){ //Separates the concatenated data (Crypto name and Symbol), remove "," and "$" from the prices and erase the empty field from the list.
    let list = [];
    let i = 0;
    let j = 0;
    for (let element of dataList){
        element = element.replaceAll(",","");
        element = element.replace("$","");
        if (i == 0 || i % 4 == 0){
            const lenSymbol = symbolList[j].length;
            element = element.slice(0,-lenSymbol);
            list.push(symbolList[j]);
            j++; 
        }
        if ((i+1) % 4 != 0){
            list.push(element);
        };
        i++;
    };
    return list;
};

function listToTable(correctedList){
    var finalTable = [];
    var subList = [];
    for (var i = 0; i < correctedList.length; i++) {
        subList.push(correctedList[i]);
    if ((i + 1) % 4 === 0 || i === correctedList.length - 1) {
        finalTable.push(subList);
        subList = [];
  }
}
return finalTable
}

module.exports = {dataAnalysis}