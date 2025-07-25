<<<<<<< HEAD
// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkAuthentication();
    
    // Load dashboard data
    loadDashboardData();
    
    // Initialize dashboard components
    initializeDashboard();
});

function checkAuthentication() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
}

function loadDashboardData() {
    // Simulate loading data from API
    setTimeout(() => {
        updateStatCards();
        loadRecentActivities();
    }, 500);
}

function updateStatCards() {
    // Simulate data from CSV files
    const stats = {
        totalMachines: 27,
        activeMachines: 24,
        maintenanceMachines: 3,
        totalClients: 25
    };
    
    document.getElementById('totalMachines').textContent = stats.totalMachines;
    document.getElementById('activeMachines').textContent = stats.activeMachines;
    document.getElementById('maintenanceMachines').textContent = stats.maintenanceMachines;
    document.getElementById('totalClients').textContent = stats.totalClients;
    
    // Add animation
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-info h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 20;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

function loadRecentActivities() {
    // Simulate recent activities data
    const activities = [
        {
            date: '2024-11-15',
            machine: 'Olivia + Broyeur',
            serialNumber: '91941521',
            client: 'BTK LEASING PC STE ELHABIB',
            action: 'Installation',
            status: 'Terminé'
        },
        {
            date: '2024-11-12',
            machine: 'Olivia',
            serialNumber: '91936180',
            client: 'Huilerie Allouche Mustapha',
            action: 'Livraison',
            status: 'Terminé'
        },
        {
            date: '2024-11-10',
            machine: 'Olivia + Broyeur',
            serialNumber: '91937594',
            client: 'Huilerie Amna',
            action: 'Facturation',
            status: 'En cours'
        },
        {
            date: '2024-11-08',
            machine: 'Olivia + Broyeur',
            serialNumber: '91938465',
            client: 'Huilerie Et Mise En Bouteilles Moez Guesmi',
            action: 'Maintenance',
            status: 'Terminé'
        },
        {
            date: '2024-11-05',
            machine: 'Olivia + Broyeur',
            serialNumber: '91940635',
            client: 'Huilerie Noor Oil',
            action: 'Installation',
            status: 'Terminé'
        }
    ];
    
    const tbody = document.getElementById('recentActivities');
    tbody.innerHTML = '';
    
    activities.forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(activity.date)}</td>
            <td>${activity.machine}<br><small style="color: #65676b;">${activity.serialNumber}</small></td>
            <td>${activity.client}</td>
            <td>${activity.action}</td>
            <td><span class="status-badge ${getStatusClass(activity.status)}">${activity.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'terminé':
            return 'status-active';
        case 'en cours':
            return 'status-recent';
        case 'annulé':
            return 'status-problem';
        default:
            return 'status-maintenance';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function initializeDashboard() {
    // Add click handlers for stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.stat-info p').textContent;
            handleStatCardClick(title);
        });
    });
}

function handleStatCardClick(title) {
    switch(title) {
        case 'Total machines':
            window.location.href = 'voir-machines.html';
            break;
        case 'Machines actives':
            window.location.href = 'voir-machines.html?status=active';
            break;
        case 'En maintenance':
            window.location.href = 'maintenance.html';
            break;
        case 'Clients':
            window.location.href = 'clients.html';
            break;
    }
}
=======
// Role-Based Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication and load user data
    checkAuthentication();
    
    // Initialize dashboard components
    initializeDashboard();
    
    // Load dashboard data
    loadDashboardData();
});

function checkAuthentication() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = '../auth.html';
        return;
    }
    
    try {
        const user = JSON.parse(currentUser);
        displayUserInfo(user);
        configureNavigationByRole(user.role);
    } catch (error) {
        console.error('Error parsing user data:', error);
        sessionStorage.removeItem('currentUser');
        window.location.href = '../auth.html';
    }
}

function displayUserInfo(user) {
    const userInfo = document.getElementById('userInfo');
    const roleName = user.role_info ? user.role_info.name : user.role;
    userInfo.textContent = `${user.name} - ${roleName}`;
}

