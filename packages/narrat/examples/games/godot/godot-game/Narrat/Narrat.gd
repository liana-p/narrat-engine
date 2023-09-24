class_name Narrat


func call_narrat(function: String, args: Array[String]):
	return call_js('window.narrat.', function, args)

func call_godot_narrat(function: String, args: Array[String]):
	return call_js('window.godot.', function, args)

func call_js(base_path: String, function: String, args: Array[String]):
	var eval_string = base_path
	eval_string += function
	var args_string = args.reduce(args_reducer);
	eval_string += args_string + ")";
	print("Eval string" + eval_string);
	if OS.has_feature('web'):
		# var result = JavascriptBridge.eval(eval_string);
		return true;
	else:
		return false;
	
func args_reducer(accum: String, current: String):
	return accum + ", " + current;

func run_label(label: String, args: Array[String]):
	return call_narrat('run', args)
