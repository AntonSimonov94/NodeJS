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
                    message: 'Enter text to search:'
                }]
            )
        })
        .then (async ({fileName, searchText}) => {
            const fullPath = path.join(pathDir,fileName);
            const stat = await fsp.stat(fullPath);
            if(stat.isDirectory()) return readAllFile(fullPath)
            return Promise.all([
                fsp.readFile(path.join(homeDir,fileName), 'utf-8'),
                Promise.resolve(searchText)
            ])
        })
        .then(([result, search2]) => {

            if (result.includes(search2)) console.log(colors.red(result))
        else (console.log(result))
        })
};

rl.question(`Please enter directory: `, (dirSearch) => {
    readAllFile(path.join(homeDir,dirSearch))
});
rl.on('close', () => process.exit(0))