function configureNavigationByRole(userRole) {
    const adminOnlyItems = ['nav-users-item', 'nav-add-client-item'];
    const deliveryManagerItems = ['nav-add-machine-item'];
    
    // Hide admin-only items for non-admin users
    if (userRole !== 'admin') {
        adminOnlyItems.forEach(itemId => {
            const item = document.getElementById(itemId);
            if (item) item.style.display = 'none';
        });
    }
    
    // Hide delivery manager items for non-delivery managers and non-admins
    if (userRole !== 'admin' && userRole !== 'delivery_manager') {
        deliveryManagerItems.forEach(itemId => {
            const item = document.getElementById(itemId);
            if (item) item.style.display = 'none';
        });
    }
    
    // Configure quick actions
    configureQuickActionsByRole(userRole);
}

function configureQuickActionsByRole(userRole) {
    const quickActionsSection = document.getElementById('quickActionsSection');
    if (!quickActionsSection) return;
    
    // Hide/show quick action cards based on role
    const addMachineCard = document.getElementById('action-add-machine');
    const addClientCard = document.getElementById('action-add-client');
    const manageUsersCard = document.getElementById('action-manage-users');
    
    if (userRole !== 'admin' && userRole !== 'delivery_manager') {
        if (addMachineCard) addMachineCard.style.display = 'none';
    }
    
    if (userRole !== 'admin') {
        if (addClientCard) addClientCard.style.display = 'none';
        if (manageUsersCard) manageUsersCard.style.display = 'none';
    }
}

async function loadDashboardData() {
    try {
        showLoading();
        
        // Load role-based dashboard data
        await Promise.all([
            loadDashboardStats(),
            loadMyTasks()
        ]);
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showErrorMessage('Erreur lors du chargement des données');
    } finally {
        hideLoading();
    }
}

async function loadDashboardStats() {
    try {
        const response = await fetch('/api/stages/dashboard');
        
        if (!response.ok) {
            throw new Error('Failed to load dashboard stats');
        }
        
        const data = await response.json();
        
        // Update stat cards
        document.getElementById('myPendingTasks').textContent = data.my_pending_tasks || 0;
        document.getElementById('myCompletedTasks').textContent = data.my_completed_tasks || 0;
        document.getElementById('machinesInMyStages').textContent = data.machines_in_my_stages || 0;
        document.getElementById('totalMachines').textContent = data.total_machines || 0;
        
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
        // Set default values
        document.getElementById('myPendingTasks').textContent = '0';
        document.getElementById('myCompletedTasks').textContent = '0';
        document.getElementById('machinesInMyStages').textContent = '0';
        document.getElementById('totalMachines').textContent = '0';
    }
}

async function loadMyTasks() {
    try {
        const response = await fetch('/api/stages/my-tasks');
        
        if (!response.ok) {
            throw new Error('Failed to load tasks');
        }
        
        const data = await response.json();
        displayMyTasks(data.tasks || []);
        
    } catch (error) {
        console.error('Error loading tasks:', error);
        displayMyTasks([]);
    }
}

function displayMyTasks(tasks) {
    const container = document.getElementById('myTasksContainer');
    
    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="no-tasks">
                <i class="fas fa-check-circle"></i>
                <h3>🎉 Aucune tâche en cours</h3>
                <p>Toutes vos tâches sont terminées !</p>
            </div>
        `;
        return;
    }
    
    const tasksHTML = tasks.map(task => `
        <div class="task-card" data-task-id="${task.id}" data-machine-id="${task.machine_id}">
            <div class="task-header">
                <h3>${task.label}</h3>
                <span class="status-badge status-${task.status}">${getStatusText(task.status)}</span>
            </div>
            
            <div class="task-details">
                <p><strong>Machine:</strong> ${task.machine_info.serialNumber} (${task.machine_info.machineType})</p>
                <p><strong>Client:</strong> ${task.machine_info.clientSociety}</p>
                <p><strong>Étape:</strong> ${task.order}/${getTotalStages()}</p>
            </div>
            
            <div class="task-actions">
                <button class="btn btn-primary" onclick="validateTask('${task.id}', '${task.machine_id}')">
                    <i class="fas fa-check"></i> Valider l'étape
                </button>
                <button class="btn btn-secondary" onclick="viewMachineDetails('${task.machine_id}')">
                    <i class="fas fa-eye"></i> Voir détails
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = tasksHTML;
}

