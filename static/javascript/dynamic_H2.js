/*NOTE : This File Is NOt IN Working This Is For Reference*/


function readView(panArr){

var panObjectArray=[];
for(var i=0;i<panArr.length;i++){
    var singlePanolensObj = {};
    singlePanolensObj['type'] = panArr[i].type;
    singlePanolensObj['object'] = new PANOLENS.ImagePanorama(panArr[i].img);
    panObjectArray[i] = singlePanolensObj;

    //panObjectArray[i] = new PANOLENS.ImagePanorama(panArr[i].img);
}
/*var panorama1 = new PANOLENS.ImagePanorama( 'static/img/H2/Hall.jpg' );
var panorama2 = new PANOLENS.ImagePanorama( 'static/img/H2/Bedroom1.jpg' );
var panorama3 = new PANOLENS.ImagePanorama( 'static/img/H2/Bedroom2.jpg' );
var panorama4 = new PANOLENS.ImagePanorama( 'static/img/H2/Kitchen.jpg' );
var panorama5 = new PANOLENS.ImagePanorama( 'static/img/H2/Bathroom.jpg' );*/

/*var infoSpot = [
{'positions':[5000.00, -20.93, -3744.66],'tooltipText':'This is Bedroom1'},
{'positions':[5000.00, -28.71, -1972.63],'tooltipText':'This is Bedroom2'},
{'positions':[5000.00, 151.49, 2233.04],'tooltipText':'This is Bathroom'},
{'positions':[3331.10, -444.93, 5000.00],'tooltipText':'This is Kitchen'},
{'positions':[5000.00, 126.98, 694.91],'tooltipText':'This is Hall'}
];
var linkButtonSpot = [
{'currentLinkType':'Hall', 'listOfLinks':[{'valType':'Bedroom1','positions':[5000.00, 243.22, -3805.31]}, {'valType':'Bedroom2','positions':[5000.00, 170.16, -1962.77]},{'valType':'Kitchen','positions':[3357.18, -191.23, 5000.00]},{'valType':'Bathroom','positions':[5000.00, -9.27, 2223.96]}]},
{'currentLinkType':'Kitchen', 'listOfLinks':[{'valType':'Hall','positions':[5000.00, 243.22, -3805.31]}]},
{'currentLinkType':'Bedroom2', 'listOfLinks':[{'valType':'Hall','positions':[1943.53, 300.48, 5000.00]}]},
{'currentLinkType':'Bedroom1', 'listOfLinks':[{'valType':'Hall','positions':[-5000.00, -927.36, -3278.56]}]},
{'currentLinkType':'Bathroom', 'listOfLinks':[{'valType':'Hall','positions':[1126.45, 2072.50, 5000.00]}]},
]

var panArr = [
{'img':'static/img/H2/Hall.jpg','type':'Hall','nameData':'panorama1','infoSpot': infoSpot,'listOfLinks':[{'valType':'Bedroom1','positions':[5000.00, 243.22, -3805.31]}, {'valType':'Bedroom2','positions':[5000.00, 170.16, -1962.77]},{'valType':'Kitchen','positions':[3357.18, -191.23, 5000.00]},{'valType':'Bathroom','positions':[5000.00, -9.27, 2223.96]}]},
{'img':'static/img/H2/Bedroom1.jpg','type':'Bedroom1','nameData':'panorama2','infoSpot': null,'listOfLinks':[{'valType':'Hall','positions':[-5000.00, -927.36, -3278.56]}]},
{'img':'static/img/H2/Bedroom2.jpg','type':'Bedroom2','nameData':'panorama3', 'infoSpot': null,'listOfLinks':[{'valType':'Hall','positions':[1943.53, 300.48, 5000.00]}]},
{'img':'static/img/H2/Kitchen.jpg','type':'Kitchen','nameData':'panorama4', 'infoSpot': null,'listOfLinks':[{'valType':'Hall','positions':[5000.00, 243.22, -3805.31]}]},
{'img':'static/img/H2/Bathroom.jpg','type':'Bathroom','nameData':'panorama5', 'infoSpot': null,'listOfLinks':[{'valType':'Hall','positions':[1126.45, 2072.50, 5000.00]}]}
];*/

const co1=document.querySelector("#co1");

var viewer = new PANOLENS.Viewer({
   co1 : co1,
   output:'console',
   });

/***********************************************/
   var selectedTab = localStorage.getItem("selectedTab");
debugger
    if(selectedTab !== null ){
    updateView(panArr, selectedTab, viewer,panObjectArray);
    }else{
    defaultView(viewer,panObjectArray);
    }
/*************************************************************************/
for(var j=0;j<panArr.length;j++){
    if(panArr[j].infoSpot !== null ){
     var infoSpotArray = panArr[j].infoSpot;
     for(var k=0;k<infoSpotArray.length;k++){
        var positionArr = infoSpotArray[k].positions;
        var tooltipText = infoSpotArray[k].tooltipText;
        const tempSpot=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info);
        tempSpot.position.set(positionArr[0], positionArr[1], positionArr[2]);
        tempSpot.addHoverText(tooltipText,40);
        panObjectArray[0]['object'].add(tempSpot);
     }
    }
}

