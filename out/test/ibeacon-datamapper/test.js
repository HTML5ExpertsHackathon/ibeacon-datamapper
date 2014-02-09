(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function() { }
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,r: null
	,__class__: EReg
}
var HxOverrides = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,length: null
	,q: null
	,h: null
	,__class__: List
}
var _Map = {}
_Map.Map_Impl_ = function() { }
_Map.Map_Impl_.__name__ = ["_Map","Map_Impl_"];
var IMap = function() { }
IMap.__name__ = ["IMap"];
IMap.prototype = {
	keys: null
	,get: null
	,__class__: IMap
}
var Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = function() { }
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,__class__: StringBuf
}
var StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	return quotes?s.split("\"").join("&quot;").split("'").join("&#039;"):s;
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
var TestMain = function() { }
TestMain.__name__ = ["TestMain"];
TestMain.main = function() {
	var runner = new utest.Runner();
	runner.addCase(new models.TestBeaconData());
	runner.addCase(new models.TestPerson());
	utest.ui.Report.create(runner);
	runner.run();
}
var ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
var XmlType = { __ename__ : ["XmlType"], __constructs__ : [] }
var Xml = function() { }
Xml.__name__ = ["Xml"];
var haxe = {}
haxe.StackItem = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.CallStack = function() { }
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
}
haxe.CallStack.exceptionStack = function() {
	return [];
}
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
}
haxe.CallStack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = $e[2];
		b.b += "module ";
		b.b += Std.string(m);
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		b.b += Std.string(file);
		b.b += " line ";
		b.b += Std.string(line);
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b += Std.string(cname);
		b.b += ".";
		b.b += Std.string(meth);
		break;
	case 4:
		var n = $e[2];
		b.b += "local function #";
		b.b += Std.string(n);
		break;
	}
}
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
}
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
haxe.Timer.prototype = {
	run: function() {
		haxe.Log.trace("run",{ fileName : "Timer.hx", lineNumber : 98, className : "haxe.Timer", methodName : "run"});
	}
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,id: null
	,__class__: haxe.Timer
}
haxe.ds = {}
haxe.ds._HashMap = {}
haxe.ds._HashMap.HashMap_Impl_ = function() { }
haxe.ds._HashMap.HashMap_Impl_.__name__ = ["haxe","ds","_HashMap","HashMap_Impl_"];
haxe.ds.IntMap = function() { }
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,get: function(key) {
		return this.h[key];
	}
	,h: null
	,__class__: haxe.ds.IntMap
}
haxe.ds.ObjectMap = function() { }
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,h: null
	,__class__: haxe.ds.ObjectMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,h: null
	,__class__: haxe.ds.StringMap
}
haxe.ds.WeakMap = function() { }
haxe.ds.WeakMap.__name__ = ["haxe","ds","WeakMap"];
haxe.ds.WeakMap.__interfaces__ = [IMap];
haxe.ds.WeakMap.prototype = {
	keys: function() {
		return null;
	}
	,get: function(key) {
		return null;
	}
	,__class__: haxe.ds.WeakMap
}
haxe.io = {}
haxe.io.Bytes = function() { }
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.prototype = {
	b: null
	,length: null
	,__class__: haxe.io.Bytes
}
haxe.rtti = {}
haxe.rtti.Meta = function() { }
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.obj == null?{ }:meta.obj;
}
haxe.rtti.Meta.getFields = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.fields == null?{ }:meta.fields;
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0, _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Browser = function() { }
js.Browser.__name__ = ["js","Browser"];
var mconsole = {}
mconsole.PrinterBase = function() {
	this.printPosition = true;
	this.printLineNumbers = true;
};
mconsole.PrinterBase.__name__ = ["mconsole","PrinterBase"];
mconsole.PrinterBase.prototype = {
	printLine: function(color,line,pos) {
		throw "method not implemented in ConsolePrinterBase";
	}
	,print: function(level,params,indent,pos) {
		params = params.slice();
		var _g1 = 0, _g = params.length;
		while(_g1 < _g) {
			var i = _g1++;
			params[i] = Std.string(params[i]);
		}
		var message = params.join(", ");
		var nextPosition = "@ " + pos.className + "." + pos.methodName;
		var nextLineNumber = Std.string(pos.lineNumber);
		var lineColumn = "";
		var emptyLineColumn = "";
		if(this.printPosition) {
			if(nextPosition != this.position) this.printLine(mconsole.ConsoleColor.none,nextPosition,pos);
		}
		if(this.printLineNumbers) {
			emptyLineColumn = StringTools.lpad(""," ",5);
			if(nextPosition != this.position || nextLineNumber != this.lineNumber) lineColumn = StringTools.lpad(nextLineNumber," ",4) + " "; else lineColumn = emptyLineColumn;
		}
		this.position = nextPosition;
		this.lineNumber = nextLineNumber;
		var color = (function($this) {
			var $r;
			switch( (level)[1] ) {
			case 0:
				$r = mconsole.ConsoleColor.white;
				break;
			case 1:
				$r = mconsole.ConsoleColor.blue;
				break;
			case 2:
				$r = mconsole.ConsoleColor.green;
				break;
			case 3:
				$r = mconsole.ConsoleColor.yellow;
				break;
			case 4:
				$r = mconsole.ConsoleColor.red;
				break;
			}
			return $r;
		}(this));
		var indent1 = StringTools.lpad(""," ",indent * 2);
		message = lineColumn + indent1 + message;
		message = message.split("\n").join("\n" + emptyLineColumn + indent1);
		this.printLine(color,message,pos);
	}
	,lineNumber: null
	,position: null
	,printLineNumbers: null
	,printPosition: null
	,__class__: mconsole.PrinterBase
}
mconsole.Printer = function() { }
mconsole.Printer.__name__ = ["mconsole","Printer"];
mconsole.Printer.prototype = {
	print: null
	,__class__: mconsole.Printer
}
mconsole.ConsoleView = function() {
	mconsole.PrinterBase.call(this);
	this.atBottom = true;
	this.projectHome = "/Volumes/home/Users/nakakura/Desktop/Ubipen/client/src/haxe/";
	var document = js.Browser.document;
	this.element = document.createElement("pre");
	this.element.id = "console";
	var style = document.createElement("style");
	this.element.appendChild(style);
	var rules = document.createTextNode("#console {\n\tfont-family:monospace;\n\tbackground-color:#002B36;\n\tbackground-color:rgba(0%,16.9%,21.2%,0.95);\n\tpadding:8px;\n\theight:600px;\n\tmax-height:600px;\n\toverflow-y:scroll;\n\tposition:absolute;\n\tleft:0px;\n\ttop:0px;\n\tright:0px;\n\tmargin:0px;\n\tz-index:10000;\n}\n#console a { text-decoration:none; }\n#console a:hover div { background-color:#063642 }\n#console a div span { display:none; float:right; color:white; }\n#console a:hover div span { display:block; }");
	style.type = "text/css";
	if(style.styleSheet) style.styleSheet.cssText = rules.nodeValue; else style.appendChild(rules);
	var me = this;
	this.element.onscroll = function(e) {
		me.updateScroll();
	};
};
mconsole.ConsoleView.__name__ = ["mconsole","ConsoleView"];
mconsole.ConsoleView.__interfaces__ = [mconsole.Printer];
mconsole.ConsoleView.__super__ = mconsole.PrinterBase;
mconsole.ConsoleView.prototype = $extend(mconsole.PrinterBase.prototype,{
	remove: function() {
		js.Browser.document.body.removeChild(this.element);
	}
	,attach: function() {
		js.Browser.document.body.appendChild(this.element);
	}
	,printLine: function(color,line,pos) {
		var style = (function($this) {
			var $r;
			switch( (color)[1] ) {
			case 0:
				$r = "#839496";
				break;
			case 1:
				$r = "#ffffff";
				break;
			case 2:
				$r = "#248bd2";
				break;
			case 3:
				$r = "#859900";
				break;
			case 4:
				$r = "#b58900";
				break;
			case 5:
				$r = "#dc322f";
				break;
			}
			return $r;
		}(this));
		var file = pos.fileName + ":" + pos.lineNumber;
		var fileName = pos.className.split(".").join("/") + ".hx";
		var link = "";
		this.element.innerHTML = this.element.innerHTML + "<a" + link + "><div style='color:" + style + "'>" + line + "<span>" + file + "</span></div></a>";
		if(this.atBottom) this.element.scrollTop = this.element.scrollHeight;
	}
	,updateScroll: function() {
		this.atBottom = this.element.scrollTop - (this.element.scrollHeight - this.element.clientHeight) == 0;
	}
	,atBottom: null
	,projectHome: null
	,element: null
	,__class__: mconsole.ConsoleView
});
mconsole.Console = function() { }
mconsole.Console.__name__ = ["mconsole","Console"];
mconsole.Console.start = function() {
	if(mconsole.Console.running) return;
	mconsole.Console.running = true;
	mconsole.Console.previousTrace = haxe.Log.trace;
	haxe.Log.trace = mconsole.Console.haxeTrace;
	if(mconsole.Console.hasConsole) {
	} else {
	}
}
mconsole.Console.stop = function() {
	if(!mconsole.Console.running) return;
	mconsole.Console.running = false;
	haxe.Log.trace = mconsole.Console.previousTrace;
	mconsole.Console.previousTrace = null;
}
mconsole.Console.addPrinter = function(printer) {
	mconsole.Console.removePrinter(printer);
	mconsole.Console.printers.push(printer);
}
mconsole.Console.removePrinter = function(printer) {
	HxOverrides.remove(mconsole.Console.printers,printer);
}
mconsole.Console.haxeTrace = function(value,pos) {
	var params = pos.customParams;
	if(params == null) params = []; else pos.customParams = null;
	var level = (function($this) {
		var $r;
		switch(value) {
		case "log":
			$r = mconsole.LogLevel.log;
			break;
		case "warn":
			$r = mconsole.LogLevel.warn;
			break;
		case "info":
			$r = mconsole.LogLevel.info;
			break;
		case "debug":
			$r = mconsole.LogLevel.debug;
			break;
		case "error":
			$r = mconsole.LogLevel.error;
			break;
		default:
			$r = (function($this) {
				var $r;
				params.unshift(value);
				$r = mconsole.LogLevel.log;
				return $r;
			}($this));
		}
		return $r;
	}(this));
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole(Std.string(level),params);
	mconsole.Console.print(level,params,pos);
}
mconsole.Console.print = function(level,params,pos) {
	var _g = 0, _g1 = mconsole.Console.printers;
	while(_g < _g1.length) {
		var printer = _g1[_g];
		++_g;
		printer.print(level,params,mconsole.Console.groupDepth,pos);
	}
}
mconsole.Console.log = function(message,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("log",[message]);
	mconsole.Console.print(mconsole.LogLevel.log,[message],pos);
}
mconsole.Console.info = function(message,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("info",[message]);
	mconsole.Console.print(mconsole.LogLevel.info,[message],pos);
}
mconsole.Console.debug = function(message,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("debug",[message]);
	mconsole.Console.print(mconsole.LogLevel.debug,[message],pos);
}
mconsole.Console.warn = function(message,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("warn",[message]);
	mconsole.Console.print(mconsole.LogLevel.warn,[message],pos);
}
mconsole.Console.error = function(message,stack,pos) {
	if(stack == null) stack = haxe.CallStack.callStack();
	var stackTrace = stack.length > 0?"\n" + mconsole.StackHelper.toString(stack):"";
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("error",[message]);
	mconsole.Console.print(mconsole.LogLevel.error,["Error: " + Std.string(message) + stackTrace],pos);
}
mconsole.Console.trace = function(pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("trace",[]);
	var stack = mconsole.StackHelper.toString(haxe.CallStack.callStack());
	mconsole.Console.print(mconsole.LogLevel.error,["Stack trace:\n" + stack],pos);
}
mconsole.Console.assert = function(expression,message,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("assert",[expression,message]);
	if(!expression) {
		var stack = mconsole.StackHelper.toString(haxe.CallStack.callStack());
		mconsole.Console.print(mconsole.LogLevel.error,["Assertion failed: " + Std.string(message) + "\n" + stack],pos);
		throw message;
	}
}
mconsole.Console.count = function(title,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("count",[title]);
	var position = pos.fileName + ":" + pos.lineNumber;
	var count = mconsole.Console.counts.exists(position)?mconsole.Console.counts.get(position) + 1:1;
	mconsole.Console.counts.set(position,count);
	mconsole.Console.print(mconsole.LogLevel.log,[title + ": " + count],pos);
}
mconsole.Console.group = function(message,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("group",[message]);
	mconsole.Console.print(mconsole.LogLevel.log,[message],pos);
	mconsole.Console.groupDepth += 1;
}
mconsole.Console.groupEnd = function(pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("groupEnd",[]);
	if(mconsole.Console.groupDepth > 0) mconsole.Console.groupDepth -= 1;
}
mconsole.Console.time = function(name,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("time",[name]);
	mconsole.Console.times.set(name,haxe.Timer.stamp());
}
mconsole.Console.timeEnd = function(name,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("timeEnd",[name]);
	if(mconsole.Console.times.exists(name)) {
		mconsole.Console.print(mconsole.LogLevel.log,[name + ": " + ((haxe.Timer.stamp() - mconsole.Console.times.get(name)) * 1000 | 0) + "ms"],pos);
		mconsole.Console.times.remove(name);
	}
}
mconsole.Console.markTimeline = function(label,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("markTimeline",[label]);
}
mconsole.Console.profile = function(title,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("profile",[title]);
}
mconsole.Console.profileEnd = function(title,pos) {
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole("profileEnd",[title]);
}
mconsole.Console.enterDebugger = function() {
	debugger;
}
mconsole.Console.detectConsole = function() {
	if(console != null && console[mconsole.Console.dirxml] == null) mconsole.Console.dirxml = "log";
	return console != undefined && console.log != undefined && console.warn != undefined;
}
mconsole.Console.callConsole = function(method,params) {
	if(console[method] != null) {
		if(method == "log" && js.Boot.__instanceof(params[0],Xml)) method = mconsole.Console.dirxml;
		if(console[method].apply != null) console[method].apply(console,mconsole.Console.toConsoleValues(params)); else if(Function.prototype.bind != null) Function.prototype.bind.call(console[method],console).apply(console,mconsole.Console.toConsoleValues(params));
	}
}
mconsole.Console.toConsoleValues = function(params) {
	var _g1 = 0, _g = params.length;
	while(_g1 < _g) {
		var i = _g1++;
		params[i] = mconsole.Console.toConsoleValue(params[i]);
	}
	return params;
}
mconsole.Console.toConsoleValue = function(value) {
	var typeClass = Type.getClass(value);
	var typeName = typeClass == null?"":Type.getClassName(typeClass);
	if(typeName == "Xml") {
		var parser = new DOMParser();
		return parser.parseFromString(value.toString(),"text/xml").firstChild;
	} else if(typeName == "Map" || typeName == "StringMap" || typeName == "IntMap") {
		var $native = { };
		var map = value;
		var $it0 = map.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			$native[Std.string(key)] = mconsole.Console.toConsoleValue(map.get(key));
		}
		return $native;
	} else {
		var _g = Type["typeof"](value);
		var $e = (_g);
		switch( $e[1] ) {
		case 7:
			var e = $e[2];
			var $native = [];
			var name = Type.getEnumName(e) + "." + Type.enumConstructor(value);
			var params = Type.enumParameters(value);
			if(params.length > 0) {
				$native.push(name + "(");
				var _g2 = 0, _g1 = params.length;
				while(_g2 < _g1) {
					var i = _g2++;
					$native.push(mconsole.Console.toConsoleValue(params[i]));
				}
				$native.push(")");
			} else return [name];
			return $native;
		default:
		}
		if(typeName == "Array" || typeName == "List" || typeName == "haxe.FastList") {
			var $native = [];
			var iterable = value;
			var $it1 = $iterator(iterable)();
			while( $it1.hasNext() ) {
				var i = $it1.next();
				$native.push(mconsole.Console.toConsoleValue(i));
			}
			return $native;
		}
	}
	return value;
}
mconsole.ConsoleMacro = function() { }
mconsole.ConsoleMacro.__name__ = ["mconsole","ConsoleMacro"];
mconsole.LogLevel = { __ename__ : ["mconsole","LogLevel"], __constructs__ : ["log","info","debug","warn","error"] }
mconsole.LogLevel.log = ["log",0];
mconsole.LogLevel.log.toString = $estr;
mconsole.LogLevel.log.__enum__ = mconsole.LogLevel;
mconsole.LogLevel.info = ["info",1];
mconsole.LogLevel.info.toString = $estr;
mconsole.LogLevel.info.__enum__ = mconsole.LogLevel;
mconsole.LogLevel.debug = ["debug",2];
mconsole.LogLevel.debug.toString = $estr;
mconsole.LogLevel.debug.__enum__ = mconsole.LogLevel;
mconsole.LogLevel.warn = ["warn",3];
mconsole.LogLevel.warn.toString = $estr;
mconsole.LogLevel.warn.__enum__ = mconsole.LogLevel;
mconsole.LogLevel.error = ["error",4];
mconsole.LogLevel.error.toString = $estr;
mconsole.LogLevel.error.__enum__ = mconsole.LogLevel;
mconsole.ConsoleColor = { __ename__ : ["mconsole","ConsoleColor"], __constructs__ : ["none","white","blue","green","yellow","red"] }
mconsole.ConsoleColor.none = ["none",0];
mconsole.ConsoleColor.none.toString = $estr;
mconsole.ConsoleColor.none.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.white = ["white",1];
mconsole.ConsoleColor.white.toString = $estr;
mconsole.ConsoleColor.white.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.blue = ["blue",2];
mconsole.ConsoleColor.blue.toString = $estr;
mconsole.ConsoleColor.blue.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.green = ["green",3];
mconsole.ConsoleColor.green.toString = $estr;
mconsole.ConsoleColor.green.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.yellow = ["yellow",4];
mconsole.ConsoleColor.yellow.toString = $estr;
mconsole.ConsoleColor.yellow.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.red = ["red",5];
mconsole.ConsoleColor.red.toString = $estr;
mconsole.ConsoleColor.red.__enum__ = mconsole.ConsoleColor;
mconsole.StackHelper = function() { }
mconsole.StackHelper.__name__ = ["mconsole","StackHelper"];
mconsole.StackHelper.createFilters = function() {
	var filters = new haxe.ds.StringMap();
	filters.set("@ mconsole.ConsoleRedirect.haxeTrace:59",true);
	return filters;
}
mconsole.StackHelper.toString = function(stack) {
	return "null";
}
mconsole.StackItemHelper = function() { }
mconsole.StackItemHelper.__name__ = ["mconsole","StackItemHelper"];
mconsole.StackItemHelper.toString = function(item,isFirst) {
	if(isFirst == null) isFirst = false;
	return (function($this) {
		var $r;
		var $e = (item);
		switch( $e[1] ) {
		case 1:
			var module = $e[2];
			$r = module;
			break;
		case 3:
			var method = $e[3], className = $e[2];
			$r = className + "." + method;
			break;
		case 4:
			var v = $e[2];
			$r = "Lambda(" + v + ")";
			break;
		case 2:
			var line = $e[4], file = $e[3], s = $e[2];
			$r = (s == null?file.split("::").join(".") + ":" + line:mconsole.StackItemHelper.toString(s)) + ":" + line;
			break;
		case 0:
			$r = "(anonymous function)";
			break;
		}
		return $r;
	}(this));
}
var mockatoo = {}
mockatoo.Mock = function() { }
mockatoo.Mock.__name__ = ["mockatoo","Mock"];
mockatoo.Mock.prototype = {
	mockProxy: null
	,__class__: mockatoo.Mock
}
mockatoo.Mockatoo = function() { }
mockatoo.Mockatoo.__name__ = ["mockatoo","Mockatoo"];
mockatoo.Mockatoo.reset = function(mock) {
	mconsole.Console.assert(mock != null,"Cannot verify [null] mock",{ fileName : "Mockatoo.hx", lineNumber : 217, className : "mockatoo.Mockatoo", methodName : "reset"});
	mconsole.Console.assert(js.Boot.__instanceof(mock,mockatoo.Mock),"Object is not an instance of mock",{ fileName : "Mockatoo.hx", lineNumber : 218, className : "mockatoo.Mockatoo", methodName : "reset"});
	return mock.mockProxy.reset();
}
mockatoo.MockatooVoid = function() { }
mockatoo.MockatooVoid.__name__ = ["mockatoo","MockatooVoid"];
mockatoo.Matcher = { __ename__ : ["mockatoo","Matcher"], __constructs__ : ["anyString","anyInt","anyFloat","anyBool","anyIterator","anyObject","anyEnum","enumOf","instanceOf","isNotNull","any","customMatcher"] }
mockatoo.Matcher.anyString = ["anyString",0];
mockatoo.Matcher.anyString.toString = $estr;
mockatoo.Matcher.anyString.__enum__ = mockatoo.Matcher;
mockatoo.Matcher.anyInt = ["anyInt",1];
mockatoo.Matcher.anyInt.toString = $estr;
mockatoo.Matcher.anyInt.__enum__ = mockatoo.Matcher;
mockatoo.Matcher.anyFloat = ["anyFloat",2];
mockatoo.Matcher.anyFloat.toString = $estr;
mockatoo.Matcher.anyFloat.__enum__ = mockatoo.Matcher;
mockatoo.Matcher.anyBool = ["anyBool",3];
mockatoo.Matcher.anyBool.toString = $estr;
mockatoo.Matcher.anyBool.__enum__ = mockatoo.Matcher;
mockatoo.Matcher.anyIterator = ["anyIterator",4];
mockatoo.Matcher.anyIterator.toString = $estr;
mockatoo.Matcher.anyIterator.__enum__ = mockatoo.Matcher;
mockatoo.Matcher.anyObject = ["anyObject",5];
mockatoo.Matcher.anyObject.toString = $estr;
mockatoo.Matcher.anyObject.__enum__ = mockatoo.Matcher;
mockatoo.Matcher.anyEnum = ["anyEnum",6];
mockatoo.Matcher.anyEnum.toString = $estr;
mockatoo.Matcher.anyEnum.__enum__ = mockatoo.Matcher;
mockatoo.Matcher.enumOf = function(e) { var $x = ["enumOf",7,e]; $x.__enum__ = mockatoo.Matcher; $x.toString = $estr; return $x; }
mockatoo.Matcher.instanceOf = function(c) { var $x = ["instanceOf",8,c]; $x.__enum__ = mockatoo.Matcher; $x.toString = $estr; return $x; }
mockatoo.Matcher.isNotNull = ["isNotNull",9];
mockatoo.Matcher.isNotNull.toString = $estr;
mockatoo.Matcher.isNotNull.__enum__ = mockatoo.Matcher;
mockatoo.Matcher.any = ["any",10];
mockatoo.Matcher.any.toString = $estr;
mockatoo.Matcher.any.__enum__ = mockatoo.Matcher;
mockatoo.Matcher.customMatcher = function(f) { var $x = ["customMatcher",11,f]; $x.__enum__ = mockatoo.Matcher; $x.toString = $estr; return $x; }
mockatoo.VerificationMode = { __ename__ : ["mockatoo","VerificationMode"], __constructs__ : ["times","atLeastOnce","atLeast","never","atMost"] }
mockatoo.VerificationMode.times = function(value) { var $x = ["times",0,value]; $x.__enum__ = mockatoo.VerificationMode; $x.toString = $estr; return $x; }
mockatoo.VerificationMode.atLeastOnce = ["atLeastOnce",1];
mockatoo.VerificationMode.atLeastOnce.toString = $estr;
mockatoo.VerificationMode.atLeastOnce.__enum__ = mockatoo.VerificationMode;
mockatoo.VerificationMode.atLeast = function(value) { var $x = ["atLeast",2,value]; $x.__enum__ = mockatoo.VerificationMode; $x.toString = $estr; return $x; }
mockatoo.VerificationMode.never = ["never",3];
mockatoo.VerificationMode.never.toString = $estr;
mockatoo.VerificationMode.never.__enum__ = mockatoo.VerificationMode;
mockatoo.VerificationMode.atMost = function(value) { var $x = ["atMost",4,value]; $x.__enum__ = mockatoo.VerificationMode; $x.toString = $estr; return $x; }
mockatoo.exception = {}
mockatoo.exception.MockatooException = function(message,info) {
	if(message == null) message = "";
	this.message = message;
	this.info = info;
	this.type = this.here({ fileName : "MockatooException.hx", lineNumber : 31, className : "mockatoo.exception.MockatooException", methodName : "new"}).className;
};
mockatoo.exception.MockatooException.__name__ = ["mockatoo","exception","MockatooException"];
mockatoo.exception.MockatooException.prototype = {
	here: function(pos) {
		return pos;
	}
	,toString: function() {
		return this.type + " - " + this.message + " - At " + this.info.className + "#" + this.info.methodName + "::" + this.info.lineNumber + " [" + this.info.fileName + "]";
	}
	,type: null
	,info: null
	,message: null
	,__class__: mockatoo.exception.MockatooException
}
mockatoo.exception.StubbingException = function(message,info) {
	if(message == null) message = "";
	mockatoo.exception.MockatooException.call(this,message,info);
	this.type = this.here({ fileName : "StubbingException.hx", lineNumber : 14, className : "mockatoo.exception.StubbingException", methodName : "new"}).className;
};
mockatoo.exception.StubbingException.__name__ = ["mockatoo","exception","StubbingException"];
mockatoo.exception.StubbingException.__super__ = mockatoo.exception.MockatooException;
mockatoo.exception.StubbingException.prototype = $extend(mockatoo.exception.MockatooException.prototype,{
	__class__: mockatoo.exception.StubbingException
});
mockatoo.exception.VerificationException = function(message,info) {
	if(message == null) message = "";
	mockatoo.exception.MockatooException.call(this,message,info);
	this.type = this.here({ fileName : "VerificationException.hx", lineNumber : 14, className : "mockatoo.exception.VerificationException", methodName : "new"}).className;
};
mockatoo.exception.VerificationException.__name__ = ["mockatoo","exception","VerificationException"];
mockatoo.exception.VerificationException.__super__ = mockatoo.exception.MockatooException;
mockatoo.exception.VerificationException.prototype = $extend(mockatoo.exception.MockatooException.prototype,{
	__class__: mockatoo.exception.VerificationException
});
mockatoo.internal = {}
mockatoo.internal.MockMethod = function(className,fieldName,$arguments,returns) {
	this.fieldName = fieldName;
	this.className = className;
	this.argumentTypes = $arguments;
	this.returnType = returns;
	this.invocations = [];
	this.stubbings = [];
};
mockatoo.internal.MockMethod.__name__ = ["mockatoo","internal","MockMethod"];
mockatoo.internal.MockMethod.prototype = {
	isIterable: function(value) {
		if(value == null) return false;
		if(js.Boot.__instanceof(value,Array) || js.Boot.__instanceof(value,_Map.Map_Impl_)) return true;
		if(js.Boot.__instanceof(value,haxe.ds.IntMap)) return true;
		if(js.Boot.__instanceof(value,haxe.ds.ObjectMap)) return true;
		if(js.Boot.__instanceof(value,haxe.ds.StringMap)) return true;
		if(js.Boot.__instanceof(value,haxe.ds.WeakMap)) return true;
		if(js.Boot.__instanceof(value,haxe.ds._HashMap.HashMap_Impl_)) return true;
		var iterator = Reflect.field(value,"iterator");
		if(Reflect.isFunction(iterator)) return true;
		var next = Reflect.field(value,"next");
		var hasNext = Reflect.field(value,"hasNext");
		return Reflect.isFunction(next) && Reflect.isFunction(hasNext);
	}
	,isObject: function(value) {
		var _g = Type["typeof"](value);
		switch( (_g)[1] ) {
		case 4:
			return true;
		default:
			return false;
		}
	}
	,isEnumValueOf: function(value,ofType) {
		var _g = Type["typeof"](value);
		var $e = (_g);
		switch( $e[1] ) {
		case 7:
			var e = $e[2];
			if(ofType == null) return true;
			return e == ofType;
		default:
			return false;
		}
	}
	,compareArgs: function(expected,actual) {
		var type = Type["typeof"](expected);
		var $e = (type);
		switch( $e[1] ) {
		case 8:
			break;
		case 4:
			break;
		case 0:
			return actual == null;
		case 1:
			break;
		case 5:
			break;
		case 2:
			break;
		case 7:
			var e = $e[2];
			if(e == mockatoo.Matcher) {
				var expectedMatcher = expected;
				var $e = (expectedMatcher);
				switch( $e[1] ) {
				case 0:
					return js.Boot.__instanceof(actual,String);
				case 1:
					return js.Boot.__instanceof(actual,Int);
				case 2:
					return js.Boot.__instanceof(actual,Float);
				case 3:
					return js.Boot.__instanceof(actual,Bool);
				case 4:
					return this.isIterable(actual);
				case 5:
					return this.isObject(actual);
				case 6:
					return this.isEnumValueOf(actual,null);
				case 7:
					var en = $e[2];
					return this.isEnumValueOf(actual,en);
				case 8:
					var c = $e[2];
					return js.Boot.__instanceof(actual,c);
				case 9:
					return actual != null;
				case 10:
					return true;
				case 11:
					var f = $e[2];
					return f(actual);
				}
			}
			break;
		case 6:
			break;
		case 3:
			break;
		}
		return mockatoo.util.TypeEquality.equals(expected,actual);
	}
	,getMatchingArgs: function(argArrays,args) {
		var matches = [];
		var _g = 0;
		while(_g < argArrays.length) {
			var targetArgs = argArrays[_g];
			++_g;
			if(targetArgs.length != args.length) continue;
			var matchingArgs = 0;
			var _g2 = 0, _g1 = args.length;
			while(_g2 < _g1) {
				var i = _g2++;
				if(this.compareArgs(args[i],targetArgs[i])) matchingArgs++;
			}
			if(matchingArgs == args.length) matches.push(targetArgs);
		}
		return matches;
	}
	,toTimes: function(value) {
		return value == 1?"[1] time":"[" + value + "] times";
	}
	,verify: function(mode,args,pos) {
		var matchingInvocations = this.getMatchingArgs(this.invocations,args);
		var matches = matchingInvocations.length;
		var range = null;
		var $e = (mode);
		switch( $e[1] ) {
		case 0:
			var value = $e[2];
			range = new mockatoo.internal._MockMethod.Range(value,value);
			break;
		case 1:
			range = new mockatoo.internal._MockMethod.Range(1,null);
			break;
		case 3:
			range = new mockatoo.internal._MockMethod.Range(0,0);
			break;
		case 2:
			var value = $e[2];
			range = new mockatoo.internal._MockMethod.Range(value,null);
			break;
		case 4:
			var value = $e[2];
			range = new mockatoo.internal._MockMethod.Range(null,value);
			break;
		}
		var execptionMessage = this.className + "." + this.fieldName + "(" + args.join(",") + ") was invoked " + this.toTimes(matches) + ", expected ";
		if(range.max == null) {
			if(matches >= range.min) return true; else throw new mockatoo.exception.VerificationException(execptionMessage + "at least " + this.toTimes(range.min),pos);
		} else if(range.min == null) {
			if(matches <= range.max) return true; else throw new mockatoo.exception.VerificationException(execptionMessage + "less than " + this.toTimes(range.max),pos);
		} else if(matches == range.min) return true; else throw new mockatoo.exception.VerificationException(execptionMessage + this.toTimes(range.min),pos);
		return false;
	}
	,getStubbingForArgs: function(args,absoluteMatching) {
		if(absoluteMatching == null) absoluteMatching = false;
		var _g = 0, _g1 = this.stubbings;
		while(_g < _g1.length) {
			var stub = _g1[_g];
			++_g;
			if(stub.args.length != args.length) continue;
			if(stub.args.length == 0) return stub;
			var matchingArgs = 0;
			var _g3 = 0, _g2 = args.length;
			while(_g3 < _g2) {
				var i = _g3++;
				if(absoluteMatching) {
					if(stub.args[i] == args[i] && Type["typeof"](stub.args[i]) == Type["typeof"](args[i])) matchingArgs++;
				} else if(this.compareArgs(stub.args[i],args[i])) matchingArgs++;
			}
			if(matchingArgs == stub.args.length) return stub;
		}
		return null;
	}
	,addCallRealMethodFor: function(args) {
		var stub = this.getStubbingForArgs(args,true);
		if(stub == null) {
			stub = { args : args, values : []};
			this.stubbings.push(stub);
		}
		stub.values.push(mockatoo.internal.MockOutcome.callsRealMethod);
	}
	,addDefaultStubFor: function(args) {
		var stub = this.getStubbingForArgs(args,true);
		if(stub == null) {
			stub = { args : args, values : []};
			this.stubbings.push(stub);
		}
		stub.values.push(mockatoo.internal.MockOutcome.stubs);
	}
	,addCallbackFor: function(args,values) {
		var stub = this.getStubbingForArgs(args,true);
		if(stub == null) {
			stub = { args : args, values : []};
			this.stubbings.push(stub);
		}
		var _g = 0;
		while(_g < values.length) {
			var value = values[_g];
			++_g;
			if(!Reflect.isFunction(value)) throw new mockatoo.exception.StubbingException("Value [" + Std.string(value) + "] is not a function.",{ fileName : "MockMethod.hx", lineNumber : 107, className : "mockatoo.internal.MockMethod", methodName : "addCallbackFor"});
			stub.values.push(mockatoo.internal.MockOutcome.calls(value));
		}
	}
	,addThrowFor: function(args,values) {
		var stub = this.getStubbingForArgs(args,true);
		if(stub == null) {
			stub = { args : args, values : []};
			this.stubbings.push(stub);
		}
		var _g = 0;
		while(_g < values.length) {
			var value = values[_g];
			++_g;
			stub.values.push(mockatoo.internal.MockOutcome["throws"](value));
		}
	}
	,addReturnFor: function(args,values) {
		if(this.returnType == null) throw new mockatoo.exception.StubbingException("Method [" + this.fieldName + "] has no return type and cannot stub custom return values.",{ fileName : "MockMethod.hx", lineNumber : 61, className : "mockatoo.internal.MockMethod", methodName : "addReturnFor"});
		var stub = this.getStubbingForArgs(args,true);
		if(stub == null) {
			stub = { args : args, values : []};
			this.stubbings.push(stub);
		}
		var _g = 0;
		while(_g < values.length) {
			var value = values[_g];
			++_g;
			stub.values.push(mockatoo.internal.MockOutcome.returns(value));
		}
	}
	,getActiveStubValue: function(stub) {
		if(stub == null) return mockatoo.internal.MockOutcome.none;
		if(stub.values.length > 1) return stub.values.shift();
		return stub.values[0];
	}
	,getOutcomeFor: function(args) {
		this.invocations.push(args);
		var stub = this.getStubbingForArgs(args);
		return this.getActiveStubValue(stub);
	}
	,stubbings: null
	,invocations: null
	,className: null
	,returnType: null
	,argumentTypes: null
	,fieldName: null
	,__class__: mockatoo.internal.MockMethod
}
mockatoo.internal._MockMethod = {}
mockatoo.internal._MockMethod.Range = function(min,max) {
	this.min = min;
	this.max = max;
};
mockatoo.internal._MockMethod.Range.__name__ = ["mockatoo","internal","_MockMethod","Range"];
mockatoo.internal._MockMethod.Range.prototype = {
	max: null
	,min: null
	,__class__: mockatoo.internal._MockMethod.Range
}
mockatoo.internal.MockOutcome = { __ename__ : ["mockatoo","internal","MockOutcome"], __constructs__ : ["returns","throws","calls","stubs","callsRealMethod","none"] }
mockatoo.internal.MockOutcome.returns = function(value) { var $x = ["returns",0,value]; $x.__enum__ = mockatoo.internal.MockOutcome; $x.toString = $estr; return $x; }
mockatoo.internal.MockOutcome["throws"] = function(value) { var $x = ["throws",1,value]; $x.__enum__ = mockatoo.internal.MockOutcome; $x.toString = $estr; return $x; }
mockatoo.internal.MockOutcome.calls = function(value) { var $x = ["calls",2,value]; $x.__enum__ = mockatoo.internal.MockOutcome; $x.toString = $estr; return $x; }
mockatoo.internal.MockOutcome.stubs = ["stubs",3];
mockatoo.internal.MockOutcome.stubs.toString = $estr;
mockatoo.internal.MockOutcome.stubs.__enum__ = mockatoo.internal.MockOutcome;
mockatoo.internal.MockOutcome.callsRealMethod = ["callsRealMethod",4];
mockatoo.internal.MockOutcome.callsRealMethod.toString = $estr;
mockatoo.internal.MockOutcome.callsRealMethod.__enum__ = mockatoo.internal.MockOutcome;
mockatoo.internal.MockOutcome.none = ["none",5];
mockatoo.internal.MockOutcome.none.toString = $estr;
mockatoo.internal.MockOutcome.none.__enum__ = mockatoo.internal.MockOutcome;
mockatoo.internal.MockProxy = function(target,spy) {
	if(spy == null) spy = false;
	this.target = target;
	this.spy = spy;
	this.targetClass = Type.getClass(target);
	this.reset();
};
mockatoo.internal.MockProxy.__name__ = ["mockatoo","internal","MockProxy"];
mockatoo.internal.MockProxy.prototype = {
	parseMethodMetadata: function(fields) {
		var fieldNames = Type.getInstanceFields(this.targetClass);
		var _g = 0;
		while(_g < fieldNames.length) {
			var fieldName = fieldNames[_g];
			++_g;
			if(Reflect.hasField(this.target,fieldName)) continue;
			var fieldMeta = Reflect.field(fields,fieldName);
			if(fieldMeta != null && Reflect.hasField(fieldMeta,"mockatoo")) {
				var mockMeta = Reflect.field(fieldMeta,"mockatoo");
				var args = mockMeta[0];
				var ret = mockMeta.length > 1?mockMeta[1]:null;
				var proxy = new mockatoo.internal.MockMethod(this.targetClassName,fieldName,args,ret);
				this.methods.set(fieldName,proxy);
			}
		}
	}
	,parsePropertyMetadata: function(props) {
		if(props == null) return;
		var _g = 0;
		while(_g < props.length) {
			var prop = props[_g];
			++_g;
			this.properties.set(prop.name,prop);
		}
	}
	,reset: function() {
		this.methods = new haxe.ds.StringMap();
		this.properties = new haxe.ds.StringMap();
		var m = haxe.rtti.Meta.getType(this.targetClass);
		this.targetClassName = m.mockatoo[0];
		this.parsePropertyMetadata(m.mockatooProperties);
		var fieldMeta = haxe.rtti.Meta.getFields(this.targetClass);
		this.parseMethodMetadata(fieldMeta);
	}
	,stubProperty: function(property) {
		var _g = this;
		var stub = new mockatoo.internal.Stubber();
		var prop = this.properties.exists(property)?this.properties.get(property):{ name : property, get : "", set : ""};
		var getMethod = prop.get != ""?this.methods.get(prop.get):null;
		var setMethod = prop.set != ""?this.methods.get(prop.set):null;
		var fReturn = function(value) {
			_g.target[property] = value;
			return stub;
		};
		var fThrow = function(value) {
			throw new mockatoo.exception.StubbingException("Cannot use thenThrow on property field without getter or setter [" + property + "]",{ fileName : "MockProxy.hx", lineNumber : 131, className : "mockatoo.internal.MockProxy", methodName : "stubProperty"});
			return stub;
		};
		var fCallback = function(value) {
			throw new mockatoo.exception.StubbingException("Cannot use thenCall on property field without getter [" + property + "]",{ fileName : "MockProxy.hx", lineNumber : 137, className : "mockatoo.internal.MockProxy", methodName : "stubProperty"});
			return stub;
		};
		var fCallReal = function() {
			throw new mockatoo.exception.StubbingException("Cannot use thenCallRealMethod on property field without getter or setter [" + property + "]",{ fileName : "MockProxy.hx", lineNumber : 143, className : "mockatoo.internal.MockProxy", methodName : "stubProperty"});
			return stub;
		};
		var fStub = function() {
			throw new mockatoo.exception.StubbingException("Cannot use thenStub on property field without getter or setter [" + property + "]",{ fileName : "MockProxy.hx", lineNumber : 149, className : "mockatoo.internal.MockProxy", methodName : "stubProperty"});
			return stub;
		};
		if(getMethod != null) {
			fReturn = function(value) {
				_g.target[property] = value;
				getMethod.addReturnFor([],[value]);
				return stub;
			};
			fCallback = function(value) {
				getMethod.addCallbackFor([],[value]);
				return stub;
			};
		}
		if(setMethod != null && getMethod != null) {
			fThrow = function(value) {
				setMethod.addThrowFor([mockatoo.Matcher.any],[value]);
				getMethod.addThrowFor([],[value]);
				return stub;
			};
			fCallReal = function() {
				getMethod.addCallRealMethodFor([]);
				setMethod.addCallRealMethodFor([mockatoo.Matcher.any]);
				return stub;
			};
			fStub = function() {
				getMethod.addDefaultStubFor([]);
				setMethod.addDefaultStubFor([mockatoo.Matcher.any]);
				return stub;
			};
		} else if(getMethod != null) {
			fThrow = function(value) {
				getMethod.addThrowFor([],[value]);
				return stub;
			};
			fCallReal = function() {
				getMethod.addCallRealMethodFor([]);
				return stub;
			};
			fStub = function() {
				getMethod.addDefaultStubFor([]);
				return stub;
			};
		} else if(setMethod != null) {
			fThrow = function(value) {
				setMethod.addThrowFor([mockatoo.Matcher.any],[value]);
				return stub;
			};
			fCallReal = function() {
				setMethod.addCallRealMethodFor([mockatoo.Matcher.any]);
				return stub;
			};
			fStub = function() {
				setMethod.addDefaultStubFor([mockatoo.Matcher.any]);
				return stub;
			};
		}
		stub.thenReturn = fReturn;
		stub.thenThrow = fThrow;
		stub.thenCall = fCallback;
		stub.thenCallRealMethod = fCallReal;
		stub.thenStub = fStub;
		return stub;
	}
	,stubMethod: function(method,args) {
		var stub = new mockatoo.internal.Stubber();
		var proxy = this.methods.get(method);
		var fReturn = Reflect.makeVarArgs(function(values) {
			proxy.addReturnFor(args,values);
			return stub;
		});
		var fThrow = Reflect.makeVarArgs(function(values) {
			proxy.addThrowFor(args,values);
			return stub;
		});
		var fCallback = Reflect.makeVarArgs(function(values) {
			proxy.addCallbackFor(args,values);
			return stub;
		});
		var fCallReal = function() {
			proxy.addCallRealMethodFor(args);
			return stub;
		};
		var fStub = function() {
			proxy.addDefaultStubFor(args);
			return stub;
		};
		stub.thenReturn = fReturn;
		stub.thenThrow = fThrow;
		stub.thenCall = fCallback;
		stub.thenCallRealMethod = fCallReal;
		stub.thenStub = fStub;
		return stub;
	}
	,verify: function(mode,pos) {
		if(mode == null) mode = mockatoo.VerificationMode.times(1);
		var temp = new mockatoo.internal.Verification(mode);
		var $it0 = this.methods.iterator();
		while( $it0.hasNext() ) {
			var proxy = $it0.next();
			var proxy1 = [proxy];
			var f = Reflect.makeVarArgs((function(proxy1) {
				return function(a) {
					return proxy1[0].verify(mode,a,pos);
				};
			})(proxy1));
			temp[proxy1[0].fieldName] = f;
		}
		return temp;
	}
	,getOutcomeFor: function(method,args) {
		var proxy = this.methods.get(method);
		return proxy.getOutcomeFor(args);
	}
	,properties: null
	,methods: null
	,targetClassName: null
	,targetClass: null
	,spy: null
	,target: null
	,__class__: mockatoo.internal.MockProxy
}
mockatoo.internal.Stubber = function() {
};
mockatoo.internal.Stubber.__name__ = ["mockatoo","internal","Stubber"];
mockatoo.internal.Stubber.prototype = {
	__class__: mockatoo.internal.Stubber
}
mockatoo.internal.Verification = function(mode) {
	this.mode = mode;
};
mockatoo.internal.Verification.__name__ = ["mockatoo","internal","Verification"];
mockatoo.internal.Verification.prototype = {
	mode: null
	,__class__: mockatoo.internal.Verification
}
mockatoo.util = {}
mockatoo.util.TypeEquality = function() { }
mockatoo.util.TypeEquality.__name__ = ["mockatoo","util","TypeEquality"];
mockatoo.util.TypeEquality.equals = function(expected,actual) {
	var _g = Type["typeof"](expected);
	switch( (_g)[1] ) {
	case 7:
		return mockatoo.util.TypeEquality.equalsEnum(expected,actual);
	default:
		return expected == actual;
	}
	return false;
}
mockatoo.util.TypeEquality.equalsEnum = function(a,b) {
	if(Type.getEnum(a) != Type.getEnum(b)) return false;
	if(a[1] != b[1]) return false;
	var aParams = a.slice(2);
	if(aParams.length == 0) return true;
	var bParams = b.slice(2);
	var _g1 = 0, _g = aParams.length;
	while(_g1 < _g) {
		var i = _g1++;
		var aParam = aParams[i];
		var bParam = bParams[i];
		if(aParam == null) continue;
		if(!mockatoo.util.TypeEquality.equals(aParam,bParam)) return false;
	}
	return true;
}
var models = {}
models.BeaconData = function(uuid,proximity,major,minor,accuracy,rssi) {
	this.uuid = uuid;
	this.set_proximity(proximity);
	this.major = major;
	this.minor = minor;
	this.accuracy = accuracy;
	this.rssi = rssi;
	this._isUnknown = false;
};
models.BeaconData.__name__ = ["models","BeaconData"];
models.BeaconData.prototype = {
	_checkUnknown: function(counter) {
		var _g = this;
		haxe.Timer.delay(function() {
			if(!_g._isUnknown) return;
			if(counter > 2) {
				_g.set_proximity(models.Proximity.Lost);
				return;
			}
			_g._checkUnknown(counter + 1);
		},500);
	}
	,set_proximity: function(proximity) {
		if(proximity != models.Proximity.Unknown) {
			this.proximity = proximity;
			return this.get_proximity();
		}
		this._isUnknown = true;
		this._checkUnknown(0);
		return this.get_proximity();
	}
	,get_proximity: function() {
		return this.proximity;
	}
	,jsObject: function() {
		var rangeString = (function($this) {
			var $r;
			var _g = $this.get_proximity();
			$r = (function($this) {
				var $r;
				switch( (_g)[1] ) {
				case 0:
					$r = "immediate";
					break;
				case 1:
					$r = "near";
					break;
				case 2:
					$r = "far";
					break;
				case 3:
					$r = "unknown";
					break;
				case 4:
					$r = "lost";
					break;
				}
				return $r;
			}($this));
			return $r;
		}(this));
		return { uuid : this.uuid, proximity : rangeString, major : this.major, minor : this.minor, accuracy : this.accuracy, rssi : this.rssi};
	}
	,_isUnknown: null
	,rssi: null
	,accuracy: null
	,minor: null
	,major: null
	,proximity: null
	,uuid: null
	,__class__: models.BeaconData
}
models.Person = function(id) {
	this._id = id;
	this._beaconMap = new haxe.ds.StringMap();
};
models.Person.__name__ = ["models","Person"];
models.Person.prototype = {
	_getProximity: function(proxi) {
		var range;
		if(proxi == "immediate") range = models.Proximity.Immediate; else if(proxi == "near") range = models.Proximity.Near; else if(proxi == "far") range = models.Proximity.Far; else range = models.Proximity.Unknown;
		return range;
	}
	,jsObject: function() {
		if(Lambda.count(this._beaconMap) == 0) return { };
		var array = [];
		var $it0 = this._beaconMap.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var beacon = this._beaconMap.get(key);
			if(beacon.get_proximity() == models.Proximity.Lost) this._beaconMap.remove(key);
			array.push(beacon.jsObject());
		}
		return { id : this._id, data : array};
	}
	,setBeacon: function(beaconObj) {
		try {
			var key = Std.string(beaconObj.uuid) + "-" + Std.string(beaconObj.major) + "-" + Std.string(beaconObj.minor);
			var beacon = this._beaconMap.exists(key)?(function($this) {
				var $r;
				var range = $this._getProximity(beaconObj.proximity);
				var beacon1 = $this._beaconMap.get(key);
				beacon1.set_proximity(range);
				beacon1.accuracy = beaconObj.accuracy;
				beacon1.rssi = beaconObj.rssi;
				$r = beacon1;
				return $r;
			}(this)):(function($this) {
				var $r;
				var range = $this._getProximity(beaconObj.proximity);
				$r = new models.BeaconData(beaconObj.uuid,range,beaconObj.major,beaconObj.minor,beaconObj.accuracy,beaconObj.rssi);
				return $r;
			}(this));
			this._beaconMap.set(key,beacon);
		} catch( msg ) {
			if( js.Boot.__instanceof(msg,String) ) {
				haxe.Log.trace(msg,{ fileName : "Person.hx", lineNumber : 33, className : "models.Person", methodName : "setBeacon"});
			} else throw(msg);
		}
	}
	,_id: null
	,_beaconMap: null
	,__class__: models.Person
}
models.Proximity = { __ename__ : ["models","Proximity"], __constructs__ : ["Immediate","Near","Far","Unknown","Lost"] }
models.Proximity.Immediate = ["Immediate",0];
models.Proximity.Immediate.toString = $estr;
models.Proximity.Immediate.__enum__ = models.Proximity;
models.Proximity.Near = ["Near",1];
models.Proximity.Near.toString = $estr;
models.Proximity.Near.__enum__ = models.Proximity;
models.Proximity.Far = ["Far",2];
models.Proximity.Far.toString = $estr;
models.Proximity.Far.__enum__ = models.Proximity;
models.Proximity.Unknown = ["Unknown",3];
models.Proximity.Unknown.toString = $estr;
models.Proximity.Unknown.__enum__ = models.Proximity;
models.Proximity.Lost = ["Lost",4];
models.Proximity.Lost.toString = $estr;
models.Proximity.Lost.__enum__ = models.Proximity;
models.TestBeaconData = function() {
};
models.TestBeaconData.__name__ = ["models","TestBeaconData"];
models.TestBeaconData.prototype = {
	testJSObj: function() {
		var beacon = new models.BeaconData("proxi",models.Proximity.Near,0,0,0.0,-51);
		var obj = { uuid : "proxi", proximity : "near", major : 0, minor : 0, accuracy : 0.0, rssi : -51};
		utest.Assert.same(beacon.jsObject(),obj,null,null,{ fileName : "TestBeaconData.hx", lineNumber : 28, className : "models.TestBeaconData", methodName : "testJSObj"});
		var beacon2 = new models.BeaconData("proxi",models.Proximity.Far,0,0,0.0,-51);
		var obj2 = { uuid : "proxi", proximity : "far", major : 0, minor : 0, accuracy : 0.0, rssi : -51};
		utest.Assert.same(beacon2.jsObject(),obj2,null,null,{ fileName : "TestBeaconData.hx", lineNumber : 32, className : "models.TestBeaconData", methodName : "testJSObj"});
		var beacon3 = new models.BeaconData("proxi",models.Proximity.Immediate,0,0,0.0,-51);
		var obj3 = { uuid : "proxi", proximity : "immediate", major : 0, minor : 0, accuracy : 0.0, rssi : -51};
		utest.Assert.same(beacon3.jsObject(),obj3,null,null,{ fileName : "TestBeaconData.hx", lineNumber : 37, className : "models.TestBeaconData", methodName : "testJSObj"});
		var beacon4 = new models.BeaconData("proxi",models.Proximity.Unknown,0,0,0.0,-51);
		var obj4 = { uuid : "proxi", proximity : "unknown", major : 0, minor : 0, accuracy : 0.0, rssi : -51};
		utest.Assert.same(beacon4.jsObject(),obj4,null,null,{ fileName : "TestBeaconData.hx", lineNumber : 42, className : "models.TestBeaconData", methodName : "testJSObj"});
	}
	,testCreate: function() {
		var beacon = new models.BeaconData("proxi",models.Proximity.Near,0,0,0.0,-50);
		utest.Assert.same(beacon.uuid,"proxi",null,null,{ fileName : "TestBeaconData.hx", lineNumber : 17, className : "models.TestBeaconData", methodName : "testCreate"});
		utest.Assert.same(beacon.get_proximity(),models.Proximity.Near,null,null,{ fileName : "TestBeaconData.hx", lineNumber : 18, className : "models.TestBeaconData", methodName : "testCreate"});
		utest.Assert.same(beacon.major,0,null,null,{ fileName : "TestBeaconData.hx", lineNumber : 19, className : "models.TestBeaconData", methodName : "testCreate"});
		utest.Assert.same(beacon.minor,0,null,null,{ fileName : "TestBeaconData.hx", lineNumber : 20, className : "models.TestBeaconData", methodName : "testCreate"});
		utest.Assert.same(beacon.accuracy,0.0,null,null,{ fileName : "TestBeaconData.hx", lineNumber : 21, className : "models.TestBeaconData", methodName : "testCreate"});
		utest.Assert.same(beacon.rssi,-50,null,null,{ fileName : "TestBeaconData.hx", lineNumber : 22, className : "models.TestBeaconData", methodName : "testCreate"});
	}
	,__class__: models.TestBeaconData
}
models.TestPerson = function() {
};
models.TestPerson.__name__ = ["models","TestPerson"];
models.TestPerson.prototype = {
	testJsObject_case1: function() {
		var person = new models.Person("hokaccha");
		person.setBeacon({ uuid : "proxi", proximity : "near", major : 0, minor : 0, accuracy : 0.0, rssi : -51});
		var jsObject = person.jsObject();
		var ansData = { id : "hokaccha", data : []};
		ansData.data.push({ uuid : "proxi", proximity : "near", major : 0, minor : 0, accuracy : 0, rssi : -51});
		utest.Assert.same(jsObject,ansData,null,null,{ fileName : "TestPerson.hx", lineNumber : 40, className : "models.TestPerson", methodName : "testJsObject_case1"});
	}
	,testJsObject_case0: function() {
		var person = new models.Person("hokaccha");
		utest.Assert.same(person.jsObject(),{ },null,null,{ fileName : "TestPerson.hx", lineNumber : 21, className : "models.TestPerson", methodName : "testJsObject_case0"});
	}
	,testCreate: function() {
		var person = new models.Person("hokaccha");
		utest.Assert.isTrue(true,null,{ fileName : "TestPerson.hx", lineNumber : 16, className : "models.TestPerson", methodName : "testCreate"});
	}
	,__class__: models.TestPerson
}
var utest = {}
utest.Assert = function() { }
utest.Assert.__name__ = ["utest","Assert"];
utest.Assert.isTrue = function(cond,msg,pos) {
	if(utest.Assert.results == null) throw "Assert.results is not currently bound to any assert context";
	if(null == msg) msg = "expected true";
	if(cond) utest.Assert.results.add(utest.Assertation.Success(pos)); else utest.Assert.results.add(utest.Assertation.Failure(msg,pos));
}
utest.Assert.isFalse = function(value,msg,pos) {
	if(null == msg) msg = "expected false";
	utest.Assert.isTrue(value == false,msg,pos);
}
utest.Assert.isNull = function(value,msg,pos) {
	if(msg == null) msg = "expected null but was " + utest.Assert.q(value);
	utest.Assert.isTrue(value == null,msg,pos);
}
utest.Assert.notNull = function(value,msg,pos) {
	if(null == msg) msg = "expected not null";
	utest.Assert.isTrue(value != null,msg,pos);
}
utest.Assert["is"] = function(value,type,msg,pos) {
	if(msg == null) msg = "expected type " + utest.Assert.typeToString(type) + " but was " + utest.Assert.typeToString(value);
	utest.Assert.isTrue(js.Boot.__instanceof(value,type),msg,pos);
}
utest.Assert.notEquals = function(expected,value,msg,pos) {
	if(msg == null) msg = "expected " + utest.Assert.q(expected) + " and testa value " + utest.Assert.q(value) + " should be different";
	utest.Assert.isFalse(expected == value,msg,pos);
}
utest.Assert.equals = function(expected,value,msg,pos) {
	if(msg == null) msg = "expected " + utest.Assert.q(expected) + " but was " + utest.Assert.q(value);
	utest.Assert.isTrue(expected == value,msg,pos);
}
utest.Assert.match = function(pattern,value,msg,pos) {
	if(msg == null) msg = "the value " + utest.Assert.q(value) + "does not match the provided pattern";
	utest.Assert.isTrue(pattern.match(value),msg,pos);
}
utest.Assert.floatEquals = function(expected,value,approx,msg,pos) {
	if(msg == null) msg = "expected " + utest.Assert.q(expected) + " but was " + utest.Assert.q(value);
	return utest.Assert.isTrue(utest.Assert._floatEquals(expected,value,approx),msg,pos);
}
utest.Assert._floatEquals = function(expected,value,approx) {
	if(Math.isNaN(expected)) return Math.isNaN(value); else if(Math.isNaN(value)) return false; else if(!Math.isFinite(expected) && !Math.isFinite(value)) return expected > 0 == value > 0;
	if(null == approx) approx = 1e-5;
	return Math.abs(value - expected) < approx;
}
utest.Assert.getTypeName = function(v) {
	var _g = Type["typeof"](v);
	var $e = (_g);
	switch( $e[1] ) {
	case 0:
		return "[null]";
	case 1:
		return "Int";
	case 2:
		return "Float";
	case 3:
		return "Bool";
	case 5:
		return "function";
	case 6:
		var c = $e[2];
		return Type.getClassName(c);
	case 7:
		var e = $e[2];
		return Type.getEnumName(e);
	case 4:
		return "Object";
	case 8:
		return "Unknown";
	}
}
utest.Assert.isIterable = function(v,isAnonym) {
	var fields = isAnonym?Reflect.fields(v):Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"iterator")) return false;
	return Reflect.isFunction(Reflect.field(v,"iterator"));
}
utest.Assert.isIterator = function(v,isAnonym) {
	var fields = isAnonym?Reflect.fields(v):Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"next") || !Lambda.has(fields,"hasNext")) return false;
	return Reflect.isFunction(Reflect.field(v,"next")) && Reflect.isFunction(Reflect.field(v,"hasNext"));
}
utest.Assert.sameAs = function(expected,value,status) {
	var texpected = utest.Assert.getTypeName(expected);
	var tvalue = utest.Assert.getTypeName(value);
	if(texpected != tvalue) {
		status.error = "expected type " + texpected + " but it is " + tvalue + (status.path == ""?"":" for field " + status.path);
		return false;
	}
	var _g = Type["typeof"](expected);
	var $e = (_g);
	switch( $e[1] ) {
	case 2:
		if(!utest.Assert._floatEquals(expected,value)) {
			status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		return true;
	case 0:
	case 1:
	case 3:
		if(expected != value) {
			status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		return true;
	case 5:
		if(!Reflect.compareMethods(expected,value)) {
			status.error = "expected same function reference" + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		return true;
	case 6:
		var c = $e[2];
		var cexpected = Type.getClassName(c);
		var cvalue = Type.getClassName(Type.getClass(value));
		if(cexpected != cvalue) {
			status.error = "expected instance of " + utest.Assert.q(cexpected) + " but it is " + utest.Assert.q(cvalue) + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		if(js.Boot.__instanceof(expected,String) && expected != value) {
			status.error = "expected '" + Std.string(expected) + "' but it is '" + Std.string(value) + "'";
			return false;
		}
		if(js.Boot.__instanceof(expected,Array)) {
			if(status.recursive || status.path == "") {
				if(expected.length != value.length) {
					status.error = "expected " + Std.string(expected.length) + " elements but they were " + Std.string(value.length) + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g2 = 0, _g1 = expected.length;
				while(_g2 < _g1) {
					var i = _g2++;
					status.path = path == ""?"array[" + i + "]":path + "[" + i + "]";
					if(!utest.Assert.sameAs(expected[i],value[i],status)) {
						status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(js.Boot.__instanceof(expected,Date)) {
			if(expected.getTime() != value.getTime()) {
				status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			return true;
		}
		if(js.Boot.__instanceof(expected,haxe.io.Bytes)) {
			if(status.recursive || status.path == "") {
				var ebytes = expected;
				var vbytes = value;
				if(ebytes.length != vbytes.length) return false;
				var _g2 = 0, _g1 = ebytes.length;
				while(_g2 < _g1) {
					var i = _g2++;
					if(ebytes.b[i] != vbytes.b[i]) {
						status.error = "expected byte " + ebytes.b[i] + " but wss " + ebytes.b[i] + (status.path == ""?"":" for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(js.Boot.__instanceof(expected,haxe.ds.StringMap) || js.Boot.__instanceof(expected,haxe.ds.IntMap)) {
			if(status.recursive || status.path == "") {
				var keys = Lambda.array({ iterator : function() {
					return expected.keys();
				}});
				var vkeys = Lambda.array({ iterator : function() {
					return value.keys();
				}});
				if(keys.length != vkeys.length) {
					status.error = "expected " + keys.length + " keys but they were " + vkeys.length + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g1 = 0;
				while(_g1 < keys.length) {
					var key = keys[_g1];
					++_g1;
					status.path = path == ""?"hash[" + key + "]":path + "[" + key + "]";
					if(!utest.Assert.sameAs(expected.get(key),value.get(key),status)) {
						status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(utest.Assert.isIterator(expected,false)) {
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array({ iterator : function() {
					return expected;
				}});
				var vvalues = Lambda.array({ iterator : function() {
					return value;
				}});
				if(evalues.length != vvalues.length) {
					status.error = "expected " + evalues.length + " values in Iterator but they were " + vvalues.length + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g2 = 0, _g1 = evalues.length;
				while(_g2 < _g1) {
					var i = _g2++;
					status.path = path == ""?"iterator[" + i + "]":path + "[" + i + "]";
					if(!utest.Assert.sameAs(evalues[i],vvalues[i],status)) {
						status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(utest.Assert.isIterable(expected,false)) {
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array(expected);
				var vvalues = Lambda.array(value);
				if(evalues.length != vvalues.length) {
					status.error = "expected " + evalues.length + " values in Iterable but they were " + vvalues.length + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g2 = 0, _g1 = evalues.length;
				while(_g2 < _g1) {
					var i = _g2++;
					status.path = path == ""?"iterable[" + i + "]":path + "[" + i + "]";
					if(!utest.Assert.sameAs(evalues[i],vvalues[i],status)) return false;
				}
			}
			return true;
		}
		if(status.recursive || status.path == "") {
			var fields = Type.getInstanceFields(Type.getClass(expected));
			var path = status.path;
			var _g1 = 0;
			while(_g1 < fields.length) {
				var field = fields[_g1];
				++_g1;
				status.path = path == ""?field:path + "." + field;
				var e = Reflect.field(expected,field);
				if(Reflect.isFunction(e)) continue;
				var v = Reflect.field(value,field);
				if(!utest.Assert.sameAs(e,v,status)) return false;
			}
		}
		return true;
	case 7:
		var e = $e[2];
		var eexpected = Type.getEnumName(e);
		var evalue = Type.getEnumName(Type.getEnum(value));
		if(eexpected != evalue) {
			status.error = "expected enumeration of " + utest.Assert.q(eexpected) + " but it is " + utest.Assert.q(evalue) + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		if(status.recursive || status.path == "") {
			if(Type.enumIndex(expected) != Type.enumIndex(value)) {
				status.error = "expected " + utest.Assert.q(Type.enumConstructor(expected)) + " but is " + utest.Assert.q(Type.enumConstructor(value)) + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			var eparams = Type.enumParameters(expected);
			var vparams = Type.enumParameters(value);
			var path = status.path;
			var _g2 = 0, _g1 = eparams.length;
			while(_g2 < _g1) {
				var i = _g2++;
				status.path = path == ""?"enum[" + i + "]":path + "[" + i + "]";
				if(!utest.Assert.sameAs(eparams[i],vparams[i],status)) {
					status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
					return false;
				}
			}
		}
		return true;
	case 4:
		if(status.recursive || status.path == "") {
			var tfields = Reflect.fields(value);
			var fields = Reflect.fields(expected);
			var path = status.path;
			var _g1 = 0;
			while(_g1 < fields.length) {
				var field = fields[_g1];
				++_g1;
				HxOverrides.remove(tfields,field);
				status.path = path == ""?field:path + "." + field;
				if(!Reflect.hasField(value,field)) {
					status.error = "expected field " + status.path + " does not exist in " + utest.Assert.q(value);
					return false;
				}
				var e = Reflect.field(expected,field);
				if(Reflect.isFunction(e)) continue;
				var v = Reflect.field(value,field);
				if(!utest.Assert.sameAs(e,v,status)) return false;
			}
			if(tfields.length > 0) {
				status.error = "the tested object has extra field(s) (" + tfields.join(", ") + ") not included in the expected ones";
				return false;
			}
		}
		if(utest.Assert.isIterator(expected,true)) {
			if(!utest.Assert.isIterator(value,true)) {
				status.error = "expected Iterable but it is not " + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array({ iterator : function() {
					return expected;
				}});
				var vvalues = Lambda.array({ iterator : function() {
					return value;
				}});
				if(evalues.length != vvalues.length) {
					status.error = "expected " + evalues.length + " values in Iterator but they were " + vvalues.length + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g2 = 0, _g1 = evalues.length;
				while(_g2 < _g1) {
					var i = _g2++;
					status.path = path == ""?"iterator[" + i + "]":path + "[" + i + "]";
					if(!utest.Assert.sameAs(evalues[i],vvalues[i],status)) {
						status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(utest.Assert.isIterable(expected,true)) {
			if(!utest.Assert.isIterable(value,true)) {
				status.error = "expected Iterator but it is not " + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array(expected);
				var vvalues = Lambda.array(value);
				if(evalues.length != vvalues.length) {
					status.error = "expected " + evalues.length + " values in Iterable but they were " + vvalues.length + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g2 = 0, _g1 = evalues.length;
				while(_g2 < _g1) {
					var i = _g2++;
					status.path = path == ""?"iterable[" + i + "]":path + "[" + i + "]";
					if(!utest.Assert.sameAs(evalues[i],vvalues[i],status)) return false;
				}
			}
			return true;
		}
		return true;
	case 8:
		return (function($this) {
			var $r;
			throw "Unable to compare two unknown types";
			return $r;
		}(this));
	}
	return (function($this) {
		var $r;
		throw "Unable to compare values: " + utest.Assert.q(expected) + " and " + utest.Assert.q(value);
		return $r;
	}(this));
}
utest.Assert.q = function(v) {
	if(js.Boot.__instanceof(v,String)) return "\"" + StringTools.replace(v,"\"","\\\"") + "\""; else return Std.string(v);
}
utest.Assert.same = function(expected,value,recursive,msg,pos) {
	var status = { recursive : null == recursive?true:recursive, path : "", error : null};
	if(utest.Assert.sameAs(expected,value,status)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?status.error:msg,pos);
}
utest.Assert.raises = function(method,type,msgNotThrown,msgWrongType,pos) {
	if(type == null) type = String;
	try {
		method();
		var name = Type.getClassName(type);
		if(name == null) name = "" + Std.string(type);
		if(null == msgNotThrown) msgNotThrown = "exception of type " + name + " not raised";
		utest.Assert.fail(msgNotThrown,pos);
	} catch( ex ) {
		var name = Type.getClassName(type);
		if(name == null) name = "" + Std.string(type);
		if(null == msgWrongType) msgWrongType = "expected throw of type " + name + " but was " + Std.string(ex);
		utest.Assert.isTrue(js.Boot.__instanceof(ex,type),msgWrongType,pos);
	}
}
utest.Assert.allows = function(possibilities,value,msg,pos) {
	if(Lambda.has(possibilities,value)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"value " + utest.Assert.q(value) + " not found in the expected possibilities " + Std.string(possibilities):msg,pos);
}
utest.Assert.contains = function(match,values,msg,pos) {
	if(Lambda.has(values,match)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"values " + utest.Assert.q(values) + " do not contain " + Std.string(match):msg,pos);
}
utest.Assert.notContains = function(match,values,msg,pos) {
	if(!Lambda.has(values,match)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"values " + utest.Assert.q(values) + " do contain " + Std.string(match):msg,pos);
}
utest.Assert.stringContains = function(match,value,msg,pos) {
	if(value != null && value.indexOf(match) >= 0) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"value " + utest.Assert.q(value) + " does not contain " + utest.Assert.q(match):msg,pos);
}
utest.Assert.stringSequence = function(sequence,value,msg,pos) {
	if(null == value) {
		utest.Assert.fail(msg == null?"null argument value":msg,pos);
		return;
	}
	var p = 0;
	var _g = 0;
	while(_g < sequence.length) {
		var s = sequence[_g];
		++_g;
		var p2 = value.indexOf(s,p);
		if(p2 < 0) {
			if(msg == null) {
				msg = "expected '" + s + "' after ";
				if(p > 0) {
					var cut = HxOverrides.substr(value,0,p);
					if(cut.length > 30) cut = "..." + HxOverrides.substr(cut,-27,null);
					msg += " '" + cut + "'";
				} else msg += " begin";
			}
			utest.Assert.fail(msg,pos);
			return;
		}
		p = p2 + s.length;
	}
	utest.Assert.isTrue(true,msg,pos);
}
utest.Assert.fail = function(msg,pos) {
	if(msg == null) msg = "failure expected";
	utest.Assert.isTrue(false,msg,pos);
}
utest.Assert.warn = function(msg) {
	utest.Assert.results.add(utest.Assertation.Warning(msg));
}
utest.Assert.createAsync = function(f,timeout) {
	return function() {
	};
}
utest.Assert.createEvent = function(f,timeout) {
	return function(e) {
	};
}
utest.Assert.typeToString = function(t) {
	try {
		var _t = Type.getClass(t);
		if(_t != null) t = _t;
	} catch( e ) {
	}
	try {
		return Type.getClassName(t);
	} catch( e ) {
	}
	try {
		var _t = Type.getEnum(t);
		if(_t != null) t = _t;
	} catch( e ) {
	}
	try {
		return Type.getEnumName(t);
	} catch( e ) {
	}
	try {
		return Std.string(Type["typeof"](t));
	} catch( e ) {
	}
	try {
		return Std.string(t);
	} catch( e ) {
	}
	return "<unable to retrieve type name>";
}
utest.Assertation = { __ename__ : ["utest","Assertation"], __constructs__ : ["Success","Failure","Error","SetupError","TeardownError","TimeoutError","AsyncError","Warning"] }
utest.Assertation.Success = function(pos) { var $x = ["Success",0,pos]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.Failure = function(msg,pos) { var $x = ["Failure",1,msg,pos]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.Error = function(e,stack) { var $x = ["Error",2,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.SetupError = function(e,stack) { var $x = ["SetupError",3,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.TeardownError = function(e,stack) { var $x = ["TeardownError",4,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.TimeoutError = function(missedAsyncs,stack) { var $x = ["TimeoutError",5,missedAsyncs,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.AsyncError = function(e,stack) { var $x = ["AsyncError",6,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.Warning = function(msg) { var $x = ["Warning",7,msg]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest._Dispatcher = {}
utest._Dispatcher.EventException = { __ename__ : ["utest","_Dispatcher","EventException"], __constructs__ : ["StopPropagation"] }
utest._Dispatcher.EventException.StopPropagation = ["StopPropagation",0];
utest._Dispatcher.EventException.StopPropagation.toString = $estr;
utest._Dispatcher.EventException.StopPropagation.__enum__ = utest._Dispatcher.EventException;
utest.Dispatcher = function() {
	this.handlers = new Array();
};
utest.Dispatcher.__name__ = ["utest","Dispatcher"];
utest.Dispatcher.stop = function() {
	throw utest._Dispatcher.EventException.StopPropagation;
}
utest.Dispatcher.prototype = {
	has: function() {
		return this.handlers.length > 0;
	}
	,dispatch: function(e) {
		try {
			var list = this.handlers.slice();
			var _g = 0;
			while(_g < list.length) {
				var l = list[_g];
				++_g;
				l(e);
			}
			return true;
		} catch( exc ) {
			if( js.Boot.__instanceof(exc,utest._Dispatcher.EventException) ) {
				return false;
			} else throw(exc);
		}
	}
	,clear: function() {
		this.handlers = new Array();
	}
	,remove: function(h) {
		var _g1 = 0, _g = this.handlers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Reflect.compareMethods(this.handlers[i],h)) return this.handlers.splice(i,1)[0];
		}
		return null;
	}
	,add: function(h) {
		this.handlers.push(h);
		return h;
	}
	,handlers: null
	,__class__: utest.Dispatcher
}
utest.Notifier = function() {
	this.handlers = new Array();
};
utest.Notifier.__name__ = ["utest","Notifier"];
utest.Notifier.stop = function() {
	throw utest._Dispatcher.EventException.StopPropagation;
}
utest.Notifier.prototype = {
	has: function() {
		return this.handlers.length > 0;
	}
	,dispatch: function() {
		try {
			var list = this.handlers.slice();
			var _g = 0;
			while(_g < list.length) {
				var l = list[_g];
				++_g;
				l();
			}
			return true;
		} catch( exc ) {
			if( js.Boot.__instanceof(exc,utest._Dispatcher.EventException) ) {
				return false;
			} else throw(exc);
		}
	}
	,clear: function() {
		this.handlers = new Array();
	}
	,remove: function(h) {
		var _g1 = 0, _g = this.handlers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Reflect.compareMethods(this.handlers[i],h)) return this.handlers.splice(i,1)[0];
		}
		return null;
	}
	,add: function(h) {
		this.handlers.push(h);
		return h;
	}
	,handlers: null
	,__class__: utest.Notifier
}
utest.Runner = function() {
	this.fixtures = new Array();
	this.onProgress = new utest.Dispatcher();
	this.onStart = new utest.Dispatcher();
	this.onComplete = new utest.Dispatcher();
	this.length = 0;
};
utest.Runner.__name__ = ["utest","Runner"];
utest.Runner.prototype = {
	testComplete: function(h) {
		this.onProgress.dispatch({ result : utest.TestResult.ofHandler(h), done : this.pos, totals : this.length});
		this.runNext();
	}
	,runFixture: function(fixture) {
		var handler = new utest.TestHandler(fixture);
		handler.onComplete.add($bind(this,this.testComplete));
		handler.execute();
	}
	,runNext: function() {
		if(this.fixtures.length > this.pos) this.runFixture(this.fixtures[this.pos++]); else this.onComplete.dispatch(this);
	}
	,run: function() {
		this.pos = 0;
		this.onStart.dispatch(this);
		this.runNext();
	}
	,pos: null
	,isMethod: function(test,name) {
		try {
			return Reflect.isFunction(Reflect.field(test,name));
		} catch( e ) {
			return false;
		}
	}
	,getFixture: function(index) {
		return this.fixtures[index];
	}
	,addFixture: function(fixture) {
		this.fixtures.push(fixture);
		this.length++;
	}
	,addCase: function(test,setup,teardown,prefix,pattern) {
		if(prefix == null) prefix = "test";
		if(teardown == null) teardown = "teardown";
		if(setup == null) setup = "setup";
		if(!Reflect.isObject(test)) throw "can't add a null object as a test case";
		if(!this.isMethod(test,setup)) setup = null;
		if(!this.isMethod(test,teardown)) teardown = null;
		var fields = Type.getInstanceFields(Type.getClass(test));
		if(pattern == null) {
			var _g = 0;
			while(_g < fields.length) {
				var field = fields[_g];
				++_g;
				if(!StringTools.startsWith(field,prefix)) continue;
				if(!this.isMethod(test,field)) continue;
				this.addFixture(new utest.TestFixture(test,field,setup,teardown));
			}
		} else {
			var _g = 0;
			while(_g < fields.length) {
				var field = fields[_g];
				++_g;
				if(!pattern.match(field)) continue;
				if(!this.isMethod(test,field)) continue;
				this.addFixture(new utest.TestFixture(test,field,setup,teardown));
			}
		}
	}
	,length: null
	,onComplete: null
	,onStart: null
	,onProgress: null
	,fixtures: null
	,__class__: utest.Runner
}
utest.TestFixture = function(target,method,setup,teardown) {
	this.target = target;
	this.method = method;
	this.setup = setup;
	this.teardown = teardown;
};
utest.TestFixture.__name__ = ["utest","TestFixture"];
utest.TestFixture.prototype = {
	checkMethod: function(name,arg) {
		var field = Reflect.field(this.target,name);
		if(field == null) throw arg + " function " + name + " is not a field of target";
		if(!Reflect.isFunction(field)) throw arg + " function " + name + " is not a function";
	}
	,teardown: null
	,setup: null
	,method: null
	,target: null
	,__class__: utest.TestFixture
}
utest.TestHandler = function(fixture) {
	if(fixture == null) throw "fixture argument is null";
	this.fixture = fixture;
	this.results = new List();
	this.asyncStack = new List();
	this.onTested = new utest.Dispatcher();
	this.onTimeout = new utest.Dispatcher();
	this.onComplete = new utest.Dispatcher();
};
utest.TestHandler.__name__ = ["utest","TestHandler"];
utest.TestHandler.exceptionStack = function(pops) {
	if(pops == null) pops = 2;
	var stack = haxe.CallStack.exceptionStack();
	while(pops-- > 0) stack.pop();
	return stack;
}
utest.TestHandler.prototype = {
	completed: function() {
		try {
			this.executeMethod(this.fixture.teardown);
		} catch( e ) {
			this.results.add(utest.Assertation.TeardownError(e,utest.TestHandler.exceptionStack(2)));
		}
		this.unbindHandler();
		this.onComplete.dispatch(this);
	}
	,timeout: function() {
		this.results.add(utest.Assertation.TimeoutError(this.asyncStack.length,[]));
		this.onTimeout.dispatch(this);
		this.completed();
	}
	,tested: function() {
		if(this.results.length == 0) this.results.add(utest.Assertation.Warning("no assertions"));
		this.onTested.dispatch(this);
		this.completed();
	}
	,executeMethod: function(name) {
		if(name == null) return;
		this.bindHandler();
		Reflect.field(this.fixture.target,name).apply(this.fixture.target,[]);
	}
	,addEvent: function(f,timeout) {
		if(timeout == null) timeout = 250;
		this.asyncStack.add(f);
		var handler = this;
		this.setTimeout(timeout);
		return function(e) {
			if(!handler.asyncStack.remove(f)) {
				handler.results.add(utest.Assertation.AsyncError("event already executed",[]));
				return;
			}
			try {
				handler.bindHandler();
				f(e);
			} catch( e1 ) {
				handler.results.add(utest.Assertation.AsyncError(e1,utest.TestHandler.exceptionStack(0)));
			}
		};
	}
	,addAsync: function(f,timeout) {
		if(timeout == null) timeout = 250;
		if(null == f) f = function() {
		};
		this.asyncStack.add(f);
		var handler = this;
		this.setTimeout(timeout);
		return function() {
			if(!handler.asyncStack.remove(f)) {
				handler.results.add(utest.Assertation.AsyncError("async function already executed",[]));
				return;
			}
			try {
				handler.bindHandler();
				f();
			} catch( e ) {
				handler.results.add(utest.Assertation.AsyncError(e,utest.TestHandler.exceptionStack(0)));
			}
		};
	}
	,unbindHandler: function() {
		utest.Assert.results = null;
		utest.Assert.createAsync = function(f,t) {
			return function() {
			};
		};
		utest.Assert.createEvent = function(f,t) {
			return function(e) {
			};
		};
	}
	,bindHandler: function() {
		utest.Assert.results = this.results;
		utest.Assert.createAsync = $bind(this,this.addAsync);
		utest.Assert.createEvent = $bind(this,this.addEvent);
	}
	,setTimeout: function(timeout) {
		var newexpire = haxe.Timer.stamp() + timeout / 1000;
		this.expireson = this.expireson == null?newexpire:newexpire > this.expireson?newexpire:this.expireson;
	}
	,expireson: null
	,checkTested: function() {
		if(this.expireson == null || this.asyncStack.length == 0) this.tested(); else if(haxe.Timer.stamp() > this.expireson) this.timeout(); else haxe.Timer.delay($bind(this,this.checkTested),10);
	}
	,execute: function() {
		try {
			this.executeMethod(this.fixture.setup);
			try {
				this.executeMethod(this.fixture.method);
			} catch( e ) {
				this.results.add(utest.Assertation.Error(e,utest.TestHandler.exceptionStack()));
			}
		} catch( e ) {
			this.results.add(utest.Assertation.SetupError(e,utest.TestHandler.exceptionStack()));
		}
		this.checkTested();
	}
	,onComplete: null
	,onTimeout: null
	,onTested: null
	,asyncStack: null
	,fixture: null
	,results: null
	,__class__: utest.TestHandler
}
utest.TestResult = function() {
};
utest.TestResult.__name__ = ["utest","TestResult"];
utest.TestResult.ofHandler = function(handler) {
	var r = new utest.TestResult();
	var path = Type.getClassName(Type.getClass(handler.fixture.target)).split(".");
	r.cls = path.pop();
	r.pack = path.join(".");
	r.method = handler.fixture.method;
	r.setup = handler.fixture.setup;
	r.teardown = handler.fixture.teardown;
	r.assertations = handler.results;
	return r;
}
utest.TestResult.prototype = {
	allOk: function() {
		try {
			var $it0 = this.assertations.iterator();
			while( $it0.hasNext() ) {
				var l = $it0.next();
				switch( (l)[1] ) {
				case 0:
					throw "__break__";
					break;
				default:
					return false;
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return true;
	}
	,assertations: null
	,teardown: null
	,setup: null
	,method: null
	,cls: null
	,pack: null
	,__class__: utest.TestResult
}
utest.ui = {}
utest.ui.Report = function() { }
utest.ui.Report.__name__ = ["utest","ui","Report"];
utest.ui.Report.create = function(runner,displaySuccessResults,headerDisplayMode) {
	var report;
	report = new utest.ui.text.HtmlReport(runner,null,true);
	if(null == displaySuccessResults) report.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors; else report.displaySuccessResults = displaySuccessResults;
	if(null == headerDisplayMode) report.displayHeader = utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults; else report.displayHeader = headerDisplayMode;
	return report;
}
utest.ui.common = {}
utest.ui.common.ClassResult = function(className,setupName,teardownName) {
	this.fixtures = new haxe.ds.StringMap();
	this.className = className;
	this.setupName = setupName;
	this.hasSetup = setupName != null;
	this.teardownName = teardownName;
	this.hasTeardown = teardownName != null;
	this.methods = 0;
	this.stats = new utest.ui.common.ResultStats();
};
utest.ui.common.ClassResult.__name__ = ["utest","ui","common","ClassResult"];
utest.ui.common.ClassResult.prototype = {
	methodNames: function(errorsHavePriority) {
		if(errorsHavePriority == null) errorsHavePriority = true;
		var names = [];
		var $it0 = this.fixtures.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			names.push(name);
		}
		if(errorsHavePriority) {
			var me = this;
			names.sort(function(a,b) {
				var $as = me.get(a).stats;
				var bs = me.get(b).stats;
				if($as.hasErrors) return !bs.hasErrors?-1:$as.errors == bs.errors?Reflect.compare(a,b):Reflect.compare($as.errors,bs.errors); else if(bs.hasErrors) return 1; else if($as.hasFailures) return !bs.hasFailures?-1:$as.failures == bs.failures?Reflect.compare(a,b):Reflect.compare($as.failures,bs.failures); else if(bs.hasFailures) return 1; else if($as.hasWarnings) return !bs.hasWarnings?-1:$as.warnings == bs.warnings?Reflect.compare(a,b):Reflect.compare($as.warnings,bs.warnings); else if(bs.hasWarnings) return 1; else return Reflect.compare(a,b);
			});
		} else names.sort(function(a,b) {
			return Reflect.compare(a,b);
		});
		return names;
	}
	,exists: function(method) {
		return this.fixtures.exists(method);
	}
	,get: function(method) {
		return this.fixtures.get(method);
	}
	,add: function(result) {
		if(this.fixtures.exists(result.methodName)) throw "invalid duplicated fixture result";
		this.stats.wire(result.stats);
		this.methods++;
		this.fixtures.set(result.methodName,result);
	}
	,stats: null
	,methods: null
	,hasTeardown: null
	,hasSetup: null
	,teardownName: null
	,setupName: null
	,className: null
	,fixtures: null
	,__class__: utest.ui.common.ClassResult
}
utest.ui.common.FixtureResult = function(methodName) {
	this.methodName = methodName;
	this.list = new List();
	this.hasTestError = false;
	this.hasSetupError = false;
	this.hasTeardownError = false;
	this.hasTimeoutError = false;
	this.hasAsyncError = false;
	this.stats = new utest.ui.common.ResultStats();
};
utest.ui.common.FixtureResult.__name__ = ["utest","ui","common","FixtureResult"];
utest.ui.common.FixtureResult.prototype = {
	add: function(assertation) {
		this.list.add(assertation);
		switch( (assertation)[1] ) {
		case 0:
			this.stats.addSuccesses(1);
			break;
		case 1:
			this.stats.addFailures(1);
			break;
		case 2:
			this.stats.addErrors(1);
			break;
		case 3:
			this.stats.addErrors(1);
			this.hasSetupError = true;
			break;
		case 4:
			this.stats.addErrors(1);
			this.hasTeardownError = true;
			break;
		case 5:
			this.stats.addErrors(1);
			this.hasTimeoutError = true;
			break;
		case 6:
			this.stats.addErrors(1);
			this.hasAsyncError = true;
			break;
		case 7:
			this.stats.addWarnings(1);
			break;
		}
	}
	,iterator: function() {
		return this.list.iterator();
	}
	,list: null
	,stats: null
	,hasAsyncError: null
	,hasTimeoutError: null
	,hasTeardownError: null
	,hasSetupError: null
	,hasTestError: null
	,methodName: null
	,__class__: utest.ui.common.FixtureResult
}
utest.ui.common.HeaderDisplayMode = { __ename__ : ["utest","ui","common","HeaderDisplayMode"], __constructs__ : ["AlwaysShowHeader","NeverShowHeader","ShowHeaderWithResults"] }
utest.ui.common.HeaderDisplayMode.AlwaysShowHeader = ["AlwaysShowHeader",0];
utest.ui.common.HeaderDisplayMode.AlwaysShowHeader.toString = $estr;
utest.ui.common.HeaderDisplayMode.AlwaysShowHeader.__enum__ = utest.ui.common.HeaderDisplayMode;
utest.ui.common.HeaderDisplayMode.NeverShowHeader = ["NeverShowHeader",1];
utest.ui.common.HeaderDisplayMode.NeverShowHeader.toString = $estr;
utest.ui.common.HeaderDisplayMode.NeverShowHeader.__enum__ = utest.ui.common.HeaderDisplayMode;
utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults = ["ShowHeaderWithResults",2];
utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults.toString = $estr;
utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults.__enum__ = utest.ui.common.HeaderDisplayMode;
utest.ui.common.SuccessResultsDisplayMode = { __ename__ : ["utest","ui","common","SuccessResultsDisplayMode"], __constructs__ : ["AlwaysShowSuccessResults","NeverShowSuccessResults","ShowSuccessResultsWithNoErrors"] }
utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults = ["AlwaysShowSuccessResults",0];
utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults.toString = $estr;
utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults.__enum__ = utest.ui.common.SuccessResultsDisplayMode;
utest.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults = ["NeverShowSuccessResults",1];
utest.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults.toString = $estr;
utest.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults.__enum__ = utest.ui.common.SuccessResultsDisplayMode;
utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors = ["ShowSuccessResultsWithNoErrors",2];
utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors.toString = $estr;
utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors.__enum__ = utest.ui.common.SuccessResultsDisplayMode;
utest.ui.common.IReport = function() { }
utest.ui.common.IReport.__name__ = ["utest","ui","common","IReport"];
utest.ui.common.IReport.prototype = {
	setHandler: null
	,displayHeader: null
	,displaySuccessResults: null
	,__class__: utest.ui.common.IReport
}
utest.ui.common.PackageResult = function(packageName) {
	this.packageName = packageName;
	this.classes = new haxe.ds.StringMap();
	this.packages = new haxe.ds.StringMap();
	this.stats = new utest.ui.common.ResultStats();
};
utest.ui.common.PackageResult.__name__ = ["utest","ui","common","PackageResult"];
utest.ui.common.PackageResult.prototype = {
	getOrCreatePackage: function(pack,flat,ref) {
		if(pack == null || pack == "") return ref;
		if(flat) {
			if(ref.existsPackage(pack)) return ref.getPackage(pack);
			var p = new utest.ui.common.PackageResult(pack);
			ref.addPackage(p);
			return p;
		} else {
			var parts = pack.split(".");
			var _g = 0;
			while(_g < parts.length) {
				var part = parts[_g];
				++_g;
				ref = this.getOrCreatePackage(part,true,ref);
			}
			return ref;
		}
	}
	,getOrCreateClass: function(pack,cls,setup,teardown) {
		if(pack.existsClass(cls)) return pack.getClass(cls);
		var c = new utest.ui.common.ClassResult(cls,setup,teardown);
		pack.addClass(c);
		return c;
	}
	,createFixture: function(method,assertations) {
		var f = new utest.ui.common.FixtureResult(method);
		var $it0 = $iterator(assertations)();
		while( $it0.hasNext() ) {
			var assertation = $it0.next();
			f.add(assertation);
		}
		return f;
	}
	,packageNames: function(errorsHavePriority) {
		if(errorsHavePriority == null) errorsHavePriority = true;
		var names = [];
		if(this.packageName == null) names.push("");
		var $it0 = this.packages.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			names.push(name);
		}
		if(errorsHavePriority) {
			var me = this;
			names.sort(function(a,b) {
				var $as = me.getPackage(a).stats;
				var bs = me.getPackage(b).stats;
				if($as.hasErrors) return !bs.hasErrors?-1:$as.errors == bs.errors?Reflect.compare(a,b):Reflect.compare($as.errors,bs.errors); else if(bs.hasErrors) return 1; else if($as.hasFailures) return !bs.hasFailures?-1:$as.failures == bs.failures?Reflect.compare(a,b):Reflect.compare($as.failures,bs.failures); else if(bs.hasFailures) return 1; else if($as.hasWarnings) return !bs.hasWarnings?-1:$as.warnings == bs.warnings?Reflect.compare(a,b):Reflect.compare($as.warnings,bs.warnings); else if(bs.hasWarnings) return 1; else return Reflect.compare(a,b);
			});
		} else names.sort(function(a,b) {
			return Reflect.compare(a,b);
		});
		return names;
	}
	,classNames: function(errorsHavePriority) {
		if(errorsHavePriority == null) errorsHavePriority = true;
		var names = [];
		var $it0 = this.classes.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			names.push(name);
		}
		if(errorsHavePriority) {
			var me = this;
			names.sort(function(a,b) {
				var $as = me.getClass(a).stats;
				var bs = me.getClass(b).stats;
				if($as.hasErrors) return !bs.hasErrors?-1:$as.errors == bs.errors?Reflect.compare(a,b):Reflect.compare($as.errors,bs.errors); else if(bs.hasErrors) return 1; else if($as.hasFailures) return !bs.hasFailures?-1:$as.failures == bs.failures?Reflect.compare(a,b):Reflect.compare($as.failures,bs.failures); else if(bs.hasFailures) return 1; else if($as.hasWarnings) return !bs.hasWarnings?-1:$as.warnings == bs.warnings?Reflect.compare(a,b):Reflect.compare($as.warnings,bs.warnings); else if(bs.hasWarnings) return 1; else return Reflect.compare(a,b);
			});
		} else names.sort(function(a,b) {
			return Reflect.compare(a,b);
		});
		return names;
	}
	,getClass: function(name) {
		return this.classes.get(name);
	}
	,getPackage: function(name) {
		if(this.packageName == null && name == "") return this;
		return this.packages.get(name);
	}
	,existsClass: function(name) {
		return this.classes.exists(name);
	}
	,existsPackage: function(name) {
		return this.packages.exists(name);
	}
	,addPackage: function(result) {
		this.packages.set(result.packageName,result);
		this.stats.wire(result.stats);
	}
	,addClass: function(result) {
		this.classes.set(result.className,result);
		this.stats.wire(result.stats);
	}
	,addResult: function(result,flattenPackage) {
		var pack = this.getOrCreatePackage(result.pack,flattenPackage,this);
		var cls = this.getOrCreateClass(pack,result.cls,result.setup,result.teardown);
		var fix = this.createFixture(result.method,result.assertations);
		cls.add(fix);
	}
	,stats: null
	,packages: null
	,classes: null
	,packageName: null
	,__class__: utest.ui.common.PackageResult
}
utest.ui.common.ReportTools = function() { }
utest.ui.common.ReportTools.__name__ = ["utest","ui","common","ReportTools"];
utest.ui.common.ReportTools.hasHeader = function(report,stats) {
	switch( (report.displayHeader)[1] ) {
	case 1:
		return false;
	case 2:
		if(!stats.isOk) return true;
		switch( (report.displaySuccessResults)[1] ) {
		case 1:
			return false;
		case 0:
		case 2:
			return true;
		}
		break;
	case 0:
		return true;
	}
}
utest.ui.common.ReportTools.skipResult = function(report,stats,isOk) {
	if(!stats.isOk) return false;
	return (function($this) {
		var $r;
		switch( (report.displaySuccessResults)[1] ) {
		case 1:
			$r = true;
			break;
		case 0:
			$r = false;
			break;
		case 2:
			$r = !isOk;
			break;
		}
		return $r;
	}(this));
}
utest.ui.common.ReportTools.hasOutput = function(report,stats) {
	if(!stats.isOk) return true;
	return utest.ui.common.ReportTools.hasHeader(report,stats);
}
utest.ui.common.ResultAggregator = function(runner,flattenPackage) {
	if(flattenPackage == null) flattenPackage = false;
	if(runner == null) throw "runner argument is null";
	this.flattenPackage = flattenPackage;
	this.runner = runner;
	runner.onStart.add($bind(this,this.start));
	runner.onProgress.add($bind(this,this.progress));
	runner.onComplete.add($bind(this,this.complete));
	this.onStart = new utest.Notifier();
	this.onComplete = new utest.Dispatcher();
	this.onProgress = new utest.Dispatcher();
};
utest.ui.common.ResultAggregator.__name__ = ["utest","ui","common","ResultAggregator"];
utest.ui.common.ResultAggregator.prototype = {
	complete: function(runner) {
		this.onComplete.dispatch(this.root);
	}
	,progress: function(e) {
		this.root.addResult(e.result,this.flattenPackage);
		this.onProgress.dispatch(e);
	}
	,createFixture: function(result) {
		var f = new utest.ui.common.FixtureResult(result.method);
		var $it0 = result.assertations.iterator();
		while( $it0.hasNext() ) {
			var assertation = $it0.next();
			f.add(assertation);
		}
		return f;
	}
	,getOrCreateClass: function(pack,cls,setup,teardown) {
		if(pack.existsClass(cls)) return pack.getClass(cls);
		var c = new utest.ui.common.ClassResult(cls,setup,teardown);
		pack.addClass(c);
		return c;
	}
	,getOrCreatePackage: function(pack,flat,ref) {
		if(ref == null) ref = this.root;
		if(pack == null || pack == "") return ref;
		if(flat) {
			if(ref.existsPackage(pack)) return ref.getPackage(pack);
			var p = new utest.ui.common.PackageResult(pack);
			ref.addPackage(p);
			return p;
		} else {
			var parts = pack.split(".");
			var _g = 0;
			while(_g < parts.length) {
				var part = parts[_g];
				++_g;
				ref = this.getOrCreatePackage(part,true,ref);
			}
			return ref;
		}
	}
	,start: function(runner) {
		this.root = new utest.ui.common.PackageResult(null);
		this.onStart.dispatch();
	}
	,onProgress: null
	,onComplete: null
	,onStart: null
	,root: null
	,flattenPackage: null
	,runner: null
	,__class__: utest.ui.common.ResultAggregator
}
utest.ui.common.ResultStats = function() {
	this.assertations = 0;
	this.successes = 0;
	this.failures = 0;
	this.errors = 0;
	this.warnings = 0;
	this.isOk = true;
	this.hasFailures = false;
	this.hasErrors = false;
	this.hasWarnings = false;
	this.onAddSuccesses = new utest.Dispatcher();
	this.onAddFailures = new utest.Dispatcher();
	this.onAddErrors = new utest.Dispatcher();
	this.onAddWarnings = new utest.Dispatcher();
};
utest.ui.common.ResultStats.__name__ = ["utest","ui","common","ResultStats"];
utest.ui.common.ResultStats.prototype = {
	unwire: function(dependant) {
		dependant.onAddSuccesses.remove($bind(this,this.addSuccesses));
		dependant.onAddFailures.remove($bind(this,this.addFailures));
		dependant.onAddErrors.remove($bind(this,this.addErrors));
		dependant.onAddWarnings.remove($bind(this,this.addWarnings));
		this.subtract(dependant);
	}
	,wire: function(dependant) {
		dependant.onAddSuccesses.add($bind(this,this.addSuccesses));
		dependant.onAddFailures.add($bind(this,this.addFailures));
		dependant.onAddErrors.add($bind(this,this.addErrors));
		dependant.onAddWarnings.add($bind(this,this.addWarnings));
		this.sum(dependant);
	}
	,subtract: function(other) {
		this.addSuccesses(-other.successes);
		this.addFailures(-other.failures);
		this.addErrors(-other.errors);
		this.addWarnings(-other.warnings);
	}
	,sum: function(other) {
		this.addSuccesses(other.successes);
		this.addFailures(other.failures);
		this.addErrors(other.errors);
		this.addWarnings(other.warnings);
	}
	,addWarnings: function(v) {
		if(v == 0) return;
		this.assertations += v;
		this.warnings += v;
		this.hasWarnings = this.warnings > 0;
		this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
		this.onAddWarnings.dispatch(v);
	}
	,addErrors: function(v) {
		if(v == 0) return;
		this.assertations += v;
		this.errors += v;
		this.hasErrors = this.errors > 0;
		this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
		this.onAddErrors.dispatch(v);
	}
	,addFailures: function(v) {
		if(v == 0) return;
		this.assertations += v;
		this.failures += v;
		this.hasFailures = this.failures > 0;
		this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
		this.onAddFailures.dispatch(v);
	}
	,addSuccesses: function(v) {
		if(v == 0) return;
		this.assertations += v;
		this.successes += v;
		this.onAddSuccesses.dispatch(v);
	}
	,hasWarnings: null
	,hasErrors: null
	,hasFailures: null
	,isOk: null
	,onAddWarnings: null
	,onAddErrors: null
	,onAddFailures: null
	,onAddSuccesses: null
	,warnings: null
	,errors: null
	,failures: null
	,successes: null
	,assertations: null
	,__class__: utest.ui.common.ResultStats
}
utest.ui.text = {}
utest.ui.text.HtmlReport = function(runner,outputHandler,traceRedirected) {
	if(traceRedirected == null) traceRedirected = true;
	this.aggregator = new utest.ui.common.ResultAggregator(runner,true);
	runner.onStart.add($bind(this,this.start));
	this.aggregator.onComplete.add($bind(this,this.complete));
	if(null == outputHandler) this.setHandler($bind(this,this._handler)); else this.setHandler(outputHandler);
	if(traceRedirected) this.redirectTrace();
	this.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = utest.ui.common.HeaderDisplayMode.AlwaysShowHeader;
};
utest.ui.text.HtmlReport.__name__ = ["utest","ui","text","HtmlReport"];
utest.ui.text.HtmlReport.__interfaces__ = [utest.ui.common.IReport];
utest.ui.text.HtmlReport.prototype = {
	_handler: function(report) {
		var isDef = function(v) {
			return typeof v != 'undefined';
		};
		var head = js.Browser.document.getElementsByTagName("head")[0];
		var script = js.Browser.document.createElement("script");
		script.type = "text/javascript";
		var sjs = report.jsScript();
		if(isDef(script.text)) script.text = sjs; else script.innerHTML = sjs;
		head.appendChild(script);
		var style = js.Browser.document.createElement("style");
		style.type = "text/css";
		var scss = report.cssStyle();
		if(isDef(style.styleSheet)) style.styleSheet.cssText = scss; else if(isDef(style.cssText)) style.cssText = scss; else if(isDef(style.innerText)) style.innerText = scss; else style.innerHTML = scss;
		head.appendChild(style);
		var el = js.Browser.document.getElementById("utest-results");
		if(null == el) {
			el = js.Browser.document.createElement("div");
			el.id = "utest-results";
			js.Browser.document.body.appendChild(el);
		}
		el.innerHTML = report.getAll();
	}
	,wrapHtml: function(title,s) {
		return "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n<title>" + title + "</title>\n\t\t\t<style type=\"text/css\">" + this.cssStyle() + "</style>\n\t\t\t<script type=\"text/javascript\">\n" + this.jsScript() + "\n</script>\n</head>\n\t\t\t<body>\n" + s + "\n</body>\n</html>";
	}
	,jsScript: function() {
		return "function utestTooltip(ref, text) {\n\tvar el = document.getElementById(\"utesttip\");\n\tif(!el) {\n\t\tvar el = document.createElement(\"div\")\n\t\tel.id = \"utesttip\";\n\t\tel.style.position = \"absolute\";\n\t\tdocument.body.appendChild(el)\n\t}\n\tvar p = utestFindPos(ref);\n\tel.style.left = (4 + p[0]) + \"px\";\n\tel.style.top = (p[1] - 1) + \"px\";\n\tel.innerHTML =  text;\n}\n\nfunction utestFindPos(el) {\n\tvar left = 0;\n\tvar top = 0;\n\tdo {\n\t\tleft += el.offsetLeft;\n\t\ttop += el.offsetTop;\n\t} while(el = el.offsetParent)\n\treturn [left, top];\n}\n\nfunction utestRemoveTooltip() {\n\tvar el = document.getElementById(\"utesttip\")\n\tif(el)\n\t\tdocument.body.removeChild(el)\n}";
	}
	,cssStyle: function() {
		return "body, dd, dt {\n\tfont-family: Verdana, Arial, Sans-serif;\n\tfont-size: 12px;\n}\ndl {\n\twidth: 180px;\n}\ndd, dt {\n\tmargin : 0;\n\tpadding : 2px 5px;\n\tborder-top: 1px solid #f0f0f0;\n\tborder-left: 1px solid #f0f0f0;\n\tborder-right: 1px solid #CCCCCC;\n\tborder-bottom: 1px solid #CCCCCC;\n}\ndd.value {\n\ttext-align: center;\n\tbackground-color: #eeeeee;\n}\ndt {\n\ttext-align: left;\n\tbackground-color: #e6e6e6;\n\tfloat: left;\n\twidth: 100px;\n}\n\nh1, h2, h3, h4, h5, h6 {\n\tmargin: 0;\n\tpadding: 0;\n}\n\nh1 {\n\ttext-align: center;\n\tfont-weight: bold;\n\tpadding: 5px 0 4px 0;\n\tfont-family: Arial, Sans-serif;\n\tfont-size: 18px;\n\tborder-top: 1px solid #f0f0f0;\n\tborder-left: 1px solid #f0f0f0;\n\tborder-right: 1px solid #CCCCCC;\n\tborder-bottom: 1px solid #CCCCCC;\n\tmargin: 0 2px 0px 2px;\n}\n\nh2 {\n\tfont-weight: bold;\n\tpadding: 2px 0 2px 8px;\n\tfont-family: Arial, Sans-serif;\n\tfont-size: 13px;\n\tborder-top: 1px solid #f0f0f0;\n\tborder-left: 1px solid #f0f0f0;\n\tborder-right: 1px solid #CCCCCC;\n\tborder-bottom: 1px solid #CCCCCC;\n\tmargin: 0 0 0px 0;\n\tbackground-color: #FFFFFF;\n\tcolor: #777777;\n}\n\nh2.classname {\n\tcolor: #000000;\n}\n\n.okbg {\n\tbackground-color: #66FF55;\n}\n.errorbg {\n\tbackground-color: #CC1100;\n}\n.failurebg {\n\tbackground-color: #EE3322;\n}\n.warnbg {\n\tbackground-color: #FFCC99;\n}\n.headerinfo {\n\ttext-align: right;\n\tfont-size: 11px;\n\tfont - color: 0xCCCCCC;\n\tmargin: 0 2px 5px 2px;\n\tborder-left: 1px solid #f0f0f0;\n\tborder-right: 1px solid #CCCCCC;\n\tborder-bottom: 1px solid #CCCCCC;\n\tpadding: 2px;\n}\n\nli {\n\tpadding: 4px;\n\tmargin: 2px;\n\tborder-top: 1px solid #f0f0f0;\n\tborder-left: 1px solid #f0f0f0;\n\tborder-right: 1px solid #CCCCCC;\n\tborder-bottom: 1px solid #CCCCCC;\n\tbackground-color: #e6e6e6;\n}\n\nli.fixture {\n\tbackground-color: #f6f6f6;\n\tpadding-bottom: 6px;\n}\n\ndiv.fixturedetails {\n\tpadding-left: 108px;\n}\n\nul {\n\tpadding: 0;\n\tmargin: 6px 0 0 0;\n\tlist-style-type: none;\n}\n\nol {\n\tpadding: 0 0 0 28px;\n\tmargin: 0px 0 0 0;\n}\n\n.statnumbers {\n\tpadding: 2px 8px;\n}\n\n.fixtureresult {\n\twidth: 100px;\n\ttext-align: center;\n\tdisplay: block;\n\tfloat: left;\n\tfont-weight: bold;\n\tpadding: 1px;\n\tmargin: 0 0 0 0;\n}\n\n.testoutput {\n\tborder: 1px dashed #CCCCCC;\n\tmargin: 4px 0 0 0;\n\tpadding: 4px 8px;\n\tbackground-color: #eeeeee;\n}\n\nspan.tracepos, span.traceposempty {\n\tdisplay: block;\n\tfloat: left;\n\tfont-weight: bold;\n\tfont-size: 9px;\n\twidth: 170px;\n\tmargin: 2px 0 0 2px;\n}\n\nspan.tracepos:hover {\n\tcursor : pointer;\n\tbackground-color: #ffff99;\n}\n\nspan.tracemsg {\n\tdisplay: block;\n\tmargin-left: 180px;\n\tbackground-color: #eeeeee;\n\tpadding: 7px;\n}\n\nspan.tracetime {\n\tdisplay: block;\n\tfloat: right;\n\tmargin: 2px;\n\tfont-size: 9px;\n\tcolor: #777777;\n}\n\n\ndiv.trace ol {\n\tpadding: 0 0 0 40px;\n\tcolor: #777777;\n}\n\ndiv.trace li {\n\tpadding: 0;\n}\n\ndiv.trace li div.li {\n\tcolor: #000000;\n}\n\ndiv.trace h2 {\n\tmargin: 0 2px 0px 2px;\n\tpadding-left: 4px;\n}\n\n.tracepackage {\n\tcolor: #777777;\n\tfont-weight: normal;\n}\n\n.clr {\n\tclear: both;\n}\n\n#utesttip {\n\tmargin-top: -3px;\n\tmargin-left: 170px;\n\tfont-size: 9px;\n}\n\n#utesttip li {\n\tmargin: 0;\n\tbackground-color: #ffff99;\n\tpadding: 2px 4px;\n\tborder: 0;\n\tborder-bottom: 1px dashed #ffff33;\n}";
	}
	,formatTime: function(t) {
		return Math.round(t * 1000) + " ms";
	}
	,complete: function(result) {
		this.result = result;
		this.handler(this);
		this.restoreTrace();
	}
	,result: null
	,getHtml: function(title) {
		if(null == title) title = "utest: " + utest.ui.text.HtmlReport.platform;
		var s = this.getAll();
		if("" == s) return ""; else return this.wrapHtml(title,s);
	}
	,getAll: function() {
		if(!utest.ui.common.ReportTools.hasOutput(this,this.result.stats)) return ""; else return this.getHeader() + this.getTrace() + this.getResults();
	}
	,getResults: function() {
		var buf = new StringBuf();
		this.addPackages(buf,this.result,this.result.stats.isOk);
		return buf.b;
	}
	,getTrace: function() {
		var buf = new StringBuf();
		if(this._traces == null || this._traces.length == 0) return "";
		buf.b += "<div class=\"trace\"><h2>traces</h2><ol>";
		var _g = 0, _g1 = this._traces;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			buf.b += "<li><div class=\"li\">";
			var stack = StringTools.replace(this.formatStack(t.stack,false),"'","\\'");
			var method = "<span class=\"tracepackage\">" + t.infos.className + "</span><br/>" + t.infos.methodName + "(" + t.infos.lineNumber + ")";
			buf.b += Std.string("<span class=\"tracepos\" onmouseover=\"utestTooltip(this.parentNode, '" + stack + "')\" onmouseout=\"utestRemoveTooltip()\">");
			buf.b += Std.string(method);
			buf.b += "</span><span class=\"tracetime\">";
			buf.b += Std.string("@ " + this.formatTime(t.time));
			if(Math.round(t.delta * 1000) > 0) buf.b += Std.string(", ~" + this.formatTime(t.delta));
			buf.b += "</span><span class=\"tracemsg\">";
			buf.b += Std.string(StringTools.replace(StringTools.trim(t.msg),"\n","<br/>\n"));
			buf.b += "</span><div class=\"clr\"></div></div></li>";
		}
		buf.b += "</ol></div>";
		return buf.b;
	}
	,getHeader: function() {
		var buf = new StringBuf();
		if(!utest.ui.common.ReportTools.hasHeader(this,this.result.stats)) return "";
		var end = haxe.Timer.stamp();
		var time = ((end - this.startTime) * 1000 | 0) / 1000;
		var msg = "TEST OK";
		if(this.result.stats.hasErrors) msg = "TEST ERRORS"; else if(this.result.stats.hasFailures) msg = "TEST FAILED"; else if(this.result.stats.hasWarnings) msg = "WARNING REPORTED";
		buf.b += Std.string("<h1 class=\"" + this.cls(this.result.stats) + "bg header\">" + msg + "</h1>\n");
		buf.b += "<div class=\"headerinfo\">";
		this.resultNumbers(buf,this.result.stats);
		buf.b += Std.string(" performed on <strong>" + utest.ui.text.HtmlReport.platform + "</strong>, executed in <strong> " + time + " sec. </strong></div >\n ");
		return buf.b;
	}
	,addPackage: function(buf,result,name,isOk) {
		if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
		if(name == "" && result.classNames().length == 0) return;
		buf.b += "<li>";
		buf.b += Std.string("<h2>" + name + "</h2>");
		this.blockNumbers(buf,result.stats);
		buf.b += "<ul>\n";
		var _g = 0, _g1 = result.classNames();
		while(_g < _g1.length) {
			var cname = _g1[_g];
			++_g;
			this.addClass(buf,result.getClass(cname),cname,isOk);
		}
		buf.b += "</ul>\n";
		buf.b += "</li>\n";
	}
	,addPackages: function(buf,result,isOk) {
		if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
		buf.b += "<ul id=\"utest-results-packages\">\n";
		var _g = 0, _g1 = result.packageNames(false);
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			this.addPackage(buf,result.getPackage(name),name,isOk);
		}
		buf.b += "</ul>\n";
	}
	,addClass: function(buf,result,name,isOk) {
		if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
		buf.b += "<li>";
		buf.b += Std.string("<h2 class=\"classname\">" + name + "</h2>");
		this.blockNumbers(buf,result.stats);
		buf.b += "<ul>\n";
		var _g = 0, _g1 = result.methodNames();
		while(_g < _g1.length) {
			var mname = _g1[_g];
			++_g;
			this.addFixture(buf,result.get(mname),mname,isOk);
		}
		buf.b += "</ul>\n";
		buf.b += "</li>\n";
	}
	,getErrorStack: function(s,e) {
		return this.formatStack(s);
	}
	,getErrorDescription: function(e) {
		return Std.string(e);
	}
	,addFixture: function(buf,result,name,isOk) {
		if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
		buf.b += "<li class=\"fixture\"><div class=\"li\">";
		buf.b += Std.string("<span class=\"" + this.cls(result.stats) + "bg fixtureresult\">");
		if(result.stats.isOk) buf.b += "OK "; else if(result.stats.hasErrors) buf.b += "ERROR "; else if(result.stats.hasFailures) buf.b += "FAILURE "; else if(result.stats.hasWarnings) buf.b += "WARNING ";
		buf.b += "</span>";
		buf.b += "<div class=\"fixturedetails\">";
		buf.b += Std.string("<strong>" + name + "</strong>");
		buf.b += ": ";
		this.resultNumbers(buf,result.stats);
		var messages = [];
		var $it0 = result.iterator();
		while( $it0.hasNext() ) {
			var assertation = $it0.next();
			var $e = (assertation);
			switch( $e[1] ) {
			case 0:
				break;
			case 1:
				var pos = $e[3], msg = $e[2];
				messages.push("<strong>line " + pos.lineNumber + "</strong>: <em>" + StringTools.htmlEscape(msg) + "</em>");
				break;
			case 2:
				var s = $e[3], e = $e[2];
				messages.push("<strong>error</strong>: <em>" + this.getErrorDescription(e) + "</em>\n<br/><strong>stack</strong>:" + this.getErrorStack(s,e));
				break;
			case 3:
				var s = $e[3], e = $e[2];
				messages.push("<strong>setup error</strong>: " + this.getErrorDescription(e) + "\n<br/><strong>stack</strong>:" + this.getErrorStack(s,e));
				break;
			case 4:
				var s = $e[3], e = $e[2];
				messages.push("<strong>tear-down error</strong>: " + this.getErrorDescription(e) + "\n<br/><strong>stack</strong>:" + this.getErrorStack(s,e));
				break;
			case 5:
				var assertation_eTimeoutError_1 = $e[3], missedAsyncs = $e[2];
				messages.push("<strong>missed async call(s)</strong>: " + missedAsyncs);
				break;
			case 6:
				var s = $e[3], e = $e[2];
				messages.push("<strong>async error</strong>: " + this.getErrorDescription(e) + "\n<br/><strong>stack</strong>:" + this.getErrorStack(s,e));
				break;
			case 7:
				var msg = $e[2];
				messages.push(StringTools.htmlEscape(msg));
				break;
			}
		}
		if(messages.length > 0) {
			buf.b += "<div class=\"testoutput\">";
			buf.b += Std.string(messages.join("<br/>"));
			buf.b += "</div>\n";
		}
		buf.b += "</div>\n";
		buf.b += "</div></li>\n";
	}
	,formatStack: function(stack,addNL) {
		if(addNL == null) addNL = true;
		var parts = [];
		var nl = addNL?"\n":"";
		var last = null;
		var count = 1;
		var _g = 0, _g1 = haxe.CallStack.toString(stack).split("\n");
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			if(StringTools.trim(part) == "") continue;
			if(-1 < part.indexOf("Called from utest.")) continue;
			if(part == last) parts[parts.length - 1] = part + " (#" + ++count + ")"; else {
				count = 1;
				parts.push(last = part);
			}
		}
		var s = "<ul><li>" + parts.join("</li>" + nl + "<li>") + "</li></ul>" + nl;
		return "<div>" + s + "</div>" + nl;
	}
	,blockNumbers: function(buf,stats) {
		buf.b += Std.string("<div class=\"" + this.cls(stats) + "bg statnumbers\">");
		this.resultNumbers(buf,stats);
		buf.b += "</div>";
	}
	,resultNumbers: function(buf,stats) {
		var numbers = [];
		if(stats.assertations == 1) numbers.push("<strong>1</strong> test"); else numbers.push("<strong>" + stats.assertations + "</strong> tests");
		if(stats.successes != stats.assertations) {
			if(stats.successes == 1) numbers.push("<strong>1</strong> pass"); else if(stats.successes > 0) numbers.push("<strong>" + stats.successes + "</strong> passes");
		}
		if(stats.errors == 1) numbers.push("<strong>1</strong> error"); else if(stats.errors > 0) numbers.push("<strong>" + stats.errors + "</strong> errors");
		if(stats.failures == 1) numbers.push("<strong>1</strong> failure"); else if(stats.failures > 0) numbers.push("<strong>" + stats.failures + "</strong> failures");
		if(stats.warnings == 1) numbers.push("<strong>1</strong> warning"); else if(stats.warnings > 0) numbers.push("<strong>" + stats.warnings + "</strong> warnings");
		buf.b += Std.string(numbers.join(", "));
	}
	,cls: function(stats) {
		if(stats.hasErrors) return "error"; else if(stats.hasFailures) return "failure"; else if(stats.hasWarnings) return "warn"; else return "ok";
	}
	,start: function(e) {
		this.startTime = haxe.Timer.stamp();
	}
	,startTime: null
	,_trace: function(v,infos) {
		var time = haxe.Timer.stamp();
		var delta = this._traceTime == null?0:time - this._traceTime;
		this._traces.push({ msg : StringTools.htmlEscape(Std.string(v)), infos : infos, time : time - this.startTime, delta : delta, stack : haxe.CallStack.callStack()});
		this._traceTime = haxe.Timer.stamp();
	}
	,_traceTime: null
	,restoreTrace: function() {
		if(!this.traceRedirected) return;
		haxe.Log.trace = this.oldTrace;
	}
	,redirectTrace: function() {
		if(this.traceRedirected) return;
		this._traces = [];
		this.oldTrace = haxe.Log.trace;
		haxe.Log.trace = $bind(this,this._trace);
	}
	,setHandler: function(handler) {
		this.handler = handler;
	}
	,_traces: null
	,oldTrace: null
	,aggregator: null
	,handler: null
	,displayHeader: null
	,displaySuccessResults: null
	,traceRedirected: null
	,__class__: utest.ui.text.HtmlReport
}
utest.ui.text.PlainTextReport = function(runner,outputHandler) {
	this.aggregator = new utest.ui.common.ResultAggregator(runner,true);
	runner.onStart.add($bind(this,this.start));
	this.aggregator.onComplete.add($bind(this,this.complete));
	if(null != outputHandler) this.setHandler(outputHandler);
	this.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = utest.ui.common.HeaderDisplayMode.AlwaysShowHeader;
};
utest.ui.text.PlainTextReport.__name__ = ["utest","ui","text","PlainTextReport"];
utest.ui.text.PlainTextReport.__interfaces__ = [utest.ui.common.IReport];
utest.ui.text.PlainTextReport.prototype = {
	complete: function(result) {
		this.result = result;
		this.handler(this);
	}
	,getResults: function() {
		var buf = new StringBuf();
		this.addHeader(buf,this.result);
		var _g = 0, _g1 = this.result.packageNames();
		while(_g < _g1.length) {
			var pname = _g1[_g];
			++_g;
			var pack = this.result.getPackage(pname);
			if(utest.ui.common.ReportTools.skipResult(this,pack.stats,this.result.stats.isOk)) continue;
			var _g2 = 0, _g3 = pack.classNames();
			while(_g2 < _g3.length) {
				var cname = _g3[_g2];
				++_g2;
				var cls = pack.getClass(cname);
				if(utest.ui.common.ReportTools.skipResult(this,cls.stats,this.result.stats.isOk)) continue;
				buf.b += Std.string((pname == ""?"":pname + ".") + cname + this.newline);
				var _g4 = 0, _g5 = cls.methodNames();
				while(_g4 < _g5.length) {
					var mname = _g5[_g4];
					++_g4;
					var fix = cls.get(mname);
					if(utest.ui.common.ReportTools.skipResult(this,fix.stats,this.result.stats.isOk)) continue;
					buf.b += Std.string(this.indents(1) + mname + ": ");
					if(fix.stats.isOk) buf.b += "OK "; else if(fix.stats.hasErrors) buf.b += "ERROR "; else if(fix.stats.hasFailures) buf.b += "FAILURE "; else if(fix.stats.hasWarnings) buf.b += "WARNING ";
					var messages = "";
					var $it0 = fix.iterator();
					while( $it0.hasNext() ) {
						var assertation = $it0.next();
						var $e = (assertation);
						switch( $e[1] ) {
						case 0:
							buf.b += ".";
							break;
						case 1:
							var pos = $e[3], msg = $e[2];
							buf.b += "F";
							messages += this.indents(2) + "line: " + pos.lineNumber + ", " + msg + this.newline;
							break;
						case 2:
							var s = $e[3], e = $e[2];
							buf.b += "E";
							messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
							break;
						case 3:
							var s = $e[3], e = $e[2];
							buf.b += "S";
							messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
							break;
						case 4:
							var s = $e[3], e = $e[2];
							buf.b += "T";
							messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
							break;
						case 5:
							var s = $e[3], missedAsyncs = $e[2];
							buf.b += "O";
							messages += this.indents(2) + "missed async calls: " + missedAsyncs + this.dumpStack(s) + this.newline;
							break;
						case 6:
							var s = $e[3], e = $e[2];
							buf.b += "A";
							messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
							break;
						case 7:
							var msg = $e[2];
							buf.b += "W";
							messages += this.indents(2) + msg + this.newline;
							break;
						}
					}
					buf.b += Std.string(this.newline);
					buf.b += Std.string(messages);
				}
			}
		}
		return buf.b;
	}
	,result: null
	,addHeader: function(buf,result) {
		if(!utest.ui.common.ReportTools.hasHeader(this,result.stats)) return;
		var end = haxe.Timer.stamp();
		var time = ((end - this.startTime) * 1000 | 0) / 1000;
		buf.b += Std.string("results: " + (result.stats.isOk?"ALL TESTS OK":"SOME TESTS FAILURES") + this.newline + this.newline);
		buf.b += Std.string("assertations: " + result.stats.assertations + this.newline);
		buf.b += Std.string("successes: " + result.stats.successes + this.newline);
		buf.b += Std.string("errors: " + result.stats.errors + this.newline);
		buf.b += Std.string("failures: " + result.stats.failures + this.newline);
		buf.b += Std.string("warnings: " + result.stats.warnings + this.newline);
		buf.b += Std.string("execution time: " + time + this.newline);
		buf.b += Std.string(this.newline);
	}
	,dumpStack: function(stack) {
		if(stack.length == 0) return "";
		var parts = haxe.CallStack.toString(stack).split("\n"), r = [];
		var _g = 0;
		while(_g < parts.length) {
			var part = parts[_g];
			++_g;
			if(part.indexOf(" utest.") >= 0) continue;
			r.push(part);
		}
		return r.join(this.newline);
	}
	,indents: function(c) {
		var s = "";
		var _g = 0;
		while(_g < c) {
			var _ = _g++;
			s += this.indent;
		}
		return s;
	}
	,start: function(e) {
		this.startTime = haxe.Timer.stamp();
	}
	,startTime: null
	,setHandler: function(handler) {
		this.handler = handler;
	}
	,indent: null
	,newline: null
	,aggregator: null
	,handler: null
	,displayHeader: null
	,displaySuccessResults: null
	,__class__: utest.ui.text.PlainTextReport
}
utest.ui.text.PrintReport = function(runner) {
	utest.ui.text.PlainTextReport.call(this,runner,$bind(this,this._handler));
	this.newline = "\n";
	this.indent = "  ";
};
utest.ui.text.PrintReport.__name__ = ["utest","ui","text","PrintReport"];
utest.ui.text.PrintReport.__super__ = utest.ui.text.PlainTextReport;
utest.ui.text.PrintReport.prototype = $extend(utest.ui.text.PlainTextReport.prototype,{
	_trace: function(s) {
		s = StringTools.replace(s,"  ",this.indent);
		s = StringTools.replace(s,"\n",this.newline);
		haxe.Log.trace(s,{ fileName : "PrintReport.hx", lineNumber : 65, className : "utest.ui.text.PrintReport", methodName : "_trace"});
	}
	,_handler: function(report) {
		this._trace(report.getResults());
	}
	,useTrace: null
	,__class__: utest.ui.text.PrintReport
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.prototype.__class__ = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
js.Browser.document = typeof window != "undefined" ? window.document : null;
mconsole.ConsoleView.CONSOLE_STYLES = "#console {\n\tfont-family:monospace;\n\tbackground-color:#002B36;\n\tbackground-color:rgba(0%,16.9%,21.2%,0.95);\n\tpadding:8px;\n\theight:600px;\n\tmax-height:600px;\n\toverflow-y:scroll;\n\tposition:absolute;\n\tleft:0px;\n\ttop:0px;\n\tright:0px;\n\tmargin:0px;\n\tz-index:10000;\n}\n#console a { text-decoration:none; }\n#console a:hover div { background-color:#063642 }\n#console a div span { display:none; float:right; color:white; }\n#console a:hover div span { display:block; }";
mconsole.Console.defaultPrinter = new mconsole.ConsoleView();
mconsole.Console.printers = [mconsole.Console.defaultPrinter];
mconsole.Console.groupDepth = 0;
mconsole.Console.times = new haxe.ds.StringMap();
mconsole.Console.counts = new haxe.ds.StringMap();
mconsole.Console.running = false;
mconsole.Console.dirxml = "dirxml";
mconsole.Console.hasConsole = mconsole.Console.detectConsole();
mconsole.ConsoleMacro.__meta__ = { obj : { IgnoreCover : null}};
mconsole.StackHelper.filters = mconsole.StackHelper.createFilters();
utest.TestHandler.POLLING_TIME = 10;
utest.ui.text.HtmlReport.platform = "javascript";
TestMain.main();
})();
