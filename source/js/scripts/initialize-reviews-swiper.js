import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function initReviewsSwiper() {
  let currentDevice = getCurrentDevice(); // Переменная для хранения текущего устройства
  const swiper = new Swiper('.reviews-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: getSlidesPerView(currentDevice), // Инициализация с текущим количеством слайдов
    spaceBetween: getSpace(currentDevice),
    loop: true,
    navigation: {
      nextEl: '.reviews-swiper-container__button--next',
      prevEl: '.reviews-swiper-container__button--prev',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    simulateTouch: currentDevice !== 'desktop',

  });

  window.addEventListener('resize', () => {
    const newDevice = getCurrentDevice();
    if (newDevice !== currentDevice) {
      currentDevice = newDevice;
      const newSlidesPerView = getSlidesPerView(newDevice);
      const newSpaceBetween = getSpace(newDevice);
      swiper.params.spaceBetween = newSpaceBetween;
      swiper.params.slidesPerView = newSlidesPerView;
      swiper.params.simulateTouch = newDevice !== 'desktop';
      swiper.update();
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
      return 5;
  }
}

export default initReviewsSwiper;
