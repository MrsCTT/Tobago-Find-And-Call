// 1. Initial Local Directory Data Storage
const businesses = [
  {
    name: "Scarborough General Hospital",
    category: "Hospitals / Health Centres",
    address: "Connector Road, Signal Hill, Tobago",
    phone: "+1(868)660-4744",
    lat: 11.1783, 
    lng: -60.7441,
    isFeatured: false
  },
  {
    name: "D Wok Spot",
    category: "Restaurants",
    address: "Store Bay Local Road, Crown Point, Tobago",
    phone: "+1(868)760-1806",
    lat: 11.1541, 
    lng: -60.8415,
    isFeatured: true
  },
  {
    name: "Milford 24 Gas Station",
    category: "Gas Stations",
    address: "Milford Road, Bon Accord, Tobago",
    phone: "+1(868)639-2424", 
    lat: 11.1568, 
    lng: -60.8252,
    isFeatured: false
  }
];

// 2. Initialize the Map centered over Tobago
const map = L.map('map').setView([11.2186, -60.6723], 11);

// Load Free OpenStreetMap Tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. Function to build the listings interface dynamically
function displayListings(filteredCategory) {
    const listingsContainer = document.getElementById('listings');
    listingsContainer.innerHTML = ''; // Clear existing text

    businesses.forEach(business => {
        // Filter logic
        if (filteredCategory !== 'All' && business.category !== filteredCategory) return;

        // Apply distinct styling for featured monetized clients
        const cardClass = business.isFeatured ? 'card mb-3 shadow-sm featured-card' : 'card mb-3 shadow-sm';
        const premiumBadge = business.isFeatured ? '<span class="badge bg-warning text-dark mb-2">Featured Partner</span>' : '';

        // Generate the card layout structure
        const cardHtml = `
            <div class="${cardClass}">
                <div class="card-body">
                    ${premiumBadge}
                    <h5 class="card-title fw-bold">${business.name}</h5>
                    <h6 class="text-muted small">${business.category}</h6>
                    <p class="card-text mb-2 text-secondary">📍 ${business.address}</p>
                    <a href="tel:${business.phone.replace(/[^0-9]/g, '')}" class="btn btn-success btn-sm w-100 fw-bold">📞 Call Now (${business.phone})</a>
                </div>
            </div>
        `;
        listingsContainer.innerHTML += cardHtml;

        // Drop matching custom interactive pin on the map
        L.marker([business.lat, business.lng]).addTo(map)
            .bindPopup(`<b>${business.name}</b><br>${business.address}`);
    });
}

// 4. Set up Category dropdown event filtering listeners
document.getElementById('categoryFilter').addEventListener('change', (e) => {
    displayListings(e.target.value);
});

// Run display automatically when the page finishes loading
displayListings('All');