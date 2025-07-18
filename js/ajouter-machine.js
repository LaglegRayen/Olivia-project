// Add Machine page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();
    
    // Initialize form
    initializeForm();
    
    // Initialize client search
    initializeClientSearch();
    
    // Add form validation
    addFormValidation();
});

function checkAuthentication() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
}

let selectedClient = null;
let allClients = [];

function initializeForm() {
    const form = document.getElementById('addMachineForm');
    
    // Add form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
    
    // Add input event listeners for real-time validation
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            validateField(this);
        });
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Auto-calculate TTC when HT changes
    document.getElementById('prixHT').addEventListener('input', function() {
        calculateTTC();
    });
}

function initializeClientSearch() {
    // Load all clients (from localStorage and default data)
    loadAllClients();
    
    const clientSearchInput = document.getElementById('clientSearch');
    const searchResults = document.getElementById('clientSearchResults');
    
    // Add search functionality
    clientSearchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        // Filter clients based on search term
        const filteredClients = allClients.filter(client => 
            client.society.toLowerCase().includes(searchTerm) ||
            client.manager.toLowerCase().includes(searchTerm) ||
            client.fiscalNumber.toLowerCase().includes(searchTerm) ||
            client.phone.toLowerCase().includes(searchTerm)
        );
        
        displaySearchResults(filteredClients);
    });
    
    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.client-selection')) {
            searchResults.style.display = 'none';
        }
    });
}

