const aides = [
    { title: "Subvention Innovation BPI", secteur: "Tech" },
    { title: "Fonds de Transformation Digitale", secteur: "Commerce" },
    { title: "Aide Création Jeune Entreprise", secteur: "Général" }
  ];
  
  function searchAides() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const resultContainer = document.getElementById("results");
    resultContainer.innerHTML = "";
  
    aides.forEach(aide => {
      if (aide.title.toLowerCase().includes(searchInput)) {
        const card = document.createElement("div");
        card.classList.add("aide-card");
        card.innerHTML = `<h3>${aide.title}</h3><p>${aide.secteur}</p>`;
        card.onclick = () => selectAide(aide.title);
        resultContainer.appendChild(card);
      }
    });
  }
  
  function selectAide(title) {
    const sidebar = document.querySelector(".sidebar");
    const selectedContainer = document.getElementById("selectedAides");
    const aide = document.createElement("div");
    aide.classList.add("aide-card");
    aide.innerHTML = `<h4>${title}</h4>`;
    selectedContainer.appendChild(aide);
    sidebar.classList.add("open");
  
    gsap.from(aide, {
      opacity: 0,
      x: 100,
      scale: 0.8,
      duration: 0.8,
      ease: "back.out(1.7)"
    });
  }
  
  
  function showAides(aides) {
    const resultContainer = document.getElementById("results");
    resultContainer.innerHTML = "";
  
    aides.forEach((aide, index) => {
      const card = document.createElement("div");
      card.classList.add("aide-card");
      card.innerHTML = `
        <h3>${aide.title}</h3>
        <p>${aide.secteur}</p>
      `;
      card.onclick = () => selectAide(aide.title);
      resultContainer.appendChild(card);
  
      // Animation GSAP avec délai progressif
      gsap.from(card, {
        opacity: 0,
        x: -50,
        rotation: -2,
        scale: 0.8,
        delay: index * 0.15,
        duration: 0.8,
        ease: "power3.out"
      });
    });
  }
  card.onmouseover = () => {
    gsap.fromTo(card.querySelector("h3"), { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" });
  };
  
  const audio = new Audio("https://www.myinstants.com/media/sounds/pop.mp3");
card.onclick = () => {
  audio.play();
};
