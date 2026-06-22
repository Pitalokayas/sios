// ======================================================
// SiOSS Sleman - FIXED Spreadsheet Connector
// ======================================================

window.globalSpreadsheetData = [];

const SPREADSHEET_CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vRdsw-kqJf1uuvB1Ame5UwemOGitSCmhHGI9r4EpxZOgqXHHEGTbMXFxWT5XE8xzk3MppbC9oa1M0YX/pub?output=csv";

async function fetchSpreadsheetData() {

    const loading = document.getElementById("loading-spinner");
    const table = document.getElementById("table-container");
    const errorBox = document.getElementById("error-message");

    try {
        console.log("🚀 Fetching spreadsheet...");

        loading?.classList.remove("d-none");
        table?.classList.add("d-none");
        errorBox?.classList.add("d-none");

        const response = await fetch(SPREADSHEET_CSV_URL + "&t=" + Date.now());

        if (!response.ok) {
            throw new Error("HTTP Error " + response.status);
        }

        const csv = await response.text();

        if (!csv || csv.length < 10) {
            throw new Error("CSV kosong / tidak valid");
        }

        const result = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true
        });

        if (!result.data || result.data.length === 0) {
            throw new Error("Data tidak terbaca (cek header spreadsheet)");
        }

        window.globalSpreadsheetData = result.data;

        console.log("✅ Data loaded:", result.data.length);

        // 🔥 langsung render (TIDAK pakai event ribet)
        renderTable(result.data);

    } catch (err) {

        console.error("❌ Error:", err);

        loading.innerHTML = `
            <div class="alert alert-danger">
                <b>Gagal load spreadsheet</b><br>
                ${err.message}
            </div>
        `;
    }
}
function renderTable(data) {

    const tbody = document.getElementById("tbodyZoSS");

    tbody.innerHTML = "";

    data.forEach((row, i) => {

        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${row["Nama Sekolah"] || "-"}</td>
                <td>${row["Lokasi"] || "-"}</td>
                <td>${row["Kapanewon"] || "-"}</td>
                <td>${row["Kondisi Marka ZoSS"] || "-"}</td>
                <td>${row["Kondisi Rambu ZoSS"] || "-"}</td>
                <td>${row["Zebra Cross"] || "-"}</td>
                <td>${row["Pita Penggaduh"] || "-"}</td>
                <td>${row["Tahun"] || "-"}</td>
            </tr>
        `;
    });

    // destroy DataTable kalau ada
    if ($.fn.DataTable.isDataTable("#tableZoSS")) {
        $("#tableZoSS").DataTable().destroy();
    }

    $("#tableZoSS").DataTable({
        responsive: true,
        autoWidth: false
    });

    document.getElementById("loading-spinner").classList.add("d-none");
    document.getElementById("table-container").classList.remove("d-none");
}
