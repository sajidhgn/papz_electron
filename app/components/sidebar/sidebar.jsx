import Link from 'next/link';
import React, { useEffect } from 'react';
import { GlobalConfig } from '@/app.config'
import Image from 'next/image';
import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Draggable } from 'gsap/Draggable';

// gsap.registerPlugin(ScrollTrigger, Draggable);

const Sidebar = (props) => {

    // useEffect(() => {
    //     gsap.set('.gallery', { autoAlpha: 1 });

    //     const spacing = 0.1;
    //     const cards = gsap.utils.toArray('.cards li');

    //     const animateFunc = (element) => {
    //         return gsap.fromTo(element,
    //             { scale: 0, opacity: 0 },
    //             { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in" });
    //     };

    //     const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
    //     const scrub = gsap.to({ offset: 0 }, {
    //         offset: 0,
    //         onUpdate() {
    //             seamlessLoop.time(wrapTime(this.offset));
    //         },
    //         duration: 0.5,
    //         ease: "power3",
    //         paused: true
    //     });

    //     ScrollTrigger.create({
    //         start: 0,
    //         onUpdate(self) {
    //             let scroll = self.scroll();
    //             if (scroll > self.end - 1) {
    //                 wrap(1, 1);
    //             } else if (scroll < 1 && self.direction < 0) {
    //                 wrap(-1, self.end - 1);
    //             } else {
    //                 scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
    //                 scrub.invalidate().restart();
    //             }
    //         },
    //         end: "+=3000",
    //         pin: ".gallery"
    //     });

    //     function wrapTime(time) {
    //         return gsap.utils.wrap(0, seamlessLoop.duration(), time);
    //     }

    //     function buildSeamlessLoop(items, spacing, animateFunc) {
    //         const rawSequence = gsap.timeline({ paused: true });
    //         const seamlessLoop = gsap.timeline({ paused: true, repeat: -1 });

    //         items.concat(items).concat(items).forEach((item, i) => {
    //             rawSequence.add(animateFunc(items[i % items.length]), i * spacing);
    //         });

    //         seamlessLoop.add(rawSequence);
    //         return seamlessLoop;
    //     }

    //     document.querySelector(".next")?.addEventListener("click", () => {
    //         scrub.vars.offset += spacing;
    //         scrub.invalidate().restart();
    //     });

    //     document.querySelector(".prev")?.addEventListener("click", () => {
    //         scrub.vars.offset -= spacing;
    //         scrub.invalidate().restart();
    //     });

    //     Draggable.create(".drag-proxy", {
    //         type: "y",
    //         trigger: ".cards",
    //         onPress() {
    //             this.startOffset = scrub.vars.offset;
    //         },
    //         onDrag() {
    //             scrub.vars.offset = this.startOffset + (this.startY - this.y) * 0.001;
    //             scrub.invalidate().restart();
    //         },
    //         onDragEnd() {
    //             scrub.vars.offset = Math.round(scrub.vars.offset);
    //             scrub.invalidate().restart();
    //         }
    //     });

    // }, []);

    return (
        <div className="h-full fixed flex items-start pt-20 w-1/5">
            <div className="flex flex-col overflow-y-scroll w-full gap-2" style={{ scrollbarWidth: 'none', maxHeight: '60%' }}>
                {props.data.map((cat, index) => (
                    <Link href={`/category/${cat.id}`} key={index}>
                        <div className="my-2 flex flex-col items-center">
                            <Image src={GlobalConfig?.siteurl + 'storage/' + cat.image} className='w-12 md:w-16 lg:w-28' alt={cat.name}
                                width={50}
                                height={50}
                            />
                            <div className="font-semibold">{cat.name}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
