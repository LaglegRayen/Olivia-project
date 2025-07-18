// Add Client page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();
    
    // Initialize form
    initializeForm();
    
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

function initializeForm() {
    const form = document.getElementById('addClientForm');
    
    // Add form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
    
    // Add input event listeners for real-time validation
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            validateField(this);
        });
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Set default values
    document.getElementById('status').value = 'actif';
}

function addFormValidation() {
    // Phone number validation
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        validatePhoneNumber(this);
    });
    
    // Email validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function() {
        validateEmail(this);
    });
    
    // Fiscal number validation
    const fiscalInput = document.getElementById('fiscalNumber');
    fiscalInput.addEventListener('input', function() {
        validateFiscalNumber(this);
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
    
    // Field-specific validation
    if (field.type === 'email' && field.value.trim()) {
        return validateEmail(field);
    }
    
    if (field.type === 'tel' && field.value.trim()) {
        return validatePhoneNumber(field);
    }
    
    if (field.id === 'fiscalNumber' && field.value.trim()) {
        return validateFiscalNumber(field);
    }
    
    return true;
}

function validateEmail(emailField) {
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        showFieldError(emailField, 'Format d\'email invalide');
        return false;
    }
    
    return true;
}

function validatePhoneNumber(phoneField) {
    const phone = phoneField.value.trim();
    const phoneRegex = /^[0-9\/\s\-\+]+$/;
    
    if (phone && !phoneRegex.test(phone)) {
        showFieldError(phoneField, 'Format de téléphone invalide');
        return false;
    }
    
    if (phone && phone.length < 8) {
        showFieldError(phoneField, 'Le numéro de téléphone doit contenir au moins 8 chiffres');
        return false;
    }
    
    return true;
}

function validateFiscalNumber(fiscalField) {
    const fiscal = fiscalField.value.trim();
    
    if (fiscal && fiscal.length < 5) {
        showFieldError(fiscalField, 'Le matricule fiscal doit contenir au moins 5 caractères');
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

function validateForm() {
    const form = document.getElementById('addClientForm');
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function handleFormSubmission() {
    if (!validateForm()) {
        showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
        return;
    }
    
    // Show preview modal
    previewClient();
}

function previewClient() {
    if (!validateForm()) {
        showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
        return;
    }
    
    // Get form data
    const formData = getFormData();
    
    // Populate preview modal
    document.getElementById('previewSociety').textContent = formData.society || '-';
    document.getElementById('previewManager').textContent = formData.manager || '-';
    document.getElementById('previewFiscalNumber').textContent = formData.fiscalNumber || '-';
    document.getElementById('previewType').textContent = formData.clientType || '-';
    document.getElementById('previewPhone').textContent = formData.phone || '-';
    document.getElementById('previewEmail').textContent = formData.email || '-';
    document.getElementById('previewAddress').textContent = formData.address || '-';
    document.getElementById('previewLocation').textContent = formData.location || '-';
    document.getElementById('previewPaymentMode').textContent = formData.paymentMode || '-';
    document.getElementById('previewPaymentStatus').textContent = formData.paymentStatus || '-';
    document.getElementById('previewNotes').textContent = formData.notes || 'Aucune note';
    
    // Show preview modal
    document.getElementById('previewModal').style.display = 'flex';
}

function getFormData() {
    const form = document.getElementById('addClientForm');
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

function confirmAddClient() {
    const formData = getFormData();
    
    // Simulate saving to database
    saveClient(formData);
    
    // Close preview modal
    closePreviewModal();
    
    // Show success modal
    document.getElementById('successModal').style.display = 'flex';
}

function saveClient(clientData) {
    // Generate a unique ID
    const clientId = Date.now();
    
    // Create client object
    const newClient = {
        id: clientId,
        society: clientData.society,
        manager: clientData.manager,
        fiscalNumber: clientData.fiscalNumber,
        phone: clientData.phone,
        email: clientData.email || '-',
        address: clientData.address,
        location: clientData.location,
        type: clientData.clientType,
        status: clientData.status,
        paymentMode: clientData.paymentMode || '-',
        paymentStatus: clientData.paymentStatus || '-',
        notes: clientData.notes || '',
        dateAdded: new Date().toLocaleDateString('fr-FR'),
        machines: [] // Empty array for now
    };
    
    // Get existing clients from localStorage
    let existingClients = JSON.parse(localStorage.getItem('oliviaClients') || '[]');
    
    // Add new client
    existingClients.push(newClient);
    
    // Save back to localStorage
    localStorage.setItem('oliviaClients', JSON.stringify(existingClients));
    
    // Log the action
    console.log('Client ajouté:', newClient);
    
    // Show success notification
    showNotification('Client ajouté avec succès!', 'success');
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    // Reset form
    resetForm();
}

function addAnotherClient() {
    closeSuccessModal();
    resetForm();
    showNotification('Prêt à ajouter un nouveau client', 'info');
}

function goToClientsList() {
    window.location.href = 'clients.html';
}

function resetForm() {
    const form = document.getElementById('addClientForm');
    form.reset();
    
    // Reset default values
    document.getElementById('status').value = 'actif';
    
    // Clear all error messages and styling
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
    
    // Focus on first input
    document.getElementById('society').focus();
}

function cancelAddClient() {
    if (confirm('Êtes-vous sûr de vouloir annuler ? Toutes les données saisies seront perdues.')) {
        window.location.href = 'clients.html';
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



// Clear draft when form is successfully submitted
function saveClient(clientData) {
    // Generate a unique ID
    const clientId = Date.now();
    
    // Create client object
    const newClient = {
        id: clientId,
        society: clientData.society,
        manager: clientData.manager,
        fiscalNumber: clientData.fiscalNumber,
        phone: clientData.phone,
        email: clientData.email || '-',
        address: clientData.address,
        location: clientData.location,
        type: clientData.clientType,
        status: clientData.status,
        paymentMode: clientData.paymentMode || '-',
        paymentStatus: clientData.paymentStatus || '-',
        notes: clientData.notes || '',
        dateAdded: new Date().toLocaleDateString('fr-FR'),
        machines: [] // Empty array for now
    };
    
    // Get existing clients from localStorage
    let existingClients = JSON.parse(localStorage.getItem('oliviaClients') || '[]');
    
    // Add new client
    existingClients.push(newClient);
    
    // Save back to localStorage
    localStorage.setItem('oliviaClients', JSON.stringify(existingClients));
    
    // Log the action
    console.log('Client ajouté:', newClient);
    
    // Show success notification
    showNotification('Client ajouté avec succès!', 'success');
}
