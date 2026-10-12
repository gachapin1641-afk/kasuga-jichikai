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
      { src: 'images/yakisoba.png', alt: 'やきそば' }
    ],
    menu: ['やきそば', 'フランクフルト'],
    trio: false
  },
  {
    name: '地域クボタ会',
    cardColor: '#FCE4EC',
    nameColor: '#C2185B',
    images: [
      { src: 'images/sweets_wataame.png', alt: '綿菓子' },
      { src: 'images/sweets_wataame_kikai.png', alt: '綿菓子機械' }
    ],
    menu: [{ text: '綿菓子' }, { text: 'ふわふわ食感', desc: true }],
    trio: false
  },
  {
    name: 'ドゥソレイユ',
    cardColor: '#E8F5E9',
    nameColor: '#2E7D32',
    images: [
      { src: 'images/pan_melonpan.png', alt: 'メロンパン' },
      { src: 'images/food_hotdog.png', alt: 'ホットドッグ' }
    ],
    menu: ['メロンパン', 'ホットドッグ', 'ソフトクリーム'],
    trio: false
  },
  {
    name: 'お米のお菓子はな',
    cardColor: '#F3E5F5',
    nameColor: '#6A1B9A',
    images: [
      { src: 'images/sweets_cookie.png', alt: '焼き菓子' }
    ],
    menu: ['シフォンケーキ', '焼き菓子'],
    trio: false
  },
  {
    name: '菊寿司',
    cardColor: '#E3F2FD',
    nameColor: '#1565C0',
    images: [
      { src: 'images/food_inarizushi_set.png', alt: 'いなり寿司' }
    ],
    menu: [{ text: 'いなり寿司' }, { text: '地元で愛される老舗の味', desc: true }],
    trio: false
  },
  {
    name: 'バルーンアート',
    cardColor: '#FFF9C4',
    nameColor: '#F57F17',
    images: [],
    menu: [{ text: '風船であそぼ！' }, { text: 'バルーンアートの無料配布（小学生以下）', desc: true }],
    trio: false
  },
  {
    name: '春日自治会',
    cardColor: '#EFEBE9',
    nameColor: '#4E342E',
    images: [],
    menu: ['ホットコーヒー', 'お茶', 'ジュース', { text: '花火募金にご協力ください', desc: true }],
    trio: false
  },
  {
    name: '春日子ども会',
    cardColor: '#E8EAF6',
    nameColor: '#283593',
    images: [
      { src: 'images/omatsuri_fukuro_superball.png', alt: 'おもちゃ' }
    ],
    menu: ['おもちゃ販売'],
    trio: false
  },
  {
    name: 'ポン菓子 ポン吉',
    cardColor: '#FBE9E7',
    nameColor: '#BF360C',
    images: [],
    menu: ['ポン菓子', 'おでん', 'あてもの'],
    trio: false
  },
  {
    name: '雨ノチ晴レ',
    cardColor: '#E0F7FA',
    nameColor: '#00838F',
    images: [],
    menu: ['チキンオーバーライス', '肉巻きおにぎり', '手作りジンジャーエール', 'ドリロコス 他'],
    trio: false
  },
  {
    name: "M's cafe",
    cardColor: '#F1F8E9',
    nameColor: '#558B2F',
    images: [],
    menu: ['ミニクレープ 他'],
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

    // 写真がないお店は、写真の枠そのものを出さない（文字だけのカードになる）
    const imgsBlock = stall.images.length > 0
      ? `<div class="${imgsClass}">${imgsHTML}</div>`
      : '';

    const menuHTML = stall.menu
      .map(item => {
        if (typeof item === 'object' && item.desc) {
          return `<li class="event-stall-card__desc">${item.text}</li>`;
        }
        const text = typeof item === 'object' ? item.text : item;
        return `<li>${text}</li>`;
      })
      .join('');

    stallGrid.innerHTML += `
      <div class="event-stall-card" style="--card-color: ${stall.cardColor};">
        <p class="event-stall-card__name" style="color:${stall.nameColor};">${stall.name}</p>
        <div class="event-stall-card__inner">
          ${imgsBlock}
          <ul class="event-stall-card__menu">${menuHTML}</ul>
        </div>
      </div>`;
  });
}

// ウエルシアモーダル
const openWelciaModal = document.getElementById('openWelciaModal');
const closeWelciaModal = document.getElementById('closeWelciaModal');
const welciaModal = document.getElementById('welciaModal');
const welciaOverlay = document.getElementById('welciaOverlay');

