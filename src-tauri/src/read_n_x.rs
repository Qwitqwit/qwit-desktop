use std::{fs::OpenOptions, io::BufWriter, path::PathBuf};

use calamine::{open_workbook_auto, Reader};

pub fn read(source: &PathBuf, target: &PathBuf, sep: &str) -> Result<String, String> {
    println!("running convertion");
    // find source file
    let sce = PathBuf::from(source);
    match sce.extension().and_then(|s| s.to_str()) {
        Some("xlsx" | "xlsm" | "xlsb" | "xls") => (),
        _ => return Err("Expecting an excel file".to_owned()),
    }
    // open xl file
    let mut xl = open_workbook_auto(&sce).unwrap();

    let target_path = PathBuf::from(target).with_extension("csv");
    let res = OpenOptions::new()
        .write(true)
        .create(true)
        .open(target_path.clone());

    match res {
        Ok(_) => {}
        Err(_err) => {
            return Err(format!("Could not open {}", target.to_str().unwrap()), )
        }
    }

    let worksheets = xl.worksheets();

    for sheet in &worksheets {
        let range = &sheet.1;
        // create or append to target file

        let target_file = OpenOptions::new()
            .create(true)
            .append(true)
            .open(target_path.clone())
            .unwrap();

        let target = BufWriter::new(target_file);

        let res = qwitlib::from_excel::write_range(
            range,
            qwitlib::from_excel::operators::FileWritingOperator { writer: target },
            sep.to_owned(),
        )
        .map_err(|err| err.to_string());

        match res {
            Ok(()) => {}
            Err(e) => eprint! {"{e}"},
        }
    }

    Ok("All sheets written".to_owned())
}
