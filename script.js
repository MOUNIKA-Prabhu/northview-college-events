// ================= DATA =================

const events = [

    {
        title: "Football Tournament",
        date: "2026-02-12",
        description: "Inter-college football competition",
        category: "Sports",
        location: "Main Ground"
    },

    {
        title: "AI Workshop",
        date: "2026-02-15",
        description: "Hands-on AI training",
        category: "Workshop",
        location: "Lab 3"
    },

    {
        title: "Guest Lecture",
        date: "2026-02-18",
        description: "Industry expert talk",
        category: "Lecture",
        location: "Auditorium"
    },

    {
        title: "Cricket Match",
        date: "2026-02-20",
        description: "Friendly cricket match",
        category: "Sports",
        location: "Ground"
    },

    {
        title: "Web Workshop",
        date: "2026-02-22",
        description: "Web development basics",
        category: "Workshop",
        location: "Lab 2"
    },

    {
        title: "Cyber Security Talk",
        date: "2026-02-25",
        description: "Security awareness",
        category: "Lecture",
        location: "Hall"
    }
];


// ================= VARIABLES =================

const container = document.getElementById("eventsContainer");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const dateFilter = document.getElementById("dateFilter");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

let currentPage = 1;
const eventsPerPage = 5;


// ================= DISPLAY =================

function displayEvents(list) {

    container.innerHTML = "";

    const start = (currentPage - 1) * eventsPerPage;
    const end = start + eventsPerPage;

    const paginated = list.slice(start, end);

    paginated.forEach(e => {

        const div = document.createElement("div");

        div.className = "event-card";

        div.innerHTML = `
            <h3>${e.title}</h3>
            <p><b>Date:</b> ${e.date}</p>
            <p>${e.description}</p>
            <p><b>Location:</b> ${e.location}</p>
            <button>View Details</button>
        `;

        container.appendChild(div);
    });

    pageInfo.textContent =
        `Page ${currentPage} of ${Math.ceil(list.length / eventsPerPage)}`;
}


// ================= FILTER =================

function filterEvents() {

    let filtered = [...events];

    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const dateType = dateFilter.value;

    // Search filter
    filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(search) ||
        e.date.includes(search)
    );

    // Category filter
    if (category !== "All") {

        filtered = filtered.filter(e =>
            e.category === category
        );
    }

    // Date filter
    const today = new Date();

    if (dateType === "today") {

        filtered = filtered.filter(e => {

            return new Date(e.date).toDateString() ===
                   today.toDateString();
        });
    }

    if (dateType === "week") {

        const weekLater = new Date();
        weekLater.setDate(today.getDate() + 7);

        filtered = filtered.filter(e => {

            const d = new Date(e.date);

            return d >= today && d <= weekLater;
        });
    }

    currentPage = 1;

    displayEvents(filtered);

    return filtered;
}


// ================= PAGINATION =================

let currentList = [...events];

prevBtn.addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;
        displayEvents(currentList);
    }
});

nextBtn.addEventListener("click", () => {

    if (currentPage <
        Math.ceil(currentList.length / eventsPerPage)) {

        currentPage++;
        displayEvents(currentList);
    }
});


// ================= EVENTS =================

searchInput.addEventListener("input", () => {
    currentList = filterEvents();
});

categoryFilter.addEventListener("change", () => {
    currentList = filterEvents();
});

dateFilter.addEventListener("change", () => {
    currentList = filterEvents();
});


// ================= LOAD =================

currentList = [...events];
displayEvents(currentList);
