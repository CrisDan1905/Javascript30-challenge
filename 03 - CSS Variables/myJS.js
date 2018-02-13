document.addEventListener('DOMContentLoaded', () => {

    const inputs = document.querySelectorAll('.controls input');
    
    function handleUpdate() {
        const suffix = this.dataset.sizing || ''; // dataset recoge un objeto con los atributos "data" del elemento HTML actual
        
        document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
        
        document.querySelector('.hl').style.setProperty('color', this.value);
    }
    inputs.forEach(input => input.addEventListener('change', handleUpdate));
})
   