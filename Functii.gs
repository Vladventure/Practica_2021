function doGet(e)
{
  Logger.log(e.parameter);
  return HtmlService.createHtmlOutputFromFile("Interfata");
}

var rateConversie;

function actualizareRata(monedaBaza, monedaDorita)
{
  var url = "https://api.exchangeratesapi.io/latest?base=" + monedaBaza + "&symbols=" + monedaDorita;
  var rezultat = UrlFetchApp.fetch(url);
  rateConversie = JSON.parse(rezultat);
};

function conversie(suma, monedaBaza, monedaDorita)
{
  actualizareRata(monedaBaza, monedaDorita);

  var sumaObtinuta = suma * rateConversie.rates[monedaDorita];

  var tabela = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1p6GvHV65jtrlMSk-Sp4k3EmDRDY3ed2R4qq12LdzYDc/");
  var foaie = tabela.getSheetByName("Rezultate");

  foaie.appendRow([suma, monedaBaza, sumaObtinuta, monedaDorita, new Date()]);
}