extends CharacterBody3D
const NarratBridge = preload("res://Narrat/NarratBridge.gd")
@export var root: Node3D
@export var cubePrefab: Resource
@export var spherePrefab: Resource
@export var narrat_plugin: Node

var bridge: NarratBridge

var gravity = ProjectSettings.get_setting("physics/3d/default_gravity")
var speed = 4.0  # movement speed
var jump_speed = 6.0  # determines jump height
var mouse_sensitivity = 0.006  # turning speed


func _ready():
	bridge = narrat_plugin.get_node("NarratBridge");

func get_input():
	var input = Input.get_vector("left", "right", "forward", "back")
	var movement_dir = transform.basis * Vector3(input.x, 0, input.y)
	velocity.x = movement_dir.x * speed
	velocity.z = movement_dir.z * speed

func _physics_process(delta):
	velocity.y += -gravity * delta
	get_input()
	move_and_slide()

func _unhandled_input(event):
	if event is InputEventMouseMotion:
		rotate_y(-event.relative.x * mouse_sensitivity)


func _on_area_3d_area_shape_entered(area_rid, area, area_shape_index, local_shape_index):
	print("Area entered?")
	pass # Replace with function body.


func _on_area_3d_body_entered(body):
	if (body == self):
		print("Hello")
		if (bridge.godot):
			print("We have a bridge")
			bridge.godot.run('talk_character')
			get_tree().paused = true


func _on_godot_plugin_narrat_message(message):
	print("Message from narrat!")
	if (message.type == "run_end"):
		get_tree().paused = false
		print("A label ended")
		var label = message.payload.label
		var result = message.payload.result
		print("Label " + label + " Result " + result)
		if (label == 'talk_character'):
			if (result == 'a'):
				spawn_sphere()
			elif (result == 'b'):
				spawn_cube()
			after_message()
		if (label == 'after_talk'):
			if (result == 'c'):
				big_spawn()
				after_big_spawn()
		if (label == 'last_thing'):
			if (result == 'e'):
				mega_spawn()

func after_message():
	await get_tree().create_timer(3.0).timeout
	bridge.godot.run('after_talk')	
		
func after_big_spawn():
	await get_tree().create_timer(3.0).timeout
	bridge.godot.run('last_thing')

func spawn_sphere():
	var sphere: Node3D = spherePrefab.instantiate()
	sphere.translate(Vector3(0, 10, 0));
	root.add_child.call_deferred(sphere)
	
func spawn_cube():
	for n in range(0, 50):
		var cube: Node3D = cubePrefab.instantiate()
		var x = randf() * 20 - 10
		var z = randf() * 20 - 10
		var y = randf() * 5 + 5
		cube.translate(Vector3(x, y, z));
		cube.rotate(Vector3(randf() * 300, randf() * 300, randf() * 300), randf() * 300);
		root.add_child.call_deferred(cube);

func big_spawn():
	for n in range(0, 10):
		var choice = randi() % 2;
		if (choice == 0):
			spawn_cube()
		else:
			spawn_sphere()
			
func mega_spawn():
	for n in range(0, 10):
		big_spawn()
