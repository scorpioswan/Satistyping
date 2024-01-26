document.addEventListener('DOMContentLoaded', function() {
    const wordContainer = document.getElementById('wordContainer');
    const inputWord = document.getElementById('inputWord');
    const kachingAudio = document.getElementById('kachingAudio');
    const colorMap = {};
    let colorMode = false;
  
    inputWord.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const inputText = inputWord.value.trim();
        if (inputText !== '') {
          if (event.shiftKey) {
            kachingAudio.play();
            createBoxWithEffects(inputText);
          } else {
            createBox(inputText);
          }
          inputWord.value = '';
        }
      }
    });
  
    document.addEventListener('keydown', function(event) {
      if (event.shiftKey && event.key === ' ') {
        colorMode = !colorMode;
        updateColorMode();
      }
    });
  
    function updateColorMode() {
      if (colorMode) {
        wordContainer.classList.add('color-mode');
      } else {
        wordContainer.classList.remove('color-mode');
      }
    }
  
    function getColorForText(text) {
      if (!colorMode) {
        return '';
      }
  
      const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];
      const colorCount = colorMap[text] || 0;
  
      if (colorCount >= colors.length) {
        return colors[colorCount % colors.length];
      }
  
      const hashCode = text.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
      const index = Math.abs(hashCode) % colors.length;
      return colors[index];
    }
  
    function createBox(text) {
      const color = getColorForText(text);
      const boxElement = document.createElement('div');
      boxElement.className = `box ${color}`;
      boxElement.textContent = text;
      wordContainer.appendChild(boxElement);
      wordContainer.scrollTop = wordContainer.scrollHeight;
      colorMap[text] = (colorMap[text] || 0) + 1;
    }
  
    function createBoxWithEffects(text) {
      const color = getColorForText(text);
      const boxElement = document.createElement('div');
      boxElement.className = `box ${color} goldBorder`;
      boxElement.style.fontSize = '30px';
      boxElement.textContent = `🎁 ${text} 🎁`;
      wordContainer.appendChild(boxElement);
      wordContainer.scrollTop = wordContainer.scrollHeight;
      colorMap[text] = (colorMap[text] || 0) + 1;
    }
  });
  