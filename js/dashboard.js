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
