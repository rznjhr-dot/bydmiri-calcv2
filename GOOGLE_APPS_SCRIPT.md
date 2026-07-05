# Google Apps Script — Complete Setup

## Langkah 1: Buka Apps Script

1. Buka Google Sheet kau
2. Klik **Extensions → Apps Script**
3. **Padam** semua code lama
4. **Tampal** code bawah ni
5. Klik **Save** (Ctrl+S)

## Code (copy exact)

```javascript
var SHEET_ID = "1Bw4ZlDSL0EWeh082VnTmDgOoeRW9VrJoWuFi690ZdgM";

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Leads");
    if (!sheet) {
      return HtmlService.createHtmlOutput("ERROR: Sheet Leads not found");
    }

    var name = e.parameter.name || "";
    var phone = e.parameter.phone || "";
    var targetCar = e.parameter.targetCar || "";
    var salary = e.parameter.salary || "";
    var timestamp = e.parameter.timestamp || new Date().toISOString();
    var source = e.parameter.source || "";

    sheet.appendRow([timestamp, name, phone, targetCar, salary, source]);
    return HtmlService.createHtmlOutput("OK");
  } catch (err) {
    return HtmlService.createHtmlOutput("ERROR: " + err.toString());
  }
}

function doGet() {
  return HtmlService.createHtmlOutput("OK");
}
```

## Langkah 2: Deploy

1. Klik **Deploy → New deployment**
2. **Select type**: Web app
3. **Execute as**: Me
4. **Who has access**: Anyone
5. Klik **Deploy**
6. **Copy URL** yang keluar
7. Klik **Done**
8. **Buka URL tu** dalam browser — mesti nampak "OK"
9. Bagi aku URL tu
