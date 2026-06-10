let MODAL_BACKDROP_ELEMENT = document.getElementById("modal-backdrop")

MODAL_BACKDROP_ELEMENT.onclick = () => { hideModal('button-config-modal') }

function updateModalTextContent(buttonType, buttonID, modalID, modalType) {
    let button = game[buttonType][buttonID]

    if (modalID === "button-config-modal") {
        let MODAL_ELEMENT = document.getElementById(modalID)
        let MODAL_HEADER_ELEMENT = MODAL_ELEMENT.querySelector(".modal-header")
        let MODAL_CONTENT_ELEMENT = MODAL_ELEMENT.querySelector(".modal-content")
        let MODAL_BOTTOM_ELEMENT = MODAL_ELEMENT.querySelector(".modal-bottom")
        if (modalType === "assignment") {
            for (let key in button.settings) {
                if (key === "active") { // assignment of active / inactive buildings for disabling / enabling
                    MODAL_HEADER_ELEMENT.innerHTML = button.name + " Settings"

                    let parentID = buttonID + '-' + modalType + '-' + key
                    let sliderID = parentID + '-slider'

                    let finalContentString = '<div id="' + parentID + '" class="assignment grid-element flex-row justify-between">'

                    finalContentString += '<div class="flex-row">Active <div class="on">' + button.settings[key] + '</div></div>'
                    finalContentString += '<input id="' + sliderID + '" type="range" min="0" max="' + button.current + '" value="' + button.settings[key] + '" step="1" />'
                    finalContentString += '<div class="flex-row"><div class="off">' + button.current + '</div> Inactive</div>'

                    finalContentString += '</div>'

                    MODAL_CONTENT_ELEMENT.innerHTML = finalContentString

                    document.getElementById(sliderID).oninput = (e) => { handleAssignmentActiveSlider(e, parentID, button, buttonID, buttonType) }
                }
            }
        }
    }
}

function handleAssignmentActiveSlider(e, parentID, button, buttonID, buttonType) {
    let newActive = e.target.value
    document.getElementById(parentID).querySelector(".on").innerHTML = newActive
    button.settings.active = Number(newActive)

    let newInactive = button.current - e.target.value
    document.getElementById(parentID).querySelector(".off").innerHTML = newInactive
    updateIndicatorsForButton(buttonID, buttonType)
}

// simply shows the modal
function showModal(modalID) {
    let MODAL_ELEMENT = document.getElementById(modalID)

    ANY_MODAL_VISIBLE = true;
    MODAL_ELEMENT.style.display = "block"
    MODAL_BACKDROP_ELEMENT.style.display = "block"
}

// simply hides the modal
function hideModal(modalID) {
    let MODAL_ELEMENT = document.getElementById(modalID)
    ANY_MODAL_VISIBLE = false;
    MODAL_ELEMENT.style.display = "none"
    MODAL_BACKDROP_ELEMENT.style.display = "none"
}
