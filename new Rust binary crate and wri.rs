# Create a new Rust binary crate and write src/main.rs
cargo new rustadder --bin && cd rustadder
cat > src/main.rs << 'EOF'
fn main() {
    let args: Vec<String> = std::env::args().collect();
    let a: i32 = args.get(1).unwrap().parse().unwrap();
    let b: i32 = args.get(2).unwrap().parse().unwrap();
    println!("{}", a + b);
}
EOF

# Build the Rust binary
cargo build --release

# Write an R script that calls the compiled Rust CLI
cat > call_adder.R << 'EOF'
bin_path <- "./target/release/rustadder"
out <- system(paste(bin_path, 5, 7), intern = TRUE)
sum <- as.integer(out)
print(sum)
EOF

# Execute the R script
Rscript call_adder.R
