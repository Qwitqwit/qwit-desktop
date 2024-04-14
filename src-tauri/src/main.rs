// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::PathBuf;

mod read_n_x;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn convert(source: &str, target: &str) -> String {
    let res = read_n_x::read(&PathBuf::from(source), &PathBuf::from(target), ";");
    match res {
        Ok(r) => format!("converted:, {:?}", r),
        Err(err) => format!("failed to convert, {:?}", err),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_notification::init())
        // Initialize the plugin
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![convert])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
