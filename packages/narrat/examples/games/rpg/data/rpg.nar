main:
  set_screen rpg
  run setup_variables

setup_variables:
  set spells.fireball.cost 10
  set spells.whirlwind.cost 3
  set spells.heal.cost 12

restart_character:
  set_stat hp $player.maxHp
  set_stat mp $player.maxMp
  set victories 0

setup_character:
  set_stat hp 0
  set_stat mp 0
  set player.name ""
  set player.def 0
  set player.name (text_field "Choose your character's name")
  set best_victories 0


setup_rpg:
  set_button startGame hidden
  run setup_character
  run choose_class
  run start_rpg

start_rpg:
  run restart_character
  run enter_new_room

enter_new_room:
  play music game
  set pattern (run random_pattern)
  run show_room
  set_button go_left true
  set_button go_right true
  set_button go_front true

process_room:
  if (== $randomChance 1):
    "The room is empty."
  else:
    run random_battle

enter_and_process_room:
  run enter_new_room
  run process_room

show_room:
  set_screen (concat "dungeon_" $pattern)

choose_left:
  set player.direction left
  jump go_direction
choose_right:
  set player.direction right
  jump go_direction
choose_front:
  set player.direction front
  jump go_direction

go_direction:
  set_button go_left false
  set_button go_front false
  set_button go_right false
  "%{player.name} turns %{player.direction}."
  var randomChance (random 1 5)
  run enter_and_process_room

random_pattern:
  return (random_from_args "F" "FL" "FR" "LR" "FRL")

random_battle:
  play music battle
  set battle.attackedLast undefined
  run start_level
  set_button $player.class true
  run random_enemy
  "Suddenly, a %{enemy.name} appears!"
  jump battle

battle_end:
  stop music
  log $battle.result
  set_button $enemy.name false
  set_button $player.class false
  if (== $battle.result "won"):
    add victories 1
    "You defeated %{enemy.name}!"
    if (>= $victories $best_victories)
      set best_victories $victories
    run show_room
  else:
    set_screen rpg
    "You were defeated by %{enemy.name}! after %{victories} victories. Your best record is %{best_victories} victories."
    choice:
      "Restart?"
      "Yes":
        jump start_rpg
      "No":
        "Game over."

start_level:
  var level (random_from_args "grass" "cave" "dungeon")
  set_screen (concat "battle_" $level)


random_enemy:
  set enemy.name (random_from_args "goblin" "slime" "skeleton")
  set_button $enemy.name true
  set enemy.hp (random 2 10)
  set enemy.str (random 2 5)
  set enemy.def (random 1 3)
  set enemy.spd (random 1 3)

choose_class:
  choice:
    "Pick a class"
    "Wizard":
      set player.class wizard
      set player.maxHp 30
      set player.maxMp 60
      set player.def 1
      set player.spd 1
      set_level strength 1
      set_level agility 2
      set_level intelligence 3
    "Warrior":
      set player.class warrior
      set player.def 3
      set player.maxHp 100
      set player.maxMp 15
      set player.spd 2
      set_level strength 3
      set_level agility 2
      set_level intelligence 1
    "Rogue":
      set player.class rogue
      set player.maxHp 50
      set player.maxMp 30
      set player.def 2
      set player.spd 3
      set_level strength 2
      set_level agility 3
      set_level intelligence 1
  set_button $player.class true
  "Your stats: %{stats.hp.value} HP, %{stats.mp.value} MP <br /> %{skills.strength.level} strength, %{skills.agility.level} agility, %{skills.intelligence.level} intelligence <br /> Defence: %{player.def}, Speed: %{player.spd}"

battle:
  run get_attacker
  log $battle.attacker
  if (== $battle.attacker "player")
    run process_combat_options
  else:
    run enemy_attack
  if (<= (get_stat_value hp) 0):
    set battle.result "lost"
  else:
    if (<= $enemy.hp 0):
      set battle.result "won"
    else:
      run tick
      jump battle
  jump battle_end

get_attacker:
  log $battle.attackedLast
  if (== $battle.attackedLast undefined):
    if (> $player.spd $enemy.spd):
      "%{player.name} attacks first!"
      set battle.attackedLast "player"
      set battle.attacker "player"
    else:
      "%{enemy.name} attacks first!"
      set battle.attackedLast "enemy"
      set battle.attacker "enemy"
  else:
    if (== $battle.attackedLast "player"):
      set battle.attackedLast "enemy"
      set battle.attacker "enemy"
    else:
      set battle.attackedLast "player"
      set battle.attacker "player"

process_combat_options:
  if (== $player.class warrior):
    return (run warrior_combat)
  if (== $player.class wizard):
    return (run wizard_combat)
  if (== $player.class rogue):
    return (run rogue_combat)

warrior_combat:
  choice:
    "Choose an action"
    "Attack":
      return (run attack)
    "Whirlwind (%{spells.whirlwind.cost} MP)" if (>= (get_stat_value mp) $spells.whirlwind.cost):
      return (run whirlwind)

rogue_combat:
  choice:
    "Choose an action"
    "Attack":
      return (run attack)

wizard_combat:
  choice:
    "Choose an action"
    "Attack":
      return (run attack)
    "Fireball (%{spells.fireball.cost} MP)" if (>= (get_stat_value mp) $spells.fireball.cost):
      return (run fireball)
    "Heal (%{spells.heal.cost} MP)" if (>= (get_stat_value mp) $spells.heal.cost):
      return (run heal)

attack:
  var damage (+ 1 $skills.strength.level)
  run process_hit_on_monster $damage $enemy
  add_xp strength 1

fireball:
  var damage (* 3 (get_level intelligence))
  run process_hit_on_monster $damage $enemy
  add_xp intelligence 3
  add_stat mp (neg $spells.fireball.cost)

heal:
  var heal (* 2 (get_level intelligence))
  add_stat hp $heal
  add_xp intelligence 3
  add_stat mp (neg $spells.heal.cost)
  set_stat hp (min (get_stat_value hp) $player.maxHp)
  "%{player.name} healed for %{heal} HP!"

whirlwind:
  var damage (* 3 (get_level strength))
  run process_hit_on_monster $damage $enemy
  add_stat mp (neg $spells.whirlwind.cost)
  add_xp strength 3

enemy_attack:
  var damage (+ 1 $enemy.str)
  run process_hit_on_player $damage

process_hit_on_monster damage enemy:
  var final_dmg (run calculate_defenses $damage $enemy.def)
  add enemy.hp (neg $final_dmg)
  "The %{enemy.name} takes %{final_dmg} damage!"

process_hit_on_player damage:
  var final_dmg (run calculate_defenses $damage $player.def)
  add_stat hp (neg $final_dmg)
  "%{player.name} takes %{final_dmg} damage!"

calculate_defenses damage def:
  return (max 0 (- $damage $def))

tick:
  if (== $player.class "wizard"):
    add_stat mp 5
  if (== $player.class "warrior"):
    add_stat mp 1
  if (== $player.class "rogue"):
    add_stat mp 2