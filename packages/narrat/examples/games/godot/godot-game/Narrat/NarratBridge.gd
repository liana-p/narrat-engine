extends Node

var narrat: Object
var godot: Object
var window: Object

signal narrat_message(message: NarratMessage)
signal bridge_ready()

var _narrat_callback_ref = JavaScriptBridge.create_callback(_narrat_callback)
var _narrat_ready_ref = JavaScriptBridge.create_callback(_narrat_ready)

func _ready():
	print("Trying to find window")
	window = JavaScriptBridge.get_interface("window")
	if (window):
		print("window found, setting up callbacks")
		window.narratReadyCallback = _narrat_ready_ref
		window.godotReadyCallback();

func _narrat_ready(args: Array):
	print("narrat ready")
	get_bridge()
	bridge_ready.emit()
	print("bridge ready")

func _narrat_callback(args: Array):
	print("narrat message received")
	var message = args[0]
	narrat_message.emit(message);

func get_bridge():
	narrat = JavaScriptBridge.get_interface("narrat");
	godot = JavaScriptBridge.get_interface("godot");
	print("setting up narrat godot callback")
	window.godotCallback = _narrat_callback_ref