async function validateTask(stageId, machineId) {
    const remarks = prompt('Remarques sur la validation (optionnel):');
    
    try {
        const response = await fetch(`/api/stages/${stageId}/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                machine_id: machineId,
                remarks: remarks || ''
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccessMessage(data.message);
            // Reload dashboard data
            loadDashboardData();
        } else {
            showErrorMessage(data.error || 'Erreur lors de la validation');
        }
        
    } catch (error) {
        console.error('Error validating task:', error);
        showErrorMessage('Erreur lors de la validation');
    }
}

function viewMachineDetails(machineId) {
    // Navigate to machine details or open modal
    window.location.href = `voir-machines.html?machine=${machineId}`;
}

function initializeDashboard() {
    // Initialize navigation
    setupNavigation();
    
    // Initialize quick actions
    setupQuickActions();
    
    // Initialize logout
    setupLogout();
}

function setupNavigation() {
    // My tasks navigation
    const myTasksNav = document.getElementById('nav-my-tasks');
    if (myTasksNav) {
        myTasksNav.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to my tasks section
            const tasksSection = document.getElementById('myTasksContainer');
            if (tasksSection) {
                tasksSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function setupQuickActions() {
    // Add machine action
    const addMachineAction = document.getElementById('action-add-machine');
    if (addMachineAction) {
        addMachineAction.addEventListener('click', () => {
            window.location.href = 'ajouter-machine.html';
        });
    }
    
    // Add client action
    const addClientAction = document.getElementById('action-add-client');
    if (addClientAction) {
        addClientAction.addEventListener('click', () => {
            window.location.href = 'ajouter-client.html';
        });
    }
    
    // View machines action
    const viewMachinesAction = document.getElementById('action-view-machines');
    if (viewMachinesAction) {
        viewMachinesAction.addEventListener('click', () => {
            window.location.href = 'voir-machines.html';
        });
    }
    
    // Manage users action
    const manageUsersAction = document.getElementById('action-manage-users');
    if (manageUsersAction) {
        manageUsersAction.addEventListener('click', () => {
            window.location.href = 'users.html';
        });
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById('nav-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
                // Call logout API
                await fetch('/api/users/logout', {
                    method: 'POST'
                });
                
                // Clear session storage
                sessionStorage.removeItem('currentUser');
                
                // Redirect to login
                window.location.href = '../auth.html';
                
            } catch (error) {
                console.error('Logout error:', error);
                // Force logout anyway
                sessionStorage.removeItem('currentUser');
                window.location.href = '../auth.html';
            }
        });
    }
}

// Utility functions
function getStatusText(status) {
    const statusMap = {
        'pending': 'En attente',
        'in_progress': 'En cours',
        'completed': 'Terminé'
    };
    return statusMap[status] || status;
}

function getTotalStages() {
    return 5; // Default number of stages
}

function showLoading() {
    const loadingElements = document.querySelectorAll('.loading-message');
    loadingElements.forEach(el => el.style.display = 'block');
}

function hideLoading() {
    const loadingElements = document.querySelectorAll('.loading-message');
    loadingElements.forEach(el => el.style.display = 'none');
}

function showSuccessMessage(message) {
    // Create and show success toast/modal
    alert('✅ ' + message); // Simple implementation, can be enhanced
}

function showErrorMessage(message) {
    // Create and show error toast/modal
    alert('❌ ' + message); // Simple implementation, can be enhanced
}
>>>>>>> master
