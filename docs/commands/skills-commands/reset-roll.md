# Reset Roll

The `reset_roll` command in narrat resets a skill roll, allowing the player to attempt it again as if it had never happened.

Example:

```narrat
main:
  jump test_skills_reset

test_skills_reset:
  choice:
    "Skill check test"
    roll testSkillsReset agility 50 "Test this skill roll":
      success:
        "You succeed!"
      failure:
        "You fail!"
    "Other choice":
      "Other choice"
  reset_roll testSkillsReset // This will completely reset the state of the skill roll, no matter if it failed or not
  jump mainpy
```
