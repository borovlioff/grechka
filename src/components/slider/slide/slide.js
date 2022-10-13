import  "./slide.scss";
import  bamper from  "../../../assets/img/bamper.svg";
import { addLike } from "../../../api/like";
import { useState } from "../../../state";
import {Like} from "./like/like"


const SlideProps = {
    id: 0,
    title: "",
    image: "",
    like: { count:0 , onClick: () => { } },
    desc: "",

}

export function Slide(props = SlideProps) {
    const { id, image, like , desc, title } = props;
    const likeStorage = localStorage.getItem(`likeslide${id}`);
    const [likeState, setLikeHandler] = useState({
        count: likeStorage? likeStorage: like.count,
        active: likeStorage? true: false,
    });

    setLikeHandler((o,p, value)=>{
        if(p=="count"){
            localStorage.setItem(`likeslide${id}`, value);
        }
    })

    const slideHTML = document.createElement("div");
    slideHTML.classList.add("slider__slide","slide");

   
    if (title) {
        const headerHTML = document.createElement("div");
        headerHTML.classList.add("slide__header", "container");
        const headerTextHtml = document.createElement("h1");
        headerTextHtml.classList.add("slide__title-text");
        headerTextHtml.title = title;
        headerTextHtml.textContent = title;
        headerHTML.appendChild(headerTextHtml);

        if (desc) {
            const descHTML = document.createElement("p");
            descHTML.classList.add("slide__desc-text");
            descHTML.textContent = desc;
            headerHTML.appendChild(descHTML);
        }
        slideHTML.appendChild(headerHTML);
    }

    const { likeHTML} = Like({
        like: {
            state:likeState,
            setHandler:setLikeHandler
        },
        onClick: clickLike
    })

    slideHTML.appendChild(likeHTML);

    if(image){
        slideHTML.style.backgroundImage = `url(${image})`;
    } else{
        let errorHTML = document.createElement("div");
        errorHTML.classList.add("slide__error");
        let errorTextHTML = document.createElement("p");
        errorTextHTML.classList.add("slide__error-text");
        errorTextHTML.textContent = "Error";
        let errorIconHTML = document.createElement("img")
        errorIconHTML.classList.add("slide__error-icon");
        errorIconHTML.src= bamper;

        errorHTML.appendChild(errorTextHTML);
        errorHTML.appendChild(errorIconHTML);
        slideHTML.appendChild(errorHTML);
    }
  

    async function clickLike() {
        if (likeState.active == false) {
            const res = await addLike({ id });
            if (res.status == 200) {
                likeState.count = likeState.count + 1;
                like.onClick(res.data);
            }
            
        }
        
    }


    return slideHTML;
}


