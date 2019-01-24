// const fs = require('fs');

var dataset= {
    0:{ 
      "questione" : [ "tell me the use of you", "tell me the use of lusy" ],
      "answer": "I am lucy, the Chatboat, i am here to help you ",
      "key": [ "lucy","you","use","tell" ],
      "mustKey": [ "use","about"],
      "not" : ["don't"],
      "exactMatch":[ ["use","you"],["about","youself"] ],
      "notAnswer" : ["why are you angry with me"]
    },
    1:{ 
      "questione" : [ "log my work", "fill the timesheet" ],
      "answer": "Please Enter the date",
      "key": [ "lucy","you","use","tell" ],
      "mustKey": [ "use","about"],
      "exactMatch":[ ["log","my","work"], ["fill","timesheet"] ],
      "not" : ["don't"],
      "notAnswer" : ["why are you angry with me"]
    },
    2:{ 
        "questione" : [ "do you know angular", "do you know angular" ],
        "answer": "sorry,i don't know",
        "key": [ "lucy","you","use","tell" ],
        "mustKey": [ "use","about"],
        "not" : ["don't"],
        "exactMatch":[ ["you","know","angular"], ],
        "notAnswer" : ["why are you angry with me"]
    },
};



SearchText = function (req) {
    // let data = ;
    let searchvalueTem;

    let splitedValue = req.split(/\s+/);
    
    let inc=0;
    let mustKeyObject=[];
    let exactMatchFlag = false;
    let conv;
    let loppbreak=0;
    for (x in dataset) {
       

        conv= dataset[x];
       

        // strength check
          /************************/
        splitedValue.forEach(questKey => {
           (conv.key).forEach(conKey => {
                if (questKey == conKey) {
                    inc++;
                }
            }); 
         let conmustKeyInc=0;
            (conv.mustKey).forEach(conmustKey => {
                if (questKey == conmustKey) {
                    mustKeyObject[conmustKeyInc]=questKey;
                    conmustKeyInc++;
                }
            });

        });
        /************************/
        // match check

        let exactMatchInc;
         (conv.exactMatch).forEach(exactMatch => {
                 exactMatchInc=0;
                exactMatch.forEach(exactSentense => {
                    splitedValue.forEach(questKey => {
                        if(questKey == exactSentense) {
                            exactMatchInc++;
                     
                        }
                    });
                });
               
                if(exactMatchInc === exactMatch.length) {
                    
                    exactMatchFlag = true;
                    
                }
            });
           
        if (exactMatchFlag === true  ) {
            console.log("answer",conv.answer);
            searchvalueTem= conv.answer;
            break;
        }
        else if (exactMatchFlag === false) {
            searchvalueTem = "empty";
            console.log("loop");
        }
      }
      

      return searchvalueTem;
}


jsondata = function( req ) {

    return SearchText(req);
 }

 module.exports= jsondata;