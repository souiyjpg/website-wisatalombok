// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#mobile-menu a').forEach(item => {
  item.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('hidden');
  });
});

// Data Paket Wisata untuk Pencarian
const allPackages = [
  { id: 'paket-secret-island-5-gilis', name: 'Secret Island 5 Gilis', description: 'Snorkeling eksklusif di 5 gili tersembunyi.' },
  { id: 'paket-gili-kondo-trip', name: 'Gili Kondo Trip', description: 'Hari penuh menikmati keindahan Gili Kondo dan sekitarnya.' },
  { id: 'paket-city-tour', name: 'City Tour', description: 'Jelajahi sisi perkotaan Lombok dengan sentuhan budaya.' },
  { id: 'paket-shopping-souvenir', name: 'Shopping Souvenir', description: 'Tur belanja oleh-oleh khas Lombok dari pengrajin langsung.' },
  { id: 'paket-origin-lombok', name: 'Origin Lombok', description: 'Pengalaman otentik kehidupan asli masyarakat Lombok.' },
  { id: 'paket-snorkeling-village', name: 'Snorkeling & Village', description: 'Kombinasi budaya dan petualangan bahari.' }
];

// Search Suggestion for "Tujuan" input
const destinations = [
  "Gili Trawangan", "Senggigi", "Kuta Lombok", "Mandalika", "Sembalun", 
  "Gili Air", "Gili Meno", "Mataram", "Selong Belanak", "Desa Sade"
];

function showSuggestions(val) {
  const list = document.getElementById('suggestion-list');
  if (!val.trim()) {
    list.innerHTML = '';
    list.style.display = 'none';
    showAllPackages();
    return;
  }

  const lowerVal = val.toLowerCase();
  let combinedSuggestions = new Set();

  // Add matching destinations
  destinations.filter(dest => dest.toLowerCase().includes(lowerVal))
              .forEach(d => combinedSuggestions.add(d));

  // Add matching package names
  allPackages.filter(pkg =>
    pkg.name.toLowerCase().includes(lowerVal) || pkg.description.toLowerCase().includes(lowerVal)
  .forEach(pkg => combinedSuggestions.add(pkg.name));

  if (combinedSuggestions.size > 0) {
    list.innerHTML = Array.from(combinedSuggestions).map(s =>
      `<li class="px-4 py-2 cursor-pointer hover:bg-blue-100" onclick="selectSuggestion('${s}')">${s}</li>`
    ).join('');
    list.style.display = 'block';
  } else {
    list.innerHTML = '<li class="px-4 py-2 text-gray-400">Tidak ditemukan</li>';
    list.style.display = 'block';
  }
}

function selectSuggestion(txt) {
  document.getElementById('tujuan').value = txt;
  document.getElementById('suggestion-list').style.display = 'none';
  searchPackages();
}

function showAllPackages() {
  allPackages.forEach(pkg => {
    const packageElement = document.getElementById(pkg.id);
    if (packageElement) {
      packageElement.style.display = 'flex';
    }
  });
}

function searchPackages() {
  const searchTerm = document.getElementById('tujuan').value.toLowerCase();
  
  allPackages.forEach(pkg => {
    const packageElement = document.getElementById(pkg.id);
    if (packageElement) {
      packageElement.style.display = 'none';
    }
  });

  let foundPackages = allPackages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm) || pkg.description.toLowerCase().includes(searchTerm)
  );

  foundPackages.forEach(pkg => {
    const packageElement = document.getElementById(pkg.id);
    if (packageElement) {
      packageElement.style.display = 'flex';
    }
  });

  if (searchTerm.length > 0) {
    document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners
  document.getElementById('search-package-button').addEventListener('click', searchPackages);
  
  // Hide suggestion on clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-suggestion')) {
      document.getElementById('suggestion-list').style.display = 'none';
    }
  });

  // Show all packages initially
  showAllPackages();
});
