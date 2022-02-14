// The use case of this script is to get a specific range (in my case a column of decimal values) and replace the "." to ",".
// The onEdit built-in function automatically changes the values as the user inputs values in the sheet.

function onEdit(e) {

    changeValue(e);

}

function changeValue(e) {

    //call your range 
    var range = SpreadsheetApp.getActiveSheet().getRange('RANGE TEST HERE');
    var data = range.getValues();
    for (var i = 0; i < data.length; i++) { // map through the range
        var text = data[i][0].toString();     // 2D array of cell values
        var newText = text.replace(".", ",");  // in the array, replace "." to ","
        data[i][0] = newText;
    }
    range.setValues(data);
}
