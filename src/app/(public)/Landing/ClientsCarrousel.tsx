
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

import Image from 'next/image';


export default function ClientsSection () {


  const slides = [
    {
      src: "/descodei.png",
      alt: "Descodei",
      name: "Descodei",
    },
    {
      src: "/descodei.png",
      alt: "Descodei",
      name: "Descodei",
    },
    {
      src: "/descodei.png",
      alt: "Descodei",
      name: "Descodei",
    },
    {
      src: "/descodei.png",
      alt: "Descodei",
      name: "Descodei",
    },
    {
      src: "/descodei.png",
      alt: "Descodei",
      name: "Descodei",
    },
  ];



  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="">
          <Swiper
            slidesPerView={2}
            spaceBetween={20} // Remove espaço entre os slides para um movimento contínuo
            speed={10000} // Velocidade de rotação
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            autoplay={{
              delay: 0, // Remove qualquer atraso
              disableOnInteraction: false, // Não desabilita autoplay ao interagir
              waitForTransition: false, // Não espera a transição para iniciar
            }}
            loop={true}
            modules={[Autoplay]}
            className="client-carousel"
          >
            {Array(3) // Replicando o array para simular movimento infinito
              .fill(slides)
              .flat()
              .map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className='flex flex-col text-white items-center'>
                    <Image
                      className="max-h-12 w-full object-contain"
                      src={slide.src}
                      alt={slide.alt}
                      width="158"
                      height="48"
                    /> <h1>{slide.name}</h1>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

