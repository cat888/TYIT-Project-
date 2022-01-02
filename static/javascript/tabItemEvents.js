
//initilize events for tabs

function tabEventInitilizer(){
    var element = document.getElementsByClassName('tabItems');
    for(var i=0;i<element.length;i++){
        element[i].addEventListener('click',function(evt){
            var selectedTab = evt.currentTarget.getAttribute("data-tab");
            var selectedView = evt.currentTarget.getAttribute("data-view");
            var someVarName = selectedTab;
            localStorage.setItem("selectedTab", someVarName);
            var viewPath= "/"+selectedView;
            location.replace(viewPath);
        });
    }
}

function createDynamicTabs(type, view){
    if (view != null)
    {
        $(".sidebar ul").append('<li><a class="tabItems" data-tab="' + type + '" data-view="' + view + '">' + type + '</a></li>');
    }
    else {
        $(".sidebar ul").append('<li><a class="tabItems" data-tab="' + type + '" data-view=view3">' + type + '</a></li>')
    }
}