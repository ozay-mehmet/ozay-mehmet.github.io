

# To Seal Upon A Sea of Stars!

A pixel-art exploration game inspired by To Sail Upon a Sea of Stars. Combines narrative-driven gameplay with simple combat and beautiful retro aesthetics. Developed using HTML5 Canvas and JavaScript.

🧭 **Tür**: 2D Pixel Art Keşif ve Dövüş Oyunu
🎮 **Motor**: HTML5 Canvas + JavaScript
🎨 **Tema**: Uzayda geçen, karakter seçimli retro RPG hissiyatı

## 🔥 Genel Bakış

“To Seal Upon A Sea of Stars” adlı bu oyun, oyuncuya yıldızlarla dolu bir evrende karakterini seçip, düşmanlarla savaşma, dünyayı keşfetme ve yeni bölgelere ulaşma imkânı tanır. Hikâye anlatımı, sade dövüş mekanikleri ve piksel sanatla harmanlanmış bir evrende geçer.

Ana menü ekranı:


Yükleme ekranı:


## 🕹️ Nasıl Oynanır?

- **Yön Tuşları (←, →)**: Karakteri sola ve sağa hareket ettirir.
- **ESC**: Ana menüye geri dönmeyi sağlar.
- **W**: Zıplama yapar.
- **F**: Saldırı yapar.
- **Mouse**: Menü ekranlarında seçim yapar.

Oyun başlangıcında karakterinizi seçerek oyuna başlarsınız. Düşmanlar rastgele saldırır veya hareket eder. Kazandığınız her savaş sonrası ilerleme kaydedersiniz.

## 🗂️ Dosya Yapısı

```
JSGame/
├── index.html             → Ana HTML sayfası
├── CSS/                 → Tüm oyun assetleri
│   ├── style.css         → Karakter sprite'ları
│   ├── game-menu.css               → Stil dosyası
├── JS/   
│   ├── start.js  
│   ├── main.js  
│   ├── gameEngine.js  
│   ├── player.js  
│   ├── enemy.js           → Oyun motoru ve ana döngü
├── assets/                 → Tüm oyun assetleri
│   ├── characters/  
│   	├── players/
|		├── Player1/ → Karakter sprite'ları
|		├── Player2/ → Karakter sprite'ları
|		├── Player3/ → Karakter sprite'ları
│   	├── enemies/
│   		├── Enemy1/  
|		├── Enemy2/ 
|		├── Enemy3/     → Düşman sprite'ları
│   ├── background-images/  → 
├── README.md               → Bu dosya
```

## 🎨 Kullanılan Assetler

### Grafikler (Sprite'lar, Arka Planlar)

- **Karakter ve düşman sprite'ları**: [CraftPix.net](https://craftpix.net/)
  - Karakterler: Şövalye, Büyücü, Okçu vb.
  - Düşmanlar: Goblin, Cadı, Mekanik yaratıklar
- **Arka plan**: Retro uzay ve kuzey ışıkları teması

> Lisans: Ücretsiz (Free for commercial and personal use) - Lisans belgesi CraftPix.net sitesinden alınabilir.

### Ses Efektleri

- 🎺 **Zafer müziği**: [Pixabay - Brass Fanfare with Timpani and Winchimes](https://pixabay.com/sound-effects/brass-fanfare-with-timpani-and-winchimes-reverberated-146260/)

## ⚙️ Kurulum

Oyun doğrudan tarayıcıda çalışır. Oynamak için:

```bash
# Adımları:
1. Klasörü bir dizine çıkar.
2. VS Code veya başka bir editörde aç.
3. index.html dosyasını Live Server ile çalıştır.
```

Alternatif olarak doğrudan tarayıcıya `index.html`'yi sürükleyip bırakabilirsiniz.

## 💡 Geliştirici Notları

- Rastgele düşman hareketi için `enemy.js` dosyasında `randomBehavior()` fonksiyonu kullanıldı.
- Saldırı animasyonları FPS optimizasyonu için kare bazlı animasyon dizileri ile yüklendi.
- Mobil uyumluluk şu anda sınırlıdır, ancak ileride genişletilecektir.

## 📌 Gelecek Planlar

- Çok oyunculu mod
- Yeni haritalar ve bulmacalar
- Hikaye diyalog sistemi (NPC ile etkileşimler)

## 🧑‍💻 Geliştirici

Mehmet Özay
📧 İletişim: [LinkedIn](https://www.linkedin.com/in/mehmet-ozay)
