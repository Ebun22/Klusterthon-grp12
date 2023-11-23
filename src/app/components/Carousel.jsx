'use client'
import React, { useRef, useState} from 'react';
import { useStateContext } from '@/app/Context/Context';

const Carousel = () => {
    const { extraCropDetails } = useStateContext();
    const {  temperature, humidity, pH, waterAvalability } = extraCropDetails;

        let imgCont = useRef(null);

        const images = [ 'food.jpg', 'food (1).jpg', 'nature.jpg', 'food (2).jpg' ]

        const prev = () => imgCont.current.scrollLeft -= 250;
        const next = () => imgCont.current.scrollLeft += 250;
    return (
        <div className='flex w-full h-full'>
            <p onClick={prev}>Prev</p>
            <div ref={imgCont} className='flex flex-row items-center w-full h-full overflow-x-scroll scroll-smooth snap-mandatory snap-x '>
                {images.map((image, index) => {return (<img key={index} className='snap-start h-screen w-full' src={image} />)})}
            </div>
            <div onClick={next}>next</div>
        </div>
    )
}

export default Carousel;