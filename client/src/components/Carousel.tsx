import React, { useState, useEffect } from 'react'

function Carousel() {

    const [rotation, setRotation] = useState(0) // the image carousel rotation degree
    const [transitionDuration, setTransitionDuration] = useState('0.65s') // the transition duration of transform, width, opacity
    const [clicked, setClicked] = useState(false) // if the button is clicked or not
    const [isClickable, setIsClickable] = useState(true) // make sure carousel isn't clicked/rotated during transitionDuration swapping
    
    let interval // interval used for continous rotation
    let timeoutIn // timeout used for reseting degrees to 0
    let timeoutOut // timeout used for resetting transitionduration
    // makes sure that timeoutOut always runs after timeoutIn, i.e. prevents clearTimeout during the transitionDuration swapping
    let rotatable = true 

    // for resetting the rotation back to 0 degrees so it doesn't keep increasing
    useEffect(() => {
        // second conditional prevents effect from rerunning after setRotation
        if (rotation % 360 === 0 && rotation !== 0) {
            timeoutIn = setTimeout(() => {
                rotatable = false
                setTransitionDuration('0s')
                setRotation(0)
                setIsClickable(false)
            }, 650)
            timeoutOut = setTimeout(() => {
                rotatable = true
                setTransitionDuration('0.65s')
                setIsClickable(true)
            }, 700)
        }

        return () => {
            if (rotatable) {
                clearTimeout(timeoutIn)
                clearTimeout(timeoutOut)
            }
        }
    }, [rotation])

    // for continous carousel rotation
    useEffect(() => {
        // on start and on click, rotates the carousel after and every 3 seconds
        // lined up with border animation
        interval = setInterval(handleRotation, 4000)
        // clears current interval on click
        return () => {
            clearInterval(interval)
        }
    }, [clicked])

    // rotates the carousel
    const handleRotation = (direction) => {
        if (isClickable) {
            if (direction === (((rotation - 90) % 360) + 360) % 360) {
                setRotation((rotation) => rotation - 90)
            } else {
                setRotation((rotation) => rotation + 90)
            }
        }
    }

    return (
        <div
            className='flex flex-col w-full items-center justify-center cursor-pointer select-none'
        >
            <ul
                className='flex w-full items-center justify-center h-48'
                style={{
                    transform: `rotateY(${rotation}deg)`, transformStyle: 'preserve-3d',
                    transitionProperty: 'transform',
                    transitionDuration: `${transitionDuration}`,
                    transitionTimingFunction: 'east-in-out',
                }}
            >
                {/* FRONT */}
                <li
                    id='front'
                    onClick={() => {
                        setClicked((clicked) => !clicked)
                        handleRotation(0)
                    }}
                    className={`front absolute shadow-2xl ${((rotation % 360) + 360) % 360 === 0 ? 'w-full animated-outline' : 'w-4/5 opacity-60'}`}
                    style={{
                        transform: `translateZ(clamp(4rem, 15vw, 12rem)) rotateY(calc(-1 * ${rotation}deg))`,
                        transitionProperty: 'transform, width, opacity',
                        transitionDuration: `${transitionDuration}`,
                        transitionTimingFunction: 'east-in-out',
                    }}
                >
                    <img src='/static/images/uigrades0.png' alt='browseLight.png'/>
                </li>
                {/* BACK */}
                <li
                    id='back'
                    onClick={() => {
                        setClicked((clicked) => !clicked)
                        handleRotation(180)
                    }}
                    className={`absolute shadow-2xl ${((rotation % 360) + 360) % 360 === 180 ? 'w-full animated-outline' : 'w-4/5 opacity-60'}`}
                    style={{
                        transform: `translateZ(clamp(-12rem, -15vw, -4rem)) rotateY(calc(-1 * ${rotation}deg))`,
                        transitionProperty: 'transform, width, opacity',
                        transitionDuration: `${transitionDuration}`,
                        transitionTimingFunction: 'east-in-out',
                    }}
                >
                    <img src='/static/images/uigrades0.png' alt='browseLight.png'/>
                </li>
                {/* LEFT */}
                <li
                    id='left'
                    onClick={() => {
                        setClicked((clicked) => !clicked)
                        handleRotation(90)
                    }}
                    className={`absolute shadow-2xl ${((rotation % 360) + 360) % 360 === 90 ? 'w-full animated-outline' : 'w-4/5 opacity-60'}`}
                    style={{
                        transform: `translateX(clamp(-12rem, -15vw, -4rem)) rotateY(calc(-1 * ${rotation}deg))`,
                        transitionProperty: 'transform, width, opacity',
                        transitionDuration: `${transitionDuration}`,
                        transitionTimingFunction: 'east-in-out',
                    }}
                >
                    <img src='/static/images/uigrades1.png' alt='browseLight.png'/>
                </li>
                {/* RIGHT */}
                <li
                    id='right'
                    onClick={() => {
                        setClicked((clicked) => !clicked)
                        handleRotation(270)
                    }}
                    className={`absolute shadow-2xl ${((rotation % 360) + 360) % 360 === 270 ? 'w-full animated-outline' : 'w-4/5 opacity-60'}`}
                    style={{
                        transform: `translateX(clamp(4rem, 15vw, 12rem)) rotateY(calc(-1 * ${rotation}deg))`,
                        transitionProperty: 'transform, width, opacity',
                        transitionDuration: `${transitionDuration}`,
                        transitionTimingFunction: 'east-in-out',
                    }}
                >
                    <img src='/static/images/uigrades1.png' alt='browseLight.png'/>
                </li>
            </ul>
        </div>
    )
}

export default Carousel