// ======================================================
// SiOSS Sleman
// Google Spreadsheet Connector
// ======================================================

window.globalSpreadsheetData = [];

const SPREADSHEET_CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vRdsw-kqJf1uuvB1Ame5UwemOGitSCmhHGI9r4EpxZOgqXHHEGTbMXFxWT5XE8xzk3MppbC9oa1M0YX/pub?output=csv";

async function fetchSpreadsheetData() {

    try {

        // Loading
        const loading = document.getElementById("loading-spinner");
        const table = document.getElementById("table-container");

        if (loading) loading.classList.remove("d-none");
        if (table) table.classList.add("d-none");

        console.log("Menghubungkan ke Google Spreadsheet...");

        const response = await fetch(
            SPREADSHEET_CSV_URL + "&t=" + Date.now(),
            {
                method: "GET",
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error("HTTP Error : " + response.status);
        }

        const csv = await response.text();

        const result = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: false
        });

        if (result.errors.length > 0) {
            console.warn("PapaParse Warning :", result.errors);
        }

        window.globalSpreadsheetData = result.data;

        console.log("====================================");
        console.log("Spreadsheet berhasil dibaca");
        console.log("Jumlah data :", result.data.length);
        console.log("Header :", Object.keys(result.data[0] || {}));
        console.log(result.data);
        console.log("====================================");

        window.dispatchEvent(
            new CustomEvent("spreadsheetDataLoaded", {
                detail: result.data
            })
        );

    } catch (err) {

        console.error("Gagal mengambil Spreadsheet :", err);

        const loading = document.getElementById("loading-spinner");

        if (loading) {

            loading.innerHTML = `
                <div class="alert alert-danger">
                    <h5>Gagal terhubung ke Google Spreadsheet</h5>
                    <p>${err.message}</p>
                </div>
            `;

        }

    }

}

function refreshSpreadsheetData() {

    console.log("Refresh data...");

    fetchSpreadsheetData();

}

document.addEventListener("DOMContentLoaded", fetchSpreadsheetData);
