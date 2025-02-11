import Swiper from 'swiper';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

function initNewsSwiper() {
  let currentDevice = getCurrentDevice();
  let swiper = createSwiper(currentDevice);

  window.addEventListener('resize', () => {
    const newDevice = getCurrentDevice();
    if (newDevice !== currentDevice) {
      currentDevice = newDevice;
      swiper.destroy(true, true);
      swiper = createSwiper(currentDevice);
    } else {
      updateSlideHeights(swiper, currentDevice);
    }
  });
}

function createSwiper(device) {
  const swiper = new Swiper('.news-swiper', {
    modules: [Navigation, Pagination, Grid],
    spaceBetween: getSpace(device),
    direction: 'horizontal',
    slidesPerView: getSlidesPerView(device),
    grid: {
      rows: getGridRows(device),
      fill: getGridFill(device),
    },
    navigation: {
      nextEl: '.news-swiper-container__button--next',
      prevEl: '.news-swiper-container__button--prev',
    },
    simulateTouch: device !== 'desktop',
    on: {
      init: function () {
        updateSlideHeights(this, device);
      },
    },
  });

  return swiper;
}

function updateSlideHeights(swiper, device) {
  swiper.slides.forEach((slide, index) => {
    if (device === 'mobile') {
      slide.style.height = index % 2 === 0 ? '330px' : '240px';
    } else if (device === 'tablet') {
      slide.style.height = '350px';
    } else {
      slide.style.height = '400px';
    }
  });
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

function getSlidesPerView(device) {
  switch (device) {
    case 'desktop':
      return 3;
    case 'tablet':
      return 2;
    case 'mobile':
    default:
      return 1;
  }
}

function getSpace(device) {
  switch (device) {
    case 'desktop':
      return 32;
    case 'tablet':
      return 30;
    case 'mobile':
    default:
      return 20;
  }
}

function getGridFill(device) {
  switch (device) {
    case 'desktop':
    case 'tablet':
      return 'row';
    case 'mobile':
    default:
      return 'column';
  }
}

function getGridRows(device) {
  switch (device) {
    case 'desktop':
      return 1;
    case 'tablet':
    case 'mobile':
    default:
      return 2;
  }
}

export default initNewsSwiper;
