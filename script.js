const filtersContent = document.querySelector(".filters");
const ImageCanvas = document.querySelector("#imageCanvas");
const ImageInput = document.querySelector("#imageInput");
const CanvasFilter = ImageCanvas.getContext("2d");
const downloadBtn = document.querySelector("#downloadBtn");
const resetBtn = document.querySelector("#resetBtn");
const presetsContainer = document.querySelector(".presets");
let file = null;
let image = null;


// Filter configuration object
const filter ={
    brightness: {
        value: 100,
        unit: "%",
        min: 0,
        max: 200
    },
    contrast: {
        value: 100,
        unit: "%",
        min: 0,
        max: 200
    },
    exposure: {
        value: 100,
        unit: "%",
        min: 0,
        max: 200
    },
    saturate: {
        value: 100,
        unit: "%",
        min: 0,
        max: 200
    },
    hueRotate: {
        value: 0,
        unit: "deg",
        min: 0,
        max: 360
    },
    blur: {
        value: 0,
        unit: "px",
        min: 0,
        max: 100
    },
    grayscale: {
        value: 0,
        unit: "%",
        min: 0,
        max: 100
    },
    sepia: {
        value: 0,
        unit: "%",
        min: 0,
        max: 100
    },
    invert: {
        value: 0,
        unit: "%",
        min: 0,
        max: 100
    },
    opacity: {
        value: 100,
        unit: "%",
        min: 0,
        max: 100
    }
}

// Function to create filter elements
function createFilter(name,unit ="%", value, min, max){

    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.id = name;
    input.min = min;
    input.max = max;
    input.value = value;


    const p = document.createElement("p");
    p.innerText = name;
    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (e) => {
       filter[name].value = e.target.value;
       applyFilters();
    });


    return div;
    
}

// Loop through the filter object and create filter elements

    Object.keys(filter).forEach(key => {
        const filterElement = createFilter(key, 
            filter[key].unit, 
            filter[key].value, 
            filter[key].min, 
    filter[key].max
  );
  // Append to the memory fragment instead of the live DOM
  filtersContent.appendChild(filterElement);
});



ImageInput.addEventListener("change", (event) => {

    const file = event.target.files[0];
    const imagePalceholder = document.querySelector(".placeholder");
    imagePalceholder.style.display = "none";
  const img = new Image();
   img.src = URL.createObjectURL(file);

    img.onload = function() {
      ImageCanvas.style.display = "block";
         image = img;
        ImageCanvas.width = img.width;
        ImageCanvas.height = img.height;
        CanvasFilter.drawImage(image , 0, 0);
       
    };

});
   


function applyFilters(){
    if (!image) return;

    const combinedBrightness =
        (Number(filter.brightness.value) * Number(filter.exposure.value)) / 100;

    CanvasFilter.clearRect(0, 0, ImageCanvas.width, ImageCanvas.height);
   CanvasFilter.filter = `
   blur(${filter.blur.value}${filter.blur.unit})
    brightness(${combinedBrightness}%)
    contrast(${filter.contrast.value}${filter.contrast.unit})
    grayscale(${filter.grayscale.value}${filter.grayscale.unit})
    hue-rotate(${filter.hueRotate.value}${filter.hueRotate.unit})
    invert(${filter.invert.value}${filter.invert.unit})
    opacity(${filter.opacity.value}${filter.opacity.unit})
    sepia(${filter.sepia.value}${filter.sepia.unit})
    saturate(${filter.saturate.value}${filter.saturate.unit})
    `.trim();
    CanvasFilter.drawImage(image, 0, 0); 


}


downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = ImageCanvas.toDataURL();
    link.click();

}
);

resetBtn.addEventListener("click", () => {
    const zeroDefaultFilters = ["hueRotate", "blur", "grayscale", "sepia", "invert"];

    Object.keys(filter).forEach(key => {
        filter[key].value = zeroDefaultFilters.includes(key) ? 0 : 100;
        const input = document.getElementById(key);
        input.value = filter[key].value;
    });
    applyFilters();
}
);


const presets = {

    normal: {
        brightness: 100,
        contrast: 100,
        saturate: 100,
        hueRotate: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0,
        opacity: 100
    },

    vintage: {
        brightness: 110,
        contrast: 90,
        saturate: 80,
        hueRotate: 10,
        blur: 0,
        grayscale: 15,
        sepia: 45,
        invert: 0,
        opacity: 100
    },

    oldSchool: {
        brightness: 95,
        contrast: 85,
        saturate: 60,
        hueRotate: 0,
        blur: 0,
        grayscale: 40,
        sepia: 35,
        invert: 0,
        opacity: 100
    },

    dramatic: {
        brightness: 90,
        contrast: 180,
        saturate: 120,
        hueRotate: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0,
        opacity: 100
    },

    cinematic: {
        brightness: 105,
        contrast: 140,
        saturate: 80,
        hueRotate: 15,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        invert: 0,
        opacity: 100
    },

    noir: {
        brightness: 100,
        contrast: 180,
        saturate: 0,
        hueRotate: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        invert: 0,
        opacity: 100
    },

    retro: {
        brightness: 115,
        contrast: 90,
        saturate: 70,
        hueRotate: 20,
        blur: 0,
        grayscale: 20,
        sepia: 50,
        invert: 0,
        opacity: 100
    },

    warm: {
        brightness: 110,
        contrast: 105,
        saturate: 130,
        hueRotate: -10,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        invert: 0,
        opacity: 100
    },

    cool: {
        brightness: 100,
        contrast: 110,
        saturate: 115,
        hueRotate: 30,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0,
        opacity: 100
    },

    dreamy: {
        brightness: 120,
        contrast: 85,
        saturate: 115,
        hueRotate: 5,
        blur: 3,
        grayscale: 0,
        sepia: 10,
        invert: 0,
        opacity: 100
    },

    faded: {
        brightness: 115,
        contrast: 75,
        saturate: 70,
        hueRotate: 0,
        blur: 0,
        grayscale: 15,
        sepia: 20,
        invert: 0,
        opacity: 100
    },

    cyberpunk: {
        brightness: 110,
        contrast: 170,
        saturate: 180,
        hueRotate: 60,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0,
        opacity: 100
    },

    horror: {
        brightness: 75,
        contrast: 170,
        saturate: 50,
        hueRotate: -30,
        blur: 1,
        grayscale: 30,
        sepia: 0,
        invert: 0,
        opacity: 100
    },

    softPortrait: {
        brightness: 110,
        contrast: 90,
        saturate: 115,
        hueRotate: 0,
        blur: 2,
        grayscale: 0,
        sepia: 5,
        invert: 0,
        opacity: 100
    },

    instagram: {
        brightness: 108,
        contrast: 115,
        saturate: 125,
        hueRotate: 8,
        blur: 0,
        grayscale: 0,
        sepia: 12,
        invert: 0,
        opacity: 100
    }

};


Object.keys(presets).forEach(presetName => {
    const presetBtn = document.createElement("button");
    presetBtn.innerText = presetName;
    presetBtn.addEventListener("click", () => {
        const preset = presets[presetName];
        Object.keys(preset).forEach(key => {
            filter[key].value = preset[key];
            const input = document.getElementById(key);
            input.value = preset[key];
        });
        applyFilters();
    });
    presetsContainer.appendChild(presetBtn);
}); 
