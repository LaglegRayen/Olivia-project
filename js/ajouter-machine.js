<<<<<<< HEAD
// Add Machine page functionality
=======
// Add Machine page functionality - Simplified
>>>>>>> master
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();
    
    // Initialize form
    initializeForm();
    
<<<<<<< HEAD
    // Initialize client search
    initializeClientSearch();
    
    // Add form validation
    addFormValidation();
=======
    // Load clients for selection
    loadClients();
>>>>>>> master
});

function checkAuthentication() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
}

<<<<<<< HEAD
let selectedClient = null;
=======
>>>>>>> master
let allClients = [];

function initializeForm() {
    const form = document.getElementById('addMachineForm');
    
    // Add form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
    
<<<<<<< HEAD
    // Add input event listeners for real-time validation
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            validateField(this);
        });
=======
    // Add basic validation
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    requiredFields.forEach(field => {
>>>>>>> master
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
<<<<<<< HEAD
    
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
=======
}

async function loadClients() {
    try {
        const response = await fetch('/api/clients');
        if (response.ok) {
            const result = await response.json();
            allClients = result.data || [];
            setupClientSearch();
        }
    } catch (error) {
        console.error('Error loading clients:', error);
    }
}

function setupClientSearch() {
    const clientSearch = document.getElementById('clientSearch');
    const searchResults = document.getElementById('clientSearchResults');
    
    if (!clientSearch || !searchResults) return;
    
    clientSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
>>>>>>> master
        
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
<<<<<<< HEAD
        // Filter clients based on search term
        const filteredClients = allClients.filter(client => 
            client.society.toLowerCase().includes(searchTerm) ||
            client.manager.toLowerCase().includes(searchTerm) ||
            client.fiscalNumber.toLowerCase().includes(searchTerm) ||
            client.phone.toLowerCase().includes(searchTerm)
=======
        const filteredClients = allClients.filter(client => 
            (client.nom && client.nom.toLowerCase().includes(searchTerm)) ||
            (client.prenom && client.prenom.toLowerCase().includes(searchTerm))
>>>>>>> master
        );
        
        displaySearchResults(filteredClients);
    });
<<<<<<< HEAD
    
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
=======
>>>>>>> master
}

