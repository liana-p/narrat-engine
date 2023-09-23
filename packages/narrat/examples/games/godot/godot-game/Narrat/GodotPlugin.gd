extends Node
const NarratBridge = preload("res://Narrat/NarratBridge.gd")

signal narrat_message(message: NarratMessage)
signal narrat_ready()

@export var bridgeNode: Node

var bridge: NarratBridge
# Called when the node enters the scene tree for the first time.
func _ready():
	bridge = bridgeNode
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

func process_narrat_message(rawMessage: String):
	var json = JSON.new()
	var error = json.parse(rawMessage);
	if error == OK:
		var message: NarratMessage = json.data
		narrat_message.emit(message)
	else:
		print("JSON Parse Error in Narrat message: ", json.get_error_message(), " in ", rawMessage, " at line ", json.get_error_line())


func _on_narrat_bridge_bridge_ready():
	narrat_ready.emit()
	pass # Replace with function body.


func _on_narrat_bridge_narrat_message(message):
	if (message.type == 'pause'):
		get_tree().paused = true
	if (message.type == 'resume'):
		get_tree().paused = false
	narrat_message.emit(message)
	pass # Replace with function body.
