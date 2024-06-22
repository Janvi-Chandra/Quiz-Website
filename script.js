document.addEventListener('DOMContentLoaded',()=>{
    const startButton = document.getElementById('convert-btn');
    const contactModal = document.getElementById('contactModal');

    startButton.addEventListener('click',()=>{
        contactModal.style.display = 'flex';
        contactModal.style.justifyContent = 'center';
        contactModal.style.alignItems = 'center';
    });

    window.addEventListener('click',(event)=>{
        if(event.target===contactModal)
        {
            contactModal.style.display = 'none';
        }
    })
})