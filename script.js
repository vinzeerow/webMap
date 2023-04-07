var url = "http://192.168.43.195:3000/coordinates";
var map, marker, marker_source, marker_layer, rooms_layer;

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


// map.on('click', function (event) {
//     // Lấy danh sách các feature ở vị trí click
//     var features = source_street.getFeaturesAtCoordinate(event.coordinate);

//     // Lặp qua danh sách các feature và log ra thông tin tọa độ
//     features.forEach(function (feature) {
//         var geometry = feature.getGeometry();
//         var coordinates = geometry.getCoordinates();
//         // console.log(coordinates);
//         var properties = feature.getProperties();

//         // Log properties của feature gần nhất
//         // console.log(properties);

//         // var coordinate = ol.proj.fromLonLat([11773742, 1122011]);
//         // console.log(coordinates[0][0][0]);
//         var closestFeature = source_street.getClosestFeatureToCoordinate([11773742.68628586, 1122011.89691158]);
//         if (closestFeature) {
//             var closestFeatureCoordinates = closestFeature.getGeometry().getCoordinates();
//             console.log('Closest feature coordinates:', closestFeatureCoordinates);
//         } else {
//             console.log('No closest feature found');
//         }
//     });
// });

// }
function initMap() {
    /* Khởi tạo map */
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
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
        })
    });

}

async function getDataRooms() {
    let dataFromAjax = null;
    dataFromAjax = await $.ajax({
        type: "GET",
        dataType: 'json',
        url: 'https://geoserver.ctu.edu.vn/geoserver/ctu/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=ctu:room_by_floor&outputFormat=application/json'
    });
    var features = new ol.format.GeoJSON().readFeatures(JSON.stringify(dataFromAjax));
    rooms_layer.getSource().addFeatures(features);
    return dataFromAjax;
}
function checkPositionAndFeature(dataFromAjax, pos) {
    const closestFeature = rooms_layer.getSource().getClosestFeatureToCoordinate(pos);
    var closestPosition = closestFeature.getGeometry().getClosestPoint(pos);
    console.log("Vị trị của bạn hiện tại gần với feature: ");
    console.log(closestFeature.getProperties());
    var dis = distance(pos[0], pos[1], closestPosition[0], closestPosition[1]);
    console.log('Khoảng cách giữa hai vị trí là: ' + dis + ' mét');
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function checkRequestAccessLocation(dataFromAjax) {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            var pos = ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]);
            map.getView().setCenter(pos);
            checkPositionAndFeature(dataFromAjax, pos);

            // console.log(pos);
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
        alert('Your browser does not support geolocation.');
    }
}
$(document).ready(async function () {
    initMap();
    map.addLayer(rooms_layer);
    map.addLayer(marker_layer);
    var dataFromAjax = await getDataRooms();
    checkRequestAccessLocation(dataFromAjax);
})