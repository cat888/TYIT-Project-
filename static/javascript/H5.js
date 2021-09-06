var panorama1 = new PANOLENS.ImagePanorama( 'static/img/H5/Hall.jpg' );
var panorama2 = new PANOLENS.ImagePanorama( 'static/img/H5/corridor.jpg' );
var panorama3 = new PANOLENS.ImagePanorama( 'static/img/H5/Bedroom.jpg' );
var panorama4 = new PANOLENS.ImagePanorama( 'static/img/H5/Kitchen.jpg' );
var panorama5 = new PANOLENS.ImagePanorama( 'static/img/H5/Bathroom.jpg' );
const container=document.querySelector("#container");
var viewer = new PANOLENS.Viewer({
   container : container,
   output:'console',
   });
   viewer.add( panorama1 );
   viewer.add( panorama2 );
   viewer.add( panorama3 );
   viewer.add( panorama4 );
   viewer.add( panorama5 );
   
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
   
    