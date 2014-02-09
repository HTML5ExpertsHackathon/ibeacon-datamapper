package models;

import models.Proximity;
import models.BeaconData;
import utest.Assert;
import utest.Runner;
import utest.ui.Report;
import mockatoo.Mockatoo.*;
using mockatoo.Mockatoo;


class TestBeaconData{
    public function new(){}

    public function testCreate() {
        var beacon = new BeaconData("proxi", Proximity.Near, 0, 0, 0.0, -50);
        Assert.same(beacon.uuid, "proxi");
        Assert.same(beacon.proximity, Proximity.Near);
        Assert.same(beacon.major, 0);
        Assert.same(beacon.minor, 0);
        Assert.same(beacon.accuracy, 0.0);
        Assert.same(beacon.rssi, -50);
    }

    public function testJSObj() {
        var beacon = new BeaconData("proxi", Proximity.Near, 0, 0, 0.0, -51);
        var obj = {uuid: "proxi", proximity: "near", major: 0, minor: 0, accuracy: 0.0, rssi: -51};
        Assert.same(beacon.jsObject(), obj);

        var beacon2 = new BeaconData("proxi", Proximity.Far, 0, 0, 0.0, -51);
        var obj2 = {uuid: "proxi", proximity: "far", major: 0, minor: 0, accuracy: 0.0, rssi: -51};
        Assert.same(beacon2.jsObject(), obj2);


        var beacon3 = new BeaconData("proxi", Proximity.Immediate, 0, 0, 0.0, -51);
        var obj3 = {uuid: "proxi", proximity: "immediate", major: 0, minor: 0, accuracy: 0.0, rssi: -51};
        Assert.same(beacon3.jsObject(), obj3);


        var beacon4 = new BeaconData("proxi", Proximity.Unknown, 0, 0, 0.0, -51);
        var obj4 = {uuid: "proxi", proximity: "unknown", major: 0, minor: 0, accuracy: 0.0, rssi: -51};
        Assert.same(beacon4.jsObject(), obj4);
    }
}

