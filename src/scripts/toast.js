export const green = "#087f5b";
export const red = "#c73650";

export const toast = (message, color) => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: color,      
      }
    }).showToast();
}