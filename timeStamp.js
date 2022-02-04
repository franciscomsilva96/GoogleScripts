// The use case of this script is to get a specific range and add a timestamp that shows the date and time of input.
// The onEdit built-in function automatically adds the timestamp as the user inputs values in the sheet.

function onEdit(e) {

    timeStamp(e);

}

// definir o range
function timeStamp(e) {
    var coluna = e.range.getColumn();
    var linha = e.range.getRow();

    // método para ir buscar a sheet e para adicionar new Date sempre que houver nova entrada de dados no range definido
    if (coluna === 1 && linha > 1 && e.source.getActiveSheet().getName() === "dados") {
        // avalia inputs na coluna A e a partir da linha 2
        var data = new Date();
        e.source.getActiveSheet().getRange(linha, 3).setValue(data); // na coluna C dispõe a hora de registo

        if (e.source.getActiveSheet().getRange(linha, 2).getValue() == "") {
            e.source.getActiveSheet().getRange(linha, 2).setValue(data); // na coluna B dispõe a data de registo
        }
    }
}