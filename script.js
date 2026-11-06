document.addEventListener("DOMContentLoaded", () => {
  // Tous les lecteurs audio du site : résumés + OST.
  const audioPlayers = Array.from(document.querySelectorAll("audio"));

  // Met en pause et remet au début tous les lecteurs sauf celui demandé.
  function arreterAutresLecteurs(lecteurActif = null) {
    audioPlayers.forEach((lecteur) => {
      if (lecteur !== lecteurActif) {
        lecteur.pause();
        lecteur.currentTime = 0;
      }
    });
  }

  // Un seul audio peut être lu à la fois, qu'il soit dans l'OST ou les résumés.
  audioPlayers.forEach((lecteur) => {
    lecteur.addEventListener("play", () => {
      arreterAutresLecteurs(lecteur);
    });
  });

  // Navigation par onglets.
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");

      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("active");
      }

      // Changer d'onglet coupe tous les lecteurs et les remet au début.
      arreterAutresLecteurs();
    });
  });

  // Ouverture des artworks dans un nouvel onglet.
  const galleryImages = document.querySelectorAll(".gallery-grid img");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      window.open(img.src, "_blank", "noopener");
    });
  });

  // Gestion du bouton retour en haut.
  const scrollTopBtn = document.getElementById("scroll-to-top");

  if (scrollTopBtn) {
    function verifierAffichageBouton() {
      scrollTopBtn.style.display = window.scrollY > 20 ? "flex" : "none";
    }

    window.addEventListener("scroll", verifierAffichageBouton);
    verifierAffichageBouton();

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
