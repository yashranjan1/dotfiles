const active = Variable("")
const activeButton = Variable({})

const changeActive = (newWindow, button) => {
    
    // if no active window, activate the button and the window visibility
    if (active.value === ""){
        active.setValue(newWindow)
        activeButton.value = button
    }
    // if the active window is the same as the new window, deactivate the window visibility and special button state
    else if (active.value === newWindow){
        active.setValue("")
        activeButton.value = {}
    }
    // if the new window is not the same as the active one, toggle the old window's visibility and button state 
    // and the set the ones buttons state and window visibility
    else {
        App.toggleWindow(active.value)
        active.setValue(newWindow)
        activeButton.value.activated = !activeButton.value.activated
        activeButton.value.child.toggleClassName('activated-box', activeButton.value.activated)
        activeButton.value = button
    }
}

export { active, changeActive }