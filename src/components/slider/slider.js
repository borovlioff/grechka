import 'swiper/scss';
import Swiper, { Navigation, Manipulation } from 'swiper';
import { getSlides as getSlidesRep } from "../../api/slides";
import { Slide } from "./slide/slide";
import { SlideModal } from './slide-modal/slide-modal';
import { useState } from '../../state';


const SliderProp = {

    options: {
        effect: "slide",
        speed: 2000,
    }
}

export function Slider(props = SliderProp) {
    const { options } = props;
    let slideOffset = 0;
    let firstSlide = true;
    let countAllSlides = 0;
    let slides = [];
    const bodyHTML = document.body;
    const [contentModal, setHandlerContentModal] = useState({ title: "", desc: "" });
    const [modalHide, setHandlerModalHide] = useState(false);
    const [lockBody, setHandlerLockBody] = useState(false);

    setHandlerLockBody((o, p, value) => {
        if (value == true) {
            bodyHTML.classList.add("_lock")
        } else {
            bodyHTML.classList.remove("_lock")
        }
    })


    const sliderHTML = document.createElement("div");
    sliderHTML.classList.add("slider");

    const sliderWrapperHTML = document.createElement("div");
    sliderWrapperHTML.classList.add("slider__wrapper");

    const sliderBtnNextHTML = document.createElement("div");
    sliderBtnNextHTML.classList.add("slider__btn", "slider__btn-next");

    const sliderBtnPrevHTML = document.createElement("div");
    sliderBtnPrevHTML.classList.add("slider__btn", "slider__btn-prev");

    sliderHTML.appendChild(sliderWrapperHTML);
    sliderHTML.appendChild(sliderBtnNextHTML);
    sliderHTML.appendChild(sliderBtnPrevHTML);

    const { modalHTML } = SlideModal({
        content: {
            state: contentModal,
            setHandler: setHandlerContentModal
        },
        hide: {
            state: modalHide,
            setHandler: setHandlerModalHide
        },
        lockScroll: lockBody
    });


    sliderHTML.appendChild(modalHTML);

    const swiper = new Swiper(sliderHTML, {
        modules: [Navigation, Manipulation],
        effect: options.effect,
        speed: options.speed,
        navigation: {
            nextEl: sliderBtnNextHTML,
            prevEl: sliderBtnPrevHTML,
            disabledClass: "slider__btn_disabled"
        },
        wrapperClass: "slider__wrapper",
        slideClass: "slider__slide",
        slideActiveClass: "slide-active",
        touchRatio: false,
    }
    );

    async function init() {
        let res = await getSlides();
        countAllSlides = res.countAll;
        slides = res.data;

        renderSlides(slides);

        swiper.on('reachEnd', async function () {
            slideOffset = 0 + slides.length;
            if (slideOffset < countAllSlides) {
                let slidesRes = await getSlides({ offset: slideOffset, limit: 3 });
                slides.push(...slidesRes.data)
                renderSlides(slidesRes.data);
            } else {
                swiper.off("reachEnd");
            }


        });
    }
    init();

    function showModal({title, desc}) {
        modalHide.value = false;
        contentModal.title = title? title: "";
        contentModal.desc = desc? desc: "";
    }

    async function getSlides(params) {
        let res = await getSlidesRep(params);
        if (res.status == 200) {
            return res.data;
        }
    }

    function renderSlides(slides) {
        let slidesHTML = slides.map((slideInfo, i) => {
            let slide;
            if (i == 0 && firstSlide) {
                slide = Slide({
                    id: slideInfo.id,
                    image: slideInfo.imgUrl,
                    title: "THE RAZORITE",
                    desc: "BMW i8 concept\nsupported\nby\nAlpine\nYokohama",
                    like: { count: slideInfo.likeCnt, onClick: showModal }
                });
                firstSlide = false;
            } else {
                slide = Slide({
                    id: slideInfo.id,
                    image: slideInfo.imgUrl,
                    title: slideInfo.title,
                    desc: slideInfo.desc,
                    like: { count: slideInfo.likeCnt, onClick: showModal }
                });
            }
            return slide;
        });
        swiper.appendSlide(slidesHTML)
    }

    function cleanSlideAnimation(){
        const el = swiper.slides[swiper.activeIndex];
        el.classList.remove("slide-next-animation");
        el.classList.remove("slide-prev-animation");
        
    }

    sliderBtnNextHTML.addEventListener("click", ()=>{
        swiper.slides[swiper.previousIndex].classList.add("slide-prev-animation");
        cleanSlideAnimation()
    });

    sliderBtnPrevHTML.addEventListener("click", ()=>{
        swiper.slides[swiper.previousIndex].classList.add("slide-next-animation");
        cleanSlideAnimation()
 
    })



    return {
        sliderHTML,
        sliderWrapperHTML,
        sliderBtnNextHTML,
        sliderBtnPrevHTML
    }
}