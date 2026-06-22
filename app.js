// ======================================================
// SiOSS Inventarisasi
// ======================================================

function badgeStatus(status){

    if(!status){
        return '<span class="badge bg-secondary">-</span>';
    }

    let s=status.toLowerCase();

    if(s.includes("baik")||s.includes("layak")){

        return `<span class="badge bg-success">${status}</span>`;

    }

    if(s.includes("sedang")){

        return `<span class="badge bg-warning text-dark">${status}</span>`;

    }

    return `<span class="badge bg-danger">${status}</span>`;

}

function initDataTablePage(data){

    const data=window.globalSpreadsheetData;

    const tbody=document.getElementById("tbodyZoSS");

    tbody.innerHTML="";

    data.forEach((item,index)=>{

        tbody.innerHTML+=`

        <tr>

        <td>${index+1}</td>

        <td>

        <strong>${item["Nama Sekolah"]||"-"}</strong>

        </td>

        <td>

        ${item["Jenjang Sekolah"]||"-"}

        </td>

        <td>

        ${item["Kapanewon"]||"-"}

        </td>

        <td>

        ${item["Apakah lokasi sudah memiliki ZoSS?"]||"-"}

        </td>

        <td>

        ${badgeStatus(item["Kondisi Marka ZoSS"])}

        </td>

        <td>

        ${badgeStatus(item["Kondisi Rambu ZoSS"])}

        </td>

        <td>

        ${badgeStatus(item["Kondisi Zebra Cross"])}

        </td>

        <td>

        ${badgeStatus(item["Kondisi Pita Penggaduh"])}

        </td>

        <td>

        ${item["Tahun Pemasangan ZoSS"]||"-"}

        </td>

        </tr>

        `;

    });

    document.getElementById("loading-spinner").classList.add("d-none");

    document.getElementById("table-container").classList.remove("d-none");

    if($.fn.DataTable.isDataTable("#tableZoSS")){

        $("#tableZoSS").DataTable().destroy();

    }

    $("#tableZoSS").DataTable({

        responsive:true,

        autowidth:false

        language:{
            url:"https://cdn.datatables.net/plug-ins/1.13.7/i18n/id.json"
        }

    });

function refreshSpreadsheetData() {
    fetchSpreadsheetData();
}
