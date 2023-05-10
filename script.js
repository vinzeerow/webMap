var url = "http://192.168.43.195:3000/coordinates";
var map, marker, marker_source, marker_layer, rooms_layer, units_layer,unitsText_layer,streets_layer,dormitory_layer;
var id_question = [542, 566];
const account = window.localStorage.getItem('account');
var questions = [
    {
        id: 542,
        question: "Tại sao ?",
        answer: "Trả lời",
        status: true,
        id_next: 566
    },
    {
        id: 566,
        question: "Tại sao ?",
        answer: "Trả lời",
        status: false,
        id_next: null
    }
]

// function addLayer() {
//     const source_street = new ol.source.Vector({
//         format: new ol.format.GeoJSON(),
//         url: 'https://geoserver.ctu.edu.vn/geoserver/ctu/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=ctu:room_by_floor&outputFormat=application/json'
//     });
//     const layer_street = new ol.layer.Vector({
//         source: source_street,
//         style: new ol.style.Style({
//             stroke: new ol.style.Stroke({
//                 color: '#02598C',
//                 width: 0.5,
//             }),
//             fill: new ol.style.Fill({
//                 color: '#c8e3f6',
//             }),
//             text: new ol.style.Text({
//                 // text: "ABC",
//                 font: 'bold 10px Arial',
//                 textAlign: 'center',
//                 textBaseline: 'middle',
//                 offsetX: 0,
//                 offsetY: 0,
//                 fill: new ol.style.Fill({ color: 'red' }),
//             }),
//         }),
//     });
//     map.addLayer(layer_street);




// }

function initMap() {
    /* Khởi tạo map */
    map = new ol.Map({
        target: 'map',
        layers: [
            // new ol.layer.Tile({
            //     source: new ol.source.OSM()
            // })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([0, 0]),
            zoom: 18
        })
    });

    /* Khởi tạo vị trí định vị hiện tại */
    marker = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([0, 0]))
    });
    marker_source = new ol.source.Vector({
        features: [marker]
    });
    marker_layer = new ol.layer.Vector({
        source: marker_source,
        zIndex: 10,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'red' // định nghĩa màu sắc của điểm
                })
            })
        }),
    });

    /* Khởi tạo layer phòng học */
    rooms_layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.MultiPolygon([])
                })
            ]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#02598C',
                width: 0.5,
            }),
            fill: new ol.style.Fill({
                color: '#c8e3f6',
            }),
            text: new ol.style.Text({
                // text: "ABC",
                font: 'bold 10px Arial',
                textAlign: 'center',
                textBaseline: 'middle',
                offsetX: 0,
                offsetY: 0,
                fill: new ol.style.Fill({ color: 'red' }),
            }),
        }),
    });
    /* Khởi tạo layer khoa */
    units_layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.MultiPolygon([]),
                    
                })
            ]

        }),
        
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#02598C',
                width: 0.5,
            }),
            fill: new ol.style.Fill({
                color: '#fff9d2',
            }),
            text: new ol.style.Text({
                // text: "ABC",
                font: 'bold 10px Arial',
                textAlign: 'center',
                textBaseline: 'middle',
                offsetX: 0,
                offsetY: 0,
                fill: new ol.style.Fill({ color: 'red' }),
            }),

        }),
    });
    /* Khởi tạo layer street */
    streets_layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.LineString([])
                })
            ]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#6157ff',
                width: 1,
            }),
            fill: new ol.style.Fill({
                color: 'blue',
            }),
        }),
    });
    unitsText_layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.MultiPolygon([])
                })
            ]
        }),
        zIndex: 9,
        style: new ol.style.Style({
            text: new ol.style.Text({
                // text: "ABC",
                font: 'bold 10px Arial',
                textAlign: 'center',
                textBaseline: 'middle',
                offsetX: 0,
                offsetY: 0,
                fill: new ol.style.Fill({ color: 'red' }),
            }),

        }),
    });
    dormitory_layer= new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.MultiPolygon([])
                })
            ]
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#02598C',
                width: 0.5,
            }),
            fill: new ol.style.Fill({
                color: '#fff9d2',
            }),
            text: new ol.style.Text({
                // text: "ABC",
                font: 'bold 10px Arial',
                textAlign: 'center',
                textBaseline: 'middle',
                offsetX: 0,
                offsetY: 0,
                fill: new ol.style.Fill({ color: 'red' }),
            }),

        }),
    });

}

