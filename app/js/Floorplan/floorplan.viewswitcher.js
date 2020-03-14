window.addEventListener('load', function() {
    _viewswitcher.initialize();
});

class Floorplan_Viewswitcher {

    initialize() {
        
        this.views = [
            { viewId: "configurationView", buttonId: "configureButton" }, 
            { viewId: "floorplanView", buttonId: "viewerButton" }
        ];
        this.initializeEvents();

        this.switchToView("floorplanView");
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