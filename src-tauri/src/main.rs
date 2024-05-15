// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::PathBuf;

mod csv;
mod read_n_x;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn convert(source: &str, target: &str, sep: &str) -> String {
    let res = read_n_x::read(&PathBuf::from(source), &PathBuf::from(target), sep);
    match res {
        Ok(r) => format!("converted:, {:?}", r),
        Err(err) => format!("failed to convert, {:?}", err),
    }
}

#[tauri::command]
fn read_csv(source: &str, sep: &str) -> String {
    let res: Result<Vec<Vec<String>>, String> = csv::read::csv_file(&PathBuf::from(source), sep);

    let okay = match res {
        Ok(r) => r,
        Err(err) => return format!("failed to read, {:?}", err),
    };

    let json_res: Result<String, serde_json::Error> = serde_json::to_string(&okay);
    let json = match json_res {
        Ok(r) => r,
        Err(err) => return format!("failed to convert to json, {:?}", err),
    };

    return json;
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
        .invoke_handler(tauri::generate_handler![convert, read_csv])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
