'use client'
import React, { useRef, useState, useEffect } from 'react';
import { useStateContext } from '../Context/Context';

const Carousel = () => {
    const { cropDetails } = useStateContext();
    const { temperature, humidity, pH, waterAvailability } = cropDetails;

    let imgCont = useRef(null);

    const images = ['food.jpg', 'food (1).jpg', 'nature.jpg', 'food (2).jpg']

    const prev = () => { imgCont.current.scrollLeft -= imgCont.current.clientWidth, console.log("prev was clicked, ", imgCont) };
    const next = () => { imgCont.current.scrollLeft += imgCont.current.clientWidth, console.log("prev was clicked, ", imgCont.current.clientWidth) };

    useEffect(() => {
        const slider = setInterval(() => {
            const container = imgCont.current;

            const maxScroll = container.scrollWidth - container.clientWidth;
            if(container.scrollLeft >= maxScroll){
                container.scrollLeft = 0;
            }else{
                container.scrollLeft += container.clientWidth
            }
        }, 3000)

        return ()=> clearInterval(slider);
    }, [])

    return (
        <div className='relative flex w-full h-full'>
            <p onClick={prev} className='absolute insert-0 left-0 z-10 h-full w-14'></p>
            <div ref={imgCont} className=' flex flex-row items-center w-full h-full overflow-x-scroll scroll-smooth snap-mandatory snap-x '>
                {images.map((image, index) => { return (<img key={index} className='snap-start h-screen min-w-full' src={image} />) })}
            </div>
            <div onClick={next} className='absolute inset-y-0 right-0 z-10 h-full w-14'></div>

        </div>
    )
}

export default Carousel;