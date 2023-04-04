var marker;
var map;
var url = "http://192.168.43.195:3000/coordinates";

function layer_Marker() {
    /* Vi tri dinh vi*/
    marker = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([0, 0]))
    });

    var vectorSource_Location = new ol.source.Vector({
        features: [marker]
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource_Location,
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
    return vectorLayer;
}

// function addLayerStreets() {
//     /* Streets lay tu Geoserver */
//     var layer, source, vector;
//     source = new ol.source.Vector({});
//     vector = new ol.layer.Vector({
//         source: source,
//         style: new ol.style.Style({
//             stroke: new ol.style.Stroke({
//                 color: '#6157ff',
//                 width: 1,
//             }),
//             fill: new ol.style.Fill({
//                 color: 'blue',
//             }),
//         }),
//     });
//     map.addLayer(vector);
//     $.ajax({
//         type: "GET",
//         url: url + "/streets",
//         success: function (data) {
//             // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
//             var features = new ol.format.GeoJSON().readFeatures(JSON.stringify(data));
//             source.addFeatures(features);

//         },
//         error: function (xhr, status, error) {
//             // Xử lý lỗi khi yêu cầu không thành công
//             console.log("Error: " + error);
//         }
//     });
// }
// function addLayerTrees() {
//     /* Streets lay tu Geoserver */
//     $.ajax({
//         type: "GET",
//         url: url + "/trees",
//         success: function (data) {
//             // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
//             data.features.map((item) => {
//                 var layer, source, vector;
//                 source = new ol.source.Vector({});
//                 vector = new ol.layer.Vector({
//                     source: source,
//                     style: new ol.style.Style({
//                         image: new ol.style.Circle({
//                             radius: 3,
//                             fill: new ol.style.Fill({
//                                 color: 'green' // định nghĩa màu sắc của điểm
//                             })
//                         })
//                     }),
//                 });
//                 map.addLayer(vector);
//                 var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
//                 source.addFeatures(feature);
//                 // vector.getStyle().getText().setText(item.properties.name);
//             })
//         },
//         error: function (xhr, status, error) {
//             // Xử lý lỗi khi yêu cầu không thành công
//             console.log("Error: " + error);
//         }
//     });
// }

// function addLayerUnits() {
//     /* Streets lay tu Geoserver */
//     $.ajax({
//         type: "GET",
//         url: url + "/units",
//         success: function (data) {
//             // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
//             data.features.map((item, idx) => {
//                 var layer, source, vector;
//                 source = new ol.source.Vector({});
//                 vector = new ol.layer.Vector({
//                     source: source,
//                     style: new ol.style.Style({
//                         stroke: new ol.style.Stroke({
//                             color: '#02598C',
//                             width: 0.5,
//                         }),
//                         fill: new ol.style.Fill({
//                             color: '#fff9d2',
//                         }),
//                         text: new ol.style.Text({
//                             // text: "ABC",
//                             font: 'bold 10px Arial',
//                             textAlign: 'center',
//                             textBaseline: 'middle',
//                             offsetX: 0,
//                             offsetY: 0,
//                             fill: new ol.style.Fill({ color: 'red' }),
//                         }),

//                     }),
//                 });
//                 map.addLayer(vector);
//                 var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
//                 source.addFeatures(feature);

//                 vector.getStyle().getText().setText(item.properties.name);
//             })
//         },
//         error: function (xhr, status, error) {
//             // Xử lý lỗi khi yêu cầu không thành công
//             console.log("Error: " + error);
//         }
//     });
// }
// function addLayerUnitsText() {
//     /* Streets lay tu Geoserver */
//     $.ajax({
//         type: "GET",
//         url: url + "/units",
//         success: function (data) {
//             // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
//             data.features.map((item, idx) => {
//                 var layer, source, vector;
//                 source = new ol.source.Vector({});
//                 vector = new ol.layer.Vector({
//                     source: source,
//                     zIndex: 9,
//                     style: new ol.style.Style({
//                         // stroke: new ol.style.Stroke({
//                         //     color: '#02598C',
//                         //     width: 1,
//                         // }),
//                         // fill: new ol.style.Fill({
//                         //     color: '#fff9d2',
//                         // }),
//                         text: new ol.style.Text({
//                             // text: "ABC",
//                             font: 'bold 10px Arial',
//                             textAlign: 'center',
//                             textBaseline: 'middle',
//                             offsetX: 0,
//                             offsetY: 0,
//                             fill: new ol.style.Fill({ color: 'red' }),
//                         }),

//                     }),
//                 });
//                 map.addLayer(vector);
//                 var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
//                 source.addFeatures(feature);

//                 vector.getStyle().getText().setText(item.properties.name);
//             })
//         },
//         error: function (xhr, status, error) {
//             // Xử lý lỗi khi yêu cầu không thành công
//             console.log("Error: " + error);
//         }
//     });
// }
// function addLayerRooms() {
//     /* Streets lay tu Geoserver */
//     $.ajax({
//         type: "GET",
//         url: url + "/rooms",
//         success: function (data) {
//             // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
//             data.features.map((item, idx) => {
//                 var layer, source, vector;
//                 source = new ol.source.Vector({});
//                 vector = new ol.layer.Vector({
//                     source: source,

//                     style: new ol.style.Style({
//                         stroke: new ol.style.Stroke({
//                             color: '#02598C',
//                             width: 0.5,
//                         }),
//                         fill: new ol.style.Fill({
//                             color: '#c8e3f6',
//                         }),
//                         text: new ol.style.Text({
//                             // text: "ABC",
//                             font: 'bold 10px Arial',
//                             textAlign: 'center',
//                             textBaseline: 'middle',
//                             offsetX: 0,
//                             offsetY: 0,
//                             fill: new ol.style.Fill({ color: 'red' }),
//                         }),
//                     }),
//                 });
//                 map.addLayer(vector);
//                 var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
//                 source.addFeatures(feature);
//                 vector.getStyle().getText().setText(item.properties.roomnamevi);
//             })
//         },
//         error: function (xhr, status, error) {
//             // Xử lý lỗi khi yêu cầu không thành công
//             console.log("Error: " + error);
//         }
//     });
// }
// function addLayerDormitory() {
//     /* Streets lay tu Geoserver */
//     $.ajax({
//         type: "GET",
//         url: url + "/dormitory",
//         success: function (data) {
//             // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
//             data.features.map((item, idx) => {
//                 var layer, source, vector;
//                 console.log(idx);
//                 source = new ol.source.Vector({});
//                 vector = new ol.layer.Vector({
//                     source: source,
//                     style: new ol.style.Style({
//                         stroke: new ol.style.Stroke({
//                             color: '#02598C',
//                             width: 0.5,
//                         }),
//                         fill: new ol.style.Fill({
//                             color: 'rgba(0, 0, 255, 0.1)',
//                         }),
//                     }),
//                 });
//                 map.addLayer(vector);
//                 var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
//                 source.addFeatures(feature);
//             })
//         },
//         error: function (xhr, status, error) {
//             // Xử lý lỗi khi yêu cầu không thành công
//             console.log("Error: " + error);
//         }
//     });
// }
function addLayerSportGround() {
    /* Streets lay tu Geoserver */
    fetch(url+"/sport-ground")
        .then(response => response.json())
        .then(data => {
            // xử lý dữ liệu nhận được ở đây
            data.features.map((item, idx) => {
                var layer, source, vector;
                console.log(idx);
                source = new ol.source.Vector({});
                vector = new ol.layer.Vector({
                    source: source,
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#02598C',
                            width: 0.5,
                        }),
                        fill: new ol.style.Fill({
                            color: '#ddffc9',
                        }),
                    }),
                });
                map.addLayer(vector);
                var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
                source.addFeatures(feature);
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
    // $.ajax({
    //     type: "GET",
    //     url: url + "/sport-ground",
    //     success: function (data) {
    //         // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
    //         data.features.map((item, idx) => {
    //             var layer, source, vector;
    //             console.log(idx);
    //             source = new ol.source.Vector({});
    //             vector = new ol.layer.Vector({
    //                 source: source,
    //                 style: new ol.style.Style({
    //                     stroke: new ol.style.Stroke({
    //                         color: '#02598C',
    //                         width: 0.5,
    //                     }),
    //                     fill: new ol.style.Fill({
    //                         color: '#ddffc9',
    //                     }),
    //                 }),
    //             });
    //             map.addLayer(vector);
    //             var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
    //             source.addFeatures(feature);
    //         })
    //     },
    //     error: function (xhr, status, error) {
    //         // Xử lý lỗi khi yêu cầu không thành công
    //         console.log("Error: " + error);
    //     }
    // });
}

function createMap() {
    map = new ol.Map({
        target: 'map',
        layers: [
            // new ol.layer.Tile({
            //   source: new ol.source.OSM()
            // })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([0, 0]),
            zoom: 18
        })
    });
    // addLayerStreets();
    // addLayerUnits();
    // addLayerUnitsText();

    // addLayerTrees();
    // addLayerRooms();
    // addLayerDormitory();

    addLayerSportGround();
    map.addLayer(layer_Marker());
    return map;
}
function checkRequestAccessLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            var pos = ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]);

            map.getView().setCenter(pos);
            console.log(pos);
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
        });
    } else {
        alert('Your browser does not support geolocation.');
    }
}

// $(document).ready(function () {
map = createMap();
checkRequestAccessLocation();
// })
