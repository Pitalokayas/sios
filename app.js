function initDashboard() {
    const data = window.globalSpreadsheetData;
    if (!data || data.length === 0) return;
    const totalCount = data.length;
    let layakCount = 0; let rusakCount = 0;
    data.forEach(item => {
        const kondisiMarka = (item['Kondisi Marka'] || '').toLowerCase();
        if (kondisiMarka.includes('baik') || kondisiMarka.includes('layak')) { layakCount++; }
        else { rusakCount++; }
    });
    document.getElementById('total-zoss').innerText = totalCount;
    document.getElementById('total-layak').innerText = layakCount;
    document.getElementById('total-rusak').innerText = rusakCount;
    const ctx = document.getElementById('chartRingkasan').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Layak / Baik', 'Perlu Pemeliharaan'],
            datasets: [{ data: [layakCount, rusakCount], backgroundColor: ['#198754', '#dc3545'], borderWidth: 1 }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });
}

function initDataTablePage() {
    const data = window.globalSpreadsheetData;
    const tbody = document.getElementById('tbodyZoSS');
    if (!tbody) return;
    tbody.innerHTML = '';
    data.forEach((item, index) => {
        const tr = document.createElement('tr');
        const markaStatus = (item['Kondisi Marka'] || 'Baik');
        const badgeMarka = markaStatus.toLowerCase().includes('pudar') || markaStatus.toLowerCase().includes('rusak') 
            ? `<span class="badge badge-status-rusak">${markaStatus}</span>` : `<span class="badge badge-status-baik">${markaStatus}</span>`;
        const rambuStatus = (item['Kondisi Rambu'] || 'Baik');
        const badgeRambu = rambuStatus.toLowerCase().includes('rusak') || rambuStatus.toLowerCase().includes('pudar')
            ? `<span class="badge badge-status-rusak">${rambuStatus}</span>` : `<span class="badge badge-status-baik">${rambuStatus}</span>`;
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item['Nama Sekolah'] || item['Nama Lokasi'] || 'Fasilitas ZoSS'}</strong></td>
            <td>${item['Kapanewon'] || item['Kecamatan'] || '-'}</td>
            <td>${item['Kalurahan'] || item['Desa'] || '-'}</td>
            <td>${badgeMarka}</td>
            <td>${badgeRambu}</td>
            <td>${item['Fasilitas Tambahan'] || '-'}</td>
            <td>${item['Keterangan'] || '-'}</td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById('loading-spinner').classList.add('d-none');
    document.getElementById('table-container').classList.remove('d-none');
    $('#tableZoSS').DataTable({ responsive: true, pageLength: 10, language: { url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/id.json' } });
}