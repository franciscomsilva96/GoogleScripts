// The use case of this script is to set a specific cell to the current week number as soon as the user opens the spreadsheet.
// The onOpen built-in function automatically adds the week number as the user opens the spreadsheet.

function onOpen(e) {
    weekNum(e);
}

function weekNum() {
    Date.prototype.getWeek = function () {
        var onejan = new Date(this.getFullYear(), 0, 1);
        var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
        var dayOfYear = ((today - onejan + 86400000) / 86400000);
        return Math.ceil(dayOfYear / 7)
    };

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet Name");
    var cel = sheet.getRange(6, 10);
    var data = new Date();
    var weekNum = data.getWeek();
    console.log(weekNum);
    cel.setValue(weekNum);
}