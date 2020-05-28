const pdfreader = require("pdfreader");
const childProcess = require("child_process")
const path = require("path")
const pdflatex = require(path.resolve(__dirname, "../.vscode/settings.json"))["latex-workshop.latex.tools"].filter(x=>x.name === "pdflatex")[0] || null
pdflatex.args = pdflatex.args.map(x=>{
    if(x === "%DOC%"){
        return "small_master.tex"
    }
    return x;
})

let i = -1;

new pdfreader.PdfReader().parseFileItems(path.resolve(__dirname, "../master.pdf"), (err, item)=>{
    if(!item){
        console.log(i);
        return;
    }
    if(!item.text ){
        return;
    }    
    i += item.text.length +1;

})