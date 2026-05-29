// ハンバーガーメニュー
const hamburger = document.querySelector('.header__hamburger');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const navClose = document.querySelector('.nav-menu__close');
const navLinks = document.querySelectorAll('.nav-menu__link');

function openMenu() {
  navMenu.classList.add('is-open');
  navOverlay.classList.add('is-open');
}

function closeMenu() {
  navMenu.classList.remove('is-open');
  navOverlay.classList.remove('is-open');
}

hamburger.addEventListener('click', openMenu);
navClose.addEventListener('click', closeMenu);
navOverlay.addEventListener('click', closeMenu);
navLinks.forEach(link => link.addEventListener('click', closeMenu));
