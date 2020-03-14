window.addEventListener('load', function() {
    _viewswitcher.initialize();
});

class Floorplan_Viewswitcher {

    initialize() {
        
        this.views = [
            { viewId: "config_View", buttonId: "floorplan_ConfigureButton" }, 
            { viewId: "floorplan_View", buttonId: "config_ViewButton" }
        ];
        this.initializeEvents();

        this.switchToView("floorplan_View");
    }

    initializeEvents() {       
        this.views.forEach(view => {
            $("#" + view.buttonId).click(function(){
                _viewswitcher.switchToView(view.viewId);
            });
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