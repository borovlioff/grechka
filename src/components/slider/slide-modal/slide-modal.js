import "./slide-modal.scss";
import {Modal} from "../../modal/modal.js";

const SlideModalProp={
    content: {state:{ title:"", desc:""}, setHandler:()=>{}},
    hide: {
        state: { value: false},
        setHandler: ()=>{}
    },
    lockScroll:{
        value: false
    }
}

export function SlideModal(prop = SlideModalProp){
    let { hide , lockScroll , content} = prop;
 
    let {modalHTML, contentHTML} = Modal({
        hide:{
            state: hide.state,
            setHandler: hide.setHandler
        },
        lockScroll
    });

    modalHTML.classList.add("slider-modal");

    let titleHTML = document.createElement("h2");
    titleHTML.classList.add("slider-modal__title");
    let descHTML = document.createElement("p");
    descHTML.classList.add("slider-modal__desc");

    let textHTML = document.createElement("p");
    textHTML.classList.add("slider-modal__text")
    textHTML.textContent = "BMW Vision Efficient Dynamics, BMW i8 — автомобиль компании BMW. Концепт-кар был представлен в 2009 году, первый серийный образец — на Франкфуртском автосалоне в сентябре 2013 года \nBMW Vision Efficient Dynamics представляет собой полноприводное двухдверное купе. Шасси и подвеска сделаны из алюминия, крыша и двери выполнены из поликарбоната. Коэффициент аэродинамического сопротивления 0,26."

    content.setHandler((o,p,v)=>{
        if( p == "title" ){
            titleHTML.textContent = v;
        }
        if( p == "desc" ){
            descHTML.textContent = v;
        }
    })
    
    

    contentHTML.appendChild(titleHTML);
    contentHTML.appendChild(descHTML);
    contentHTML.appendChild(textHTML);

    return {
        modalHTML
    }
}