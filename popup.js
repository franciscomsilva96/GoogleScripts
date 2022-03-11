var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OBRAS");
var startRow = 2;
var startColumn = 15;

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

  //Com estas duas variáveis vamos buscar o nº da última linha com células preenchidas para não 
  //irmos buscar todas as linha do dataset.

    //Select the column we will check for the first blank cell
    var columnToCheck = ss.getRange("C2:C").getValues();
    
    // Get the last row based on the data range of a single column.
    var endRow = getLastActiveRow(columnToCheck);

  //Neste ciclo for vamos iterar sobre a coluna das datas de colocação
  //e transformar os valores no formate Date.
  for (var i = startRow; i < ( endRow + 1 ); i++) {
    
    var startDate = new Date();
    var endDate = ss.getRange(i,startColumn).getValue();
    var endDateString = endDate.toLocaleString();
    var ddl = Utilities.formatDate(new Date(endDateString), "GMT", "MM-dd-yyyy");
    var year = ddl.substring(6, 10);
    var month = ddl.substring(0, 2);
    var day = ddl.substring(3, 5);
    var deadline = new Date(year, month - 1, day); //datas de colocação em formato Date
    
    //Calcular o nº de semanas entre a data de hoje e a data de colocação
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

    if(semanas <= 6) {
      if(semanas >= 0) {
        var ref = ss.getRange(i,4).getValues();
        SpreadsheetApp.getUi().alert("A obra " + ref + " tem prazo de entrega dentro de " + semanas + " semanas.");
      }
    }
  } 
}