// Machine viewing functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();
    
    // Initialize search functionality
    initializeMachineSearch();
});

function checkAuthentication() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
}

function initializeMachineSearch() {
    // Allow search on Enter key
    document.getElementById('machineSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchMachine();
        }
    });
}

// Machine search functionality
function searchMachine() {
    const searchTerm = document.getElementById('machineSearch').value.trim();
    const typeFilter = document.getElementById('typeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    if (!searchTerm) {
        alert('Veuillez entrer un terme de recherche');
        return;
    }
    
    // Hide instructions and show loading state
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('noResults').style.display = 'none';
    document.getElementById('machineDetails').style.display = 'none';
    
    // Simulate API call - replace with actual API call
    setTimeout(() => {
        // This is where you'll call your JSON API
        // For now, showing a placeholder
        displayMachineDetails(getSampleMachineData());
    }, 500);
}

function displayMachineDetails(machineData) {
    if (!machineData) {
        document.getElementById('noResults').style.display = 'block';
        return;
    }
    
    // Populate the fiche technique with data
    document.getElementById('serialNumber').textContent = machineData.serialNumber || '-';
    document.getElementById('machineType').textContent = machineData.machineType || '-';
    document.getElementById('ficheNumber').textContent = machineData.ficheNumber || '-';
    document.getElementById('prixHT').textContent = machineData.prixHT || '-';
    document.getElementById('prixTTC').textContent = machineData.prixTTC || '-';
    
    // Set status badge
    const statusBadge = document.getElementById('machineStatus');
    statusBadge.textContent = machineData.status || '-';
    statusBadge.className = `status-badge ${getStatusClass(machineData.status)}`;
    
    // Client information
    document.getElementById('clientSociety').textContent = machineData.clientSociety || '-';
    document.getElementById('clientName').textContent = machineData.clientName || '-';
    document.getElementById('matriculeFiscale').textContent = machineData.matriculeFiscale || '-';
    document.getElementById('clientPhone').textContent = machineData.clientPhone || '-';
    document.getElementById('clientEmail').textContent = machineData.clientEmail || '-';
    document.getElementById('clientAddress').textContent = machineData.clientAddress || '-';
    document.getElementById('clientLocation').textContent = machineData.clientLocation || '-';
    
    // Installation information
    document.getElementById('deliveryDate').textContent = machineData.deliveryDate || '-';
    document.getElementById('installationDate').textContent = machineData.installationDate || '-';
    document.getElementById('installedBy').textContent = machineData.installedBy || '-';
    document.getElementById('deliveredBy').textContent = machineData.deliveredBy || '-';
    document.getElementById('dischargeBL').textContent = machineData.dischargeBL || '-';
    document.getElementById('facturation').textContent = machineData.facturation || '-';
    
    // Payment information
    document.getElementById('paymentType').textContent = machineData.paymentType || '-';
    document.getElementById('paymentStatus').textContent = machineData.paymentStatus || '-';
    document.getElementById('confirmation').textContent = machineData.confirmation || '-';
    document.getElementById('itp').textContent = machineData.itp || '-';
    document.getElementById('rs').textContent = machineData.rs || '-';
    
    // Maintenance & remarks
    document.getElementById('remarques').textContent = machineData.remarques || '-';
    document.getElementById('visitDate').textContent = machineData.visitDate || '-';
    document.getElementById('workDone').textContent = machineData.workDone || '-';
    
    // Show the machine details
    document.getElementById('machineDetails').style.display = 'block';
}

function getStatusClass(status) {
    if (!status) return '';
    const statusLower = status.toLowerCase();
    if (statusLower.includes('livré')) return 'status-active';
    if (statusLower.includes('installé')) return 'status-active';
    if (statusLower.includes('maintenance')) return 'status-maintenance';
    if (statusLower.includes('problème')) return 'status-problem';
    return 'status-recent';
}

function getSampleMachineData() {
    // Sample data structure - replace with actual API response
    return {
        serialNumber: '91938832',
        machineType: 'Olivia + Broyeur',
        ficheNumber: '001',
        prixHT: '115,560.75 DT',
        prixTTC: '123,651.00 DT',
        status: 'Installé',
        clientSociety: 'BTK lease plc sté Boujelbene de prod.huile dolive',
        clientName: 'Daly Bujelbène',
        matriculeFiscale: '172058',
        clientPhone: '98796145',
        clientEmail: '-',
        clientAddress: 'Kassas n°9 gremda et taniour',
        clientLocation: 'Sfax',
        deliveryDate: '3/10/2024',
        installationDate: '3/10/2024',
        installedBy: 'Imed + Amine',
        deliveredBy: 'Imed + Amine',
        dischargeBL: 'Décharge BL reçu',
        facturation: 'Facturé avec décharge',
        paymentType: 'Leasing',
        paymentStatus: 'Paiement reçu',
        confirmation: 'Oui',
        itp: '-',
        rs: '-',
        remarques: 'Sans fiche technique',
        visitDate: '-',
        workDone: '-'
    };
}

function printFiche() {
    window.print();
}

function exportFiche() {
    alert('Fonction d\'export en cours de développement');
}
