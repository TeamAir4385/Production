function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doOpen(e) {
        var actionBar = e.source.activity.actionBar;
        if (actionBar) {
            actionBar.displayHomeAsUp = true;
            actionBar.onHomeIconItemSelected = function() {
                e.source.close();
            };
            e.source.activity.invalidateOptionsMenu();
        }
    }
    function clickedLogin() {
        Alloy.createController("login").getView();
    }
    function outputState() {
        Ti.API.info("Switch value: " + $.pushSwitch.value);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.settings = Ti.UI.createWindow({
        backgroundColor: "#222",
        color: "#fff",
        id: "settings",
        title: "Settings"
    });
    $.__views.settings && $.addTopLevelView($.__views.settings);
    doOpen ? $.__views.settings.addEventListener("open", doOpen) : __defers["$.__views.settings!open!doOpen"] = true;
    $.__views.Push = Ti.UI.createLabel({
        color: "#fff",
        top: "20",
        left: "10",
        id: "Push",
        text: "Push Notifications"
    });
    $.__views.settings.add($.__views.Push);
    $.__views.Login = Ti.UI.createLabel({
        color: "#fff",
        top: "110",
        left: "10",
        id: "Login",
        text: "Log In To your Account"
    });
    $.__views.settings.add($.__views.Login);
    $.__views.pushSwitch = Ti.UI.createSwitch({
        top: "10",
        right: "10",
        value: true,
        id: "pushSwitch"
    });
    $.__views.settings.add($.__views.pushSwitch);
    outputState ? $.__views.pushSwitch.addEventListener("change", outputState) : __defers["$.__views.pushSwitch!change!outputState"] = true;
    $.__views.loginButton = Ti.UI.createButton({
        top: "100",
        right: "10",
        id: "loginButton",
        color: "#fff",
        title: "Login"
    });
    $.__views.settings.add($.__views.loginButton);
    clickedLogin ? $.__views.loginButton.addEventListener("click", clickedLogin) : __defers["$.__views.loginButton!click!clickedLogin"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var pushSwitch = Ti.UI.createSwitch({
        value: true
    });
    pushSwitch.addEventListener("change", function() {
        Ti.API.info("Switch value: " + pushSwitch.value);
    });
    $.settings.open();
    __defers["$.__views.settings!open!doOpen"] && $.__views.settings.addEventListener("open", doOpen);
    __defers["$.__views.pushSwitch!change!outputState"] && $.__views.pushSwitch.addEventListener("change", outputState);
    __defers["$.__views.loginButton!click!clickedLogin"] && $.__views.loginButton.addEventListener("click", clickedLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;