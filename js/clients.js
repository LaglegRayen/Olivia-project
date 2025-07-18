// Clients page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();
    
    // Load clients data
    loadClientsData();
    
    // Initialize search and filters
    initializeSearch();
    
    // Initialize modal
    initializeModal();
});

function checkAuthentication() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
}

let allClients = [];

function loadClientsData() {
    // Load existing clients from localStorage first
    const savedClients = JSON.parse(localStorage.getItem('oliviaClients') || '[]');
    
    // Default clients data (from CSV files)
    const defaultClients = [
        {
            id: 1,
            society: 'BTK lease plc sté Boujelbene de prod.huile dolive',
            manager: 'Daly Bujelbène',
            fiscalNumber: '172058',
            phone: '98796145',
            email: '-',
            address: 'Kassas n°9 gremda et taniour',
            location: 'Sfax',
            type: 'Leasing',
            status: 'Actif',
            machines: ['91938832']
        },
        {
            id: 2,
            society: 'Wifak Bank PC khelifi extra virgin Olive Oil',
            manager: 'Walid HAMDI/Hatem Hamdi/Ikbel',
            fiscalNumber: '0798651LAM000',
            phone: '97915490/58997363/98792914',
            email: 'khelifi.extra.virgin.olive.oil.com',
            address: 'Sidi Bouzid',
            location: 'Sidi Bouzid',
            type: 'Leasing',
            status: 'Actif',
            machines: ['91918444']
        },
        {
            id: 3,
            society: 'Sté Zayatine el Mansour',
            manager: 'Ramzi Rezgui (Slim charfi)',
            fiscalNumber: '1446112PNM000',
            phone: '24571000',
            email: '-',
            address: 'Rte El Matar Sfax',
            location: 'Sfax',
            type: 'Direct',
            status: 'Actif',
            machines: ['91917625']
        },
        {
            id: 4,
            society: 'Huilerie Amna',
            manager: 'Mohamed Bibi',
            fiscalNumber: '1687750ENM000',
            phone: '24298000',
            email: '-',
            address: 'Cité el maaser Mahres sfax',
            location: 'Sfax',
            type: 'Direct',
            status: 'Actif',
            machines: ['91937594']
        },
        {
            id: 5,
            society: 'Huilerie Allouche Mustapha',
            manager: 'Allouche Mustapha ben Mohamed',
            fiscalNumber: '1122754X/N/C/000',
            phone: '99246707',
            email: '-',
            address: 'Rte de Taniour chehia 3041',
            location: 'Autres',
            type: 'Agri',
            status: 'Actif',
            machines: ['91936180']
        },
        {
            id: 6,
            society: 'BTK LEASING PLC Guesmi Moez',
            manager: 'Moez Guesmi',
            fiscalNumber: '578857A',
            phone: '26819002',
            email: 'badis.guesmi@yahoo.com',
            address: 'Khecham ouest saida-sidi bouzid',
            location: 'Sidi Bouzid',
            type: 'Leasing',
            status: 'Actif',
            machines: ['91938465']
        },
        {
            id: 7,
            society: 'Huilerie Noor Oil',
            manager: 'Hazem Haddar',
            fiscalNumber: '1165237PNM000',
            phone: '56830240',
            email: '-',
            address: 'Rte Gremda km16 sfax',
            location: 'Sfax',
            type: 'Direct',
            status: 'Actif',
            machines: ['91940635']
        },
        {
            id: 8,
            society: 'Sté Huilerie zitouna',
            manager: 'Adnen Ammar',
            fiscalNumber: '1019439GPM000',
            phone: '98438713',
            email: '-',
            address: 'Gremda, sfax',
            location: 'Sfax',
            type: 'Direct',
            status: 'Actif',
            machines: ['91934622']
        },
        {
            id: 9,
            society: 'Sté Golden Olivki',
            manager: 'Samir Abida',
            fiscalNumber: '1859930MAM000',
            phone: '22667042',
            email: '-',
            address: 'Borj El Amri',
            location: 'Autres',
            type: 'Direct',
            status: 'Actif',
            machines: ['91910220']
        },
        {
            id: 10,
            society: 'Sté chebla',
            manager: 'Samir Ouni',
            fiscalNumber: '1215661/G/N/M/000',
            phone: '98373634',
            email: '-',
            address: 'Bir Ali Ben Kalifa',
            location: 'Autres',
            type: 'Direct',
            status: 'Actif',
            machines: ['91935614']
        }
    ];
    
    // If there are saved clients, merge them with default clients
    if (savedClients.length > 0) {
        // Combine saved clients with default clients, avoid duplicates
        const combinedClients = [...defaultClients];
        
        savedClients.forEach(savedClient => {
            // Check if client already exists (by fiscal number)
            const exists = combinedClients.some(client => 
                client.fiscalNumber === savedClient.fiscalNumber
            );
            
            if (!exists) {
                combinedClients.push(savedClient);
            }
        });
        
        allClients = combinedClients;
    } else {
        allClients = defaultClients;
    }
    
    displayClients(allClients);
    updateClientCount(allClients.length);
}

