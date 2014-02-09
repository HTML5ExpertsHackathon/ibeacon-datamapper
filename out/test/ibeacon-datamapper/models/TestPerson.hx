package models;

import models.Person;
import utest.Assert;
import utest.Runner;
import utest.ui.Report;
import mockatoo.Mockatoo.*;
using mockatoo.Mockatoo;


class TestPerson{
    public function new(){}

    public function testCreate() {
        var person = new Person("hokaccha");
        Assert.isTrue(true);
    }

    public function testJsObject_case0(){
        var person = new Person("hokaccha");
        Assert.same(person.jsObject(), {});
    }

    public function testJsObject_case1(){
        var person = new Person("hokaccha");
        person.setBeacon({uuid: "proxi", proximity: "near", major: 0, minor: 0, accuracy: 0.0, rssi: -51});
        var jsObject = person.jsObject();
        var ansData = {
        id : "hokaccha",
        data : []};
        ansData.data.push({
        uuid: "proxi",
        proximity: "near",
        major : 0,
        minor : 0,
        accuracy : 0,
        rssi : -51
        });

        Assert.same(jsObject, ansData);
    }
}

