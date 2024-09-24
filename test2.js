import Swal from 'sweetalert2';

function showtoast() {
    let s = 'Hello, world!'; // The message you want to display

    // Trigger SweetAlert2 toast
    Swal.fire({
        toast: true, // Enables toast mode
        icon: 'success', 
        title: s, 
        showConfirmButton: false, // Hide the confirmation button
        timer: 2000, // Toast will disappear after 3 seconds
        timerProgressBar: true, // Shows progress bar as the toast counts down
        position: 'bottom', // Position the toast at the center bottom of the screen
    });
}

export { showtoast }; 
