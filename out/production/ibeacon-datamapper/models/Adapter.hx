package models;

import controllers.MainController;
import controllers.MainController;

class Adapter{
    @:isVar public var callback(get, set): Dynamic->Void;
    private var _mainController: MainController;

    public function new(){
        _mainController = new MainController();
        callback = null;
        var socketManager = new SocketManager('http://html5-export-hackathon-ibeacon.herokuapp.com/');
        socketManager.addListener(_mainController.recieveMessage);
    }

    public function get_callback(): Dynamic->Void{
        return callback;
    }

    public function set_callback(callback: Dynamic->Void){
        this.callback = callback;
        _mainController.callback = this.callback;
        return callback;
    }
}
