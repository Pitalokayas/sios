function initLeafletMap() {
    const data = window.globalSpreadsheetData;
    const map = L.map('map').setView([-7.715, 110.355], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OSM contributors' }).addTo(map);
    data.forEach(item => {
        const lat = parseFloat(item['Latitude'] || item['lat']);
        const lng = parseFloat(item['Longitude'] || item['lng'] || item['long']);
        if (isNaN(lat) || isNaN(lng)) return;
        const schoolName = item['Nama Sekolah'] || item['Nama Lokasi'] || 'Fasilitas ZoSS';
        const markaCond = item['Kondisi Marka'] || 'Baik';
        const rambuCond = item['Kondisi Rambu'] || 'Baik';
        const markerColor = (markaCond.toLowerCase().includes('pudar') || rambuCond.toLowerCase().includes('rusak')) ? 'red' : 'green';
        const customIcon = L.divIcon({
            className: 'custom-div-marker',
            html: `<div style="background-color: ${markerColor}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [14, 14]
        });
        const popupContent = `<div class="zoss-popup-title">${schoolName}</div><div class="small"><b>Marka:</b> ${markaCond}<br><b>Rambu:</b> ${rambuCond}</div>`;
        L.marker([lat, lng], { icon: customIcon }).addTo(map).bindPopup(popupContent);
    });
}