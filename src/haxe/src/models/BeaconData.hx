package models;

import haxe.Timer;
class BeaconData{
    public var uuid(default, null): String;
    @:isVar public var proximity(get, set): Proximity;
    public var major(default, null): Int;
    public var minor(default, null): Int;
    public var accuracy: Float;
    public var rssi: Int;
    private var _isUnknown: Bool;

    public function new(uuid: String, proximity: Proximity, major: Int, minor: Int, accuracy: Float, rssi: Int){
        this.uuid = uuid;
        this.proximity = proximity;
        this.major = major;
        this.minor = minor;
        this.accuracy = accuracy;
        this.rssi = rssi;
        _isUnknown = false;
    }

    public function jsObject(): Dynamic{
        try{
            var rangeString = switch(proximity){
                case Proximity.Immediate: "immediate";
                case Proximity.Near: "near";
                case Proximity.Far: "far";
                case Proximity.Unknown: "unknown";
                case Proximity.Lost: "lost";
            }
            return {uuid: uuid, proximity: rangeString, major: major, minor: minor, accuracy: accuracy, rssi: rssi};
        } catch(msg: String){
            trace(msg);
            throw "catch error in beacondata";
        }

        return null;
    }

    public function get_proximity(): Proximity{
        return proximity;
    }

    public function set_proximity(proximity: Proximity): Proximity{
        if(proximity != Proximity.Unknown){
            this.proximity = proximity;
            return this.proximity;
        }

        _isUnknown = true;
        _checkUnknown(0);
        return this.proximity;
    }

    private function _checkUnknown(counter: Int){
        Timer.delay(function(){
            if(!_isUnknown) return;
            if(counter > 2){
                proximity = Proximity.Lost;
                return;
            }
            _checkUnknown(counter + 1);
        }, 500);
    }
}
