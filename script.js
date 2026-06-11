const filtersContent = document.querySelector(".filters");
const ImageCanvas = document.querySelector("#imageCanvas");
const ImageInput = document.querySelector("#imageInput");
const CanvasFilter = ImageCanvas.getContext("2d");
const downloadBtn = document.querySelector("#downloadBtn");
const resetBtn = document.querySelector("#resetBtn");
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


