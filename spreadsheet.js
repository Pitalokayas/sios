// Global shared variable to hold spreadsheet data across all components
window.globalSpreadsheetData = [];
const SPREADSHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdsw-kqJf1uuvB1Ame5UwemOGitSCmhHGI9r4EpxZOgqXHHEGTbMXFxWT5XE8xzk3MppbC9oa1M0YX/pub?output=csv";

async function fetchSpreadsheetData() {
    try {
        const response = await fetch(SPREADSHEET_CSV_URL);
        const csvText = await response.text();
        window.globalSpreadsheetData = parseCSV(csvText);
        const event = new Event('spreadsheetDataLoaded');
        window.dispatchEvent(event);
    } catch (error) {
        console.error("Gagal mengambil data database SiOSS:", error);
    }
}

function parseCSV(text) {
    const lines = text.split(/\r?\n/);
    if (lines.length === 0) return [];
    const headers = parseCSVLine(lines[0]);
    const result = [];
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const currentline = parseCSVLine(lines[i]);
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentline[j] ? currentline[j].trim() : "";
        }
        result.push(obj);
    }
    return result;
}

function parseCSVLine(line) {
    const arr = [];
    let quote = false;
    let col = "";
    for (let c = 0; c < line.length; c++) {
        let char = line[c];
        if (char === '"') { quote = !quote; }
        else if (char === ',' && !quote) { arr.push(col); col = ""; }
        else { col += char; }
    }
    arr.push(col);
    return arr;
}

function refreshSpreadsheetData() { fetchSpreadsheetData(); }
document.addEventListener("DOMContentLoaded", () => { fetchSpreadsheetData(); });