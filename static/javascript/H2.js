var panorama1 = new PANOLENS.ImagePanorama( 'static/img/H2/Hall.jpg' );
var panorama2 = new PANOLENS.ImagePanorama( 'static/img/H2/Bedroom1.jpg' );
var panorama3 = new PANOLENS.ImagePanorama( 'static/img/H2/Bedroom2.jpg' );
var panorama4 = new PANOLENS.ImagePanorama( 'static/img/H2/Kitchen.jpg' );
var panorama5 = new PANOLENS.ImagePanorama( 'static/img/H2/Bathroom.jpg' );
const col1=document.querySelector("#col1");
var viewer = new PANOLENS.Viewer({
   col1 : col1,
   output:'console',
   });
   viewer.add( panorama1 );
   viewer.add( panorama2 );
   viewer.add( panorama3 );
   viewer.add( panorama4 );
   viewer.add( panorama5 );
   
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

   panorama1.link( panorama2, new THREE.Vector3( 5000.00, 243.22, -3805.31) );
   panorama1.link( panorama3, new THREE.Vector3(5000.00, 170.16, -1962.77) );
   panorama1.link( panorama5, new THREE.Vector3( 5000.00, -9.27, 2223.96) );
   panorama1.link( panorama4, new THREE.Vector3( 3357.18, -191.23, 5000.00) );
   panorama4.link( panorama1, new THREE.Vector3( -5000.00, -540.70, -1960.85) );
   panorama3.link( panorama1, new THREE.Vector3( 1943.53, 300.48, 5000.00) );
   panorama2.link( panorama1, new THREE.Vector3( -5000.00, -927.36, -3278.56) );
   panorama5.link( panorama1, new THREE.Vector3( 1126.45, 2072.50, 5000.00) );
