/*Version: Beta 0.0, Language: Adobe JavaScript, Date: Dec. 10, 2022*/

/*Code by Debbie Gonzalez with foundational code from A. Lopez.*/

/*This program searches for non-breaking space errors, as defined by the regx variables,*/

/*in a PDF document. Once the program finds the potential non-breaking space*/

/*error, it highlights the instance and leaves a comment for the user*/

/*to navigate to. This program also created a custom NBSP button for easy access*/

/*in the 'Add-on Tools' section of Adobe Acrobat Pro.*/

/*Additionally, an alert pops up for the user to know how many*/

/*non-breaking space errors the program identified when the program is done executing.*/

function nbsp_count(oDoc, Doc) {

    count = 0
    
    var regx1 = /subfield(.\n|\n)([A-Z]\w*\ *\d*)/gm;
    
    var regx2 = /fields(.\n|\n)([A-Z]\w*\ *\d*)/gm;
    
    var regx3 = /ID(.\n|\n)([0-9]\w*\ *\d*)/gm;
    
    var regx4 = /positions(.\n|\n)(\d*)/igm;
    
    var regx5 = /position(.\n|\n)([0-9]\w*\ *\d*)/gm;
    
    var regx6 = /Field(.\n|\n)([0-9]\w*\ *\d*)/gm;
    
    for (var p = 0; p < this.numPages; p++)
    
    {
    
    var numWords = this.getPageNumWords(p);
    
    for (var i=0; i<numWords; i++)
    
    {
    
      var ckWord = this.getPageNthWord(p, i, false);
    
        if (regx1.test(ckWord)|regx2.test(ckWord)|regx3.test(ckWord)|regx4.test(ckWord)|regx5.test(ckWord)|regx6.test(ckWord))
    
        {
    
          count++;
    
          this.addAnnot(
    
            {type:"Highlight",
    
             strokeColor:color.yellow,
    
             page:p,
    
             quads:this.getPageNthWordQuads(p,i),
    
                  author:"Author",
    
             contents: "NBSP"
    
              });
    
            }
    
          }
    
        }
    
    var cMyTitle = "Non-Breaking Spaces";
    
    var cMessage1 = "There are no non-breaking space errors. \n\nPress 'Ok' to proceed.";
    
    var cMessage2 = "There are " + count + " potential non-breaking space errors. \n\nClick the 'Comments' tool to navigate to the highlighted instances.";
    
    var cMessage3 = "There is 1 non-breaking space error. \n\nClick the 'Comments' tool to navigate to the highlighted instance.";
    
    if (count == 0) {
    
                  app.alert({cMsg:cMessage1,
    
                       cTitle:cMyTitle,
    
                       nIcon:3,
    
                       nType:0});
    
    } if (count > 1) {
    
                  app.alert({cMsg:cMessage2,
    
                       cTitle:cMyTitle,
    
                       nIcon:3,
    
                       nType:0});
    
    } if (count == 1) {
    
                  app.alert({cMsg:cMessage3,
    
                       cTitle:cMyTitle,
    
                       nIcon:3,
    
                       nType:0});
    
      }
    
    }
    
     
    
    app.addToolButton({cName: "NBSPC",
    
                       cExec: "nbsp_count(event.target)",
    
                       cLabel:"NBSP"
    
                       });