import inquirer from "inquirer";
import readline from 'readline'
import fsp from "fs/promises";
import path from "path";
import colors from 'colors';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const homeDir = process.cwd();

const readAllFile = (pathDir) => {
    fsp
        .readdir(path.join(pathDir))
        .then((choices) => {
            return inquirer.prompt([{
                name: "fileName",
                type: "list",
                message: "Choose file",
                choices
            },
                {
                    name: 'searchText',
                    type: 'input',
                    message: 'Enter text to search: '
                }
            ])
        })
        .then(async ({fileName, searchText}) => {
            const fullPath = path.join(pathDir, fileName);
            const stat = await fsp.stat(fullPath);
            if (stat.isDirectory()) return readAllFile(fullPath)
            else return new Promise((resolve, reject) => {
                resolve(fsp.readFile(path.join(pathDir, fileName), 'utf-8'))
            })
                .then((result) => {
                    if (result) {
                        console.log(result.replaceAll(searchText, colors.red(searchText)));
                        let count = result.split(searchText).length - 1;
                        if (count === 0) console.log("Совпадений нет!")
                        else console.log('Количество совпадений: ' + count);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        })
};

rl.question(`Please enter directory: `, (dirSearch) => {
    readAllFile(path.join(homeDir, dirSearch));
});

rl.on('close', () => process.exit(0));