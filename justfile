set dotenv-load

@_list:
    just --list --unsorted

[windows]
install:
    npm ci

[linux]
install:
    bun install
    bun install --frozen-lockfile

[windows]
run-m *args:
    npm {{args}}

[linux]
run-m *args:
    bun {{args}}

# Perform all verifications (compile, test, lint, etc.)
verify: install lint
    just run-m run build

test:
    just backend test

run: install
    bun run tauri dev


lint:
    just run-m run lint
    just run-m run format-check

build:
    cargo tauri build

fmt:
    bun run format

backend *args:
    cd src-tauri && just {{args}}


install-dev:
  npm add prettier

