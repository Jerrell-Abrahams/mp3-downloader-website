
const playButton = document.querySelectorAll("[data-open-modal]")
const dialog = document.querySelector("dialog")

for (let button of playButton) {
    button.addEventListener("click", (e) => {
        console.log(e.target.value)
        const dialog = document.querySelector(`.${e.target.value}`);
        dialog.addEventListener("click", e => {
            const dialogDimensions = dialog.getBoundingClientRect()
            if (
              e.clientX < dialogDimensions.left ||
              e.clientX > dialogDimensions.right ||
              e.clientY < dialogDimensions.top ||
              e.clientY > dialogDimensions.bottom
            ) {
              dialog.close()
            }
          })
        dialog.showModal()
    })
}
