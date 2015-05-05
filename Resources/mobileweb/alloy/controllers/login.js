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
    function doLoginBtnClicked() {
        var user = Alloy.createModel("User");
        user.login($.email.value, $.password.value, userActionResponseHandler);
    }
    function userActionResponseHandler(_resp) {
        if (true === _resp.success) {
            alert("You have successfully logged in.");
            $.loginText.text = _resp.model.id;
        } else alert("Error logging in. Please try again.", _resp.error.message);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
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
    $.__views.login = Ti.UI.createWindow({
        backgroundColor: "#222",
        id: "login",
        title: "Login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    doOpen ? $.__views.login.addEventListener("open", doOpen) : __defers["$.__views.login!open!doOpen"] = true;
    $.__views.loginText = Ti.UI.createLabel({
        text: "Login Text Goes Here For the App",
        font: {
            fontSize: "24dp",
            fontWeight: "bold"
        },
        id: "loginText"
    });
    $.__views.login.add($.__views.loginText);
    $.__views.lvContainer = Ti.UI.createView({
        top: "20dp",
        width: "280dp",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderColor: "orange",
        borderWidth: 0,
        id: "lvContainer"
    });
    $.__views.login.add($.__views.lvContainer);
    $.__views.email = Ti.UI.createTextField({
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        autocorrect: false,
        top: "6dp",
        left: "4dp",
        bottom: "2dp",
        right: "4dp",
        paddingLeft: "4dp",
        backgroundColor: "#fff",
        color: "#000",
        width: "260dp",
        height: "40dp",
        border: 1,
        borderColor: "#000",
        id: "email",
        hintText: "Email"
    });
    $.__views.lvContainer.add($.__views.email);
    $.__views.password = Ti.UI.createTextField({
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
        autocorrect: false,
        top: "6dp",
        left: "4dp",
        bottom: "2dp",
        right: "4dp",
        paddingLeft: "4dp",
        backgroundColor: "#fff",
        color: "#000",
        width: "260dp",
        height: "40dp",
        border: 1,
        borderColor: "#000",
        id: "password",
        hintText: "Password",
        passwordMask: "true"
    });
    $.__views.lvContainer.add($.__views.password);
    $.__views.__alloyId3 = Ti.UI.createView({
        top: "10dp",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId3"
    });
    $.__views.lvContainer.add($.__views.__alloyId3);
    $.__views.doLoginBtn = Ti.UI.createButton({
        id: "doLoginBtn",
        color: "#fff",
        title: "Login"
    });
    $.__views.__alloyId3.add($.__views.doLoginBtn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.doLoginBtn.addEventListener("click", doLoginBtnClicked);
    $.login.open();
    __defers["$.__views.login!open!doOpen"] && $.__views.login.addEventListener("open", doOpen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;