import background_1 from '../../assets/mainPage/slider/Slide_1.jpg';
import background_2 from '../../assets/mainPage/slider/Slide_2.png';
import background_3 from '../../assets/mainPage/slider/Slide_3.png';
import background_4 from '../../assets/mainPage/slider/Slide_4.png';
import facebook from '../../assets/mainPage/sideBar/Facebook_white.svg';
import instagram from '../../assets/mainPage/sideBar/Instagram.svg';
import telegram from '../../assets/mainPage/sideBar/Telegram_white.svg';
import { sliderInterface } from '../../interfaces/mainPage';

export const menuItems: string[] = [
  'парковка',
  'страховка',
  'бензин',
  'обслуживание',
];

export const socialNetworks: {
  picture: string;
  name: string;
  link: string;
}[] = [
  {
    picture: facebook,
    name: 'facebook',
    link: 'https://www.facebook.com/dmitri.erkin',
  },
  {
    picture: instagram,
    name: 'instagram',
    link: 'https://www.instagram.com/idmitriier/?hl=ru',
  },
  {
    picture: telegram,
    name: 'telegram',
    link: 'https://web.telegram.org/',
  },
];

export const sliderItems: sliderInterface[] = [
  {
    title: 'Бесплатный парковка',
    content:
      'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
    background: background_1,
  },
  {
    title: 'Страховка',
    content: 'Полная страховка страховка автомобиля',
    background: background_2,
  },
  {
    title: 'Бензин',
    content: 'Полный бак на любой заправке города за наш счёт',
    background: background_3,
  },
  {
    title: 'Обслуживание',
    content: 'Автомобиль проходит еженедельное ТО',
    background: background_4,
  },
];
