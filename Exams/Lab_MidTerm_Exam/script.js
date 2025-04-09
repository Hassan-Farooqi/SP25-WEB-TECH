const tasks = [
    {
        title: "Assignment 1: CV",
        description: "Personal portfolio CV using HTML & CSS",
        link: "Assignment_1/CV.html"
    },
    {
        title: "Assignment 2: E-commerce Landing Page",
        description: "E-commerce landing page with basic HTML & CSS",
        link: "Assignment_2/index.html"
    },
    {
        title: "Lab Task 1: Landing Page with Bootstrap",
        description: "Enhanced E-commerce landing page using Bootstrap",
        link: "Lab_Task_1/index.html"
    },
    {
        title: "Lab Task 2: Checkout Page",
        description: "Checkout form with client-side validation",
        link: "Lab_Task_2/index.html"
    }
];

const megaMenu = document.getElementById('megaMenu');
const previousTasksBtn = document.getElementById('previous-tasks-btn');
const taskGrid = document.getElementById('taskGrid');

function createTaskCards() {
    taskGrid.innerHTML = tasks.map(task => `
        <div class="task-card">
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <a href="${task.link}" class="task-link" target="_blank">View Task →</a>
        </div>
    `).join('');
}

window.onload = createTaskCards;

    previousTasksBtn.onclick = toggleMegaMenu;
    document.onclick = closeMegaMenu;

function toggleMegaMenu() {
    document.querySelectorAll('.mega-menu').forEach(menu => {
        if (menu !== megaMenu) menu.classList.remove('active');
    });
    megaMenu.classList.toggle('active');
}

function closeMegaMenu(e) {
    if (!megaMenu.contains(e.target) && !previousTasksBtn.contains(e.target)) {
        megaMenu.classList.remove('active');
    }
}
