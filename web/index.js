// Don't mind this sphagetti code, it works

/*
        * So basically you first get yourself a tile provider i.e. source like either an online tile provider like openstreetmap's servers or 
        * or a local one that you host by yourself like martin - then you can use your own data. Then inside layers, you actually decide what
        * you want to be shown and from which source. Like each source has it's source-layer attribute and you specify that as well to determine
        * what you really want from that source as it can have multiple layers on its own
*/

let styleFirst = structuredClone(baseStyle)
let styleSecond = structuredClone(baseStyle)
let styleThird = structuredClone(baseStyle)

styleFirst.layers.push(
        {
                "id": "search",
                "type": "circle",
                "source": "pullovers_raw", // This must match the source key above
                'source-layer': 'pullovers',
                "paint": {
                        "circle-radius": 2,
                        "circle-color": "#ff0000"
                }
        }
)
styleSecond.layers.push(

        {
                "id": "population_gradient",
                "type": "fill",
                "source": "pop",
                "source-layer": "population_by_boroct",
                "filter": [
                        "!=",
                        ["get", "total_pop"],
                        0// Only features where 'status' is not 'inactive' will be shown
                ],
                "paint": {
                        "fill-color": [
                                "rgb",
                                [
                                        "*",
                                        [
                                                "to-number",
                                                ["get", "hispanic_pct"]
                                        ],
                                        2.5
                                ],
                                [
                                        "*",
                                        [
                                                "to-number",
                                                ["get", "asian_pct"]
                                        ],
                                        2.5
                                ],
                                [
                                        "*",
                                        [
                                                "to-number",
                                                ["get", "white_pct"]
                                        ],
                                        2.5
                                ]
                        ],
                        "fill-opacity-transition": {
                                "duration": 300,  // 500ms transition
                                "delay": 0
                        },
                        "fill-opacity": 0.8,
                        "fill-antialias": true
                }
        }
)
styleSecond.layers.push(
        {
                "id": "pullover_gradient",
                "type": "fill",
                "source": "pullovers_by_boroct",
                "source-layer": "pullovers_by_boroct",
                // "layout": {
                //         "visibility": "none"
                // },
                "filter": [
                        "!=",
                        ["get", "total_pullovers"],
                        0 // Only features where 'status' is not 'inactive' will be shown
                ],
                "paint": {
                        "fill-color": [
                                "rgb",
                                [
                                        "*",
                                        [
                                                "to-number",
                                                ["get", "hispanic_pct"]
                                        ],
                                        255
                                ],
                                [
                                        "*",
                                        [
                                                "to-number",
                                                ["get", "asian_pct"]
                                        ],
                                        255
                                ],
                                [
                                        "*",
                                        [
                                                "to-number",
                                                ["get", "white_pct"]
                                        ],
                                        255
                                ]
                        ],
                        "fill-opacity-transition": {
                                "duration": 300,  // 500ms transition
                                "delay": 0
                        },
                        "fill-opacity": 0.0,
                        "fill-antialias": true
                }
        }
)

styleThird.layers.push(
        {
                "id": "borough_borders",
                "type": "line",
                "source": "pullovers_by_boroct",
                "source-layer": "pullovers_by_boroct",
                "paint": {
                        "line-color": [
                                "rgb",
                                [
                                        "*",
                                        [
                                                "to-number",
                                                ["get", "hispanic_pct"]
                                        ],
                                        255
                                ],
                                [
                                        "*",
                                        [
                                                "to-number",
                                                ["get", "asian_pct"]
                                        ],
                                        255
                                ],
                                [
                                        "*",
                                        [
                                                "to-number",
                                                ["get", "white_pct"]
                                        ],
                                        255
                                ]
                        ],
                        "line-opacity-transition": {
                                "duration": 300,  // 500ms transition
                                "delay": 0
                        },
                        "line-opacity": 1.0,
                }
        },
        {
                "id": "borough_trans_fill",
                "type": "fill",
                "source": "pop",
                "source-layer": "population_by_boroct",
                "paint": {
                        "fill-color": "#ffffff",
                        "fill-opacity": 0.0,
                }
        }
)