function getDataRooms() {
    let dataFromAjax = null;
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: 'https://geoserver.ctu.edu.vn/geoserver/ctu/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=ctu:room_by_floor&outputFormat=application/json',
        success: function (data) {
            // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
            data.features.map((item, idx) => {

                var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
                rooms_layer.getSource().addFeatures(feature);
                rooms_layer.getStyle().getText().setText(item.properties.roomnamevi);
                
            })
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi khi yêu cầu không thành công
            console.log("Error: " + error);
        }
    });
    // var features = new ol.format.GeoJSON().readFeatures(JSON.stringify(dataFromAjax));
    
    // return dataFromAjax;
}
async function getDataUnits() {
    let dataFromAjax = null;
    dataFromAjax = await $.ajax({
        type: "GET",
        dataType: 'json',
        url: 'https://geoserver.ctu.edu.vn/geoserver/ctu/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=ctu:cantho_university_units&outputFormat=application/json'
    });
    var features = new ol.format.GeoJSON().readFeatures(JSON.stringify(dataFromAjax));
    units_layer.getSource().addFeatures(features);
    return dataFromAjax;
}
async function getDataUnitsText() {
    const data= await getDataUnits();
    data.features.map((item,idx)=>{
        // console.log(item);
        console.log(units_layer.getSource().getFeatures()[idx]);
        // console.log(units_layer.getSource().getFeatures()[idx].getStyle().getText());
        // units_layer.getStyle().getText().setText(item.properties.name);
    })
    

}
async function getDataStreets() {
    let dataFromAjax = null;
    dataFromAjax = await $.ajax({
        type: "GET",
        dataType: 'json',
        url: 'https://geoserver.ctu.edu.vn/geoserver/ctu/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=ctu:local_streets&outputFormat=application/json'
    });
    var features = new ol.format.GeoJSON().readFeatures(JSON.stringify(dataFromAjax));
    streets_layer.getSource().addFeatures(features);
    return dataFromAjax;
}
async function getDataDomitory() {
    let dataFromAjax = null;
    dataFromAjax = await $.ajax({
        type: "GET",
        dataType: 'json',
        url: 'https://geoserver.ctu.edu.vn/geoserver/ctu/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=ctu:dormitory&outputFormat=application/json'
    });
    var features = new ol.format.GeoJSON().readFeatures(JSON.stringify(dataFromAjax));
    dormitory_layer.getSource().addFeatures(features);
    return dataFromAjax;
}

// async function getFeatureIds() {
//     let dataFromAjax = null;
//     var url = "http://192.168.43.195:3000/";
//     dataFromAjax = await $.ajax({
//         type: "GET",
//         dataType: 'json',
//         url: ''
//     });
//     var features = new ol.format.GeoJSON().readFeatures(JSON.stringify(dataFromAjax));
//     rooms_layer.getSource().addFeatures(features);
//     return dataFromAjax;
// }
function checkPositionAndFeature(pos) {
    const closestFeature = rooms_layer.getSource().getClosestFeatureToCoordinate(pos);
    var show = true;
    questions.forEach(function (question) {
        if (closestFeature.getProperties().id == question.id) {
            closestFeature.setStyle(new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'red'
                })
                
            }));
            Swal.fire({
                title: "An input!",
                text: "Write something interesting:",
                input: 'text',
                showCancelButton: true        
            }).then((result) => {
                if (result.value) {
                    console.log("Result: " + result.value);
                }
            })
        }
    });
    var closestPosition = closestFeature.getGeometry().getClosestPoint(pos);
    console.log("Vị trị của bạn hiện tại gần với feature: ");
    console.log(closestFeature.getProperties().id);
    var dis = distance(pos[0], pos[1], closestPosition[0], closestPosition[1]);
    console.log('Khoảng cách giữa hai vị trí là: ' + dis + ' mét');
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function checkRequestAccessLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            // var pos = ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]);
            var pos = ol.proj.fromLonLat([105.769588, 10.030725]);
            map.getView().setCenter(pos);
            checkPositionAndFeature(pos);
            marker.setGeometry(new ol.geom.Point(pos));
        }, function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("Người sử dụng từ chối cho xác định vị trí.")
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Thông tin vị trí không có sẵn.")
                    break;
                case error.TIMEOUT:
                    alert("Yêu cầu vị trí người dùng vượt quá thời gian quy định.")
                    break;
                case error.UNKNOWN_ERROR:
                    alert("Một lỗi xảy ra không rõ nguyên nhân.")
                    break;
            }
        },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
    } else {
        alert('Trình duyệt không hỗ trợ');
    }
}
function getItem(key) {
    return new Promise((resolve, reject) => {
        window.ReactNative.AsyncStorage.getItem(key, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

async function testAsyncStorage() {
    const value = await getItem('tendangnhap');
    console.log(value);
    alert(value);

}

function addQuestionInFeature() {
    map.on('click', function (event) {
        // Lấy danh sách các feature ở vị trí click
        var features = rooms_layer.getSource().getFeaturesAtCoordinate(event.coordinate);

        // Lặp qua danh sách các feature và log ra thông tin tọa độ
        features.forEach(function (feature) {
            console.log(feature.getProperties().id);
        });
    });
}



      

$(document).ready(async function () {
    initMap();
    
    map.addLayer(units_layer);
    map.addLayer(unitsText_layer);
    map.addLayer(marker_layer);
   map.addLayer(streets_layer);
   map.addLayer(dormitory_layer);
   map.addLayer(rooms_layer);
    // testAsyncStorage();

    
    getDataUnits();
    getDataUnitsText();
    getDataStreets();
    getDataDomitory();
    getDataRooms();
    checkRequestAccessLocation();
    addQuestionInFeature();
    
    // const headers = JSON.parse(window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'GET_HEADERS' })));
    // console.log(headers);
    // alert(headers);


})