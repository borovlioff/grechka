import "./like.scss";

const LikeProp = {
    like:{
        state:{
            count:0,
            active: false
        },
        setHandler: ()=>{}
    },
    onClick: ()=>{}
};


export function Like(prop = LikeProp) {
    const {
        like:{ state , setHandler},
        onClick
    } = prop;

    let likeHTML = document.createElement("div");
    likeHTML.classList.add("slide__like","like");
    let likeIconHTML = document.createElement("div");
    likeIconHTML.classList.add("like__icon", "icon-like" );
    if( state.active ){
        likeIconHTML.classList.add("like__icon-active" );
    }
    likeHTML.appendChild(likeIconHTML);
    let likeTextHtml = document.createElement('h2');
    likeTextHtml.classList.add("like__text");
    likeTextHtml.textContent = "like:";
    let likeTextCountHTML = document.createElement('span');
    likeTextCountHTML.classList.add("like__count");
    likeTextCountHTML.textContent = state.count;
    likeTextHtml.appendChild(likeTextCountHTML);
    likeHTML.appendChild(likeTextHtml);

    setHandler((o, prop, value) => {
        if (prop == "count") {
            likeTextCountHTML.textContent = value;
            o.active = true;
            likeIconHTML.classList.add("like__icon-active")
        }
    })


    likeIconHTML.addEventListener("click", onClick);
    return {
        likeHTML,
    }
}