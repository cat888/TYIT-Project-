    /*This Function Set the Object sequence After Changing Tab */
    function updateView(panArr, selectedTab, viewer,panObjectArray){
            var selectedIndex;
            var isSelected = false;
            for(var i=0; i<panObjectArray.length; i++){
                if(selectedTab === panObjectArray[i].type){
                    viewer.add(panObjectArray[i].object);
                    selectedIndex = i;
                    isSelected = true;
                    break;
                }
            }
            if(isSelected){
                for(var j=0; j<panObjectArray.length; j++){
                    if(selectedIndex !== j){
                        viewer.add(panObjectArray[j].object);
                    }
                }
            }else{
                defaultView(viewer,panObjectArray);
            }
    }

    /*This Function Set the Object sequence default */
    function defaultView(viewer,panObjectArray){
        for(var i=0; i<panObjectArray.length; i++){
           viewer.add(panObjectArray[i].object);
        }
    }

    /*This Function Can Get Object on Type*/
    function getPanObject(type,panObjectArray){
        for(var i=0; i<panObjectArray.length; i++){
                if(type === panObjectArray[i].type){
                    return panObjectArray[i].object;
                }
        }
    }