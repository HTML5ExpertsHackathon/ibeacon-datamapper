package controllers;

import haxe.Timer;
import haxe.Json;
import models.Person;

class MainController{
    private var _personMap: Map<String, Person>;
    public var callback: Dynamic->Void;

    public function new(){
        callback = null;
        _personMap = new Map<String, Person>();
        _sendPersons()();
    }

    public function recieveMessage(message: String){
        var beaconObj = Json.parse(message);
        if(_personMap.exists(beaconObj.id)){
            var person = cast(_personMap.get(beaconObj.id), Person);
            person.setBeacon(beaconObj);
        } else{
            var person = new Person(beaconObj.id);
            person.setBeacon(beaconObj);
            _personMap.set(beaconObj.id, person);
        }
    }

    private function _sendPersons(): Void->Void{
        function send(){
            Timer.delay(function(){
                var array = [];
                for(key in _personMap.keys()){
                    var person = cast(_personMap.get(key), Person);
                    array.push(person.jsObject());
                }

                if(callback != null) callback(array);
                send();
            }, 500);
        }

        return send;
    }
}