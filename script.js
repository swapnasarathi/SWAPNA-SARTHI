document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');
    const discountMessage = document.getElementById('discountMessage');
    const scratchCard = document.querySelector('.scratch-card');
  
    // Fill the canvas with a gray color (this will be the "scratchable" area)
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    let isDrawing = false;
  
    // When the mouse is pressed down, start scratching
    canvas.addEventListener('mousedown', () => {
      isDrawing = true;
    });
  
    // When the mouse is released, stop scratching
    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      checkScratchCompletion();
    });
  
    // When the mouse moves, scratch away the canvas where the cursor is
    canvas.addEventListener('mousemove', (event) => {
      if (isDrawing) {
        scratch(event.offsetX, event.offsetY);
      }
    });
  
    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out'; // Makes the scratch effect
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }
  
    function checkScratchCompletion() {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let scratchedPixels = 0;
      const totalPixels = imageData.data.length / 4;
  
      // Count the number of scratched (transparent) pixels
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) {
          scratchedPixels++;
        }
      }
  
      // If 50% of the area is scratched off, reveal the discount message
      if (scratchedPixels / totalPixels > 0.5) {
        scratchCard.classList.add('revealed');
      }
    }
  });
  