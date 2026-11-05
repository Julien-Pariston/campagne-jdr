document.addEventListener("DOMContentLoaded", () => {
  // ========================================================
  // 1. DÉCLARATION DES ÉLÉMENTS (Les 3 Lecteurs)
  // ========================================================

  // LECTEUR 1 : Intro campagne (Haut)
  const audio1 = document.getElementById("my-audio");
  const playBtn1 = document.getElementById("play-btn");
  const pauseBtn1 = document.getElementById("pause-btn");
  const stopBtn1 = document.getElementById("stopBtn");
  const volumeSlider1 = document.getElementById("volume-slider");

  // LECTEUR 2 : Résumé chap 1 & 2 (Milieu)
  const audio2 = document.getElementById("my-audio-chap12");
  const playBtn2 = document.getElementById("play-btn-chap12");
  const pauseBtn2 = document.getElementById("pause-btn-chap12");
  const stopBtn2 = document.getElementById("stop-btn-chap12");
  const volumeSlider2 = document.getElementById("volume-slider-chap12");

  // LECTEUR 3 : Résumé chap 3 & 4 (Bas)
  const audio3 = document.getElementById("my-audio-chap34");
  const playBtn3 = document.getElementById("play-btn-chap34");
  const pauseBtn3 = document.getElementById("pause-btn-chap34");
  const stopBtn3 = document.getElementById("stop-btn-chap34");
  const volumeSlider3 = document.getElementById("volume-slider-chap34");

  // Récupération de tous les lecteurs OST
  const ostPlayers = document.querySelectorAll(".ost-player");

  // ========================================================
  // 2. FONCTIONS POUR COUPER LES PISTES
  // ========================================================
  function couperTousLesAudios() {
    if (audio1) audio1.pause();
    if (audio2) audio2.pause();
    if (audio3) audio3.pause();
  }

  // NOUVELLE FONCTION : Coupe toutes les musiques de la section OST
  function couperToutesLesMusiquesOST() {
    ostPlayers.forEach((player) => {
      player.pause();
      player.currentTime = 0; // Optionnel : remet la musique au début
    });
  }

  // ========================================================
  // 3. LOGIQUE ET ÉVÉNEMENTS DU LECTEUR 1
  // ========================================================
  if (audio1) {
    if (playBtn1)
      playBtn1.addEventListener("click", () => {
        couperTousLesAudios();
        couperToutesLesMusiquesOST(); // Coupe l'OST si on lance l'intro
        audio1.play();
      });
    if (pauseBtn1)
      pauseBtn1.addEventListener("click", () => {
        audio1.pause();
      });
    if (stopBtn1)
      stopBtn1.addEventListener("click", () => {
        audio1.pause();
        audio1.currentTime = 0;
      });
    if (volumeSlider1)
      volumeSlider1.addEventListener("input", (e) => {
        audio1.volume = e.target.value;
      });
  }

  // ========================================================
  // 4. LOGIQUE ET ÉVÉNEMENTS DU LECTEUR 2
  // ========================================================
  if (audio2) {
    if (playBtn2)
      playBtn2.addEventListener("click", () => {
        couperTousLesAudios();
        couperToutesLesMusiquesOST(); // Coupe l'OST si on lance un résumé
        audio2.play();
      });
    if (pauseBtn2)
      pauseBtn2.addEventListener("click", () => {
        audio2.pause();
      });
    if (stopBtn2)
      stopBtn2.addEventListener("click", () => {
        audio2.pause();
        audio2.currentTime = 0;
      });
    if (volumeSlider2)
      volumeSlider2.addEventListener("input", (e) => {
        audio2.volume = e.target.value;
      });
  }

  // ========================================================
  // 5. LOGIQUE ET ÉVÉNEMENTS DU LECTEUR 3
  // ========================================================
  if (audio3) {
    if (playBtn3)
      playBtn3.addEventListener("click", () => {
        couperTousLesAudios();
        couperToutesLesMusiquesOST(); // Coupe l'OST si on lance un résumé
        audio3.play();
      });
    if (pauseBtn3)
      pauseBtn3.addEventListener("click", () => {
        audio3.pause();
      });
    if (stopBtn3)
      stopBtn3.addEventListener("click", () => {
        audio3.pause();
        audio3.currentTime = 0;
      });
    if (volumeSlider3)
      volumeSlider3.addEventListener("input", (e) => {
        audio3.volume = e.target.value;
      });
  }

  // ========================================================
  // 6. LOGIQUE INTERACTIVE DE NAVIGATION PAR ONGLETS
  // ========================================================
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

      // MODIFICATION : On coupe TOUT (lecteurs principaux + OST) dès qu'on change d'onglet
      couperTousLesAudios();
      couperToutesLesMusiquesOST();
    });
  });

  // ========================================================
  // 7. OUVERTURE DES ARTWORKS DANS UN NOUVEL ONGLET
  // ========================================================
  const galleryImages = document.querySelectorAll(".gallery-grid img");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      window.open(img.src, "_blank");
    });
  });

  // ========================================================
  // --- 8. GESTION DU BOUTON RETOUR EN HAUT ---
  // ========================================================
  const scrollTopBtn = document.getElementById("scroll-to-top");

  function verifierAffichageBouton() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 20) {
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
    }
  }

  window.addEventListener("scroll", verifierAffichageBouton);

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ========================================================
  // 9. LOGIQUE D'ARRÊT SIMULTANÉ POUR LES MUSIQUES OST
  // ========================================================
  ostPlayers.forEach((player) => {
    player.addEventListener("play", () => {
      // 1. Coupe les 3 lecteurs principaux du haut du site
      couperTousLesAudios();

      // 2. Coupe tous les autres lecteurs de la section OST
      ostPlayers.forEach((otherPlayer) => {
        if (otherPlayer !== player) {
          otherPlayer.pause();
          otherPlayer.currentTime = 0;
        }
      });
    });
  });
});
