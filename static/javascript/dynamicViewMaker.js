function makeView(propertyData, view, isFirstPage) {

    var panObjectArray = [];
    var view = view;
    debugger
    for (var i = 0; i < propertyData.length; i++) {
        
          debugger
        var singlePanolensObj = {};
        singlePanolensObj['type'] = propertyData[i].type;
        // console.log(propertyData[i].img);
        // var img = propertyData[i].img;
        var img = document.createElement('img');
        img.src =propertyData[i].img;
        // document.body.appendChild(image);
        singlePanolensObj['object'] = new PANOLENS.ImagePanorama(img);
        panObjectArray[i] = singlePanolensObj;
        createDynamicTabs(propertyData[i].type, view);
    }

    tabEventInitilizer();
    const co1 = document.querySelector("#co1");

    var viewer = new PANOLENS.Viewer({
        co1: co1,
        output: 'console',
    });

    /*viewSequence Logic*/
    var selectedTab = localStorage.getItem("selectedTab");
    if (selectedTab !== null) {
        updateView(propertyData, selectedTab, viewer, panObjectArray);
    } else {
        defaultView(viewer, panObjectArray);
    }

    /*setInfoSpot Logic*/
    // for(var j=0;j<panArr.length;j++){
    //     if(panArr[j].infoSpot !== null ){
    //     var currentRoomPanObj = getPanObject(panArr[j].type, panObjectArray);
    //      var infoSpotArray = panArr[j].infoSpot;
    //      for(var k=0;k<infoSpotArray.length;k++){
    //         var positionArr = infoSpotArray[k].positions;
    //         var tooltipText = infoSpotArray[k].tooltipText;
    //         const tempSpot=new PANOLENS.Infospot(300,PANOLENS.DataImage.Info);
    //         tempSpot.position.set(positionArr[0], positionArr[1], positionArr[2]);
    //         tempSpot.addHoverText(tooltipText, isFirstPage ? -400 : 40);
    //         currentRoomPanObj.add(tempSpot);
    //      }
    //     }
    // }


    /*Linking logic*/
    // for(var v=0;v<panArr.length;v++){
    //     var currentRoomPanObj = getPanObject(panArr[v].type, panObjectArray);
    //     for(var u=0;u<panArr[v].listOfLinks.length;u++){

    //         var nearRoomPanObj = getPanObject(panArr[v].listOfLinks[u].valType, panObjectArray);
    //         var positions = panArr[v].listOfLinks[u].positions;

    //         currentRoomPanObj.link( nearRoomPanObj, new THREE.Vector3( positions[0], positions[1], positions[2]) );
    //     }
    // }
}
