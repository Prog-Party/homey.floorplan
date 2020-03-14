window.addEventListener('load', function() {
    _viewswitcher.initialize();
});

class Floorplan_Viewswitcher {

    initialize() {
        
        this.views = [ 
            { id: 1, viewId: "floorplan_View", buttonId: "floorplan_Button", buttonsToShow: [2] },
            { id: 2, viewId: "config_View", buttonId: "config_Button", buttonsToShow: [1, 3, 4] },
            { id: 3, viewId: "configfloor_View", buttonId: "configfloor_Button", buttonsToShow: [2] },
            { id: 4, viewId: "configdevice_View", buttonId: "configdevice_Button", buttonsToShow: [2] }
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
        
        this.hideAllViews();
        this.showView(viewId);
    }

    get activeView() {
        return this.viewId;
    }

    hideAllViews() {      
        this.views.forEach(v => $("#" + v.viewId).hide());
    }

    showView(viewId) {
        var allViews = this.views;
        var view = allViews.filter(v => v.viewId == viewId)[0];
        
        // Show the current view
        $("#" + viewId).show();

        //hide all the buttons
        allViews.forEach(v => $("#" + v.buttonId).hide());

        //show the buttons that belong to the current view
        view.buttonsToShow.forEach(id => $("#" + allViews.filter(v => v.id == id)[0].buttonId).show());        
    }
}

var _viewswitcher = new Floorplan_Viewswitcher();