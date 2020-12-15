

export  function ConvertBsonIdsToString(object){
    return JSON.parse(JSON.stringify(object));
}