function loadAllClients() {
    // Load saved clients from localStorage
    const savedClients = JSON.parse(localStorage.getItem('oliviaClients') || '[]');
    
    // Default clients data (same as in clients.js)
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
            machines: []
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
            machines: []
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
            machines: []
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
            machines: []
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
            machines: []
        }
    ];
    
    // Merge saved clients with default clients
    if (savedClients.length > 0) {
        const combinedClients = [...defaultClients];
        
        savedClients.forEach(savedClient => {
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
}

function displaySearchResults(clients) {
    const searchResults = document.getElementById('clientSearchResults');
    
    if (clients.length === 0) {
        searchResults.innerHTML = '<div class="no-results">Aucun client trouvé</div>';
        searchResults.style.display = 'block';
        return;
    }
    
    const resultsHTML = clients.map(client => `
        <div class="search-result-item" onclick="selectClient(${client.id})">
            <div class="client-info">
                <strong>${client.society}</strong>
                <div class="client-details">
                    <span>Gérant: ${client.manager}</span>
                    <span>Tél: ${client.phone}</span>
                    <span>Matricule: ${client.fiscalNumber}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    searchResults.innerHTML = resultsHTML;
    searchResults.style.display = 'block';
}

function selectClient(clientId) {
    selectedClient = allClients.find(client => client.id === clientId);
    
    if (selectedClient) {
        // Update selected client display
        const selectedClientDiv = document.getElementById('selectedClient');
        selectedClientDiv.innerHTML = `
            <div class="selected-client-info">
                <div class="client-header">
                    <strong>${selectedClient.society}</strong>
                    <button type="button" class="btn btn-small btn-secondary" onclick="clearSelectedClient()">
                        <i class="fas fa-times"></i> Changer
                    </button>
                </div>
                <div class="client-details">
                    <p><strong>Gérant:</strong> ${selectedClient.manager}</p>
                    <p><strong>Téléphone:</strong> ${selectedClient.phone}</p>
                    <p><strong>Matricule fiscal:</strong> ${selectedClient.fiscalNumber}</p>
                    <p><strong>Adresse:</strong> ${selectedClient.address}</p>
                </div>
            </div>
        `;
        
        // Clear and hide search results
        document.getElementById('clientSearch').value = '';
        document.getElementById('clientSearchResults').style.display = 'none';
        
        // Show success message
        showNotification('Client sélectionné avec succès', 'success');
    }
}

function clearSelectedClient() {
    selectedClient = null;
    document.getElementById('selectedClient').innerHTML = `
        <div class="no-client-selected">
            <i class="fas fa-user-times"></i>
            <p>Aucun client sélectionné</p>
        </div>
    `;
    document.getElementById('clientSearch').focus();
}

function addFormValidation() {
    // Serial number validation
    const serialInput = document.getElementById('serialNumber');
    serialInput.addEventListener('input', function() {
        validateSerialNumber(this);
    });
    
    // Price validation
    const prixHTInput = document.getElementById('prixHT');
    const prixTTCInput = document.getElementById('prixTTC');
    
    prixHTInput.addEventListener('input', function() {
        validatePrice(this);
    });
    
    prixTTCInput.addEventListener('input', function() {
        validatePrice(this);
    });
}

function validateField(field) {
    const fieldContainer = field.closest('.form-group');
    const existingError = fieldContainer.querySelector('.error-message');
    
    // Remove existing error message
    if (existingError) {
        existingError.remove();
    }
    
    // Remove error styling
    field.classList.remove('error');
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'Ce champ est obligatoire');
        return false;
    }
    
    return true;
}

function validateSerialNumber(serialField) {
    const serial = serialField.value.trim();
    
    // Check if serial number already exists
    const existingMachines = JSON.parse(localStorage.getItem('oliviaMachines') || '[]');
    const exists = existingMachines.some(machine => machine.serialNumber === serial);
    
    if (exists) {
        showFieldError(serialField, 'Ce numéro de série existe déjà');
        return false;
    }
    
    return true;
}

function validatePrice(priceField) {
    const price = parseFloat(priceField.value);
    
    if (priceField.value && (isNaN(price) || price < 0)) {
        showFieldError(priceField, 'Le prix doit être un nombre positif');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    const fieldContainer = field.closest('.form-group');
    
    // Add error styling
    field.classList.add('error');
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    fieldContainer.appendChild(errorDiv);
}

function calculateTTC() {
    const prixHT = parseFloat(document.getElementById('prixHT').value);
    const prixTTCField = document.getElementById('prixTTC');
    
    if (!isNaN(prixHT) && prixHT > 0) {
        // Calculate TTC with 7% TVA (typical for Tunisia)
        const tva = 0.07;
        const prixTTC = prixHT * (1 + tva);
        prixTTCField.value = prixTTC.toFixed(2);
    }
}

function validateForm() {
    let isValid = true;
    
    // Check if client is selected
    if (!selectedClient) {
        showNotification('Veuillez sélectionner un client', 'error');
        isValid = false;
    }
    
    // Validate required fields
    const form = document.getElementById('addMachineForm');
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Additional validations
    if (!validateSerialNumber(document.getElementById('serialNumber'))) {
        isValid = false;
    }
    
    return isValid;
}

function handleFormSubmission() {
    if (!validateForm()) {
        showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
        return;
    }
    
    // Show preview modal
    previewMachine();
}

function previewMachine() {
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = getFormData();
    
    // Populate preview modal
    document.getElementById('previewClientInfo').innerHTML = `
        <div class="client-info-display">
            <strong>${selectedClient.society}</strong>
            <p>Gérant: ${selectedClient.manager}</p>
            <p>Matricule: ${selectedClient.fiscalNumber}</p>
        </div>
    `;
    
    document.getElementById('previewSerialNumber').textContent = formData.serialNumber || '-';
    document.getElementById('previewMachineType').textContent = formData.machineType || '-';
    document.getElementById('previewMachineStatus').textContent = formData.machineStatus || '-';
    document.getElementById('previewPrixHT').textContent = formData.prixHT ? formData.prixHT + ' DT' : '-';
    document.getElementById('previewPrixTTC').textContent = formData.prixTTC ? formData.prixTTC + ' DT' : '-';
    document.getElementById('previewDeliveryDate').textContent = formData.deliveryDate || '-';
    document.getElementById('previewInstallationDate').textContent = formData.installationDate || '-';
    document.getElementById('previewPaymentType').textContent = formData.paymentType || '-';
    document.getElementById('previewRemarques').textContent = formData.remarques || 'Aucune remarque';
    
    // Show preview modal
    document.getElementById('previewModal').style.display = 'flex';
}

function getFormData() {
    const form = document.getElementById('addMachineForm');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

function closePreviewModal() {
    document.getElementById('previewModal').style.display = 'none';
}

function confirmAddMachine() {
    const formData = getFormData();
    
    // Save machine
    saveMachine(formData);
    
    // Close preview modal
    closePreviewModal();
    
    // Show success modal
    document.getElementById('successModal').style.display = 'flex';
}

function saveMachine(machineData) {
    // Generate unique ID
    const machineId = Date.now();
    
    // Create machine object
    const newMachine = {
        id: machineId,
        serialNumber: machineData.serialNumber,
        machineType: machineData.machineType,
        ficheNumber: machineData.ficheNumber || '',
        status: machineData.machineStatus,
        prixHT: machineData.prixHT ? parseFloat(machineData.prixHT) : null,
        prixTTC: machineData.prixTTC ? parseFloat(machineData.prixTTC) : null,
        deliveryDate: machineData.deliveryDate || '',
        installationDate: machineData.installationDate || '',
        deliveredBy: machineData.deliveredBy || '',
        installedBy: machineData.installedBy || '',
        paymentType: machineData.paymentType || '',
        paymentStatus: machineData.paymentStatus || '',
        confirmation: machineData.confirmation || '',
        facturation: machineData.facturation || '',
        dischargeBL: machineData.dischargeBL || '',
        visitDate: machineData.visitDate || '',
        remarques: machineData.remarques || '',
        workDone: machineData.workDone || '',
        clientId: selectedClient.id,
        clientSociety: selectedClient.society,
        clientName: selectedClient.manager,
        clientPhone: selectedClient.phone,
        clientFiscalNumber: selectedClient.fiscalNumber,
        clientAddress: selectedClient.address,
        clientLocation: selectedClient.location,
        dateAdded: new Date().toLocaleDateString('fr-FR')
    };
    
    // Save to localStorage
    const existingMachines = JSON.parse(localStorage.getItem('oliviaMachines') || '[]');
    existingMachines.push(newMachine);
    localStorage.setItem('oliviaMachines', JSON.stringify(existingMachines));
    
    // Add machine to client's machines list
    if (selectedClient.machines) {
        selectedClient.machines.push(newMachine.serialNumber);
    } else {
        selectedClient.machines = [newMachine.serialNumber];
    }
    
    // Update client data
    updateClientMachines(selectedClient);
    
    // Log the action
    console.log('Machine ajoutée:', newMachine);
    
    // Show success notification
    showNotification('Machine ajoutée avec succès!', 'success');
}

function updateClientMachines(client) {
    // Update in localStorage if client is a saved client
    const savedClients = JSON.parse(localStorage.getItem('oliviaClients') || '[]');
    const clientIndex = savedClients.findIndex(c => c.id === client.id);
    
    if (clientIndex !== -1) {
        savedClients[clientIndex] = client;
        localStorage.setItem('oliviaClients', JSON.stringify(savedClients));
    }
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    // Reset form
    resetForm();
}

function addAnotherMachine() {
    closeSuccessModal();
    resetForm();
    showNotification('Prêt à ajouter une nouvelle machine', 'info');
}

function goToMachinesList() {
    window.location.href = 'voir-machines.html';
}

function resetForm() {
    const form = document.getElementById('addMachineForm');
    form.reset();
    
    // Clear selected client
    clearSelectedClient();
    
    // Clear all error messages and styling
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
    
    // Focus on client search
    document.getElementById('clientSearch').focus();
}

function cancelAddMachine() {
    if (confirm('Êtes-vous sûr de vouloir annuler ? Toutes les données saisies seront perdues.')) {
        window.location.href = 'voir-machines.html';
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const previewModal = document.getElementById('previewModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === previewModal) {
        closePreviewModal();
    }
    
    if (event.target === successModal) {
        closeSuccessModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Escape key to close modals
    if (event.key === 'Escape') {
        closePreviewModal();
        closeSuccessModal();
    }
    
    // Ctrl+S to save
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        handleFormSubmission();
    }
});
