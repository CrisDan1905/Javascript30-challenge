document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('keydown', playSound)

	function playSound(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        if (!audio) return; // if press a key not accepted
        audio.currentTime = 0; // Rewind to the start so key can be hit multiple times
        audio.play();
        const keyBox = document.querySelector(`div[data-key="${e.keyCode}"]`);
        console.log(keyBox);
        keyBox.classList.add('playing');
	}

	function removeTransition(e) {
		if (e.propertyName !== 'transform') return; // skipt if it's not a transform
		else {
			this.classList.remove('playing');
		}
	}

 	const keys = document.querySelectorAll(".key");
	 keys.forEach(key => key.addEventListener('transitionend', removeTransition ));
    
    // keys.addEventListener('transitioned', function (e) {
    
    // })
    
    window.addEventListener('keyup', function(e) {
        // keyBox.classList.remove('playing');
    })
});