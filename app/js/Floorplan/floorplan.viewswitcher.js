window.addEventListener('load', function() {
    _viewswitcher.initialize();
});

class Floorplan_Viewswitcher {

    initialize() {
        
        this.views = [
            { viewId: "container", buttonId: "configureButton" }, 
            { viewId: "configurationId", buttonId: "viewerButton" }
        ];
        this.initializeEvents();
    }

    initializeEvents() {
        
        document.getElementById("configureButton").addEventListener("click", function(){
            _viewswitcher.switchToView("configurationId");
        });

        document.getElementById("viewerButton").addEventListener("click", function(){
            _viewswitcher.switchToView("container");
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

var _viewswitcher = new Floorplan_Viewswitcher();