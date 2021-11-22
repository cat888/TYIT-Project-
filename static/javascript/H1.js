/*NOTE : This File Is NOt IN Working This Is For Reference*/

function readView(){
var panorama1 = new PANOLENS.ImagePanorama( 'static/img/H1/Hall.jpg' );
var panorama2 = new PANOLENS.ImagePanorama( 'static/img/H1/Bedroom.jpg' );
var panorama3 = new PANOLENS.ImagePanorama( 'static/img/H1/Kitchen.jpg' );
var panorama4 = new PANOLENS.ImagePanorama( 'static/img/H1/Bathroom.jpg' );

var panArr = [{'img':'Hall.jpg','type':'Hall','nameData':panorama1},
{'img':'Bedroom.jpg','type':'Bedroom','nameData':panorama2},
{'img':'Kitchen.jpg','type':'Kitchen','nameData':panorama3},
{'img':'Bathroom.jpg','type':'Bathroom','nameData':panorama4},];

/*
var infoSpot1 = [
{'positions':[5000.00, -441.44, -3513.45],'tooltipText':'This is Kitchen'},
{'positions':[5000.00, -40.27, -1250.06],'tooltipText':'This is Bedroom'},
{'positions':[5000.00, -403.92, 2189.83],'tooltipText':'This is Hall'}
];
var infoSpot2 = [
{'positions':[5000.00, 36.98, -3097.85],'tooltipText':'This is Bathroom'}
];

var panArr = [
{'img':'static/img/H1/Hall.jpg','type':'Hall','nameData':'panorama1','infoSpot': infoSpot1,'listOfLinks':[{'valType':'Bedroom','positions':[5000.00, -37.37, -1017.66]},{'valType':'Bathroom','positions':[5000.00, -107.27, -3420.77]}]},
{'img':'static/img/H1/Bedroom.jpg','type':'Bedroom','nameData':'panorama2','infoSpot': infoSpot2,'listOfLinks':[{'valType':'Kitchen','positions':[5000.00, 47.76, -2796.86]},{'valType':'Hall','positions':[-3143.38, -219.23, 5000.00]}]},
{'img':'static/img/H1/Kitchen.jpg','type':'Kitchen','nameData':'panorama3', 'infoSpot': null,'listOfLinks':[{'valType':'Kitchen','positions':[-248.18, 13.66, 5000.00]}]},
{'img':'static/img/H1/Bathroom.jpg','type':'Bathroom','nameData':'panorama4', 'infoSpot': null,'listOfLinks':[{'valType':'Hall','positions':[-654.07, 242.67, 5000.00]}]}
];
*/


const co1=document.querySelector("#co1");

var viewer = new PANOLENS.Viewer({
   co1 : co1,
   output:'console',
   });

   /***********************************************/
   var selectedTab = localStorage.getItem("selectedTab");

    if(selectedTab !== null ){
    updateView(panArr, selectedTab, viewer,panObjectArray);

    }else{
    defaultView(panArr, selectedTab, viewer);

    }
/*************************************************************************/

   const infospot1=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot1.position.set(5000.00, -441.44, -3513.45)
   infospot1.addHoverText('This is Kitchen',-400)
   panorama1.add(infospot1)

   const infospot2=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot2.position.set(5000.00, -40.27, -1250.06)
   infospot2.addHoverText('This is Bedroom',-400)
   panorama1.add(infospot2)

   const infospot3=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot3.position.set(5000.00, 36.98, -3097.85)
   infospot3.addHoverText('This is Bathroom',-400)
   panorama2.add(infospot3)

   const infospot4=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot4.position.set(5000.00, -403.92, 2189.83)
   infospot4.addHoverText('This is Hall',-400)
   panorama1.add(infospot4)

   panorama1.link( panorama2, new THREE.Vector3( 5000.00, -37.37, -1017.66) );
   panorama2.link( panorama3, new THREE.Vector3( 5000.00, 47.76, -2796.86) );
   panorama3.link( panorama2, new THREE.Vector3( -248.18, 13.66, 5000.00) );
   panorama2.link( panorama1, new THREE.Vector3( -3143.38, -219.23, 5000.00) );
   panorama1.link( panorama4, new THREE.Vector3( 5000.00, -107.27, -3420.77) );
   panorama4.link( panorama1, new THREE.Vector3( -654.07, 242.67, 5000.00) );

}
