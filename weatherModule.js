const fetch = require('node-fetch');

exports.getTemp = async (location, scale) => {
    let res = await fetch(`https://vejr.eu/api.php?location=${location}&degree=${scale}`);
    return await res.json();
};