document.addEventListener('DOMContentLoaded', async () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const previewCanvas = document.getElementById('preview-canvas');
    const ctx = canvas.getContext('2d');
    const previewCtx = previewCanvas.getContext('2d');
    let currentFilter = 'none';
    let pixelSize = 8;
    let stream = null;
    let isMirrored = false;

    // Get UI elements
    const videoContainer = document.querySelector('.video-container');
    const previewContainer = document.querySelector('.preview-container');
    const pixelSizeControl = document.getElementById('pixel-size-control');
    const pixelSizeInput = document.getElementById('pixel-size');
    const pixelSizeValue = document.getElementById('pixel-size-value');
    const captureBtn = document.getElementById('capture-btn');
    const saveBtn = document.getElementById('save-btn');
    const backBtn = document.getElementById('back-btn');
    const filenameInput = document.getElementById('filename');
    const fileFormatSelect = document.getElementById('file-format');

    // Filter configurations
    const filters = {
        none: '',
        grayscale: 'grayscale(100%)',
        sepia: 'sepia(100%)',
        invert: 'invert(100%)',
        saturate: 'saturate(200%)',
        blur: 'blur(5px)',
        brightness: 'brightness(150%)',
        contrast: 'contrast(200%)',
        halftone: 'custom'
    };

    // Pixelate function
    function pixelateImage(ctx, canvas, size) {
        const w = canvas.width;
        const h = canvas.height;
        
        ctx.drawImage(canvas, 0, 0, w, h, 0, 0, w/size, h/size);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, 0, 0, w/size, h/size, 0, 0, w, h);
        ctx.imageSmoothingEnabled = true;
    }

    // Mirror function
    function mirrorImage(ctx, canvas) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(canvas, -canvas.width, 0);
        ctx.restore();
    }

    // Halftone filter function
    function applyHalftoneEffect(ctx, canvas, dotSpacing = 8) {
        const w = canvas.width;
        const h = canvas.height;
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        
        // Create a temporary canvas for processing
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = w;
        tempCanvas.height = h;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Clear the main canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        
        // Process the image data to create halftone effect
        for (let y = 0; y < h; y += dotSpacing) {
            for (let x = 0; x < w; x += dotSpacing) {
                const i = (y * w + x) * 4;
                // Calculate brightness (grayscale)
                const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
                const dotSize = (1 - brightness) * dotSpacing;
                
                // Draw dot
                ctx.beginPath();
                ctx.fillStyle = '#000000';
                ctx.arc(x + dotSpacing/2, y + dotSpacing/2, dotSize/2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    // Set up camera
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });
        video.srcObject = stream;
        video.play();

        // Set canvas size after video loads
        video.addEventListener('loadedmetadata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            previewCanvas.width = video.videoWidth;
            previewCanvas.height = video.videoHeight;
        });
    } catch (err) {
        console.error('Error accessing camera:', err);
        alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }

    // Handle filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            
            // Update mirror state without changing the filter
            if (currentFilter === 'mirror') {
                isMirrored = !isMirrored;
                currentFilter = 'none';  // Allow other filters to work
                button.classList.remove('active');
                document.querySelector('[data-filter="none"]').classList.add('active');
            }
            
            pixelSizeControl.style.display = currentFilter === 'pixelate' ? 'flex' : 'none';
        });
    });

    // Handle pixel size input
    pixelSizeInput.addEventListener('input', (e) => {
        pixelSize = parseInt(e.target.value);
        pixelSizeValue.textContent = `${pixelSize}px`;
    });

    // Capture photo
    captureBtn.addEventListener('click', () => {
        // Copy the current canvas state to preview canvas
        previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        previewCtx.drawImage(canvas, 0, 0);
        
        // Switch to preview mode
        videoContainer.style.display = 'none';
        previewContainer.style.display = 'block';
    });

    // Save photo
    saveBtn.addEventListener('click', async () => {
        const format = fileFormatSelect.value;
        const filename = filenameInput.value || 'my_photo';
        const mimeTypes = {
            'png': 'image/png',
            'jpeg': 'image/jpeg',
            'webp': 'image/webp'
        };
        
        try {
            // Configure file picker options
            const options = {
                suggestedName: `${filename}.${format}`,
                types: [{
                    description: 'Image',
                    accept: {
                        [mimeTypes[format]]: [`.${format}`]
                    }
                }]
            };

            // Show the file picker
            const handle = await window.showSaveFilePicker(options);
            
            // Convert canvas to blob with appropriate quality
            const blob = await new Promise(resolve => {
                const quality = format === 'jpeg' ? 0.9 : undefined;
                previewCanvas.toBlob(resolve, mimeTypes[format], quality);
            });
            
            // Create a FileSystemWritableFileStream to write to
            const writable = await handle.createWritable();
            
            // Write the blob to the file
            await writable.write(blob);
            await writable.close();
            
            // Show success message
            alert('Image saved successfully!');
        } catch (err) {
            if (err.name !== 'AbortError') {  // Don't show error if user just cancelled
                console.error('Error saving file:', err);
                alert('Failed to save the image. Please try again.');
            }
        }
    });

    // Back to camera
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        videoContainer.style.display = 'block';
        previewContainer.style.display = 'none';
        
        // Ensure video continues playing when going back
        if (video.paused) {
            video.play();
        }
    });

    // Apply filter in real-time
    function drawFrame() {
        if (video.paused || video.ended) return;
        
        // Clear canvas and draw the video frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // First draw the frame (with mirror if enabled)
        ctx.save();
        if (isMirrored) {
            ctx.scale(-1, 1);
            ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        } else {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        ctx.restore();
        
        // Then apply the selected filter
        if (currentFilter === 'pixelate') {
            pixelateImage(ctx, canvas, pixelSize);
        } else if (currentFilter === 'halftone') {
            applyHalftoneEffect(ctx, canvas, pixelSize);
        } else if (currentFilter !== 'none') {
            ctx.filter = filters[currentFilter];
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = 'none';
        }
        
        requestAnimationFrame(drawFrame);
    }

    // Start the animation loop when video plays
    video.addEventListener('play', () => {
        drawFrame();
    });

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            video.pause();
        } else {
            video.play();
        }
    });

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    });
}); 