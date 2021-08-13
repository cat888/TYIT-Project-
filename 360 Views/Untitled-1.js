var panorama1 = new PANOLENS.ImagePanorama( 'H1/sphere.jpg' );
var panorama2 = new PANOLENS.ImagePanorama( 'H1/bedroom/sphere.jpg' );
var panorama3 = new PANOLENS.ImagePanorama( 'H1/bathroom/sphere.jpg' );
var panorama4 = new PANOLENS.ImagePanorama( 'H1/Kitchen/sphere.jpg' );
const container=document.querySelector("#container");
var viewer = new PANOLENS.Viewer({
   container : container,
   output:'console',
   });
   viewer.add( panorama1 );
   viewer.add( panorama2 );
   viewer.add( panorama3 );
   viewer.add( panorama4 );


   panorama1.link( panorama2, new THREE.Vector3( 5000.00, -37.37, -1017.66) );
   panorama2.link( panorama3, new THREE.Vector3( 5000.00, 47.76, -2796.86) );
   panorama3.link( panorama2, new THREE.Vector3( -248.18, 13.66, 5000.00) );
   panorama2.link( panorama1, new THREE.Vector3( -3143.38, -219.23, 5000.00) );
   panorama1.link( panorama4, new THREE.Vector3( 5000.00, -107.27, -3420.77) );
   panorama4.link( panorama1, new THREE.Vector3( -654.07, 242.67, 5000.00) );