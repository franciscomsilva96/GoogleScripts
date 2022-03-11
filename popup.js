// The use case of this script is to identify which references in our dataset have finish date within 4 weeks or less.
// It will set a popup message everytime we open the spreadsheet with the name of the references that match the criteria.
// Still working on trying to display all of the references that match the criteria in a single popup message.

var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("name of the sheet we want");
var startRow = 2;
var startColumn = 15;

// Function to get the last row with data within a range
function getLastActiveRow(range) {
  var rowNum = 0;
  var blank = false;
  for(var row = 0; row < range.length; row++){
 
    if(range[row][0] === "" && !blank){
      rowNum = row;
      blank = true;
 
    }else if(range[row][0] !== ""){
      blank = false;
    };
  };
  return rowNum;
};


function onOpen(e){

  // With these two variables we will check for the last cell with data in a test column
    // Select the column we will check for the first blank cell - in my case that is column C
    var columnToCheck = ss.getRange("C2:C").getValues();
    
    // Get the last row based on the data range of a single column.
    var endRow = getLastActiveRow(columnToCheck);

  // Iterate through the column with date values and transform them in Date format
  for (var i = startRow; i < ( endRow + 1 ); i++) {
    
    var startDate = new Date();
    var endDate = ss.getRange(i,startColumn).getValue();
    var endDateString = endDate.toLocaleString();
    var ddl = Utilities.formatDate(new Date(endDateString), "GMT", "MM-dd-yyyy");
    var year = ddl.substring(6, 10);
    var month = ddl.substring(0, 2);
    var day = ddl.substring(3, 5);
    var deadline = new Date(year, month - 1, day); //datas em formato Date
    
    // Calculate number of weeks between our range
    var semanas = parseInt(((deadline - startDate) / 1000 / 60 / 60 / 24 / 7) + 1);
    //var newRange = ss.getRange("Z2:Z").setValues(semanas);

    /*
    if (semanas >= 0) {
      console.log('Hoje: ' + startDate + '; Deadline: ' + deadline + '; Semanas de diferença: ' + semanas);
    }
    -------------------------------------------------------------------------------------------------------
    var now = new Date();
    var today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,0,0);
    var todayString = today.toLocaleString();
    var diff = today.getTime() - ddl.getTime();
    var millisecondsInADay = 1000 * 60 * 60 * 24;
    var diffInDays = Math.floor(diff/millisecondsInADay);
   
    console.log(diffInDays);
    var millisecondsInADay = 1000 * 60 * 60 * 24;
    var diffInDays = Math.floor(datediff/millisecondsInADay);
    console.log(diffInDays);

    }*/

    // Set popup for the rows with semanas <= 4
    if(semanas <= 6) {
      if(semanas >= 0) {
        var ref = ss.getRange(i,4).getValues();
        SpreadsheetApp.getUi().alert("A referência " + ref + " tem prazo de entrega dentro de " + semanas + " semanas.");
      }
    }
  } 
}
