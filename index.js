const ACCESS_LOG = './access_tmp.log';

import fs from 'fs';
import readline from 'readline';

const line = readline.createInterface({
    input: fs.createReadStream(ACCESS_LOG),
});
let ipText1 = '89.123.1.41';
let ipText2 = '34.48.240.111';
let numLine34 = 0;
let numLine89 = 0;

const ACCESS_LOG_34 = `./${ipText1}_requests.log`;
const ACCESS_LOG_89 = `./${ipText2}_requests.log`;

const writeLog = (LOG, ipText, count) => {
    fs.writeFile(
        LOG,
        "Line number " + count + ": " + ipText + '\n',
        {
            encoding: 'utf-8',
            flag: 'a'
        },
        (err) => {
            if (err) console.log(err)
        }
    )
    count++;
}

line.on("line", function (input) {
    if(input.includes(ipText1)) {
        ++numLine34;
        writeLog(ACCESS_LOG_34, input, numLine34)

    } else if (input.includes(ipText2)) {
        ++numLine89;
        writeLog(ACCESS_LOG_89, input, numLine89)
    }

});