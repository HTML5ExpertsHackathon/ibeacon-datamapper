import models.Adapter;
import js.Browser;

class Main {
    public static function main() {
        js.Browser.window.onload = function(e){
            trace(e);
            var adapter = new Adapter();
            adapter.callback = function(item: Dynamic){
                trace("callback");
                trace(item);
            }
        };
    }

    public function new(){

    }
}

