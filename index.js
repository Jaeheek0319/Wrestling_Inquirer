const inquirer = require('inquirer');
const fs = require("fs");

inquirer.prompt([{
    type: "input",
    message: "What is your weight?",
    name: "Weight"
}]).then((answer) => {
    console.log(answer)
    if ((answer.Weight > 100) || (answer.Weight < 285)) {
        inquirer.prompt([{
            type: "input",
            message: "What is your Name",
            name: "Name"
        }, {
            type: "input",
            message: "What school do you attend?",
            name: "School"
        }, {
            type: "input",
            message: "How old are you?",
            name: "Age"
        }, {
            type: "input",
            message: "How tall are you? (in)",
            name: "Height"
        },]).then((answers) => {
            console.log(parseFloat(answer.Weight))
            console.log(parseFloat(answers.Height))
            console.log((parseFloat(answer.Weight) / parseFloat(answers.Height) * parseFloat(answers.Height)))
            const weight = parseFloat(answer.Weight);
            const height = parseFloat(answers.Height);
            const BMI = weight / (height * height) * 703;
            const BFat = (1.2 * BMI) + (0.23 * parseInt(answers.Age)) - 16.2
            // read the html file
            fs.readFile("page.html", 'utf8', (err, data) => {
                if (err) {
                    return err;
                }
                var page = data.split('//insert')
                console.log(page)
                // add additonal entry
                var template = `
                <div>New Wrestler</div>
                <div>${answers.Name}</div>
                <div>Weight: ${answer.Weight}</div>
                <div>School: ${answers.School}</div>
                <div>Age: ${answers.Age}</div>
                <div>Height (in): ${answers.Height}</div>
                <div>BMI: ${BMI.toFixed(2)}</div>
                <div>Body Fat: ${BFat}</div>
                //insert

                
                `
                newPage = page[0] + template + page[1]
                console.log(newPage)
                // write it back
                fs.writeFileSync("page.html", newPage, 'utf8');
            });
        });
    };

}); 
