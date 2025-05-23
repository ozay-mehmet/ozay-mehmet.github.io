class Enemy {
  static DEFAULT_WIDTH = 250;
  static DEFAULT_HEIGHT = 300;
  static GROUND_Y_OFFSET = -20;
  static HEALTH_BAR_OFFSET_Y = 15;
  static HEALTH_BAR_HEIGHT = 10;
  static DEFAULT_ANIMATION_FRAME_DURATION_MS = 150;
  static ATTACK_RANGE_MULTIPLIER = 0.8;
  static ENEMY_COUNT = 3;

  constructor(x,y, canvasHeight) {
    this.canvasHeight = canvasHeight;
    this.width = Enemy.DEFAULT_WIDTH;
    this.height = Enemy.DEFAULT_HEIGHT;
    this.x = x ?? (canvasHeight ? canvasHeight + Math.random() * 100 : 800);
    this.y = canvasHeight ? canvasHeight - this.height - Enemy.GROUND_Y_OFFSET : 300 - this.height - Enemy.GROUND_Y_OFFSET;
    this.direction = -1;

    this.animations = {};
    this.spriteImages = {};
    this.currentAnimationName = 'walk';
    this.currentFrame = 0;
    this.frameTimer = 0;
    this.animationFrameDuration = Enemy.DEFAULT_ANIMATION_FRAME_DURATION_MS;
    this.animationLoops = true;
    this.initialImageLoaded = false;
    this.image = null;

    this.enemyTypes = this.getEnemyTypes();
    this.setEnemyType();
    this.damage = 0.1;

    this.isDead = false;
    this.isAttacking = false;
    this.isVanished = false;

    this.lastActionTime = Date.now();
    this.actionInterval = this.getRandomInterval();
  }

  getEnemyTypes() {
    return [
      {
        name: "Knight",
        animations: {
          idle: ["./assets/characters/enemies/Enemy1/Knight_01__IDLE_000.png", "./assets/characters/enemies/Enemy1/Knight_01__IDLE_001.png", "./assets/characters/enemies/Enemy1/Knight_01__IDLE_002.png", "./assets/characters/enemies/Enemy1/Knight_01__IDLE_003.png", "./assets/characters/enemies/Enemy1/Knight_01__IDLE_004.png", "./assets/characters/enemies/Enemy1/Knight_01__IDLE_005.png", "./assets/characters/enemies/Enemy1/Knight_01__IDLE_006.png", "./assets/characters/enemies/Enemy1/Knight_01__IDLE_007.png", "./assets/characters/enemies/Enemy1/Knight_01__IDLE_008.png", "./assets/characters/enemies/Enemy1/Knight_01__IDLE_009.png"],
          walk: ["./assets/characters/enemies/Enemy1/Knight_01__WALK_000.png", "./assets/characters/enemies/Enemy1/Knight_01__WALK_001.png", "./assets/characters/enemies/Enemy1/Knight_01__WALK_002.png", "./assets/characters/enemies/Enemy1/Knight_01__WALK_003.png", "./assets/characters/enemies/Enemy1/Knight_01__WALK_004.png", "./assets/characters/enemies/Enemy1/Knight_01__WALK_005.png", "./assets/characters/enemies/Enemy1/Knight_01__WALK_006.png", "./assets/characters/enemies/Enemy1/Knight_01__WALK_007.png", "./assets/characters/enemies/Enemy1/Knight_01__WALK_008.png", "./assets/characters/enemies/Enemy1/Knight_01__WALK_009.png"],
          attack: ["./assets/characters/enemies/Enemy1/Knight_01__ATTACK_000.png", "./assets/characters/enemies/Enemy1/Knight_01__ATTACK_001.png", "./assets/characters/enemies/Enemy1/Knight_01__ATTACK_002.png", "./assets/characters/enemies/Enemy1/Knight_01__ATTACK_003.png", "./assets/characters/enemies/Enemy1/Knight_01__ATTACK_004.png", "./assets/characters/enemies/Enemy1/Knight_01__ATTACK_005.png", "./assets/characters/enemies/Enemy1/Knight_01__ATTACK_006.png", "./assets/characters/enemies/Enemy1/Knight_01__ATTACK_007.png", "./assets/characters/enemies/Enemy1/Knight_01__ATTACK_008.png", "./assets/characters/enemies/Enemy1/Knight_01__ATTACK_009.png"],
          death: ["./assets/characters/enemies/Enemy1/Knight_01__DIE_000.png", "./assets/characters/enemies/Enemy1/Knight_01__DIE_001.png", "./assets/characters/enemies/Enemy1/Knight_01__DIE_002.png", "./assets/characters/enemies/Enemy1/Knight_01__DIE_003.png", "./assets/characters/enemies/Enemy1/Knight_01__DIE_004.png", "./assets/characters/enemies/Enemy1/Knight_01__DIE_005.png", "./assets/characters/enemies/Enemy1/Knight_01__DIE_006.png", "./assets/characters/enemies/Enemy1/Knight_01__DIE_007.png", "./assets/characters/enemies/Enemy1/Knight_01__DIE_008.png", "./assets/characters/enemies/Enemy1/Knight_01__DIE_009.png"]
        },
        health: 100,
        damage: 15,
        scoreValue: 100,
        speedRange: [0.8, 1.2]
      },
      {
        name: "Haydut",
        animations: {
          idle: ["./assets/characters/enemies/Enemy2/Knight_02__IDLE_000.png", "./assets/characters/enemies/Enemy2/Knight_02__IDLE_001.png", "./assets/characters/enemies/Enemy2/Knight_02__IDLE_002.png", "./assets/characters/enemies/Enemy2/Knight_02__IDLE_003.png", "./assets/characters/enemies/Enemy2/Knight_02__IDLE_004.png", "./assets/characters/enemies/Enemy2/Knight_02__IDLE_005.png", "./assets/characters/enemies/Enemy2/Knight_02__IDLE_006.png", "./assets/characters/enemies/Enemy2/Knight_02__IDLE_007.png", "./assets/characters/enemies/Enemy2/Knight_02__IDLE_008.png", "./assets/characters/enemies/Enemy2/Knight_02__IDLE_009.png"],
          walk: ["./assets/characters/enemies/Enemy2/Knight_02__WALK_000.png", "./assets/characters/enemies/Enemy2/Knight_02__WALK_001.png", "./assets/characters/enemies/Enemy2/Knight_02__WALK_002.png", "./assets/characters/enemies/Enemy2/Knight_02__WALK_003.png", "./assets/characters/enemies/Enemy2/Knight_02__WALK_004.png", "./assets/characters/enemies/Enemy2/Knight_02__WALK_005.png", "./assets/characters/enemies/Enemy2/Knight_02__WALK_006.png", "./assets/characters/enemies/Enemy2/Knight_02__WALK_007.png", "./assets/characters/enemies/Enemy2/Knight_02__WALK_008.png", "./assets/characters/enemies/Enemy2/Knight_02__WALK_009.png"],
          attack: ["./assets/characters/enemies/Enemy2/Knight_02__ATTACK_000.png", "./assets/characters/enemies/Enemy2/Knight_02__ATTACK_001.png", "./assets/characters/enemies/Enemy2/Knight_02__ATTACK_002.png", "./assets/characters/enemies/Enemy2/Knight_02__ATTACK_003.png", "./assets/characters/enemies/Enemy2/Knight_02__ATTACK_004.png", "./assets/characters/enemies/Enemy2/Knight_02__ATTACK_005.png", "./assets/characters/enemies/Enemy2/Knight_02__ATTACK_006.png", "./assets/characters/enemies/Enemy2/Knight_02__ATTACK_007.png", "./assets/characters/enemies/Enemy2/Knight_02__ATTACK_008.png", "./assets/characters/enemies/Enemy2/Knight_02__ATTACK_009.png"],
          death: ["./assets/characters/enemies/Enemy2/Knight_02__DIE_000.png", "./assets/characters/enemies/Enemy2/Knight_02__DIE_001.png", "./assets/characters/enemies/Enemy2/Knight_02__DIE_002.png", "./assets/characters/enemies/Enemy2/Knight_02__DIE_003.png", "./assets/characters/enemies/Enemy2/Knight_02__DIE_004.png", "./assets/characters/enemies/Enemy2/Knight_02__DIE_005.png", "./assets/characters/enemies/Enemy2/Knight_02__DIE_006.png", "./assets/characters/enemies/Enemy2/Knight_02__DIE_007.png", "./assets/characters/enemies/Enemy2/Knight_02__DIE_008.png", "./assets/characters/enemies/Enemy2/Knight_02__DIE_009.png"]
        },
        health: 120,
        damage: 20,
        scoreValue: 120,
        speedRange: [0.6, 1.0]
      },
      {
        name: "Skeleton",
        animations: {
          idle: ["./assets/characters/enemies/Enemy3/Knight_03__IDLE_000.png", "./assets/characters/enemies/Enemy3/Knight_03__IDLE_001.png", "./assets/characters/enemies/Enemy3/Knight_03__IDLE_002.png", "./assets/characters/enemies/Enemy3/Knight_03__IDLE_003.png", "./assets/characters/enemies/Enemy3/Knight_03__IDLE_004.png", "./assets/characters/enemies/Enemy3/Knight_03__IDLE_005.png", "./assets/characters/enemies/Enemy3/Knight_03__IDLE_006.png", "./assets/characters/enemies/Enemy3/Knight_03__IDLE_007.png", "./assets/characters/enemies/Enemy3/Knight_03__IDLE_008.png", "./assets/characters/enemies/Enemy3/Knight_03__IDLE_009.png"],
          walk: ["./assets/characters/enemies/Enemy3/Knight_03__WALK_000.png", "./assets/characters/enemies/Enemy3/Knight_03__WALK_001.png", "./assets/characters/enemies/Enemy3/Knight_03__WALK_002.png", "./assets/characters/enemies/Enemy3/Knight_03__WALK_003.png", "./assets/characters/enemies/Enemy3/Knight_03__WALK_004.png", "./assets/characters/enemies/Enemy3/Knight_03__WALK_005.png", "./assets/characters/enemies/Enemy3/Knight_03__WALK_006.png", "./assets/characters/enemies/Enemy3/Knight_03__WALK_007.png", "./assets/characters/enemies/Enemy3/Knight_03__WALK_008.png", "./assets/characters/enemies/Enemy3/Knight_03__WALK_009.png"],
          attack: ["./assets/characters/enemies/Enemy3/Knight_03__ATTACK_000.png", "./assets/characters/enemies/Enemy3/Knight_03__ATTACK_001.png", "./assets/characters/enemies/Enemy3/Knight_03__ATTACK_002.png", "./assets/characters/enemies/Enemy3/Knight_03__ATTACK_003.png", "./assets/characters/enemies/Enemy3/Knight_03__ATTACK_004.png", "./assets/characters/enemies/Enemy3/Knight_03__ATTACK_005.png", "./assets/characters/enemies/Enemy3/Knight_03__ATTACK_006.png", "./assets/characters/enemies/Enemy3/Knight_03__ATTACK_007.png", "./assets/characters/enemies/Enemy3/Knight_03__ATTACK_008.png", "./assets/characters/enemies/Enemy3/Knight_03__ATTACK_009.png"],
          death: ["./assets/characters/enemies/Enemy3/Knight_03__DIE_000.png", "./assets/characters/enemies/Enemy3/Knight_03__DIE_001.png", "./assets/characters/enemies/Enemy3/Knight_03__DIE_002.png", "./assets/characters/enemies/Enemy3/Knight_03__DIE_003.png", "./assets/characters/enemies/Enemy3/Knight_03__DIE_004.png", "./assets/characters/enemies/Enemy3/Knight_03__DIE_005.png", "./assets/characters/enemies/Enemy3/Knight_03__DIE_006.png", "./assets/characters/enemies/Enemy3/Knight_03__DIE_007.png", "./assets/characters/enemies/Enemy3/Knight_03__DIE_008.png", "./assets/characters/enemies/Enemy3/Knight_03__DIE_009.png"]
        },
        health: 80,
        damage: 10,
        scoreValue: 80,
        speedRange: [1.0, 1.5]
      }
    ];
  }

  async preloadAnimationImages() {
    this.initialImageLoaded = false;
    let firstImageToLoadPath = null;
    for (const animName in this.animations) {
      this.spriteImages[animName] = [];
      const imagePaths = this.animations[animName];
      if (imagePaths && imagePaths.length > 0) {
        if (!firstImageToLoadPath) firstImageToLoadPath = imagePaths[0];
        for (const imagePath of imagePaths) {
          const img = new Image();
          img.src = imagePath;
          this.spriteImages[animName].push(img);
        }
      }
    }
    const initialAnim = this.spriteImages.walk || this.spriteImages.idle || this.spriteImages[Object.keys(this.spriteImages)[0]];
    if (initialAnim && initialAnim.length > 0 && initialAnim[0]) {
      this.image = initialAnim[0];
      if (this.image.complete) this.initialImageLoaded = true;
      else await new Promise(resolve => { this.image.onload = () => { this.initialImageLoaded = true; resolve(); }; });
    } else if (firstImageToLoadPath) {
      const tempImg = new Image();
      tempImg.src = firstImageToLoadPath;
      this.image = tempImg;
      if (this.image.complete) this.initialImageLoaded = true;
      else await new Promise(resolve => { this.image.onload = () => { this.initialImageLoaded = true; resolve(); }; });
    }
  }

  setEnemyType() {
    const typeData = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
    if (!typeData) {
      this.type = "MEHMET ÖZAY";
      this.animations = { idle: [], walk: [], attack: [], death: [] };
      this.maxHealth = 50;
      this.health = 50;
      this.damage = 5;
      this.scoreValue = 10;
      this.speed = 1;
    } else {
      this.type = typeData.name;
      this.animations = typeData.animations;
      this.maxHealth = typeData.health;
      this.health = typeData.health;
      this.damage = typeData.damage;
      this.scoreValue = typeData.scoreValue;
      const speedRange = typeData.speedRange || [0.5, 1.5];
      this.speed = Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
    }
    this.isVanished = false;
    this.isDead = false;
    this.isAttacking = false;
    this.preloadAnimationImages().then(() => {
      this.setCurrentAnimation(this.isAttacking ? 'attack' : 'walk');
    });
  }

  setCurrentAnimation(animName, loop = true) {
    if (this.isDead && animName !== 'death') return;
    if (this.currentAnimationName === animName && this.animationLoops === loop) return;
    if (this.animations[animName] && this.spriteImages[animName] && this.spriteImages[animName].length > 0) {
      this.currentAnimationName = animName;
      this.currentFrame = 0;
      this.frameTimer = 0;
      this.animationLoops = loop;
      this.animationFrameDuration = Enemy.DEFAULT_ANIMATION_FRAME_DURATION_MS;
      if (this.spriteImages[this.currentAnimationName][0]) {
        this.image = this.spriteImages[this.currentAnimationName][0];
        if (this.image.complete) this.initialImageLoaded = true;
        else this.image.onload = () => { this.initialImageLoaded = true; };
      }
    } else {
      const fallbackAnim = (this.animations.walk && this.spriteImages.walk && this.spriteImages.walk.length > 0) ? 'walk' : 'idle';
      if (this.animations[fallbackAnim] && this.spriteImages[fallbackAnim] && this.spriteImages[fallbackAnim].length > 0) {
        this.currentAnimationName = fallbackAnim;
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.animationLoops = true;
        this.animationFrameDuration = Enemy.DEFAULT_ANIMATION_FRAME_DURATION_MS;
        if (this.spriteImages[this.currentAnimationName][0]) {
          this.image = this.spriteImages[this.currentAnimationName][0];
          if (this.image.complete) this.initialImageLoaded = true;
          else this.image.onload = () => { this.initialImageLoaded = true; };
        }
      } else {
        this.image = null;
      }
    }
  }

  getRandomInterval() {
    return Math.random() * 2000 + 1500;
  }

  draw(ctx) {
    if (this.isVanished) return;
    if (this.isDead && this.currentAnimationName === 'death' && !this.animationLoops && this.spriteImages.death && this.currentFrame >= this.spriteImages.death.length - 1) {
    } else if (this.isDead && this.currentAnimationName !== 'death') {
      return;
    }
    let currentFrameImage;
    const currentAnimSet = this.spriteImages[this.currentAnimationName];
    if (currentAnimSet && currentAnimSet.length > 0 && currentAnimSet[this.currentFrame]) {
      currentFrameImage = currentAnimSet[this.currentFrame];
    } else if (this.image && this.initialImageLoaded) {
      currentFrameImage = this.image;
    }
    if (currentFrameImage && currentFrameImage.complete && currentFrameImage.naturalWidth > 0) {
      ctx.save();
      if (this.direction === -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(currentFrameImage, -(this.x + this.width), this.y, this.width, this.height);
      } else {
        ctx.drawImage(currentFrameImage, this.x, this.y, this.width, this.height);
      }
      ctx.restore();
    } else {
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      if (currentFrameImage && !currentFrameImage.complete) {
        currentFrameImage.onload = () => { this.initialImageLoaded = true; };
      } else if (!this.initialImageLoaded && this.image && !this.image.complete) {
        this.image.onload = () => { this.initialImageLoaded = true; };
      }
    }
    ctx.save();
    ctx.fillStyle = "grey";
    ctx.fillRect(this.x, this.y - Enemy.HEALTH_BAR_OFFSET_Y, this.width, Enemy.HEALTH_BAR_HEIGHT);
    ctx.fillStyle = "red";
    const healthPercentage = this.maxHealth > 0 ? Math.max(0, this.health / this.maxHealth) : 0;
    ctx.fillRect(this.x, this.y - Enemy.HEALTH_BAR_OFFSET_Y, this.width * healthPercentage, Enemy.HEALTH_BAR_HEIGHT);
    ctx.restore();
  }

  update(player, deltaTime) {
    if (this.isVanished) return;
    if (this.isDead && this.currentAnimationName === 'death') {
      const deathAnimFrames = this.spriteImages.death;
      if (deathAnimFrames && this.currentFrame >= deathAnimFrames.length - 1 && !this.animationLoops) {
        this.isVanished = true;
        return;
      }
    } else if (this.isDead) {
      return;
    }
    const now = Date.now();
    this.frameTimer += deltaTime;
    if (this.frameTimer >= this.animationFrameDuration) {
      this.frameTimer -= this.animationFrameDuration;
      this.currentFrame++;
      const currentAnimFrames = this.spriteImages[this.currentAnimationName];
      if (currentAnimFrames && this.currentFrame >= currentAnimFrames.length) {
        if (this.animationLoops) {
          this.currentFrame = 0;
        } else {
          this.currentFrame = currentAnimFrames.length - 1;
          if (this.currentAnimationName === 'attack') {
            this.isAttacking = false;
            this.setCurrentAnimation('walk', true);
            this.actionInterval = this.getRandomInterval();
          } else if (this.currentAnimationName === 'death') {
            this.isVanished = true;
          }
        }
      }
    }
    if (now - this.lastActionTime > this.actionInterval && !this.isAttacking) {
      const distanceToPlayerX = (player.x + player.width / 2) - (this.x + this.width / 2);
      const attackRange = this.width * Enemy.ATTACK_RANGE_MULTIPLIER;
      if (distanceToPlayerX < -attackRange / 2) this.direction = -1;
      else if (distanceToPlayerX > attackRange / 2) this.direction = 1;
      if (Math.abs(distanceToPlayerX) < attackRange && Math.abs(player.y - this.y) < this.height / 2 && !player.isDead) {
        this.isAttacking = true;
        this.setCurrentAnimation('attack', false);
      } else {
        this.isAttacking = false;
        this.setCurrentAnimation('walk', true);
      }
      this.lastActionTime = now;
      this.actionInterval = this.getRandomInterval();
    }
    if (!this.isAttacking && !this.isDead) {
      this.x += this.speed * this.direction;
      if (this.currentAnimationName !== 'walk') {
        this.setCurrentAnimation('walk', true);
      }
    }
  }

  collidesWith(entity) {
    if (this.isDead || (entity.isDead !== undefined && entity.isDead)) return false;
    return (
      this.x < entity.x + entity.width &&
      this.x + this.width > entity.x &&
      this.y < entity.y + entity.height &&
      this.y + this.height > entity.y
    );
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.isDead) 
      return;
    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
  }

  die() {
    if (!this.isDead) {
      this.isDead = true;
      this.isAttacking = false;
      Enemy.ENEMY_COUNT--;
      this.speed = 0;
      this.setCurrentAnimation('death', false);
  }}

  reset(canvasHeight, newX) {
    this.canvasHeight = canvasHeight;
    this.x = newX ?? (canvasHeight + Math.random() * 100);
    this.y = canvasHeight - this.height - Enemy.GROUND_Y_OFFSET;
    this.setEnemyType();
    this.health = this.maxHealth;
    this.isDead = false;
    this.isAttacking = false;
    this.currentFrame = 0;
    this.frameTimer = 0;
    this.lastActionTime = Date.now();
    this.actionInterval = this.getRandomInterval();
    this.direction = -1;
  }
}