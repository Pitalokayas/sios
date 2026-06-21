function initStatistikCharts() {
    const data = window.globalSpreadsheetData;
    if (!data || data.length === 0) return;
    const kecamatanMap = {};
    let markaBaik = 0, markaPudar = 0;
    let rambuBaik = 0, rambuRusak = 0;
    data.forEach(item => {
        const kec = item['Kapanewon'] || item['Kecamatan'] || 'Lainnya';
        if (!kecamatanMap[kec]) { kecamatanMap[kec] = { baik: 0, rusak: 0 }; }
        const mStatus = (item['Kondisi Marka'] || '').toLowerCase();
        const rStatus = (item['Kondisi Rambu'] || '').toLowerCase();
        if (mStatus.includes('pudar') || mStatus.includes('rusak')) { markaPudar++; kecamatanMap[kec].rusak++; }
        else { markaBaik++; kecamatanMap[kec].baik++; }
        if (rStatus.includes('rusak') || rStatus.includes('pudar')) { rambuRusak++; } else { rambuBaik++; }
    });
    const kecLabels = Object.keys(kecamatanMap);
    const kecBaikData = kecLabels.map(k => kecamatanMap[k].baik);
    const kecRusakData = kecLabels.map(k => kecamatanMap[k].rusak);
    new Chart(document.getElementById('chartKecamatan'), {
        type: 'bar',
        data: {
            labels: kecLabels,
            datasets: [
                { label: 'Kondisi Baik/Layak', data: kecBaikData, backgroundColor: '#198754' },
                { label: 'Perlu Perbaikan', data: kecRusakData, backgroundColor: '#dc3545' }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
    new Chart(document.getElementById('chartMarka'), {
        type: 'pie',
        data: { labels: ['Marka Baik', 'Marka Pudar/Rusak'], datasets: [{ data: [markaBaik, markaPudar], backgroundColor: ['#20c997', '#fd7e14'] }] }
    });
    new Chart(document.getElementById('chartRambu'), {
        type: 'pie',
        data: { labels: ['Rambu Baik', 'Rambu Rusak'], datasets: [{ data: [rambuBaik, rambuRusak], backgroundColor: ['#0d6efd', '#6c757d'] }] }
    });
}