function displaySearchResults(clients) {
    const searchResults = document.getElementById('clientSearchResults');
    
    if (clients.length === 0) {
<<<<<<< HEAD
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
=======
        searchResults.style.display = 'none';
        return;
    }
    
    searchResults.innerHTML = '';
    clients.forEach(client => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <strong>${client.nom} ${client.prenom}</strong><br>
            <small>${client.telephone} - ${client.location}</small>
        `;
        resultItem.addEventListener('click', () => selectClient(client));
        searchResults.appendChild(resultItem);
    });
    
    searchResults.style.display = 'block';
}

let selectedClientData = null;

function selectClient(client) {
    selectedClientData = client;
    
    // Update search input
    document.getElementById('clientSearch').value = `${client.nom} ${client.prenom}`;
    
    // Hide search results
    document.getElementById('clientSearchResults').style.display = 'none';
    
    // Show selected client info
    const selectedClient = document.getElementById('selectedClient');
    if (selectedClient) {
        selectedClient.innerHTML = `
            <div class="client-info">
                <h4>${client.nom} ${client.prenom}</h4>
                <p><i class="fas fa-phone"></i> ${client.telephone}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${client.location}</p>
            </div>
        `;
        selectedClient.style.display = 'block';
    }
    
    // Add hidden input for clientId
    let clientIdInput = document.getElementById('selectedClientId');
    if (!clientIdInput) {
        clientIdInput = document.createElement('input');
        clientIdInput.type = 'hidden';
        clientIdInput.id = 'selectedClientId';
        clientIdInput.name = 'clientId';
        document.getElementById('addMachineForm').appendChild(clientIdInput);
    }
    clientIdInput.value = client.id;
}

function populateClientSelect() {
    const clientSelect = document.getElementById('clientId');
    if (!clientSelect) {
        // If there's no clientId select, create client search functionality
        return;
    }
    
    clientSelect.innerHTML = '<option value="">Sélectionner un client</option>';
    
    allClients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = `${client.nom} ${client.prenom}`;
        clientSelect.appendChild(option);
>>>>>>> master
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

<<<<<<< HEAD
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

=======
>>>>>>> master
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

<<<<<<< HEAD
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
    
=======
function validateForm() {
    const form = document.getElementById('addMachineForm');
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Ce champ est obligatoire');
            isValid = false;
        } else {
            // Remove error styling if field is now valid
            field.classList.remove('error');
            const existingError = field.closest('.form-group').querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        }
    });
    
>>>>>>> master
    return isValid;
}

function handleFormSubmission() {
    if (!validateForm()) {
        showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
        return;
    }
    
<<<<<<< HEAD
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
=======
    const formData = getFormData();
    saveMachine(formData);
>>>>>>> master
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

<<<<<<< HEAD
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
=======
async function saveMachine(machineData) {
    try {
        showNotification('Enregistrement en cours...', 'info');
        
        // Format data for API - map HTML form fields to API fields
        const apiData = {
            serialNumber: machineData.serialNumber,
            machineType: machineData.machineType,
            marque: machineData.marque || '',
            modele: machineData.modele || '',
            puissance: machineData.puissance || '',
            status: machineData.machineStatus || 'actif', // HTML uses machineStatus
            clientId: machineData.clientId || '',
            prixHT: parseFloat(machineData.prixHT) || 0,
            prixTTC: parseFloat(machineData.prixTTC) || 0
        };
        
        const response = await fetch('/api/machines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erreur lors de l\'enregistrement');
        }
        
        const result = await response.json();
        console.log('Machine enregistrée:', result);
        
        showNotification('Machine ajoutée avec succès!', 'success');
        resetForm();
        
    } catch (error) {
        console.error('Erreur:', error);
        showNotification(`Erreur: ${error.message}`, 'error');
    }
>>>>>>> master
}

function resetForm() {
    const form = document.getElementById('addMachineForm');
    form.reset();
    
<<<<<<< HEAD
    // Clear selected client
    clearSelectedClient();
=======
    // Clear client selection
    selectedClientData = null;
    document.getElementById('clientSearch').value = '';
    document.getElementById('clientSearchResults').style.display = 'none';
    
    const selectedClient = document.getElementById('selectedClient');
    if (selectedClient) {
        selectedClient.style.display = 'none';
    }
    
    // Remove hidden clientId input
    const clientIdInput = document.getElementById('selectedClientId');
    if (clientIdInput) {
        clientIdInput.remove();
    }
>>>>>>> master
    
    // Clear all error messages and styling
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
    
<<<<<<< HEAD
    // Focus on client search
    document.getElementById('clientSearch').focus();
}

function cancelAddMachine() {
    if (confirm('Êtes-vous sûr de vouloir annuler ? Toutes les données saisies seront perdues.')) {
        window.location.href = 'voir-machines.html';
    }
=======
    // Focus on first input
    document.getElementById('serialNumber').focus();
>>>>>>> master
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

<<<<<<< HEAD
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
=======
// Modal and navigation functions for HTML compatibility
function previewMachine() {
    // Simple preview - just validate and save directly
    handleFormSubmission();
}

function closePreviewModal() {
    // Not needed in simplified version
}

function confirmAddMachine() {
    // Not needed in simplified version - save happens directly
}

function closeSuccessModal() {
    // Reset form after successful save
    resetForm();
}

function addAnotherMachine() {
    // Reset form to add another machine
    resetForm();
    showNotification('Prêt à ajouter une nouvelle machine', 'info');
}

function goToMachinesList() {
    // Navigate to machines list
    window.location.href = 'voir-machines.html';
}

function cancelAddMachine() {
    if (confirm('Êtes-vous sûr de vouloir annuler ? Toutes les données saisies seront perdues.')) {
        window.location.href = 'dashboard.html';
    }
}
>>>>>>> master