/*
   const infospot1=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot1.position.set(5000.00, -20.93, -3744.66)
   infospot1.addHoverText('This is Bedroom1',40)
   panorama1.add(infospot1)

   const infospot2=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot2.position.set(5000.00, -28.71, -1972.63)
   infospot2.addHoverText('This is Bedroom2',40)
   panorama1.add(infospot2)

   const infospot3=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot3.position.set(5000.00, 151.49, 2233.04)
   infospot3.addHoverText('This is Bathroom',40)
   panorama1.add(infospot3)

   const infospot4=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot4.position.set(3331.10, -444.93, 5000.00)
   infospot4.addHoverText('This is Kitchen',40)
   panorama1.add(infospot4)

   const infospot5=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot5.position.set(5000.00, 126.98, 694.91)
   infospot5.addHoverText('This is Hall',40)
   panorama1.add(infospot5)
*/

    for(var v=0;v<panArr.length;v++){
        var currentRoomPanObj = getPanObject(panArr[v].type, panObjectArray);
        for(var u=0;u<panArr[v].listOfLinks.length;u++){
            debugger
            var nearRoomPanObj = getPanObject(panArr[v].listOfLinks[u].valType, panObjectArray);
            var positions = panArr[v].listOfLinks[u].positions;

            currentRoomPanObj.link( nearRoomPanObj, new THREE.Vector3( positions[0], positions[1], positions[2]) );
        }
    }

   /*panObjectArray[0]['object'].link( panObjectArray[1]['object'], new THREE.Vector3( 5000.00, 243.22, -3805.31) );
   panObjectArray[0]['object'].link( panObjectArray[2]['object'], new THREE.Vector3(5000.00, 170.16, -1962.77) );
   panObjectArray[0]['object'].link( panObjectArray[4]['object'], new THREE.Vector3( 5000.00, -9.27, 2223.96) );
   panObjectArray[0]['object'].link( panObjectArray[3]['object'], new THREE.Vector3( 3357.18, -191.23, 5000.00) );
   panObjectArray[3]['object'].link( panObjectArray[0]['object'], new THREE.Vector3( -5000.00, -540.70, -1960.85) );
   panObjectArray[2]['object'].link( panObjectArray[0]['object'], new THREE.Vector3( 1943.53, 300.48, 5000.00) );
   panObjectArray[1]['object'].link( panObjectArray[0]['object'], new THREE.Vector3( -5000.00, -927.36, -3278.56) );
   panObjectArray[4]['object'].link( panObjectArray[0]['object'], new THREE.Vector3( 1126.45, 2072.50, 5000.00) );
*/
   /*panorama1.link( panorama2, new THREE.Vector3( 5000.00, 243.22, -3805.31) );
   panorama1.link( panorama3, new THREE.Vector3(5000.00, 170.16, -1962.77) );
   panorama1.link( panorama5, new THREE.Vector3( 5000.00, -9.27, 2223.96) );
   panorama1.link( panorama4, new THREE.Vector3( 3357.18, -191.23, 5000.00) );
   panorama4.link( panorama1, new THREE.Vector3( -5000.00, -540.70, -1960.85) );
   panorama3.link( panorama1, new THREE.Vector3( 1943.53, 300.48, 5000.00) );
   panorama2.link( panorama1, new THREE.Vector3( -5000.00, -927.36, -3278.56) );
   panorama5.link( panorama1, new THREE.Vector3( 1126.45, 2072.50, 5000.00) );
*/
}
