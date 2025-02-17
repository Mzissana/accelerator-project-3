const menuToggle = document.querySelector('.navigation-menu__toggle');
const menu = document.querySelector('.navigation-menu');
const logo = document.querySelector('.navigation__logo');

function isMobile() {
  return window.matchMedia('(max-width: 767px)').matches;
}

function openMenu() {
  const overlay = document.createElement('div');
  overlay.classList.add('navigation-overlay');
  document.body.appendChild(overlay);
  menu.classList.remove('navigation-menu--closed');
  menu.classList.add('navigation-menu--open');
  menuToggle.classList.add('active');
  overlay.classList.add('visible');

  if (isMobile()) {
    logo.style.display = 'none';
  }

  document.body.style.overflow = 'hidden';
  overlay.addEventListener('click', closeMenu);
  document.addEventListener('click', handleOutsideClick);
  window.addEventListener('resize', handleResize);
}

function closeMenu() {
  const overlay = document.querySelector('.navigation-overlay');
  if (overlay) {
    overlay.classList.remove('visible');
    document.body.removeChild(overlay);
  }

  logo.style.display = 'block';

  menu.classList.remove('navigation-menu--open');
  menu.classList.add('navigation-menu--closed');
  document.body.style.overflow = 'visible';
  menuToggle.classList.remove('active');
  document.body.style.overflow = '';

  document.removeEventListener('click', handleOutsideClick);
  window.removeEventListener('resize', handleResize);
}

function handleOutsideClick(event) {
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
}

function handleResize() {
  if (menu.classList.contains('navigation-menu--open')) {
    if (isMobile()) {
      logo.style.display = 'none';
    } else {
      logo.style.display = 'block';
    }
  }
}

function activateMenu() {
  menuToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // Чтобы клик по кнопке не срабатывал как клик вне меню
    if (menu.classList.contains('navigation-menu--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  const subMenus = document.querySelectorAll('.navigation-menu__item > .navigation-menu__link');

  subMenus.forEach((link) => {
    link.addEventListener('click', function (event) {
      const subMenu = this.nextElementSibling;
      if (subMenu && subMenu.classList.contains('navigation-menu__list--sub')) {
        event.preventDefault();
        subMenu.classList.toggle('open');
      }
    });

    link.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const subMenu = this.nextElementSibling;
        if (subMenu && subMenu.classList.contains('navigation-menu__list--sub')) {
          subMenu.classList.toggle('open');
        }
      }
    });
  });
}

export default activateMenu;
