window.addEventListener('load', function() {
    _viewswitcher.initialize();
});

class Floorplanner_Viewswitcher {

    initialize() {
        
        this.views = [
            { viewId: "container", buttonId: "" }, 
            { viewId: "configurationId", buttonId: "" }
        ];
        this.initializeEvents();
    }

    initializeEvents() {
        
        document.getElementById("configureButton").addEventListener("click", function(){
            _viewswitcher.switchToView("configurationId");
        });
    }

    switchToView(viewId) {
        this.viewId = viewId;
        
        _viewswitcher.hideAllViews();
        _viewswitcher.showView(viewId);
    }

    get activeView() {
        return this.viewId;
    }

    hideAllViews() {      
        this.views.forEach(v => $("#" + v.viewId).hide());
    }

    showView(viewId) {
        $("#" + viewId).show();
    }
}

var _viewswitcher = new Floorplanner_Viewswitcher();