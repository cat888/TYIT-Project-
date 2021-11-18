var panorama1 = new PANOLENS.ImagePanorama( 'static/img/H4/Hall.jpg' );
var panorama2 = new PANOLENS.ImagePanorama( 'static/img/H4/Bedroom1.jpg' );
var panorama3 = new PANOLENS.ImagePanorama( 'static/img/H4/Bedroom2.jpg' );
var panorama4 = new PANOLENS.ImagePanorama( 'static/img/H4/Kitchen.jpg' );
var panorama5 = new PANOLENS.ImagePanorama( 'static/img/H4/Bathroom.jpg' );
var panorama6 = new PANOLENS.ImagePanorama( 'static/img/H4/corridor.jpg' );
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
   viewer.add( panorama6 );
   
   const infospot1=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot1.position.set(5000.00, -441.44, -3513.45)
   infospot1.addHoverText('This is Corridor',40)
   panorama1.add(infospot1)

   const infospot2=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot2.position.set(-251.94, -906.64, -5000.00)
   infospot2.addHoverText('This is Kitchen',40)
   panorama6.add(infospot2)

   const infospot3=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot3.position.set(5000.00, -212.82, -2515.90)
   infospot3.addHoverText('This is Bedroom1',40)
   panorama6.add(infospot3)

   const infospot4=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot4.position.set(5000.00, -377.82, 63.44)
   infospot4.addHoverText('This is Bedroom2',40)
   panorama6.add(infospot4)

   const infospot5=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot5.position.set(5000.00, -271.35, 3228.12)
   infospot5.addHoverText('This is Bathroom',40)
   panorama6.add(infospot5)

   const infospot6=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot6.position.set(5000.00, -134.80, 1346.44)
   infospot6.addHoverText('This is Hall',40)
   panorama1.add(infospot6)

   const infospot7=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot7.position.set(-489.94, -334.80, 5000.00)
   infospot7.addHoverText('This is Hall',40)
   panorama6.add(infospot7)

   
   panorama1.link( panorama6, new THREE.Vector3( 5000.00, -169.19, -3500.33) );
   panorama6.link( panorama2, new THREE.Vector3(5000.00, 32.03, -2783.15) );
   panorama6.link( panorama3, new THREE.Vector3(5000.00, -133.31, 19.58) );
   panorama6.link( panorama5, new THREE.Vector3(5000.00, -252.43, 2926.40) );
   panorama6.link( panorama4, new THREE.Vector3( -10.17, -895.18, -5000.00) );
   panorama4.link( panorama6, new THREE.Vector3(  -5000.00, -1045.47, 1654.71) );
   panorama2.link( panorama6, new THREE.Vector3( -2810.80, -925.02, 5000.00) );
   panorama3.link( panorama6, new THREE.Vector3(-1607.67, -231.73, 5000.00) );
   panorama5.link( panorama6, new THREE.Vector3(-5000.00, 65.59, 2983.38) );
   panorama6.link( panorama1, new THREE.Vector3(-789.89, -418.70, 5000.00) );
   
   