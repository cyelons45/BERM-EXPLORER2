require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/tasks/QueryTask", 
    "esri/tasks/support/Query"
  ], function(Map, MapView, FeatureLayer, GraphicsLayer, Graphic,QueryTask, Query) {
  
  var map = new Map({
    basemap: "satellite"
  });
  
  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.71511, 34.09042], // longitude, latitude
    zoom: 11
  });
  
  var trailheadsLayer = new FeatureLayer({
    url:  "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
  });
  
  map.add(trailheadsLayer);
  // console.log(trailheadsLayer )
  
  
  
  var graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);
  
  function addGraphics(result) {
      graphicsLayer.removeAll();
      result.features.forEach(function(feature){
        var g = new Graphic({
          geometry: feature.geometry,
          attributes: feature.attributes,
          symbol: {
           type: "simple-line",
            color: [0, 255, 255],
            outline: {
             width: 9,
             color: [0, 255, 255],
           },
            // size: "20px"
            width: 9,
          },
          popupTemplate: {
           title: "{TRL_NAME}",
          //  content: "This a {PARK_NAME} trail located in {CITY_JUR}."
          }
        });
        graphicsLayer.add(g);
        view.goTo(g)
      });
    }
  
  
    // ------------------------------------------------------------------------------------------------------------------------
    // var pointUrl = "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0";
    // var queryTask = new QueryTask({
    //   url: pointUrl 
    // });
    // var sql = "TRL_NAME like '%Canyon%'";
    // var query = new Query();
    // query.returnGeometry = true;
    // query.outFields = ["*"];
    // query.where =sql
    // queryTask.execute(query).then(function(results){
    //   // addGraphics(results)
    //   console.log(results);
  
    // });
  
  // -----------------------------------------------------------------------------------------------------------------
  
  
  
  
  
  
  
  
  
  let t=document.querySelector('.nav').addEventListener('click',function(e){
    let list=e.target.closest('.b-list')
    let down=e.target.closest('.b-down')
    let print=e.target.closest('#print')
    if(list){
      // var pointUrl = "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0";
      var pointUrl = "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0";
    var queryTask = new QueryTask({
      url: pointUrl 
    });
   
    // console.log(queryTask)
    var query = new Query();
    query.returnGeometry = true;
    query.outFields = ["*"];
  
    query.where = `TRL_NAME ='${list.innerHTML}'`;
  
  
    queryTask.execute(query).then(function(results){
      addGraphics(results)
      console.log(results);
    
    
  
   
    });
  
  
  
      console.log(list.innerHTML)
    }else if(down){
      console.log(down.innerHTML)
    }else if(print){
        let chrt=document.getElementById('toggle-chart').classList.toggle('close-chart')
      
        // console.log(chrt)

    }
   
   
  })
  
  
  
  });