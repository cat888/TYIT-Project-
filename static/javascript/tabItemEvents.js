var element = document.getElementsByClassName('tabItems');
for(var i=0;i<element.length;i++){
    element[i].addEventListener('click',function(evt){
        var selectedTab = evt.currentTarget.getAttribute("data-tab");
        var selectedView = evt.currentTarget.getAttribute("data-view");
        var someVarName = selectedTab;
        localStorage.setItem("selectedTab", someVarName);
        var viewPath= "http://localhost:5000/"+selectedView;
        location.replace(viewPath);
    });
}

