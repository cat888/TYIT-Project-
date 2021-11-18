var panorama1 = new PANOLENS.ImagePanorama( 'static/img/H1/Hall.jpg' );
var panorama2 = new PANOLENS.ImagePanorama( 'static/img/H1/bedroom.jpg' );
var panorama3 = new PANOLENS.ImagePanorama( 'static/img/H1/bathroom.jpg' );
var panorama4 = new PANOLENS.ImagePanorama( 'static/img/H1/Kitchen.jpg' );
const co1=document.querySelector("#co1");
var viewer = new PANOLENS.Viewer({
   co1 : co1,
   output:'console',
   });
   viewer.add( panorama1 );
   viewer.add( panorama2 );
   viewer.add( panorama3 );
   viewer.add( panorama4 );

   const infospot1=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot1.position.set(5000.00, -441.44, -3513.45)
   infospot1.addHoverText('This is Kitchen',-400)
   panorama1.add(infospot1)

   const infospot2=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot2.position.set(5000.00, -40.27, -1250.06)
   infospot2.addHoverText('This is Bedroom',40)
   panorama1.add(infospot2)

   const infospot3=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot3.position.set(5000.00, 36.98, -3097.85)
   infospot3.addHoverText('This is Bathroom',40)
   panorama2.add(infospot3)

   const infospot4=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info)
   infospot4.position.set(5000.00, -403.92, 2189.83)
   infospot4.addHoverText('This is Hall',40)
   panorama1.add(infospot4)

   panorama1.link( panorama2, new THREE.Vector3( 5000.00, -37.37, -1017.66) );
   panorama2.link( panorama3, new THREE.Vector3( 5000.00, 47.76, -2796.86) );
   panorama3.link( panorama2, new THREE.Vector3( -248.18, 13.66, 5000.00) );
   panorama2.link( panorama1, new THREE.Vector3( -3143.38, -219.23, 5000.00) );
   panorama1.link( panorama4, new THREE.Vector3( 5000.00, -107.27, -3420.77) );
   panorama4.link( panorama1, new THREE.Vector3( -654.07, 242.67, 5000.00) );