function display_bar_races(labels, values, title, bottom_label) {
        // Example JSON object
        // Get the output div
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = ''; // Clear previous output

        // Create a list to display the JSON object

        let opts = {
                title: title,
                width: 500,
                height: 400,
                scales: {
                        x: {
                                time: false,
                                range: [-0.5, labels.length - 0.5]  // Add padding to prevent bars from being cut off
                        },
                        y: {
                                range: [0, 100], // Set y-axis to 0-100 since these are percentages
                        }
                },
                series: [
                        {},  // x-values
                        {
                                label: bottom_label,
                                width: 1,
                                stroke: "transparent",  // No visible stroke for bars
                                paths: uPlot.paths.bars({
                                        disp: {
                                                stroke: {
                                                        unit: 3,
                                                        values: (u, seriesIdx) => labels.map((v, i) =>
                                                                i == 0 ? "#0000ff" :
                                                                        i == 1 ? "#000000" :
                                                                                i == 2 ? "#ff0000" :
                                                                                        i == 3 ? "#00ff00" :
                                                                                                i == 4 ? "#FFD700" :
                                                                                                        i == 5 ? "#C71585" :
                                                                                                                "#00ffff"
                                                        ),
                                                },
                                                fill: {
                                                        unit: 3,
                                                        values: (u, seriesIdx) => labels.map((v, i) =>
                                                                i == 0 ? "#0000ffA0" :
                                                                        i == 1 ? "#000000A0" :
                                                                                i == 2 ? "#ff0000A0" :
                                                                                        i == 3 ? "#00ff00A0" :
                                                                                                i == 4 ? "#FFD700A0" :
                                                                                                        i == 5 ? "#C71585A0" :
                                                                                                                "#00ffffA0"
                                                        ),
                                                }
                                        }
                                })
                        },
                ],
                axes: [
                        {
                                scale: "x",
                                values: (u, vals) => vals.map(i => labels[i]),  // Map indices to labels
                        },
                        {
                                scale: "y",
                                grid: { show: true },
                                values: (u, vals) => vals.map(v => v + "%"),  // Add % symbol to y-axis
                        }
                ],
        };

        new uPlot(opts, [
                labels.map((_, i) => i),  // x-values (indices)
                values,                   // y-values (percentages)
        ], outputDiv);
}


var map = new maplibregl.Map({
        container: 'map', // container id
        center: [-73.8635, 40.7210],
        maxBounds: [-74.35658846455917, 40.49575648794443, -73.59643118863408, 40.993131006621605],
        style: baseStyle, // style URL
        zoom: 1 // starting zoom
});


const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');
const stepHolder = document.querySelector('.stepholder')
const stepContents = document.querySelectorAll('.stepholder .step')
const stepTitles = document.querySelectorAll('.step-titles h1')
const stepContentsHolder = document.querySelector('.step-contents')
const circles = document.querySelectorAll('.circle');
const progress = document.querySelector('.progress');
const detail = document.querySelector('.detail-side');
const closeDetailButton = document.querySelector('.close-detail-button');
let bctSearchTractProps = {};
let currentStyleIdx = 0

const styles = [baseStyle, styleFirst, styleSecond, styleThird, baseStyle, baseStyle]


let search_marker = null;
function addOrMoveMarker(lngLat) {
        if (search_marker) {
                // If the marker already exists, update its position
                search_marker.setLngLat(lngLat);
        } else {
                // If the marker does not exist, create it
                const el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundImage = "url(http://localhost:8080/pullover.svg)"
                el.style.cursor = "pointer";
                el.style.backgroundSize = "contain";

                el.style.width = `3rem`;
                el.style.height = `3rem`;
                search_marker = new maplibregl.Marker({ element: el })
                        .setLngLat(lngLat)
                        .addTo(map);
        }
}

map.on('click', function(e) {
        if (currentStyleIdx == 2) {
                var pop_features = map.queryRenderedFeatures(e.point, {
                        layers: ['population_gradient'] // Example layer ID
                });

                var pull_features = map.queryRenderedFeatures(e.point, {
                        layers: ['pullover_gradient'] // Example layer ID
                });

                const labels = ["White", "Black", "Hispanic", "Asian", "Other", "Hawaiian", "Am Indian"];

                if (!step3PopPullToggle.checked && pop_features.length) {
                        detail.classList.remove("no-display")
                        let f = pop_features[0].properties
                        console.log(f)
                        const values = [
                                f['white_pct'],
                                f['black_pct'],
                                f['hispanic_pct'],
                                f['asian_pct'],
                                f['other_pct'],
                                f['hawaiian_pct'],
                                f['am_indian_pct'],
                        ];
                        display_bar_races(labels, values, "Population Percentage by Race", "Population % by Race")
                }
                if (step3PopPullToggle.checked && pull_features.length) {
                        detail.classList.remove("no-display")
                        let f = pull_features[0].properties
                        const values = [
                                f['white_pct'] * 100,
                                f['black_pct'] * 100,
                                f['hispanic_pct'] * 100,
                                f['asian_pct'] * 100,
                                f['other_pct'] * 100,
                                f['hawaiian_pct'] * 100,
                                f['am_indian_pct'] * 100,
                        ];
                        display_bar_races(labels, values, "Pullover Percentage by Race", "Pullover % by Race")
                }
        } else if (currentStyleIdx == 3) {

                let features = map.queryRenderedFeatures(e.point, {
                        layers: ['borough_trans_fill']
                });
                bctSearchTractProps = features[0].properties
                addOrMoveMarker(e.lngLat)
                document.getElementById('bct2020').value = bctSearchTractProps.boroct2020;
        }
});

