// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod menu;

fn main() {
  let menu = menu::add_menu_options();
  tauri::Builder::default()
    .plugin(tauri_plugin_persisted_scope::init())
    .invoke_handler(tauri::generate_handler![greet])
    .menu(menu)
    .on_menu_event(menu::handle_menu_event)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
#[tauri::command]
fn greet(name: &str) -> String {
   format!("Hello, {}!", name)
}