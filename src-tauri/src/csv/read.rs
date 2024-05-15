use std::path::PathBuf;

pub fn csv_file(source: &PathBuf, separator: &str) -> Result<Vec<Vec<String>>, String> {
    qwitlib::csv_reader::read_100_and_collect(separator, source)
}
