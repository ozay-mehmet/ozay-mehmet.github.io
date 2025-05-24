class Player {
  static DEFAULT_WIDTH = 200;
  static DEFAULT_HEIGHT = 200;
  static DEFAULT_HEALTH = 100;
  static ATTACK_COOLDOWN_MS = 1; // saldırı bekleme süresi
  static ATTACK_DURATION_MS = 300; // saldırı süresi
  static JUMP_VELOCITY = -12;
  static GRAVITY = 0.6;
  static GROUND_Y_OFFSET = 50;
  static HEALTH_BAR_OFFSET_Y = 20;
  static HEALTH_BAR_HEIGHT = 10;
  static VELOCITY_DIVISOR = 10; // hız 

  // karakter tanımları
  static getPlayerTypes() {
    return [
      {
        name: "Şövalye",
        animations: {
          idle: [
            "./assets/characters/players/Player1/Warrior_01__IDLE_000.png",
            "./assets/characters/players/Player1/Warrior_01__IDLE_001.png",
            "./assets/characters/players/Player1/Warrior_01__IDLE_002.png",
            "./assets/characters/players/Player1/Warrior_01__IDLE_003.png",
            "./assets/characters/players/Player1/Warrior_01__IDLE_004.png",
            "./assets/characters/players/Player1/Warrior_01__IDLE_005.png",
            "./assets/characters/players/Player1/Warrior_01__IDLE_006.png",
            "./assets/characters/players/Player1/Warrior_01__IDLE_007.png",
            "./assets/characters/players/Player1/Warrior_01__IDLE_008.png",
            "./assets/characters/players/Player1/Warrior_01__IDLE_009.png"
          ],
          jump: [
            "./assets/characters/players/Player1/Warrior_01__JUMP_000.png",
            "./assets/characters/players/Player1/Warrior_01__JUMP_001.png",
            "./assets/characters/players/Player1/Warrior_01__JUMP_002.png",
            "./assets/characters/players/Player1/Warrior_01__JUMP_003.png",
            "./assets/characters/players/Player1/Warrior_01__JUMP_004.png",
            "./assets/characters/players/Player1/Warrior_01__JUMP_005.png",
            "./assets/characters/players/Player1/Warrior_01__JUMP_006.png",
            "./assets/characters/players/Player1/Warrior_01__JUMP_007.png",
            "./assets/characters/players/Player1/Warrior_01__JUMP_008.png",
            "./assets/characters/players/Player1/Warrior_01__JUMP_009.png"
          ],
          walk: [
            "./assets/characters/players/Player1/Warrior_01__WALK_000.png",
            "./assets/characters/players/Player1/Warrior_01__WALK_001.png",
            "./assets/characters/players/Player1/Warrior_01__WALK_002.png",
            "./assets/characters/players/Player1/Warrior_01__WALK_003.png",
            "./assets/characters/players/Player1/Warrior_01__WALK_004.png",
            "./assets/characters/players/Player1/Warrior_01__WALK_005.png",
            "./assets/characters/players/Player1/Warrior_01__WALK_006.png",
            "./assets/characters/players/Player1/Warrior_01__WALK_007.png",
            "./assets/characters/players/Player1/Warrior_01__WALK_008.png",
            "./assets/characters/players/Player1/Warrior_01__WALK_009.png"
          ],
          attack: [
            "./assets/characters/players/Player1/Warrior_01__ATTACK_000.png",
            "./assets/characters/players/Player1/Warrior_01__ATTACK_001.png",
            "./assets/characters/players/Player1/Warrior_01__ATTACK_002.png",
            "./assets/characters/players/Player1/Warrior_01__ATTACK_003.png",
            "./assets/characters/players/Player1/Warrior_01__ATTACK_004.png",
            "./assets/characters/players/Player1/Warrior_01__ATTACK_005.png",
            "./assets/characters/players/Player1/Warrior_01__ATTACK_006.png",
            "./assets/characters/players/Player1/Warrior_01__ATTACK_007.png",
            "./assets/characters/players/Player1/Warrior_01__ATTACK_008.png",
            "./assets/characters/players/Player1/Warrior_01__ATTACK_009.png"
          ],
          death: [
            "./assets/characters/players/Player1/Warrior_01__DIE_000.png",
            "./assets/characters/players/Player1/Warrior_01__DIE_001.png",
            "./assets/characters/players/Player1/Warrior_01__DIE_002.png",
            "./assets/characters/players/Player1/Warrior_01__DIE_003.png",
            "./assets/characters/players/Player1/Warrior_01__DIE_004.png",
            "./assets/characters/players/Player1/Warrior_01__DIE_005.png",
            "./assets/characters/players/Player1/Warrior_01__DIE_006.png",
            "./assets/characters/players/Player1/Warrior_01__DIE_007.png",
            "./assets/characters/players/Player1/Warrior_01__DIE_008.png",
            "./assets/characters/players/Player1/Warrior_01__DIE_009.png"
          ]
        },
        power: 60,
        speed: 40,
        description: "Çok tehlikeli, kılıç kalkan ustası.",
        health: 100
      },
      {
        name: "Bıçakçı",
        animations: {
          idle: [
            "./assets/characters/players/Player2/Warrior_02__IDLE_000.png",
            "./assets/characters/players/Player2/Warrior_02__IDLE_001.png",
            "./assets/characters/players/Player2/Warrior_02__IDLE_002.png",
            "./assets/characters/players/Player2/Warrior_02__IDLE_003.png",
            "./assets/characters/players/Player2/Warrior_02__IDLE_004.png",
            "./assets/characters/players/Player2/Warrior_02__IDLE_005.png",
            "./assets/characters/players/Player2/Warrior_02__IDLE_006.png",
            "./assets/characters/players/Player2/Warrior_02__IDLE_007.png",
            "./assets/characters/players/Player2/Warrior_02__IDLE_008.png",
            "./assets/characters/players/Player2/Warrior_02__IDLE_009.png"
          ],
          jump: [
            "./assets/characters/players/Player2/Warrior_02__JUMP_000.png",
            "./assets/characters/players/Player2/Warrior_02__JUMP_001.png",
            "./assets/characters/players/Player2/Warrior_02__JUMP_002.png",
            "./assets/characters/players/Player2/Warrior_02__JUMP_003.png",
            "./assets/characters/players/Player2/Warrior_02__JUMP_004.png",
            "./assets/characters/players/Player2/Warrior_02__JUMP_005.png",
            "./assets/characters/players/Player2/Warrior_02__JUMP_006.png",
            "./assets/characters/players/Player2/Warrior_02__JUMP_007.png",
            "./assets/characters/players/Player2/Warrior_02__JUMP_008.png",
            "./assets/characters/players/Player2/Warrior_02__JUMP_009.png"
          ],
          walk: [
            "./assets/characters/players/Player2/Warrior_02__WALK_000.png",
            "./assets/characters/players/Player2/Warrior_02__WALK_001.png",
            "./assets/characters/players/Player2/Warrior_02__WALK_002.png",
            "./assets/characters/players/Player2/Warrior_02__WALK_003.png",
            "./assets/characters/players/Player2/Warrior_02__WALK_004.png",
            "./assets/characters/players/Player2/Warrior_02__WALK_005.png",
            "./assets/characters/players/Player2/Warrior_02__WALK_006.png",
            "./assets/characters/players/Player2/Warrior_02__WALK_007.png",
            "./assets/characters/players/Player2/Warrior_02__WALK_008.png",
            "./assets/characters/players/Player2/Warrior_02__WALK_009.png"
          ],
          attack: [
            "./assets/characters/players/Player2/Warrior_02__ATTACK_000.png",
            "./assets/characters/players/Player2/Warrior_02__ATTACK_001.png",
            "./assets/characters/players/Player2/Warrior_02__ATTACK_002.png",
            "./assets/characters/players/Player2/Warrior_02__ATTACK_003.png",
            "./assets/characters/players/Player2/Warrior_02__ATTACK_004.png",
            "./assets/characters/players/Player2/Warrior_02__ATTACK_005.png",
            "./assets/characters/players/Player2/Warrior_02__ATTACK_006.png",
            "./assets/characters/players/Player2/Warrior_02__ATTACK_007.png",
            "./assets/characters/players/Player2/Warrior_02__ATTACK_008.png",
            "./assets/characters/players/Player2/Warrior_02__ATTACK_009.png"
          ],
          death: [
            "./assets/characters/players/Player2/Warrior_02__DIE_000.png",
            "./assets/characters/players/Player2/Warrior_02__DIE_001.png",
            "./assets/characters/players/Player2/Warrior_02__DIE_002.png",
            "./assets/characters/players/Player2/Warrior_02__DIE_003.png",
            "./assets/characters/players/Player2/Warrior_02__DIE_004.png",
            "./assets/characters/players/Player2/Warrior_02__DIE_005.png",
            "./assets/characters/players/Player2/Warrior_02__DIE_006.png",
            "./assets/characters/players/Player2/Warrior_02__DIE_007.png",
            "./assets/characters/players/Player2/Warrior_02__DIE_008.png",
            "./assets/characters/players/Player2/Warrior_02__DIE_009.png"
          ]
        },
        power: 80,
        speed: 30,
        description: "Zırhlı ve dayanıklı, yakın dövüş uzmanı.",
        health: 100
      },
      {
        name: "Okçu",
        animations: {
          idle: [
            "./assets/characters/players/Player3/Warrior_03__IDLE_000.png",
            "./assets/characters/players/Player3/Warrior_03__IDLE_001.png",
            "./assets/characters/players/Player3/Warrior_03__IDLE_002.png",
            "./assets/characters/players/Player3/Warrior_03__IDLE_003.png",
            "./assets/characters/players/Player3/Warrior_03__IDLE_004.png",
            "./assets/characters/players/Player3/Warrior_03__IDLE_005.png",
            "./assets/characters/players/Player3/Warrior_03__IDLE_006.png",
            "./assets/characters/players/Player3/Warrior_03__IDLE_007.png",
            "./assets/characters/players/Player3/Warrior_03__IDLE_008.png",
            "./assets/characters/players/Player3/Warrior_03__IDLE_009.png"
          ],
          jump: [
            "./assets/characters/players/Player3/Warrior_03__JUMP_000.png",
            "./assets/characters/players/Player3/Warrior_03__JUMP_001.png",
            "./assets/characters/players/Player3/Warrior_03__JUMP_002.png",
            "./assets/characters/players/Player3/Warrior_03__JUMP_003.png",
            "./assets/characters/players/Player3/Warrior_03__JUMP_004.png",
            "./assets/characters/players/Player3/Warrior_03__JUMP_005.png",
            "./assets/characters/players/Player3/Warrior_03__JUMP_006.png",
            "./assets/characters/players/Player3/Warrior_03__JUMP_007.png",
            "./assets/characters/players/Player3/Warrior_03__JUMP_008.png",
            "./assets/characters/players/Player3/Warrior_03__JUMP_009.png"
          ],
          walk: [
            "./assets/characters/players/Player3/Warrior_03__WALK_000.png",
            "./assets/characters/players/Player3/Warrior_03__WALK_001.png",
            "./assets/characters/players/Player3/Warrior_03__WALK_002.png",
            "./assets/characters/players/Player3/Warrior_03__WALK_003.png",
            "./assets/characters/players/Player3/Warrior_03__WALK_004.png",
            "./assets/characters/players/Player3/Warrior_03__WALK_005.png",
            "./assets/characters/players/Player3/Warrior_03__WALK_006.png",
            "./assets/characters/players/Player3/Warrior_03__WALK_007.png",
            "./assets/characters/players/Player3/Warrior_03__WALK_008.png",
            "./assets/characters/players/Player3/Warrior_03__WALK_009.png"
          ],
          attack: [
            "./assets/characters/players/Player3/Warrior_03__ATTACK_000.png",
            "./assets/characters/players/Player3/Warrior_03__ATTACK_001.png",
            "./assets/characters/players/Player3/Warrior_03__ATTACK_002.png",
            "./assets/characters/players/Player3/Warrior_03__ATTACK_003.png",
            "./assets/characters/players/Player3/Warrior_03__ATTACK_004.png",
            "./assets/characters/players/Player3/Warrior_03__ATTACK_005.png",
            "./assets/characters/players/Player3/Warrior_03__ATTACK_006.png",
            "./assets/characters/players/Player3/Warrior_03__ATTACK_007.png",
            "./assets/characters/players/Player3/Warrior_03__ATTACK_008.png",
            "./assets/characters/players/Player3/Warrior_03__ATTACK_009.png"
          ],
          death: [
            "./assets/characters/players/Player3/Warrior_03__DIE_000.png",
            "./assets/characters/players/Player3/Warrior_03__DIE_001.png",
            "./assets/characters/players/Player3/Warrior_03__DIE_002.png",
            "./assets/characters/players/Player3/Warrior_03__DIE_003.png",
            "./assets/characters/players/Player3/Warrior_03__DIE_004.png",
            "./assets/characters/players/Player3/Warrior_03__DIE_005.png",
            "./assets/characters/players/Player3/Warrior_03__DIE_006.png",
            "./assets/characters/players/Player3/Warrior_03__DIE_007.png",
            "./assets/characters/players/Player3/Warrior_03__DIE_008.png",
            "./assets/characters/players/Player3/Warrior_03__DIE_009.png"
          ]
        },
        power: 70,
        speed: 35,
        description: "Hızlı ve sinsi, kritik vuruş ustası.",
        health: 100
      }
    ];
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = Player.DEFAULT_WIDTH;
    this.height = Player.DEFAULT_HEIGHT;
    this.velocityX = 0;
    this.velocityY = 0;
    this.isJumping = false;
    this.isAttacking = false;
    this.lastAttackTime = 0;
    this.direction = 1;
    this.health = 100;
    this.maxHealth = 100;
    this.animations = {};
    this.spriteImages = {};
    this.currentAnimationName = 'idle';
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.animationSpeed = 5;
    this.animationLoops = true;
    this.isDead = false;
    this.initialImageLoaded = false;
  }

  async preloadAnimationImages() {
    this.initialImageLoaded = false;
    let firstImageToLoad = null;
    for (const animName in this.animations) {
      this.spriteImages[animName] = [];
      const imagePaths = this.animations[animName];
      if (imagePaths && imagePaths.length > 0) {
        if (!firstImageToLoad) firstImageToLoad = imagePaths[0];
        for (const imagePath of imagePaths) {
          const img = new Image();
          img.src = imagePath;
          this.spriteImages[animName].push(img);
        }
      }
    }
    if (this.spriteImages.idle && this.spriteImages.idle.length > 0 && this.spriteImages.idle[0]) {
      this.image = this.spriteImages.idle[0];
      if (this.image.complete) this.initialImageLoaded = true;
      else this.image.onload = () => { this.initialImageLoaded = true; };
    } else if (firstImageToLoad) {
      const tempImg = new Image();
      tempImg.src = firstImageToLoad;
      this.image = tempImg;
      if (this.image.complete) this.initialImageLoaded = true;
      else this.image.onload = () => { this.initialImageLoaded = true; };
    }
  }

  // karakterin türünü ayarlama
  setPlayerType(characterName) {
    const types = Player.getPlayerTypes();
    let typeData = types.find(t => t.name === characterName);
    if (!typeData) {
      typeData = types.find(t => t.name === "Şövalye") || types[0];
    }
    this.name = typeData.name;
    this.power = typeData.power;
    this.speed = typeData.speed;
    this.maxHealth = typeData.health || Player.DEFAULT_HEALTH;
    this.health = this.maxHealth;
    this.animations = typeData.animations;
    this.preloadAnimationImages().then(() => {
      this.setCurrentAnimation('idle');
    });
  }

  // animasyon ayarları
  setCurrentAnimation(animName, loop = true) {
    if (this.isDead && animName !== 'death') return;
    if ((this.currentAnimationName === 'jump' && animName === 'jump' && !this.animationLoops) ||
      (this.currentAnimationName === animName && this.animationLoops)) {
      return;
    }
    if (this.animations[animName] && this.spriteImages[animName] && this.spriteImages[animName].length > 0) {
      this.currentAnimationName = animName;
      this.currentFrame = 0;
      this.frameCounter = 0;
      this.animationLoops = loop;
      if (this.spriteImages[this.currentAnimationName][0]) {
        this.image = this.spriteImages[this.currentAnimationName][0];
        if (this.image.complete) this.initialImageLoaded = true;
        else this.image.onload = () => { this.initialImageLoaded = true; };
      }
    } else {
      if (this.animations.idle && this.spriteImages.idle && this.spriteImages.idle.length > 0) {
        this.currentAnimationName = 'idle';
        this.currentFrame = 0;
        this.frameCounter = 0;
        this.animationLoops = true;
        if (this.spriteImages.idle[0]) {
          this.image = this.spriteImages.idle[0];
          if (this.image.complete) this.initialImageLoaded = true;
          else this.image.onload = () => { this.initialImageLoaded = true; };
        }
      }
    }
  }

  // karakterin görüntüsünün çizilmesi
  drawCharacterImage(ctx, imageToDraw) {
    ctx.save();
    if (this.direction === -1) {
      ctx.scale(-1, 1);
      ctx.drawImage(imageToDraw, -this.x - this.width, this.y, this.width, this.height);
    } else {
      ctx.drawImage(imageToDraw, this.x, this.y, this.width, this.height);
    }
    ctx.restore();
  }

  // sağlık çubuğunun çizilmesi
  drawHealthBar(ctx) {
    ctx.save();
    ctx.fillStyle = "grey";
    ctx.fillRect(this.x, this.y - Player.HEALTH_BAR_OFFSET_Y, this.width, Player.HEALTH_BAR_HEIGHT);
    ctx.fillStyle = "green";
    const healthPercentage = this.health > 0 ? (this.health / this.maxHealth) : 0;
    ctx.fillRect(this.x, this.y - Player.HEALTH_BAR_OFFSET_Y, healthPercentage * this.width, Player.HEALTH_BAR_HEIGHT);
    ctx.restore();
  }

  draw(ctx) {
    let currentFrameImage;
    const currentAnimSet = this.spriteImages[this.currentAnimationName];
    if (currentAnimSet && currentAnimSet.length > 0 && currentAnimSet[this.currentFrame]) {
      currentFrameImage = currentAnimSet[this.currentFrame];
    } else if (this.image && this.initialImageLoaded) {
      currentFrameImage = this.image;
    }
    if (currentFrameImage && currentFrameImage.complete && currentFrameImage.naturalWidth > 0) {
      this.drawCharacterImage(ctx, currentFrameImage);
    } else {
      ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      if (currentFrameImage && !currentFrameImage.complete) {
        currentFrameImage.onload = () => { this.initialImageLoaded = true; };
      } else if (!this.initialImageLoaded && this.image && !this.image.complete) {
        this.image.onload = () => { this.initialImageLoaded = true; };
      }
    }
    this.drawHealthBar(ctx);
  }

  // tuşlara basıldığında karakterin hareketinin ayarlanması
  handleKeyDown(e) {
    if (this.isDead) return;
    switch (e.key.toLowerCase()) {
      case 'arrowleft':
      case 'a':
        this.velocityX = -this.speed / Player.VELOCITY_DIVISOR;
        this.direction = -1;
        if (!this.isAttacking && !this.isJumping) this.setCurrentAnimation('walk');
        break;
      case 'arrowright':
      case 'd':
        this.velocityX = this.speed / Player.VELOCITY_DIVISOR;
        this.direction = 1;
        if (!this.isAttacking && !this.isJumping) this.setCurrentAnimation('walk');
        break;
      case 'arrowup':
      case 'w':
      case ' ':
        if (!this.isJumping) {
          this.velocityY = Player.JUMP_VELOCITY;
          this.isJumping = true;
        }
        break;
      case 'f':
        this.attack();
        break;
    }
  }

  handleKeyUp(e) {
    if (this.isDead) return;
    switch (e.key.toLowerCase()) {
      case 'arrowleft':
      case 'a':
        if (this.velocityX < 0) this.velocityX = 0;
        if (!this.isAttacking && !this.isJumping && this.health > 0) this.setCurrentAnimation('idle');
        break;
      case 'arrowright':
      case 'd':
        if (this.velocityX > 0) this.velocityX = 0;
        if (!this.isAttacking && !this.isJumping && this.health > 0) this.setCurrentAnimation('idle');
        break;
    }
  }

  // saldırı 
  attack() {
    if (this.isDead || this.isAttacking) return;
    const now = Date.now();
    if (now - this.lastAttackTime >= Player.ATTACK_COOLDOWN_MS) {
      this.isAttacking = true;
      this.lastAttackTime = now;
      this.setCurrentAnimation('attack', false);
      this.velocityX = 0;
      this.attackSound = new Audio("./assets/audio/attack.mp3");
      this.attackSound.volume = 0.5;
      this.attackSound.play();
    }
  }

  // hasar alma 
  takeDamage(amount) {
    if (this.isDead) return;
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.die();
      this.playerMusic = new Audio("./assets/audio/game-over.mp3");
      this.playerMusic.volume = 0.9;
      this.playerMusic.play();
    }
  }

  // ölme fonksiyonu
  die() {
    if (!this.isDead) {
      this.isDead = true;
      this.velocityX = 0;
      this.isAttacking = false;
      this.isJumping = false;
      this.setCurrentAnimation('death', false);
    }
  }

  // oyun bittikten sonra karakterin güncellenmesi 
  update(canvasHeight) {
    if (this.isDead && this.currentAnimationName === 'death') {
      const deathAnimFrames = this.spriteImages.death;
      if (deathAnimFrames && this.currentFrame >= deathAnimFrames.length - 1) {
        this.frameCounter = 0;
        if (this.y < canvasHeight - this.height - Player.GROUND_Y_OFFSET) {
          this.velocityY += Player.GRAVITY;
          this.y += this.velocityY;
          if (this.y >= canvasHeight - this.height - Player.GROUND_Y_OFFSET) {
            this.y = canvasHeight - this.height - Player.GROUND_Y_OFFSET;
            this.velocityY = 0;
          }
        }
        return;
      }
    }

    // animasyon güncellemesi
    this.frameCounter++;
    if (this.frameCounter >= this.animationSpeed) {
      this.frameCounter = 0;
      this.currentFrame++;
      const currentAnimFrames = this.spriteImages[this.currentAnimationName];
      if (currentAnimFrames && this.currentFrame >= currentAnimFrames.length) {
        if (this.animationLoops) {
          this.currentFrame = 0;
        } else {
          this.currentFrame = currentAnimFrames.length - 1;
          if (this.currentAnimationName === 'attack') {
            this.isAttacking = false;
            this.setCurrentAnimation(this.velocityX !== 0 && !this.isJumping ? 'walk' : 'idle');
          }
        }
      }
    }

    // karakterin ölmeyecek şekilde hareket etmesi
    if (!this.isDead || (this.isDead && this.currentAnimationName === 'death' && this.y < canvasHeight - this.height - Player.GROUND_Y_OFFSET)) {
      this.x += this.velocityX;
      this.y += this.velocityY;
      const groundLevel = canvasHeight - this.height - Player.GROUND_Y_OFFSET;
      if (this.isJumping || this.y < groundLevel) {
        this.velocityY += Player.GRAVITY;
      }
      if (this.y >= groundLevel) {
        this.y = groundLevel;
        this.velocityY = 0;
        if (this.isJumping) {
          this.isJumping = false;
          if (!this.isAttacking && !this.isDead) {
            this.setCurrentAnimation(this.velocityX !== 0 ? 'walk' : 'idle');
          }
        }
      }
    }

    // karakterin hareket etmediğinde durmasının sağlannması 
    if (!this.isAttacking && !this.isJumping && !this.isDead) {
      if (this.velocityX !== 0) {
        if (this.currentAnimationName !== 'walk') this.setCurrentAnimation('walk');
      } else {
        if (this.currentAnimationName !== 'idle') this.setCurrentAnimation('idle');
      }
    }
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.health = this.maxHealth;
    this.velocityX = 0;
    this.velocityY = 0;
    this.isJumping = false;
    this.isAttacking = false;
    this.isDead = false;
    this.direction = 1;
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.setCurrentAnimation('idle');
  }
}