import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const images = [
  { src: '/assets/gym.jpg', alt: 'Gym' },
  { src: '/assets/training.jpg', alt: 'Training' },
  { src: '/assets/workout.jpg', alt: 'Workout' }
];

export default function Banner() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
        style={{ minHeight: '600px' }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img.src}
              alt={img.alt}
              className= "rounded-lg w-full h-[600px] object-cover  shadow-md"
              style={{ marginTop: 0 }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Progress indicator outside Swiper */}
      <div className="autoplay-progress absolute bottom-8 left-8 flex items-center space-x-3 z-10 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
        <svg viewBox="0 0 48 48" ref={progressCircle} className="w-10 h-10 text-white drop-shadow-glow">
          <circle cx="24" cy="24" r="20" className="stroke-white/80 fill-none stroke-[3]" />
        </svg>
        <span ref={progressContent} className="text-white font-bold text-lg tracking-wider min-w-[2ch] drop-shadow-glow"></span>
      </div>
    </div>
  );
}