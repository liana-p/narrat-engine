main:
  increase_counter
  increase_counter
  "hello world (main label increases counter by 2)"
  jump counter_test

counter_test:
  "Reached counter_test label which should save the game and the counter."
  var value (get_counter)
  "Counter value is %{value}"
  jump main