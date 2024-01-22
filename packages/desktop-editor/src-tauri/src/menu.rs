use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, WindowMenuEvent};

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

pub fn add_menu_options() -> Menu {
  // here `"quit".to_string()` defines the menu item id, and the second parameter is the menu item label.
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let open = CustomMenuItem::new("open".to_string(), "Open");
  let save = CustomMenuItem::new("save".to_string(), "Save");
  let submenu = Submenu::new("Narrat", Menu::new().add_item(quit).add_item(open).add_item(save));
  let menu = Menu::os_default("Narrative")
  .add_submenu(submenu);
  menu
}

pub fn handle_menu_event(event: WindowMenuEvent) {
  match event.menu_item_id() {
    "quit" => {
      std::process::exit(0);
    }
    "open" => {
      event.window().emit("open", Payload { message: "Opening a file".into() }).unwrap();
      println!("Open");
    }
    "save" => {
      event.window().emit("save", Payload { message: "Saving a file".into() }).unwrap();
      println!("Save");
    }
    _ => {}
  }
}