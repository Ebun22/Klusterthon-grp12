'use client'
import React, { useRef, useState } from 'react';
import { useStateContext } from '../Context/Context';

const Carousel = () => {
    const { cropDetails } = useStateContext();
    const { temperature, humidity, pH, waterAvailability } = cropDetails;

    let imgCont = useRef(null);

    const images = ['food.jpg', 'food (1).jpg', 'nature.jpg', 'food (2).jpg']

    const prev = () => { imgCont.current.scrollLeft -= imgCont.current.clientWidth, console.log("prev was clicked, ", imgCont) };
    const next = () => { imgCont.current.scrollLeft += imgCont.current.clientWidth, console.log("prev was clicked, ", imgCont.current.clientWidth) };
    return (
        <div className='relative flex w-full h-full'>
            <p onClick={prev} className='absolute insert-0 left-0 z-10 h-full'>Prev</p>
            <div ref={imgCont} className=' flex flex-row items-center w-full h-full overflow-x-scroll scroll-smooth snap-mandatory snap-x '>
                {images.map((image, index) => { return (<img key={index} className='snap-start h-screen min-w-full' src={image} />) })}
            </div>
            <div onClick={next} className='absolute inset-y-0 right-0 z-10 h-full'>next</div>

        </div>
    )
}

export default Carousel;