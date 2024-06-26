const crypto = require('crypto');

const iv = crypto.randomBytes(16);
const key = crypto.randomBytes(32);

const encrypt = (data) => {

    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    console.log(cipher);

    const encryptedData = Buffer.concat([cipher.update(data, 'utf-8'), cipher.final()]).toString('hex');

    return encryptedData;

}

const decrypt = (encryptedData) => {

    const dicipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
    console.log(dicipher);

    const decrptData = Buffer.concat([dicipher.update(encryptedData, 'hex'), dicipher.final()]).toString('utf-8');

    return decrptData;
    
}

module.exports = {
    encrypt,
    decrypt
}