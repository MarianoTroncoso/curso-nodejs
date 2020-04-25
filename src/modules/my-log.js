function info(text){
    console.log('info: ', text);
    return text;
}

function error(text){
    console.log('error: ', text); 
    return text;
}

// exportación global
// module.exports = {info, error}