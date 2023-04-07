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
function addLayerStreets_NEW() {

    /* Streets lay tu Geoserver */
    var vectorSource_Streets = new ol.source.TileWMS({
        url: 'https://geoserver.ctu.edu.vn/geoserver/ctu/wfs',
        params: { 'LAYERS': 'ctu:local_streets' },
        serverType: 'geoserver',
    });
    var layer_Streets = new ol.layer.Tile({
        source: vectorSource_Streets,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 1,
            }),
            fill: new ol.style.Fill({
                color: 'blue',
            }),
        }),
    });
    console.log(vectorSource_Streets);
    // Lấy tất cả các feature của layer
    var features = vectorSource_Streets.getFeatures();

    // Duyệt qua từng feature và lấy thông tin
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        var properties = feature.getProperties();
        var geometry = feature.getGeometry();

        // Lưu thông tin vào một object
        var featureData = {
            name: properties.name,
            coordinates: geometry.getCoordinates()
            // Thêm các thuộc tính khác của feature nếu cần thiết
        };
        console.log(featureData.coordinates.coordinates[0]);
    }

}
var featureData;
function addLayerStreets() {
    /* Streets lay tu Geoserver */
    var layer, source1, vector1, feature, geometry;
    var coordinates = [[10, 20], [30, 40], [50, 60]]; // Tọa độ x = 10, y = 20
    // var point = new ol.geom.Point(coordinate);
    geometry = new ol.geom.LineString(coordinates);
    feature = new ol.Feature({
        geometry: geometry

    });
    source1 = new ol.source.Vector({
        features: [feature],
    });
    // var vectorSource_Streets = new ol.source.TileWMS({
    //     url: 'https://geoserver.ctu.edu.vn/geoserver/ctu/wfs',
    //     params: { 'LAYERS': 'ctu:local_streets' },
    //     serverType: 'geoserver'
    //   });
    vector1 = new ol.layer.Vector({
        source: source1,
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
    map.addLayer(vector1);
    $.ajax({
        type: "GET",
        url: url + "/streets",
        success: function (data) {
            // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
            var features = new ol.format.GeoJSON().readFeatures(JSON.stringify(data));
            source1.addFeatures(features);
            var coordinates;
            // Duyệt qua từng feature và lấy thông tin
            
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                var properties = feature.getProperties();
                var geometry = feature.getGeometry();
                coordinates = geometry.getCoordinates();

                // console.log(coordinates);
                // console.log(map.getLayers().getArray()[0].getSource().getFeatures());


                var layers = map.getLayers().getArray();
                var fea = layers[0].getSource().getFeatures();
                // for (var i = 0; i < features.length; i++) {
                    var geo = fea[i].getGeometry();
                    var coord = geo.getCoordinates();
                    // console.log(coord);
                    map.getLayers().getSource().getFeatures()[0].getGeometry().appendCoordinate(coordinates);
                // }            


                // Lưu thông tin vào một object
                // featureData = {
                //     name: properties.name,
                //     coordinates: geometry.getCoordinates()
                //     // Thêm các thuộc tính khác của feature nếu cần thiết
                // };

            }



        },
        error: function (xhr, status, error) {
            // Xử lý lỗi khi yêu cầu không thành công
            console.log("Error: " + error);
        }
    });
    /* Streets lay tu Geoserver */
    // var vectorSource_Streets = new ol.source.TileWMS({
    //     url: 'https://geoserver.ctu.edu.vn/geoserver/ctu/wfs',
    //     params: { 'LAYERS': 'ctu:local_streets' },
    //     serverType: 'geoserver'
    //   });
    //   var layer_Streets = new ol.layer.Tile({
    //     source: vectorSource_Streets,
    //     style: new ol.style.Style({
    //       stroke: new ol.style.Stroke({
    //         color: 'red',
    //         width: 1,
    //       }),
    //       fill: new ol.style.Fill({
    //         color: 'blue',
    //       }),
    //     }),
    //   });
}
function addLayerTrees() {
    /* Streets lay tu Geoserver */
    var layer, source, vector;
    source = new ol.source.Vector({});
    vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 3,
                fill: new ol.style.Fill({
                    color: 'green' // định nghĩa màu sắc của điểm
                })
            })
        }),
    });
    map.addLayer(vector);
    $.ajax({
        type: "GET",
        url: url + "/trees",
        success: function (data) {
            // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
            data.features.map((item) => {

                var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
                source.addFeatures(feature);
                // vector.getStyle().getText().setText(item.properties.name);
            })
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi khi yêu cầu không thành công
            console.log("Error: " + error);
        }
    });
}

