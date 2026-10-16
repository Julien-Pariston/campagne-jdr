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

  // ========================================================
  // 2. FONCTION POUR COUPER TOUTES LES PISTES
  // ========================================================
  function couperTousLesAudios() {
    if (audio1) audio1.pause();
    if (audio2) audio2.pause();
    if (audio3) audio3.pause();
  }

  // ========================================================
  // 3. LOGIQUE ET ÉVÉNEMENTS DU LECTEUR 1
  // ========================================================
  if (playBtn1 && pauseBtn1 && stopBtn1 && audio1) {
    playBtn1.addEventListener("click", () => {
      couperTousLesAudios();
      audio1.play();
    });

    pauseBtn1.addEventListener("click", () => {
      audio1.pause();
    });

    stopBtn1.addEventListener("click", () => {
      audio1.pause();
      audio1.currentTime = 0;
    });
  }

  if (volumeSlider1 && audio1) {
    volumeSlider1.addEventListener("input", (e) => {
      audio1.volume = e.target.value;
    });
  }

  // ========================================================
  // 4. LOGIQUE ET ÉVÉNEMENTS DU LECTEUR 2
  // ========================================================
  if (playBtn2 && pauseBtn2 && stopBtn2 && audio2) {
    playBtn2.addEventListener("click", () => {
      couperTousLesAudios();
      audio2.play();
    });

    pauseBtn2.addEventListener("click", () => {
      audio2.pause();
    });

    stopBtn2.addEventListener("click", () => {
      audio2.pause();
      audio2.currentTime = 0;
    });
  }

  if (volumeSlider2 && audio2) {
    volumeSlider2.addEventListener("input", (e) => {
      audio2.volume = e.target.value;
    });
  }

  // ========================================================
  // 5. LOGIQUE ET ÉVÉNEMENTS DU LECTEUR 3
  // ========================================================
  if (playBtn3 && pauseBtn3 && stopBtn3 && audio3) {
    playBtn3.addEventListener("click", () => {
      couperTousLesAudios();
      audio3.play();
    });

    pauseBtn3.addEventListener("click", () => {
      audio3.pause();
    });

    stopBtn3.addEventListener("click", () => {
      audio3.pause();
      audio3.currentTime = 0;
    });
  }

  if (volumeSlider3 && audio3) {
    volumeSlider3.addEventListener("input", (e) => {
      audio3.volume = e.target.value;
    });
  }
  // ========================================================
  // LOGIQUE DE NAVIGATION PAR ONGLETS
  // ========================================================
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");

      // 1. Retire la classe 'active' de tous les boutons
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      // 2. Retire la classe 'active' de toutes les sections
      tabContents.forEach((content) => content.classList.remove("active"));

      // 3. Ajoute la classe 'active' au bouton cliqué et à sa section cible
      button.classList.add("active");
      document.getElementById(targetId).classList.add("active");

      // OPTIONNEL : Coupe la musique automatiquement si on change d'onglet
      couperTousLesAudios();
    });
  });
});
