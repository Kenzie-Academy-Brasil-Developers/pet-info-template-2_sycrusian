export const green = '#168821';
export const red = '#df1545';

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