import { Swiper, SwiperSlide } from 'swiper/react';
import ads_1 from '../../assets/images/ads/ads_1.png';
import ads_2 from '../../assets/images/ads/ads_2.png';
import ads_3 from '../../assets/images/ads/ads_3.png';
import 'swiper/css';
import './styles.scss';

const Advertisment = () => {
  return (
    <div className="advertisment">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img src={ads_1} alt="ВНЕШКОМ" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={ads_2} alt="фотограф" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={ads_3} alt="vr-квест" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Advertisment;
