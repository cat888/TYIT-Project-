/*NOTE : This File Is NOt IN Working This Is For Reference*/

function readView(){
var panorama1 = new PANOLENS.ImagePanorama( 'static/img/H5/Hall.jpg' );
var panorama2 = new PANOLENS.ImagePanorama( 'static/img/H5/corridor.jpg' );
var panorama3 = new PANOLENS.ImagePanorama( 'static/img/H5/Bedroom.jpg' );
var panorama4 = new PANOLENS.ImagePanorama( 'static/img/H5/Kitchen.jpg' );
var panorama5 = new PANOLENS.ImagePanorama( 'static/img/H5/Bathroom.jpg' );
var panArr = [{'img':'Hall.jpg','type':'Hall','nameData':panorama1},
{'img':'corridor.jpg','type':'corridor','nameData':panorama2},
{'img':'Bedroom.jpg','type':'Bedroom','nameData':panorama3},
{'img':'Kitchen.jpg','type':'Kitchen','nameData':panorama4},
{'img':'Bathroom.jpg','type':'Bathroom','nameData':panorama5},];


/*
var infoSpot1 = [
{'positions':[5000.00, 37.81, -2117.77],'tooltipText':'This is Bathroom'},
{'positions':[5000.00, -295.58, 3602.28],'tooltipText':'This is Hall'},
{'positions':[5000.00, -123.31, 1106.94],'tooltipText':'This is corridor'}
];
var infoSpot2 = [
{'positions':[5000.00, -93.25, -905.81],'tooltipText':'This is Bedroom'},
{'positions':[5000.00, -245.67, 2606.59],'tooltipText':'This is Kitchen'},
{'positions':[-4315.56, -254.94, 5000.00],'tooltipText':'This is Hall'}
];


var panArr = [
{'img':'static/img/H5/Hall.jpg','type':'Hall','nameData':'panorama1','infoSpot': infoSpot1,'listOfLinks':[{'valType':'corridor','positions':[5000.00, 36.34, -2344.21]},{'valType':'Bathroom','positions':[5000.00, 125.70, 1097.26]}]},
{'img':'static/img/H5/corridor.jpg','type':'corridor','nameData':'panorama2','infoSpot': infoSpot2,'listOfLinks':[{'valType':'Bedroom','positions':[5000.00, -272.42, 2810.30]},{'valType':'Kitchen','positions':[5000.00, -80.44, -1101.98]}]},
{'img':'static/img/H5/Bedroom.jpg','type':'Bedroom','nameData':'panorama3', 'infoSpot': null,'listOfLinks':[{'valType':'corridor','positions':[-3785.68, -220.68, 5000.00]}]},
{'img':'static/img/H5/Kitchen.jpg','type':'Kitchen','nameData':'panorama4', 'infoSpot': null,'listOfLinks':[{'valType':'corridor','positions':[-5000.00, -396.32, 3803.19]}]},
{'img':'static/img/H5/Bathroom.jpg','type':'Bathroom','nameData':'panorama5', 'infoSpot': null,'listOfLinks':[{'valType':'Hall','positions':[-5000.00, -197.55, 1796.78]}]}
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
    updateView(panArr, selectedTab, viewer);

    }else{
    defaultView(panArr, selectedTab, viewer);

    }
/*************************************************************************/


   const infospot1=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot1.position.set(5000.00, 37.81, -2117.77)
   infospot1.addHoverText('This is Bathroom',40)
   panorama1.add(infospot1)

   const infospot2=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot2.position.set(5000.00, -93.25, -905.81)
   infospot2.addHoverText('This is Bedroom',40)
   panorama2.add(infospot2)

   const infospot3=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot3.position.set(5000.00, -245.67, 2606.59)
   infospot3.addHoverText('This is Kitchen',40)
   panorama2.add(infospot3)

   const infospot4=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot4.position.set(-4315.56, -254.94, 5000.00)
   infospot4.addHoverText('This is Hall',40)
   panorama2.add(infospot4)

   const infospot5=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot5.position.set(5000.00, -295.58, 3602.28)
   infospot5.addHoverText('This is Hall',40)
   panorama1.add(infospot5)

   const infospot6=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot6.position.set(5000.00, -123.31, 1106.94)
   infospot6.addHoverText('This is corridor',40)
   panorama1.add(infospot6)

   panorama1.link( panorama5, new THREE.Vector3(5000.00, 36.34, -2344.21) );
   panorama1.link( panorama2, new THREE.Vector3(5000.00, 125.70, 1097.26) );
   panorama5.link( panorama1, new THREE.Vector3(-5000.00, -197.55, 1796.78) );
   panorama2.link( panorama4, new THREE.Vector3( 5000.00, -272.42, 2810.30) );
   panorama2.link( panorama3, new THREE.Vector3( 5000.00, -80.44, -1101.98) );
   panorama4.link( panorama2, new THREE.Vector3( -5000.00, -396.32, 3803.19) );
   panorama3.link( panorama2, new THREE.Vector3( -3785.68, -220.68, 5000.00) );


}