function addLayerUnits() {
    /* Streets lay tu Geoserver */
    var layer, source2, vector2;
    source2 = new ol.source.Vector({});
    vector2 = new ol.layer.Vector({
        source: source2,
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
    map.addLayer(vector2);
    $.ajax({
        type: "GET",
        url: url + "/units",
        success: function (data) {
            // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
            data.features.map((item, idx) => {

                var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
                source2.addFeatures(feature);

                vector2.getStyle().getText().setText(item.properties.name);
            })
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi khi yêu cầu không thành công
            console.log("Error: " + error);
        }
    });
}
function addLayerUnitsText() {
    var layer, source, vector;
    source = new ol.source.Vector({});
    vector = new ol.layer.Vector({
        source: source,
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
    map.addLayer(vector);
    $.ajax({
        type: "GET",
        url: url + "/units",
        success: function (data) {
            // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
            data.features.map((item, idx) => {

                var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
                source.addFeatures(feature);

                vector.getStyle().getText().setText(item.properties.name);
            })
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi khi yêu cầu không thành công
            console.log("Error: " + error);
        }
    });
}
function addLayerRooms() {
    var layer, source, vector;
    source = new ol.source.Vector({});
    vector = new ol.layer.Vector({
        source: source,

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
    map.addLayer(vector);
    $.ajax({
        type: "GET",
        url: url + "/rooms",
        success: function (data) {
            // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
            data.features.map((item, idx) => {

                var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
                source.addFeatures(feature);
                vector.getStyle().getText().setText(item.properties.roomnamevi);
            })
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi khi yêu cầu không thành công
            console.log("Error: " + error);
        }
    });
}
function addLayerDormitory() {
    var layer, source, vector;

    source = new ol.source.Vector({});
    vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#02598C',
                width: 0.5,
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.1)',
            }),
        }),
    });
    map.addLayer(vector);
    $.ajax({
        type: "GET",
        url: url + "/dormitory",
        success: function (data) {
            // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
            data.features.map((item, idx) => {

                var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
                source.addFeatures(feature);
            })
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi khi yêu cầu không thành công
            console.log("Error: " + error);
        }
    });
}
function addLayerSportGround() {
    var layer, source, vector;

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
    $.ajax({
        type: "GET",
        url: url + "/sport-ground",
        success: function (data) {
            // Xử lý dữ liệu JSON để hiển thị các tính năng lên bản đồ của bạn
            data.features.map((item, idx) => {

                var feature = new ol.format.GeoJSON().readFeatures(JSON.stringify(item));
                source.addFeatures(feature);
            })
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi khi yêu cầu không thành công
            console.log("Error: " + error);
        }
    });
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
    addLayerStreets();
    addLayerUnits();
    addLayerUnitsText();

    // addLayerTrees();
    addLayerRooms();
    addLayerDormitory();

    addLayerSportGround();
    map.addLayer(layer_Marker());


    //     // Lấy layer cần lấy thông tin
    var layers = map.getLayers().getArray();
    var features = layers[0].getSource().getFeatures();

    //     // Duyệt qua từng feature và lấy thông tin
    //     for (var i = 0; i < layers.length; i++) {
    // var layer = layers[i];
    // var source = layer.getSource();
    // var sourceType = source.constructor.name; // Trả về tên kiểu đối tượng
    // var sourceFormat = source.getFormat();
    // // var sourceUrl = source.getUrls()[0];
    // // var sourceParams = source.getParams();

    // var style = layer.getStyle();
    // var styleFunction = layer.getStyleFunction();

    // var extent = layer.getExtent();
    // // var maxZoom = layer.getMaxZoom();
    // // var minZoom = layer.getMinZoom();
    // console.log(source);
    //     }

    // var features = map.getLayers().getArray().getSource().getFeatures();



    for (var i = 0; i < features.length; i++) {
        var geometry = features[i].getGeometry();
        var coordinates = geometry.getCoordinates();
        console.log(coordinates);
    }
    return map;
}
function checkRequestAccessLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            var pos = ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]);

            map.getView().setCenter(pos);
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
        });
    } else {
        alert('Your browser does not support geolocation.');
    }
}

$(document).ready(function () {
    map = createMap();
    checkRequestAccessLocation();
})