function displayClients(clients) {
    const tbody = document.getElementById('clientsTableBody');
    tbody.innerHTML = '';
    
    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${client.society}</strong><br>
                <small style="color: #65676b;">${client.fiscalNumber}</small>
            </td>
            <td>${client.manager}</td>
            <td>${client.phone}</td>
            <td>${client.email}</td>
            <td>${client.location}</td>
            <td><span class="status-badge ${getTypeClass(client.type)}">${client.type}</span></td>
            <td>${client.machines.length} machine(s)</td>
            <td>
                <button class="btn btn-primary btn-small" onclick="viewClient(${client.id})">
                    <i class="fas fa-eye"></i> Voir
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function getTypeClass(type) {
    switch(type.toLowerCase()) {
        case 'leasing':
            return 'status-recent';
        case 'direct':
            return 'status-active';
        case 'agri':
            return 'status-maintenance';
        default:
            return 'status-inactive';
    }
}

function updateClientCount(count) {
    document.getElementById('totalClientsCount').textContent = `${count} clients`;
}

function initializeSearch() {
    const searchInput = document.getElementById('clientSearch');
    const statusFilter = document.getElementById('statusFilter');
    const typeFilter = document.getElementById('typeFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    searchInput.addEventListener('input', filterClients);
    statusFilter.addEventListener('change', filterClients);
    typeFilter.addEventListener('change', filterClients);
    locationFilter.addEventListener('change', filterClients);
}

function searchClients() {
    filterClients();
}

function filterClients() {
    const searchTerm = document.getElementById('clientSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    
    let filteredClients = allClients.filter(client => {
        const matchesSearch = !searchTerm || 
            client.society.toLowerCase().includes(searchTerm) ||
            client.manager.toLowerCase().includes(searchTerm) ||
            client.phone.includes(searchTerm) ||
            client.fiscalNumber.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilter || client.status.toLowerCase() === statusFilter;
        const matchesType = !typeFilter || client.type.toLowerCase() === typeFilter;
        const matchesLocation = !locationFilter || client.location.toLowerCase() === locationFilter;
        
        return matchesSearch && matchesStatus && matchesType && matchesLocation;
    });
    
    displayClients(filteredClients);
    updateClientCount(filteredClients.length);
}

function viewClient(clientId) {
    const client = allClients.find(c => c.id === clientId);
    if (client) {
        showClientModal(client);
    }
}

function showClientModal(client) {
    document.getElementById('modalSociety').textContent = client.society;
    document.getElementById('modalManager').textContent = client.manager;
    document.getElementById('modalFiscalNumber').textContent = client.fiscalNumber;
    document.getElementById('modalPhone').textContent = client.phone;
    document.getElementById('modalEmail').textContent = client.email;
    document.getElementById('modalAddress').textContent = client.address;
    document.getElementById('modalLocation').textContent = client.location;
    document.getElementById('modalType').textContent = client.type;
    
    // Show client machines
    const machinesContainer = document.getElementById('clientMachines');
    machinesContainer.innerHTML = '';
    
    client.machines.forEach(machineSerial => {
        const machineDiv = document.createElement('div');
        machineDiv.className = 'machine-item';
        machineDiv.innerHTML = `
            <span class="machine-serial">${machineSerial}</span>
            <span class="status-badge status-active">Actif</span>
            <a href="voir-machines.html?serial=${machineSerial}" class="btn btn-small btn-primary">
                <i class="fas fa-eye"></i> Voir
            </a>
        `;
        machinesContainer.appendChild(machineDiv);
    });
    
    document.getElementById('clientModal').style.display = 'block';
}

function closeClientModal() {
    document.getElementById('clientModal').style.display = 'none';
}

function showAddClientModal() {
    // TODO: Implement add client modal
    alert('Fonctionnalité d\'ajout de client en cours de développement');
}

function editClient() {
    // TODO: Implement edit client functionality
    alert('Fonctionnalité de modification en cours de développement');
}

function initializeModal() {
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('clientModal');
        if (e.target === modal) {
            closeClientModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeClientModal();
        }
    });
}
