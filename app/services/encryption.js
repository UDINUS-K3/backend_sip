const crypto = require('crypto');
const key = crypto.createHash('sha256').update(String(process.env.CIPHER_KEY)).digest('base64').substr(0, 32);

module.exports.encrypt = (data) => {
    const BLOCK_SIZE = Number.parseInt(process.env.CIPHER_BLOCK_SIZE);
    const iv = crypto.randomBytes(BLOCK_SIZE);

    const cipher = crypto.createCipheriv(process.env.CIPHER_ALGORITHM, key, iv);
    let cipherText;
    try {
        cipherText = cipher.update(data, 'utf8', 'hex');
        cipherText += cipher.final('hex');
        cipherText = iv.toString('hex') + cipherText;
        cipherText = new Buffer.from(cipherText);
        cipherText = cipherText.toString('base64');
    }
    catch (err) {
        return { success: false }
    }

    return { status: true, data: cipherText }
}

module.exports.decrypt = (data) => {
    try {
        data = new Buffer.from(data, 'base64');
        data = data.toString('utf8');
        const BLOCK_SIZE = Number.parseInt(process.env.CIPHER_BLOCK_SIZE);
        const content = Buffer.from(data, 'hex');
        const iv = content.slice(0, BLOCK_SIZE);
        const textBytes = content.slice(BLOCK_SIZE);

        const decipher = crypto.createDecipheriv(process.env.CIPHER_ALGORITHM, key, iv);
        let decrypted = decipher.update(textBytes, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return { status: true, data: decrypted }
    }
    catch (err) {
        return { success: false }
    }
}