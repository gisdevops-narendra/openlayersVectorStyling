let view = new ol.View({
    center: [73.37907973652675, 22.331480705369238],
    zoom: 9.496452477891525,
    projection: 'EPSG:4326',

});

var button = document.createElement('button');
button.innerHTML = 'C';
button.id = 'mybtn'

var myCustomOlControl = function (e) {
    clickCordinateFun();
};

//button.addEventListener('click', myCustomOlControl, false);

var element = document.createElement('div');
element.className = 'rotate-north ol-unselectable ol-control';
element.appendChild(button);

var myCustomOlControl = new ol.control.Control({
    element: element
});
var map = new ol.Map({
    target: 'myMap',
    view: view,
    keyboardEventTarget:document
});

const osm = new ol.layer.Tile({
    source: new ol.source.OSM()
});

map.addControl(myCustomOlControl);
map.addLayer(osm);

// set style to the polygon feature
var polygone = new ol.layer.Vector({
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: [17, 169, 212, 0.3]
        }),
        stroke: new ol.style.Stroke({
            color: [8, 8, 8, 1],
            width: 1.5
        })
    }),
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'vadodara/subdistrict.geojson'
    })
})
map.addLayer(polygone);
var line = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: [32, 3, 252, 1],
            width: 5,
            lineCap: 'butt',//Line cap style: butt, round, or square.
            lineJoin: 'round',//Line join style: bevel, round, or miter.
            lineDash: [3, 1],//3 is size and 1 is distance
            //lineDashOffset:0
            // miterLimit:
        })
    }),
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'vadodara/canal.geojson'
    })
})
map.addLayer(line);


var pointTextStyle = function (feature) {
    var ftype = feature.getGeometry().getType();
    var textf = feature.get('station_ty');
    var fnamestr = textf.toString();


    var newstylepoint = new ol.style.Style({
        image: new ol.style.Icon({
            src: 'icon/watericon.png',
            size: [50, 50],
            scale: 0.5,
            color: [32, 54, 128, 0.5],
            //opacity:0.5
        })
    })
    var textstyle = new ol.style.Style({
        text: new ol.style.Text({
            text: fnamestr,
            scale: 1.5,
            fill: new ol.style.Fill({
                color: [252, 3, 3, 1]

            })
        }),
        fill: new ol.style.Fill({
            color: [252, 13, 5, 1],
        }),
        stroke: new ol.style.Stroke({
            color: [252, 3, 3, 1],
            width: 1
        }),
        scale: 2
    })
    // console.log(ftype);
    //console.log(fnamestr);
    feature.setStyle([textstyle, newstylepoint])
    // if (ftype === 'Point') {
    //     feature.setStyle([textstyle,newstylepoint])
    // }
}
var point = new ol.layer.Vector({
    // style: new ol.style.Style({
    //     image: new ol.style.RegularShape({
    //         fill: new ol.style.Fill({
    //             color:[252, 13, 5, 1],
    //         }),
    //        // radius:5,
    //         radius1:3,
    //         radius2:10,
    //         stroke: new ol.style.Stroke({
    //             color:[148, 64, 107,1],
    //             width:1
    //         }),
    //         points:3
    //     })
    // }),
    // style: new ol.style.Style({
    //     image: new ol.style.Circle({
    //         fill: new ol.style.Fill({
    //             color:[252, 13, 5, 1],
    //         }),
    //         radius:5,
    //         stroke: new ol.style.Stroke({
    //             color:[148,64,107,1],
    //             width:1
    //         })
    //     })  
    // }),
    // style: new ol.style.Style({
    //     image: new ol.style.Icon({
    //         src: 'icon/watericon.png',
    //         size: [50,50],
    //         scale:0.5,
    //         color:[32, 54, 128,0.5],
    //         //opacity:0.5
    //     })
    // }),
    style: pointTextStyle,
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'vadodara/wqs.geojson'
    })
})
map.addLayer(point);


var popupcordinatecontainer = document.getElementById('popupcordinate');

onclickcodinate = 0;
document.getElementById('mybtn').addEventListener('click', function () {
    if (onclickcodinate == 0) {
        debugger;
        onclickcodinate = 1;
        mybtn.style.color = 'yellow';
        document.getElementById('myMap').style.cursor = "help";
        clickCordinateFun();
    }
    else {
        debugger;
        onclickcodinate = 0;
        mybtn.style.color = 'white';
        document.getElementById('myMap').style.cursor = 'default';
        clickCordinateFun();
        popupcordinatecontainer.style.display = "none";
       
    }
});

var overlaypopup = new ol.Overlay({
    element: popupcordinatecontainer,
    positioning: 'top-left'
})
map.addOverlay(overlaypopup);
function clickCordinateFun() {
    map.on('click', function (e) {
        if (onclickcodinate == 1) {
            var clickedCordinate = e.coordinate;
            overlaypopup.setPosition(clickedCordinate);
            popupcordinatecontainer.innerHTML = 'You Clicked at:' + clickedCordinate;
        }
    })
}