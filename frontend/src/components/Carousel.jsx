import React from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import products from '../product'
import { v4 as uuidv4 } from 'uuid'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Carousel = () => {
  return (
    <Swiper
      spaceBetween={30}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      navigation
      pagination={{ clickable: true }}
      className="w-full mb-40"
    >
      {products.slice(0, 5).map((product) => (
        <SwiperSlide
          className="bg-center bg-cover flex justify-center"
          key={uuidv4()}
        >
          <div className="w-[345px] h-[345px]">
            <img
              src={product.image}
              alt=""
              className="object-contain w-full h-full"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel
