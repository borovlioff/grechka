import "./modal.scss"

const ModalProps = {
    content: "",
    hide: {
        state: { value: true },
        setHandler: () => { }
    },
    lockScroll: { value: false }
}

export function Modal(props = ModalProps) {
    const { content, hide, lockScroll } = props;

    hide.setHandler((o, prop, value) => {
        value == true ? hideModal() : showModal();
    })

    let modalHTML = document.createElement("div");
    modalHTML.classList.add("modal", "modal_hide");

    function hideModal() {
        modalHTML.classList.add("modal_hide");
        lockScroll.value = false;
    }

    function showModal() {
        modalHTML.classList.remove("modal_hide");
        lockScroll.value = true;
    }

    modalHTML.addEventListener("click", () => { hide.state.value = true });

    let contentHTML = document.createElement("div");
    contentHTML.classList.add("modal__content");

    contentHTML.addEventListener("click", (e) => {
        e.stopPropagation();
    })

    let closeHTML = document.createElement("span");
    closeHTML.classList.add("modal__close", "icon-close");

    closeHTML.addEventListener("click", () => { hide.state.value = true })


    contentHTML.appendChild(closeHTML);

    if (content) {
        if (typeof content == "string") {
            contentHTML.appendChild(document.createTextNode(content));
        } else {
            contentHTML.appendChild(content)
        }
    }

    modalHTML.appendChild(contentHTML);

    return {
        modalHTML,
        contentHTML,
        closeHTML
    }
}