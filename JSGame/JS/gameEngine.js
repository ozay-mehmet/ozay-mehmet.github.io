class GameEngine {
  constructor(config) {
    this.canvas = config.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = config.width || this.canvas.width;
    this.height = config.height || this.canvas.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.characterData = config.character || Player.getPlayerTypes()[0];
    this.player = null;
    this.enemies = [];
    this.isRunning = false;
    this.lastEnemySpawnTime = 0;
    this.enemySpawnInterval = 3000;

    // arka plan resimleri
    this.backgroundImages = [
      "./assets/background-images/cloud.png",
      "./assets/background-images/forest.png",
      "./assets/background-images/green.png",
      "./assets/background-images/mountain.png",
      "./assets/background-images/sea.png",
      "./assets/background-images/rock.png"
    ];
    this.backgroundImage = new Image();

    this.score = 0;
    this.gameOver = false;
    this.gameWon = Enemy.ENEMY_COUNT <= 0;
    this.defeatedEnemies = 0;
    this.maxEnemies = 10;
    this.eventListenersSet = false;
    this.onReturnToMenu = config.onReturnToMenu || null;

    // Müzik dosyaları
    this.gameMusic = new Audio("./assets/audio/game-music.mp3");
    this.wonMusic = new Audio("./assets/audio/you-won.mp3");
    this.gameMusic.loop = true;
    this.gameMusic.volume = 0.2;
  }

  init() {
    this.backgroundImage.src = this.backgroundImages[Math.floor(Math.random() * this.backgroundImages.length)];
    this.backgroundImage.onload = () => { if (this.isRunning) this.render(); };

    const playerStartX = 100;
    const playerStartY = this.height - Player.DEFAULT_HEIGHT - Player.GROUND_Y_OFFSET;

    if (!this.player) {
      this.player = new Player(playerStartX, playerStartY);
      this.player.setPlayerType(this.characterData.name);
    } else {
      this.player.reset(playerStartX, playerStartY);
    }

    this.enemies = [];
    this.score = 0;
    this.gameOver = false;
    this.gameWon = Enemy.ENEMY_COUNT <= 0;
    this.defeatedEnemies = 0;
    this.lastEnemySpawnTime = Date.now();
    this.enemySpawnInterval = 3000;

    if (!this.eventListenersSet) {
      this.setupEventListeners();
      this.eventListenersSet = true;
    }

    this.spawnEnemy();
  }

  // Oyun döngüsü
  setupEventListeners() {
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);
    window.addEventListener('keydown', this.boundHandleKeyDown);
    window.addEventListener('keyup', this.boundHandleKeyUp);
  }

  removeEventListeners() {
    window.removeEventListener('keydown', this.boundHandleKeyDown);
    window.removeEventListener('keyup', this.boundHandleKeyUp);
  }

  // Klavye olaylarının işlenmesi
  handleKeyDown(e) {
    if ((this.gameOver || this.gameWon) && e.key.toLowerCase() === 'r') {
      this.restart();
      return;
    }
    if (e.key === 'Escape') {
      if (this.onReturnToMenu) {
        this.onReturnToMenu();
      }
    }
    if (this.player && !this.gameOver && !this.gameWon) {
      this.player.handleKeyDown(e);
    }
  }

  handleKeyUp(e) {
    if (this.player && !this.gameOver && !this.gameWon) {
      this.player.handleKeyUp(e);
    }
  }

  // Düşman oluşturma
  spawnEnemy() {
    const enemyX = this.width + Math.random() * 10;
    const enemy = new Enemy(enemyX, 0, this.height);
    this.enemies.push(enemy);
  }

  update() {
    if (!this.isRunning){
      if (this.gameMusic.paused) {
        this.gameMusic.play(); // Oyun başladığında müziği başlat
      }
      return; // Oyun çalışmıyorsa herhangi bir şey yapma
    }
    if (this.isRunning){
      if (this.gameMusic.paused) {
        this.gameMusic.play(); // Oyun başladığında müziği başlat
      }
    }

    if (this.gameOver || this.gameWon)  {
      if (!this.gameMusic.paused) {
        this.gameMusic.currentTime = 0; // Oyun bittiğinde müziği başa al
        this.gameMusic.pause(); // Oyun bittiğinde müziği durdur
      }
      return; // Oyun bittiyse herhangi bir şey yapma
    }

    if (this.enemies.filter(e => !e.isVanished).length < 10 && Date.now() - this.lastEnemySpawnTime > this.enemySpawnInterval) {
      // maks 10 düşman
      if(Enemy.ENEMY_COUNT > 0){
        this.spawnEnemy();
      }
      this.lastEnemySpawnTime = Date.now();
      this.enemySpawnInterval = Math.max(1000, this.enemySpawnInterval * 0.98);
    }

    const deltaTime = 16; 
    this.player.update(this.height);

    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update(this.player, deltaTime); 

      // Eğer düşman öldüyse ve ekranın solundan tamamen çıktıysa diziden kaldır
      if (enemy.isVanished && enemy.x + enemy.width < 0) {
        this.enemies.splice(i, 1);
        continue;
      }
      // Eğer düşman sadece öldüyse (ama henüz kaybolmadıysa veya ekran dışına çıkmadıysa) sonraki işlemlere geçme
      if (enemy.isDead) continue;

      // Düşman oyuncu ile çarpışırsa
      if (enemy.collidesWith(this.player)) {
        // Oyuncu saldırıyorsa
        if (this.player.isAttacking && this.player.currentAnimationName === 'attack') {
          const enemyWasAlive = !enemy.isDead;
          enemy.takeDamage(this.player.power);
          if (enemy.isDead && enemyWasAlive) {
            this.score += enemy.scoreValue;
            this.defeatedEnemies++;
            this.player.power += 1; // Oyuncunun gücünü artır
          }
        } else if (!this.player.isAttacking && enemy.isAttacking) { // Oyuncu saldırmıyorsa ve düşman saldırıyorsa
          this.player.takeDamage(enemy.damage);
        }
      }
    }

    if (this.player.health <= 0) {
      this.gameOver = true;
    }

    this.gameWon = Enemy.ENEMY_COUNT <= 0;
  }

  // Oyun döngüsü
  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.backgroundImage.complete && this.backgroundImage.naturalHeight !== 0) {
      this.ctx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
    } else {
      this.ctx.fillStyle = "#333";
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

    if (this.player) this.player.draw(this.ctx);
    this.enemies.forEach(enemy => enemy.draw(this.ctx));

    this.ctx.fillStyle = '#fff';
    this.ctx.font = '24px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Score: ${this.score}`, 20, 40);
    this.ctx.fillText(`Health: ${this.player.health}`, 20, 70);

    if (this.gameWon) { 
      this.ctx.fillStyle = 'rgba(0, 128, 0, 0.75)'; 
      this.ctx.fillRect(0, this.height / 2 - 60, this.width, 120);
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('YOU WON!', this.width / 2, this.height / 2);
      this.ctx.font = '24px Arial';
      this.ctx.fillText('Press R to Restart', this.width / 2, this.height / 2 + 40);
      if (this.wonMusic.paused) {
        this.wonMusic.play();
      }
  }
    else if (this.gameOver) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, this.height / 2 - 60, this.width, 120);
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Game Over', this.width / 2, this.height / 2);
      this.ctx.font = '24px Arial';
      this.ctx.fillText('Press R to Restart', this.width / 2, this.height / 2 + 40);
    }
  }

  // Oyun döngüsünün başlatılması
  gameLoop() {
    if (!this.isRunning) return;
    this.update();
    this.render();
    requestAnimationFrame(() => this.gameLoop());
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.init();
    this.gameLoop();
  }

  stop() {
    this.isRunning = false;
    this.removeEventListeners();
    this.eventListenersSet = false;
    this.enemies = []; // Menüye dönünce düşmanları temizle
    if (!this.gameMusic.paused) { 
        this.gameMusic.pause();
        this.gameMusic.currentTime = 0; 
    }
  }

  restart() {
    this.stop();
    Enemy.ENEMY_COUNT = 10; // Düşman sayısını sıfırla
    setTimeout(() => { this.start(); }, 100);
  }
}