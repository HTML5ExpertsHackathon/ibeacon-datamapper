package models;

import Lambda;
import haxe.Json;

class Person{
    private var _beaconMap: Map<String, BeaconData>;
    private var _id: String;

    public function new(id: String){
        _id = id;
        _beaconMap = new Map<String, BeaconData>();
    }

    public function setBeacon(beaconObj: Dynamic){
        try{
            var key = beaconObj.uuid + "-" + beaconObj.major + "-" + beaconObj.minor;
            var beacon: BeaconData =
            if(_beaconMap.exists(key)){
                var range = _getProximity(beaconObj.proximity);
                var beacon: BeaconData = _beaconMap.get(key);
                beacon.proximity = range;
                beacon.accuracy = beaconObj.accuracy;
                beacon.rssi = beaconObj.rssi;
                beacon;
            }else{
                var range = _getProximity(beaconObj.proximity);
                new BeaconData(beaconObj.uuid, range, beaconObj.major, beaconObj.minor, beaconObj.accuracy, beaconObj.rssi);
            }

            _beaconMap.set(key, beacon);
        } catch(msg: String){
            trace(msg);
        }
    }

    public function jsObject(): Dynamic{
        try{
            if(Lambda.count(_beaconMap) == 0) return {};
            var array = [];
            for(key in _beaconMap.keys()){
                var beacon: BeaconData = _beaconMap.get(key);
                if(beacon.proximity == Proximity.Lost) _beaconMap.remove(key);
                var obj = beacon.jsObject();
                if(obj != null) array.push(beacon.jsObject());
            }

            return {id: _id, data: array};
        } catch(msg: String){
            trace("catch error in person");
            trace(_id);
        }

        return null;
    }

    private function _getProximity(proxi: String): Proximity{
        var range: Proximity;
        if(proxi == "immediate") range = Proximity.Immediate;
        else if(proxi== "near") range = Proximity.Near;
        else if(proxi == "far") range = Proximity.Far;
        else range = Proximity.Unknown;

        return range;
    }
}