import './components/header.scss'
import './css/home.scss';
import { Slider } from './components/slider/slider';
import { useState } from './state';


const [hideModal , setHandlerHideModal ] = useState(false);



document.addEventListener("DOMContentLoaded", async ()=>{

    let slider = Slider({
        options:{
            effect:"slide",
            speed: 2000
        },
        modal:{
            state: hideModal,
            handler: setHandlerHideModal
        }
    });
    document.body.querySelector("article").appendChild(slider.sliderHTML);
});