function handleCheckSearch(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const occurTmInput = document.getElementById('occur_tm').value; // Time input
        const vehCategory = document.getElementById('veh_category').value; // Vehicle Category
        const rptedAge = document.getElementById('rpted_age').value; // Reported Age
        const sexCd = document.getElementById('sex_cd').value; // Sex
        const raceDesc = document.getElementById('race_desc').value; // Race Description



        // Calculate OCCUR_TM (time since midnight in minutes)
        const [hours, minutes] = occurTmInput.split(':').map(Number);
        const occurTm = hours * 60 + minutes; // Convert to minutes

        console.log(bctSearchTractProps)
        // Construct the JSON object
        const jsonData = {
                "OCCUR_TM": occurTm,
                "VEH_CATEGORY": parseInt(vehCategory),
                "RPTED_AGE": parseInt(rptedAge),
                "SEX_CD": parseInt(sexCd),
                "RACE_DESC": parseInt(raceDesc),
                "bct2020": bctSearchTractProps.boroct2020 // Assuming a static value for bct2020
        };

        console.log(JSON.stringify(jsonData)); // Output the JSON object
        fetch("http://localhost:8069/predict", {
                method: "POST", body: JSON.stringify(jsonData), headers: {
                        'Content-Type': 'application/json'
                },
        }).then(async x => {
                let prediction = await x.json()
                document.getElementById("prediction-score").innerText = prediction.prediction


        })
        // You can also send this JSON object to your server or handle it as needed
}

closeDetailButton.addEventListener('click', function() {
        // Change the text of the message paragraph
        detail.classList.add("no-display")
});

function stepActivate(idx) {
        if(idx < 0 || idx > 5 ) return;
        
        stepContents.forEach(function(v) {
                v.classList.remove('active-step')
        })
        stepTitles.forEach(function(v) {
                v.classList.remove('active-step-title')
        })
        stepContents[idx].classList.add('active-step')
        stepTitles[idx].classList.add('active-step-title')
        stepContentsHolder.scrollTop = 0;
        closeDetailButton.click()

        circles.forEach((circle, index) => {
                if (index == idx) {
                        circle.classList.add('active');
                } else {
                        circle.classList.remove('active');
                }
                progress.style.width = idx * 20 + "%";
        });

        map.setStyle(styles[idx]);
        // stepContents.forEach(function(v) {
        //         if (!v.classList.contains('active')) { 
        //         }
        // })
        if(idx > 3) {
                stepHolder.classList.add("stepholder-full")
                return
        } else {
                stepHolder.classList.remove("stepholder-full")
        }
}

// Add a click event listener to the button
nextButton.addEventListener('click', function() {
        // Change the text of the message paragraph
        currentStyleIdx += 1;
        stepActivate(currentStyleIdx)
});

previousButton.addEventListener('click', function() {
        // Change the text of the message paragraph
        currentStyleIdx -= 1;
        stepActivate(currentStyleIdx)
});

circles.forEach((circle, index) => {
        circle.addEventListener('click', () => {
                currentStyleIdx = index
                stepActivate(currentStyleIdx);
        });
});


// Step 3 related things
const step3PopPullToggle = document.getElementById('pop-pull-toggle')
step3PopPullToggle.addEventListener('change', function() {
        if (this.checked) {
                map.setPaintProperty('population_gradient', 'fill-opacity', 0);
                map.setPaintProperty('pullover_gradient', 'fill-opacity', 0.8);
        } else {
                map.setPaintProperty('population_gradient', 'fill-opacity', 0.8);
                map.setPaintProperty('pullover_gradient', 'fill-opacity', 0.0);
        }
});
