import models.Adapter;
import js.Browser;

class Main {
    public static function main() {
        js.Browser.window.onload = function(e){
            var adapter = new Adapter();
            adapter.callback = function(item: Dynamic){
                trace(item);
            }
        };
    }

    public function new(){

    }
}

