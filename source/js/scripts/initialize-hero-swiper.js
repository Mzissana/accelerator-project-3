import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function updateBottomSpacing() {
  const activeSlide = document.querySelector('.swiper-slide-active');
  const infoBlock = activeSlide?.querySelector('.hero-slide__info');
  const pagination = document.querySelector('.hero-slide__swiper-pagination');

  if (infoBlock && pagination) {
    const targetBottom = infoBlock.offsetHeight + getBottomPadding();
    pagination.style.bottom = `${targetBottom}px`;
  }
}

function initHeroSwiper() {
  let currentDevice = getCurrentDevice();

  const swiper = new Swiper('.hero-swiper', {
    modules: [Pagination],
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    loop: false,
    pagination: {
      el: '.hero-slide__swiper-pagination',
      clickable: true,
    },
    simulateTouch: currentDevice !== 'desktop',
    watchOverflow: true,
    on: {
      init: updateBottomSpacing, // Устанавливаем корректное положение при инициализации
      slideChangeTransitionEnd: updateBottomSpacing, // Обновляем при смене слайда
    },
  });

  window.addEventListener('resize', () => {
    const newDevice = getCurrentDevice();
    if (newDevice !== currentDevice) {
      currentDevice = newDevice;
      swiper.params.simulateTouch = newDevice !== 'desktop';
      swiper.update();
    }
    updateBottomSpacing();
  });

  // Обновляем положение после полной загрузки страницы
  window.addEventListener('load', updateBottomSpacing);
}

function getCurrentDevice() {
  if (window.matchMedia('(min-width: 1440px)').matches) {
    return 'desktop';
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    return 'tablet';
  } else {
    return 'mobile';
  }
}

function getBottomPadding() {
  if (window.matchMedia('(min-width: 1440px)').matches) {
    return 50;
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    return 60;
  } else {
    return 20;
  }
}

export default initHeroSwiper;
