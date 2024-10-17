"use client"; 
import Image from "next/image"; 
import { brands } from "../../data/brands"; 
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Navigation, Pagination, Autoplay } from "swiper"; 
import "swiper/swiper-bundle.min.css"; // Import Swiper styles

const Brands = ({ backgroundColorComponent, brandsTwo }) => {
  return (
    <section
      className={`${
        brandsTwo ? "layout-pt-md" : "layout-pt-lg"
      } layout-pb-md ${backgroundColorComponent ? backgroundColorComponent : ""}`}
    >
      <div className="container">
        <div className="row justify-center">
          <div className="col text-center">
            <p className="text-lg text-dark-1">Trusted by the world’s best</p>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1} // Adjust as needed
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          autoplay={{
            delay: 2000, // Adjust the delay between slides (in milliseconds)
            disableOnInteraction: false, // Autoplay will not be disabled after user interactions
          }}
        >
          {brands.map((logo, i) => (
            <SwiperSlide key={i}>
              <div className="d-flex justify-center items-center px-4">
                <Image
                  className="w-1/1"
                  src={logo && logo}
                  alt="clients image"
                  width={140}
                  height={90}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brands;
