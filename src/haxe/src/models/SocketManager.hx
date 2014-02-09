package models;

import js.html.MessageEvent;
import models.EventSource;

class SocketManager{
    private var _eventSource: EventSource;
    private var _listeners: Array<String->Void>;

    public function new(url: String){
        _startRecieving(url);
        _listeners = [];
    }

    private function _startRecieving(url: String){
        _eventSource = new EventSource(url);
        _eventSource.onmessage = function(e: MessageEvent){
            trace(e.data);
            for(listener in _listeners){
            }
        }
    }

    public function addListener(callback: String->Void){
        _listeners.push(callback);
    }
}