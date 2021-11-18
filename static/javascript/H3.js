<<<<<<< HEAD
var panorama1 = new PANOLENS.ImagePanorama( 'static/img/H3/Hall.jpg' );
var panorama2 = new PANOLENS.ImagePanorama( 'static/img/H3/bedroom.jpg' );
var panorama3 = new PANOLENS.ImagePanorama( 'static/img/H3/bathroom.jpg' );
var panorama4 = new PANOLENS.ImagePanorama( 'static/img/H3/Kitchen.jpg' );
const col1=document.querySelector("#col1");
var viewer = new PANOLENS.Viewer({
   col1 : col1,
   output:'console',
   });
   viewer.add( panorama1 );
   viewer.add( panorama2 );
   viewer.add( panorama3 );
   viewer.add( panorama4 );
   
   const infospot1=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot1.position.set(5000.00, -266.57, -3148.08)
   infospot1.addHoverText('This is Kitchen',40)
   panorama1.add(infospot1)

   const infospot2=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot2.position.set(5000.00, 14.78, 335.11)
   infospot2.addHoverText('This is Bedroom',40)
   panorama1.add(infospot2)

   const infospot3=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot3.position.set(5000.00, -249.71, 4639.37)
   infospot3.addHoverText('This is Bathroom',40)
   panorama1.add(infospot3)

   const infospot4=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot4.position.set(5000.00, -319.85, 1974.94)
   infospot4.addHoverText('This is Hall',40)
   panorama1.add(infospot4)
   
   panorama1.link( panorama2, new THREE.Vector3( 5000.00, -48.62, 138.89) );
   panorama1.link( panorama3, new THREE.Vector3( 5000.00, -186.20, 4339.65) );
   panorama3.link( panorama1, new THREE.Vector3( -5000.00, 448.15, -3199.29) );
   panorama2.link( panorama1, new THREE.Vector3( -5000.00, -393.30, 2852.02) );
   panorama1.link( panorama4, new THREE.Vector3( 5000.00, -107.27, -3420.77) );
=======
var panorama1 = new PANOLENS.ImagePanorama( 'static/img/H3/Hall.jpg' );
var panorama2 = new PANOLENS.ImagePanorama( 'static/img/H3/bedroom.jpg' );
var panorama3 = new PANOLENS.ImagePanorama( 'static/img/H3/bathroom.jpg' );
var panorama4 = new PANOLENS.ImagePanorama( 'static/img/H3/Kitchen.jpg' );
const col1=document.querySelector("#col1");
var viewer = new PANOLENS.Viewer({
   col1 : col1,
   output:'console',
   });
   viewer.add( panorama1 );
   viewer.add( panorama2 );
   viewer.add( panorama3 );
   viewer.add( panorama4 );
   
   const infospot1=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot1.position.set(5000.00, -266.57, -3148.08)
   infospot1.addHoverText('This is Kitchen',40)
   panorama1.add(infospot1)

   const infospot2=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot2.position.set(5000.00, 14.78, 335.11)
   infospot2.addHoverText('This is Bedroom',40)
   panorama1.add(infospot2)

   const infospot3=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot3.position.set(5000.00, -249.71, 4639.37)
   infospot3.addHoverText('This is Bathroom',40)
   panorama1.add(infospot3)

   const infospot4=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot4.position.set(5000.00, -319.85, 1974.94)
   infospot4.addHoverText('This is Hall',40)
   panorama1.add(infospot4)
   
   panorama1.link( panorama2, new THREE.Vector3( 5000.00, -48.62, 138.89) );
   panorama1.link( panorama3, new THREE.Vector3( 5000.00, -186.20, 4339.65) );
   panorama3.link( panorama1, new THREE.Vector3( -5000.00, 448.15, -3199.29) );
   panorama2.link( panorama1, new THREE.Vector3( -5000.00, -393.30, 2852.02) );
   panorama1.link( panorama4, new THREE.Vector3( 5000.00, -107.27, -3420.77) );
>>>>>>> origin/main
   panorama4.link( panorama1, new THREE.Vector3( -1984.58, -442.67, -5000.00) );