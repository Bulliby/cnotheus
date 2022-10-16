const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;

const entry = fs.readFileSync('../src/app.js', 'UTF-8');
let ast = babylon.parse(entry, {"sourceType": "module"});

const dirname = path.dirname('../src/app.js');

const files = [];

const MyVisitor = {
    ImportDeclaration({node}) {
        let filename = node.source.value; 
        files.push([`${filename}`, `${readFile(filename)}`]),
        ast = babylon.parse(readFile(filename), {"sourceType": "module"});
        traverse(ast, MyVisitor);
    },
};

traverse(ast, MyVisitor);

function readFile(filename) {
    return fs.readFileSync(path.join(dirname, filename), 'UTF-8');
}

function generateCode(code) {
    return `function() {
        ${code[1]
        }}`
}

let data = ''
files.forEach(file => {
    data += generateCode(file);
});

console.log(data);
