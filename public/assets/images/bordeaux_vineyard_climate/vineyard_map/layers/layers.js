var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'type': 'base',
            'opacity': 0.5,
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var lyr_diff_1 = new ol.layer.Image({
                            opacity: 1,
                            title: "diff",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/diff_1.png",
    attributions: ' ',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [-4342438.596709, 3009960.558880, 5300353.389546, 9249457.781049]
                            })
                        });

lyr_OpenStreetMap_0.setVisible(true);lyr_diff_1.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_diff_1];
