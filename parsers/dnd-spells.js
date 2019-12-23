// //https://www.dnd-spells.com/
// const https = require("https");
// const { JSDOM } = require("jsdom");
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// const SpellModel = require("../Models/Spell.js");

// var $ = require('jquery')(window);

// class dnd_spells
// {
//     loadToDatabase = function(url)
//     {            
//         const data = null;
        
//         https.get(url, (resp) =>
//         {
//             resp.on('data', (chunk) => {data += chunk;});

//             resp.on('end', () =>
//             {
//                 var spell = new SpellModel();

//                 spell.Name = $(".classic-title").text().trim();
//                 spell.Level = $("strong", $('p', $(".col-md-12"))[1])[0].innerText;
//                 spell.CastingTime = $("strong", $('p', $(".col-md-12"))[1])[1].innerText;
//                 //spell.Ritual = data.ritual;
//                 //spell.Concentration = data.concentration;
//                 spell.Range = $("strong", $('p', $(".col-md-12"))[1])[2].innerText;
//                 spell.Components = $("strong", $('p', $(".col-md-12"))[1])[3].innerText;
//                 spell.Duration = $("strong", $('p', $(".col-md-12"))[1])[4].innerText;
//                 spell.Description = $('p', $(".col-md-12"))[3].innerText;
//                 spell.School = $('p', $(".col-md-12"))[0].innerText;

//                 //Deal with "At Higher Level"
//                 var higherLevel = 0;
//                 if($('p', $(".col-md-12"))[7] !== undefined)
//                 {
//                     spell.Description += $('p', $(".col-md-12"))[4].innerText;
//                     higherLevel++;
//                 }

//                 var source = $('p', $(".col-md-12"))[4 + higherLevel].innerText                
//                 spell.SourcePage = Number.parseInt(source.match(/\d+/)[0]);

//                 //This is arguably the ugliest way to do this, but I just want it done.
//                 if(source.indexOf("Players Handbook") != -1)
//                     spell.SourceBook = "Players Handbook";
//                 if(source.indexOf("EE") != -1)
//                     spell.SourceBook = "Elemental Evil";
//                 if(source.indexOf("Sword") != -1)
//                     spell.SourceBook = "Sword Coast Adventure's Guide";
//                 if(source.indexOf("Xanathar") != -1)
//                     spell.SourceBook = "Xanathar's Guide to Everything";


//                 //I'm sure I could have come up with a worse method but I was tired.
//                 if(spell.Components.indexOf("(") > -1)
//                 {
//                     spell.Materials = spell.Components.match(/\((.*?)\)/i)[1];
//                     spell.Components = spell.Components.replace(/\((.*?)\)/i, '').trim();
//                 }

//                 var classes = $('p', $(".col-md-12"))[5 + higherLevel].innerText.replace("A", "").replace("spell", "").replace(".", "").trim();
//                 spell.Classes = classes.substr(0, classes.length - 1).split(",");
                
//                 spell.DataSource = "dnd-spells.com";

//                 spell.SaveToDatabase();

//                 this.spellResponse(message, spell);
//             });

//             resp.on('error', (err) => {console.log('Error: ' + err.message)});
//         })
//     }
// }

// module.exports = dnd_spells;