if (openWelciaModal) {
  openWelciaModal.addEventListener('click', () => {
    welciaModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
}

if (closeWelciaModal) {
  closeWelciaModal.addEventListener('click', () => {
    welciaModal.classList.remove('is-open');
    document.body.style.overflow = '';
  });
}

if (welciaOverlay) {
  welciaOverlay.addEventListener('click', () => {
    welciaModal.classList.remove('is-open');
    document.body.style.overflow = '';
  });
}

// ============================================
// microCMS 連携（活動報告）
// 記事は microCMS の管理画面で書きます。ここは取り込みの仕組みです
// ============================================
const MICROCMS_SERVICE_ID = 'kasuga-jichikai';
const MICROCMS_ENDPOINT = 'katsudo';
// ★ここにAPIキー（読み取り専用）を貼り付けてください。'' の中身だけ置き換えます
const MICROCMS_API_KEY = '6EGPeveWgxUh3Ud5kmuXRjQOFhfaR5Q0T7tL';

// 記事を新しい順に取得する（limit=件数、fields=必要な項目だけ取る場合に指定）
async function fetchKatsudo(limit, fields) {
  if (!MICROCMS_API_KEY || MICROCMS_API_KEY.startsWith('ここに')) {
    throw new Error('APIキーが未設定です（main.js の MICROCMS_API_KEY に貼り付けてください）');
  }
  let url = `https://${MICROCMS_SERVICE_ID}.microcms.io/api/v1/${MICROCMS_ENDPOINT}?orders=-publishedAt&limit=${limit}`;
  if (fields) {
    url += `&fields=${fields}`;
  }
  const res = await fetch(url, {
    headers: { 'X-MICROCMS-API-KEY': MICROCMS_API_KEY }
  });
  if (!res.ok) {
    throw new Error(`記事の取得に失敗しました（${res.status}）`);
  }
  const data = await res.json();
  return data.contents;
}

// タイトルなど、文字として表示する部分の安全対策
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// 公開日時を日本時間の「2026年10月11日」の形にする
function formatDateJP(iso) {
  return new Date(iso).toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Tokyo'
  });
}

// 本文の写真を軽くする（幅800pxに縮小・スクロールしてから読み込み）
function optimizeBodyHTML(html) {
  return html
    .replace(/src="(https:\/\/images\.microcms-assets\.io\/[^"?]+)"/g, 'src="$1?w=800"')
    .replace(/<img /g, '<img loading="lazy" ');
}

// 活動報告ページ：記事の一覧を表示
const katsudoList = document.getElementById('katsudoList');
if (katsudoList) {
  katsudoList.innerHTML = '<p class="katsudo-message">読み込み中…</p>';

  fetchKatsudo(30)
    .then(posts => {
      if (posts.length === 0) {
        katsudoList.innerHTML = '<p class="katsudo-message">現在、掲載中の記事はありません。</p>';
        return;
      }

      katsudoList.innerHTML = posts.map(post => {
        const type = Array.isArray(post.type) ? post.type[0] : post.type;
        const typeHTML = type
          ? `<span class="katsudo-card__dept">${escapeHTML(type)}</span>`
          : '';
        const eyecatchHTML = post.image
          ? `<img class="katsudo-card__eyecatch" src="${escapeHTML(post.image.url)}?w=800" alt="" loading="lazy">`
          : '';
        // ギャラリー（複数画像）：本文の下に、写真を並べて表示する
        const galleryHTML = (post.gallery && post.gallery.length > 0)
          ? `<div class="katsudo-card__gallery">${post.gallery
              .map(img => `<img src="${escapeHTML(img.url)}?w=600" alt="" loading="lazy">`)
              .join('')}</div>`
          : '';

        return `
          <article class="katsudo-card" id="post-${escapeHTML(post.id)}">
            ${eyecatchHTML}
            <div class="katsudo-card__body">
              ${typeHTML}
              <span class="katsudo-card__date">${formatDateJP(post.publishedAt)}</span>
              <h2 class="katsudo-card__title">${escapeHTML(post.title)}</h2>
              <div class="katsudo-card__text">${optimizeBodyHTML(post.body || '')}</div>
              ${galleryHTML}
            </div>
          </article>`;
      }).join('');

      // トップページのタイトルから飛んできた時、その記事の位置まで移動する
      if (location.hash) {
        const target = document.getElementById(location.hash.slice(1));
        if (target) {
          target.scrollIntoView();
        }
      }
    })
    .catch(err => {
      console.error(err);
      katsudoList.innerHTML = '<p class="katsudo-message">記事を読み込めませんでした。時間をおいて、もう一度お試しください。</p>';
    });
}

// トップページ：最新3件のタイトルを表示
const katsudoPreview = document.getElementById('katsudoPreview');
if (katsudoPreview) {
  fetchKatsudo(3, 'id,title')
    .then(posts => {
      katsudoPreview.innerHTML = posts.map(post =>
        `<li><a href="katsudo.html#post-${escapeHTML(post.id)}">${escapeHTML(post.title)}</a></li>`
      ).join('');
    })
    .catch(err => {
      console.error(err);
    });
}
