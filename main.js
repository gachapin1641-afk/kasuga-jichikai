// スクロールで隠れるヘッダー
let lastScrollY = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    header.classList.add('header--hidden');
  } else {
    header.classList.remove('header--hidden');
  }

  lastScrollY = currentScrollY;
});
const hamburger = document.querySelector('.header__hamburger');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const navClose = document.querySelector('.nav-menu__close');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.add('is-open');
    navOverlay.classList.add('is-open');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navOverlay.classList.remove('is-open');
  });
}

if (navOverlay) {
  navOverlay.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navOverlay.classList.remove('is-open');
  });
}

// モーダル（イベントページ用）
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const eventModal = document.getElementById('eventModal');
const modalOverlay = document.getElementById('modalOverlay');

if (openModal) {
  openModal.addEventListener('click', () => {
    eventModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => {
    eventModal.classList.remove('is-open');
    document.body.style.overflow = '';
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', () => {
    eventModal.classList.remove('is-open');
    document.body.style.overflow = '';
  });
}

// ============================================
// 屋台・出店データ
// 来年更新するときはここだけ編集してください
// ============================================
const stallData = [
  {
    name: 'サンエース',
    cardColor: '#FFF3E0',
    nameColor: '#E65100',
    images: [
      { src: 'images/yakisoba.png', alt: 'やきそば' },
      { src: 'images/beer.png', alt: 'ビール' }
    ],
    menu: ['やきそば', 'ハッシュドポテト', 'ビール'],
    trio: false
  },
  {
    name: 'クボタ会',
    cardColor: '#FCE4EC',
    nameColor: '#C2185B',
    images: [
      { src: 'images/sweets_wataame.png', alt: '綿菓子' },
      { src: 'images/sweets_wataame_kikai.png', alt: '綿菓子機械' }
    ],
    menu: ['綿菓子', 'ふわふわ食感'],
    trio: false
  },
  {
    name: 'ドゥソレイユ',
    cardColor: '#E8F5E9',
    nameColor: '#2E7D32',
    images: [
      { src: 'images/pan_melonpan.png', alt: 'メロンパン' },
      { src: 'images/food_hotdog.png', alt: 'ホットドッグ' },
      { src: 'images/sweets_donut.png', alt: 'ドーナツ' }
    ],
    menu: ['メロンパン', 'ホットドッグ', 'ドーナツ'],
    trio: true
  },
  {
    name: 'お米のお菓子',
    cardColor: '#F3E5F5',
    nameColor: '#6A1B9A',
    images: [
      { src: 'images/sweets_cookie.png', alt: 'クッキー' }
    ],
    menu: ['スィートポテト', 'クッキー'],
    trio: false
  },
  {
    name: '菊寿司',
    cardColor: '#E3F2FD',
    nameColor: '#1565C0',
    images: [
      { src: 'images/food_inarizushi_set.png', alt: 'いなり寿司' }
    ],
    menu: ['いなり寿司', '地元で愛される老舗の味'],
    trio: false
  },
  {
    name: '子供会',
    cardColor: '#FFF9C4',
    nameColor: '#F57F17',
    images: [
      { src: 'images/fukubiki_taikai.png', alt: '福引大会' }
    ],
    menu: ['あてもの', '何が当たるかわくわく'],
    trio: false
  },
  {
    name: '本部（子供会）',
    cardColor: '#E8EAF6',
    nameColor: '#283593',
    images: [
      { src: 'images/omatsuri_fukuro_superball.png', alt: 'スーパーボールすくい' }
    ],
    menu: ['スーパーボールすくい', '無料で楽しめる', '何個すくえるかな？'],
    trio: false
  },
  {
    name: '本部',
    cardColor: '#EFEBE9',
    nameColor: '#4E342E',
    images: [
      { src: 'images/kid_job_boy_syouboushi.png', alt: 'ちびっこ消防士' }
    ],
    menu: ['花火募金募集（ホットコーヒー）', 'ちびっこ消防士フォト撮影'],
    trio: false
  }
];

// 屋台カードを自動生成
const stallGrid = document.getElementById('stallGrid');
if (stallGrid) {
  stallData.forEach(stall => {
    const imgsClass = stall.trio
      ? 'event-stall-card__imgs event-stall-card__imgs--trio'
      : 'event-stall-card__imgs';

    const imgsHTML = stall.images
      .map(img => `<img src="${img.src}" alt="${img.alt}">`)
      .join('');

    const menuHTML = stall.menu
      .map(item => `<li>${item}</li>`)
      .join('');

    stallGrid.innerHTML += `
      <div class="event-stall-card" style="--card-color: ${stall.cardColor};">
        <p class="event-stall-card__name" style="color:${stall.nameColor};">${stall.name}</p>
        <div class="event-stall-card__inner">
          <div class="${imgsClass}">${imgsHTML}</div>
          <ul class="event-stall-card__menu">${menuHTML}</ul>
        </div>
      </div>`;
  });
}
