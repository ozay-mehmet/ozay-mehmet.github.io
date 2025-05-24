class GameLauncher {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.createCanvas();
    this.scene = 'menu';
    this.selectedCharacterIndex = 0;
    this.gameVolume = 0.5;
    this.gameBrightness = 1.0;

    this.characters = Player.getPlayerTypes();
    this.characterImages = [];

    // giriş müziğinin ayarlanması
    this.menuMusic = new Audio("./assets/audio/giris.mp3");
    this.menuMusic.loop = true;

    this.loadAssets();
    this.setupEventListeners();

    this.gameInstance = null;
    this.buttons = {};
    this.settingsElements = {};
    this.updateSelectedCharacter();
    this.gameLoop();
  }

  get scene() { return this._scene; }
  set scene(newScene) {
    const oldScene = this._scene;
    if (oldScene === newScene) {
      if (newScene === 'menu') this.playMenuMusic();
      return;
    }
    this._scene = newScene;
    if (newScene === 'menu') this.playMenuMusic();
    else if (oldScene === 'menu') this.pauseMenuMusic();
  }

  // canvas oluşturma
  createCanvas() {
    this.gameCanvas = document.getElementById('gameCanvas');
    if (!this.gameCanvas) {
      this.gameCanvas = document.createElement("canvas");
      this.gameCanvas.id = 'gameCanvas';
      document.body.appendChild(this.gameCanvas);
    }
    this.gameCanvas.width = this.width;
    this.gameCanvas.height = this.height;
    this.ctx = this.gameCanvas.getContext("2d");
  }

  // assetlerin yüklenmesi
  loadAssets() {
    this.menuBackground = new Image();
    this.menuBackground.src = "./assets/background-images/northern_lights.png";
    this.characters.forEach(charData => {
      const img = new Image();
      if (charData.animations?.idle?.length > 0) img.src = charData.animations.idle[0];
      this.characterImages.push(img);
    });
    this.menuMusic.oncanplaythrough = () => {
      this.menuMusicLoaded = true;
      if (this.scene === 'menu') this.playMenuMusic();
    };
    this.menuMusic.load();
  }

  playMenuMusic() {
    if (this.menuMusicLoaded && this.menuMusic.paused && this.scene === 'menu') {
       this.menuMusic.volume = this.gameVolume;
      this.menuMusic.play().catch(() => {});
    }
  }

  pauseMenuMusic() {
    if (this.menuMusicLoaded && !this.menuMusic.paused) this.menuMusic.pause();
  }

  setupEventListeners() {
    this.gameCanvas.addEventListener('click', (e) => this.handleClick(e));
    window.addEventListener('resize', () => this.handleResize());
    window.addEventListener('keydown', (e) => this.handleMenuKeys(e));
  }

  handleMenuKeys(e) {
    if (this.scene === 'menu') {
      if (e.key === 'ArrowLeft') this.prevCharacter();
      else if (e.key === 'ArrowRight') this.nextCharacter();
    }
  }

  // butonlara tıklandığında fonksiyonları çalıştırılması
  handleClick(e) {
    const rect = this.gameCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    switch (this.scene) {
      case 'menu':
        if (this.isInside(x, y, this.buttons.start)) {
          this.scene = 'game';
          const selectedCharacterData = this.characters[this.selectedCharacterIndex];
          this.gameInstance = new GameEngine({
            canvas: this.gameCanvas,
            character: selectedCharacterData,
            onReturnToMenu: () => {
              this.scene = 'menu';
              if (this.gameInstance) {
                this.gameInstance.stop();
                this.gameInstance = null;
              }
            }
          });
          this.gameInstance.start();
        } else if (this.isInside(x, y, this.buttons.settings)) {
          this.scene = 'settings';
        } else if (this.isInside(x, y, this.buttons.prevChar)) {
          this.prevCharacter();
        } else if (this.isInside(x, y, this.buttons.nextChar)) {
          this.nextCharacter();
        }
        break;
      // ayarlar ekranı
      case 'settings':
        if (this.isInside(x, y, this.buttons.back)) {
          this.scene = 'menu';
        } else if (this.settingsElements.volumeUp && this.isInside(x, y, this.settingsElements.volumeUp)) {
          this.gameVolume = Math.min(1.0, this.gameVolume + 0.1);
          this.menuMusic.volume = this.gameVolume;
        } else if (this.settingsElements.volumeDown && this.isInside(x, y, this.settingsElements.volumeDown)) {
          this.gameVolume = Math.max(0.0, this.gameVolume - 0.1);
          this.menuMusic.volume = this.gameVolume;
        } else if (this.settingsElements.brightnessUp && this.isInside(x, y, this.settingsElements.brightnessUp)) {
          this.gameBrightness = Math.min(1.0, this.gameBrightness + 0.1);
        } else if (this.settingsElements.brightnessDown && this.isInside(x, y, this.settingsElements.brightnessDown)) {
          this.gameBrightness = Math.max(0.0, this.gameBrightness - 0.1);
        } else if (this.settingsElements.fullscreenToggle && this.isInside(x, y, this.settingsElements.fullscreenToggle)) {
          this.toggleFullscreen();
        }
        break;
      case 'game':
        if (this.gameInstance && this.buttons.menuFromGame && this.isInside(x, y, this.buttons.menuFromGame)) {
          this.scene = 'menu';
          this.gameInstance.stop();
          this.gameInstance = null;
        }
        break;
    }
  }

  // Oyun döngüsü
  gameLoop() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.filter = `brightness(${this.gameBrightness})`;
    switch (this.scene) {
      case 'menu': this.drawMenu(); break;
      case 'settings': this.drawSettings(); break;
      case 'game':
        if (this.gameInstance) {
          this.gameInstance.render();
          this.gameInstance.update();
        }
        break;
    }
    this.ctx.filter = 'none';
    requestAnimationFrame(() => this.gameLoop());
  }

  // pencere boyutunu ayarlanması
  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.gameCanvas.width = this.width;
    this.gameCanvas.height = this.height;
    if (this.gameInstance) {
      this.gameInstance.width = this.width;
      this.gameInstance.height = this.height;
    }
  }

  nextCharacter() {
    this.selectedCharacterIndex = (this.selectedCharacterIndex + 1) % this.characters.length;
    this.updateSelectedCharacter();
  }

  prevCharacter() {
    this.selectedCharacterIndex = (this.selectedCharacterIndex - 1 + this.characters.length) % this.characters.length;
    this.updateSelectedCharacter();
  }

  updateSelectedCharacter() {
    if (!this.characters || this.characters.length === 0) return;
    if (this.selectedCharacterIndex < 0 || this.selectedCharacterIndex >= this.characters.length) {
      this.selectedCharacterIndex = 0;
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  isInside(x, y, btn) {
    if (!btn) return false;
    return x >= btn.x && x <= btn.x + btn.width && y >= btn.y && y <= btn.y + btn.height;
  }

  // menü ekranı 
  drawMenu() {
    if (this.menuBackground.complete && this.menuBackground.naturalHeight !== 0) {
      this.ctx.drawImage(this.menuBackground, 0, 0, this.width, this.height);
    } else {
      this.ctx.fillStyle = "#2c3e50";
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
    this.ctx.textAlign = "center";
    this.ctx.font = "60px 'Impact', sans-serif";
    this.ctx.fillStyle = "#ecf0f1";
    this.ctx.fillText("To Seal Upon A Sea of Stars!", this.width / 2, 100);

    const btnWidth = 250, btnHeight = 60;
    this.buttons = {
      start: { x: this.width / 2 - btnWidth / 2, y: this.height / 2, width: btnWidth, height: btnHeight, text: "Play Game" },
      settings: { x: this.width / 2 - btnWidth / 2, y: this.height / 2 + 80, width: btnWidth, height: btnHeight, text: "Settings" },
      prevChar: { x: this.width / 2 - 200 - 50, y: this.height / 2 - 150, width: 50, height: 50, text: "◄" },
      nextChar: { x: this.width / 2 + 200, y: this.height / 2 - 150, width: 50, height: 50, text: "►" },
      menuFromGame: { x: 20, y: 20, width: 100, height: 40, text: "Menü" }
    };

    this.drawButton(this.buttons.start);
    this.drawButton(this.buttons.settings);

    const charData = this.characters[this.selectedCharacterIndex];
    const charImg = this.characterImages[this.selectedCharacterIndex];
    const charDisplayX = this.width / 2, charDisplayY = this.height / 2 - 125;

    if (charData && charImg.complete && charImg.naturalWidth > 0) {
      this.ctx.drawImage(charImg, charDisplayX - 100, charDisplayY - 150, 200, 150);
    } else {
      this.ctx.fillStyle = "grey";
      this.ctx.fillRect(charDisplayX - 50, charDisplayY - 100, 100, 100);
    }
    if (charData) {
      this.ctx.font = "24px Arial";
      this.ctx.fillStyle = "#fff";
      this.ctx.fillText(charData.name, charDisplayX, charDisplayY + 20);
      this.ctx.font = "16px Arial";
      this.ctx.fillText(charData.description, charDisplayX, charDisplayY + 50);
    }
    this.drawButton(this.buttons.prevChar);
    this.drawButton(this.buttons.nextChar);
  }

  // buton ayarları 
  drawButton(btn) {
    if (!btn) return;
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(btn.x, btn.y, btn.width, btn.height);
    this.ctx.fillStyle = "#fff";
    this.ctx.font = `${btn.height * 0.4}px Arial`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(btn.text, btn.x + btn.width / 2, btn.y + btn.height / 2);
  }

  drawSettings() {
    this.ctx.fillStyle = "#1c1c1e";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = "#e0e0e0";
    this.ctx.font = "bold 48px 'Segoe UI', Arial, sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Settings", this.width / 2, 120);

    const settingGroupWidth = this.width * 0.6;
    const settingGroupMaxWidth = 500;
    const groupWidth = Math.min(settingGroupWidth, settingGroupMaxWidth);
    const groupX = this.width / 2 - groupWidth / 2;
    let currentY = 200;
    const itemHeight = 60;
    const labelOffsetY = -5;

    this.buttons.back = {
      x: 20, y: 40, width: 120, height: 50, text: "Geri",
      bgColor: "#555", textColor: "#fff"
    };
    this.drawStyledButton(this.buttons.back);

    // Ses Ayarları
    this.ctx.fillStyle = "#c7c7cc";
    this.ctx.font = "22px 'Segoe UI', Arial, sans-serif";
    this.ctx.textAlign = "left";
    this.ctx.fillText("Volume Level", groupX + 20, currentY + itemHeight / 2 + labelOffsetY);

    this.ctx.font = "bold 22px 'Segoe UI', Arial, sans-serif";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "right";
    this.ctx.fillText(`${Math.round(this.gameVolume * 100)}%`, groupX + groupWidth - 120, currentY + itemHeight / 2 + labelOffsetY);

    this.settingsElements.volumeDown = {
      x: groupX + groupWidth - 100, y: currentY + 10, width: 40, height: 40, text: "-", bgColor: "#3a3a3c", textColor: "#fff"
    };
    this.settingsElements.volumeUp = {
      x: groupX + groupWidth - 50, y: currentY + 10, width: 40, height: 40, text: "+", bgColor: "#3a3a3c", textColor: "#fff"
    };
    this.drawStyledButton(this.settingsElements.volumeDown, 20);
    this.drawStyledButton(this.settingsElements.volumeUp, 20);
    currentY += itemHeight + 20;

    // Parlaklık Ayarları
    this.ctx.fillStyle = "#c7c7cc";
    this.ctx.font = "22px 'Segoe UI', Arial, sans-serif";
    this.ctx.textAlign = "left";
    this.ctx.fillText("Brightness", groupX + 20, currentY + itemHeight / 2 + labelOffsetY);

    this.ctx.font = "bold 22px 'Segoe UI', Arial, sans-serif";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "right";
    this.ctx.fillText(`${Math.round(this.gameBrightness * 100)}%`, groupX + groupWidth - 120, currentY + itemHeight / 2 + labelOffsetY);

    this.settingsElements.brightnessDown = {
      x: groupX + groupWidth - 100, y: currentY + 10, width: 40, height: 40, text: "-", bgColor: "#3a3a3c", textColor: "#fff"
    };
    this.settingsElements.brightnessUp = {
      x: groupX + groupWidth - 50, y: currentY + 10, width: 40, height: 40, text: "+", bgColor: "#3a3a3c", textColor: "#fff"
    };
    this.drawStyledButton(this.settingsElements.brightnessDown, 20);
    this.drawStyledButton(this.settingsElements.brightnessUp, 20);
    currentY += itemHeight + 20;

    // Tam Ekran
    this.settingsElements.fullscreenToggle = {
      x: groupX, y: currentY, width: groupWidth, height: itemHeight,
      text: document.fullscreenElement ? "Window Mode" : "Full Screen",
      bgColor: "#007aff", textColor: "#fff"
    };
    this.drawStyledButton(this.settingsElements.fullscreenToggle, 10);
    currentY += itemHeight + 60;

    // Kontrol Ekranı
    this.ctx.fillStyle = "#e0e0e0";
    this.ctx.font = "bold 32px 'Segoe UI', Arial, sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText("How is it?", this.width / 2, currentY);
    currentY += 50;

    const controls = [
      { action: "Hareket Etme (Sol/Sağ):", keys: "A / D veya Sol/Sağ Ok Tuşları" },
      { action: "Zıplama:", keys: "W, Boşluk veya Yukarı Ok Tuşu" },
      { action: "Saldırı:", keys: "F" },
      { action: "Menüye Dön (Oyun İçi):", keys: "ESC Tuşu" }
    ];

    this.ctx.font = "20px 'Segoe UI', Arial, sans-serif";
    this.ctx.textAlign = "left";
    const controlTextX = groupX + 20, controlLineHeight = 30;
    controls.forEach(control => {
      this.ctx.fillStyle = "#c7c7cc";
      this.ctx.fillText(control.action, controlTextX, currentY);
      this.ctx.fillStyle = "#fff";
      const actionTextWidth = this.ctx.measureText(control.action).width;
      this.ctx.fillText(control.keys, controlTextX + actionTextWidth + 10, currentY);
      currentY += controlLineHeight;
    });
  }

  // butonlara gölge ve kenar çizgisi eklenmesi
  drawStyledButton(btn, borderRadius = 8) {
    if (!btn) return;
    this.ctx.fillStyle = btn.bgColor || "rgba(0, 0, 0, 0.5)";
    this.ctx.beginPath();
    this.ctx.moveTo(btn.x + borderRadius, btn.y);
    this.ctx.lineTo(btn.x + btn.width - borderRadius, btn.y);
    this.ctx.quadraticCurveTo(btn.x + btn.width, btn.y, btn.x + btn.width, btn.y + borderRadius);
    this.ctx.lineTo(btn.x + btn.width, btn.y + btn.height - borderRadius);
    this.ctx.quadraticCurveTo(btn.x + btn.width, btn.y + btn.height, btn.x + btn.width - borderRadius, btn.y + btn.height);
    this.ctx.lineTo(btn.x + borderRadius, btn.y + btn.height);
    this.ctx.quadraticCurveTo(btn.x, btn.y + btn.height, btn.x, btn.y + btn.height - borderRadius);
    this.ctx.lineTo(btn.x, btn.y + borderRadius);
    this.ctx.quadraticCurveTo(btn.x, btn.y, btn.x + borderRadius, btn.y);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.fillStyle = btn.textColor || "#fff";
    this.ctx.font = btn.font || `${btn.height * 0.4}px 'Segoe UI', Arial, sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(btn.text, btn.x + btn.width / 2, btn.y + btn.height / 2);
  }
}

let gameLauncher;
window.addEventListener('load', () => { gameLauncher = new GameLauncher(); });