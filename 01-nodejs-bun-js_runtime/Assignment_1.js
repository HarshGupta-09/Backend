

// ONe way to do it
// function main (){

//      fs.readFile('a.txt','utf-8',(err,data)=>{
//         let arr = data.split(' ')
//         let joined = arr.join('')

//         console.log(joined.length)
//         console.log(arr.length)
//     })
  

// }
// main()
// 2nd way
// function main (filename){
//     let total = 0;

//      fs.readFile(filename,'utf-8',(err,data)=>{
//         for(let i = 0; i<data.length; i++){
//             if(data[i] === ' ')total++;
//         }
//         console.log(total)

  
//     })
  

// }
// main(process.argv[2])


// cli way using commander
const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count')
  .description('Count the number of lines in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split(' ').length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.parse();