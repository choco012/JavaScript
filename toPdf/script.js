    document.getElementById('imageInput').addEventListener('change', function(event) 
    {
      const file = event.target.files[0];    
      if (file && file.type.includes('image')) 
      {
        const reader = new FileReader();    
        reader.onload = function(event) 
        {
          const imgData = event.target.result;    
          const selectedImage = document.getElementById('selectedImage');
          selectedImage.onload = function() 
          {
            const maxWidth = 200; 
            const maxHeight = 200; 
            let width = selectedImage.width;
            let height = selectedImage.height;
            if (width > maxWidth || height > maxHeight)
            {
              const ratio = Math.min(maxWidth / width, maxHeight / height);
              width *= ratio;
              height *= ratio;
            }
            selectedImage.style.width = `${width}px`;
            selectedImage.style.height = `${height}px`;
          };
          selectedImage.src = imgData;
        };
        reader.readAsDataURL(file);
      }
    });

    document.querySelector('.convert-button').addEventListener('click', function() 
    {
      const fileInput = document.getElementById('imageInput');
      const file = fileInput.files[0];
      if (file && file.type.includes('image')) 
      {
        const reader = new FileReader();
        reader.onload = function(event) 
        {
          const imgData = event.target.result;
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'JPEG', 10, 10 );
          pdf.save('converted.pdf');
        };
        reader.readAsDataURL(file);
      }
    });
