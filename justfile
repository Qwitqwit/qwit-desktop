set dotenv-load

@_list:
    just --list --unsorted


install:
    npm install
    npm ci


run-m *args:
    npm {{args}}

# Perform all verifications (compile, test, lint, etc.)
verify: install lint test
    just run-m run build

test:
    just backend test

run: install
    npm run tauri dev


lint:
    just run-m run lint
    just run-m run format-check

build:
    cargo tauri build

fmt:
    npm run format

backend *args:
    cd src-tauri && just {{args}}


install-dev:
  npm add prettier



release *args: verify
    test $GITHUB_TOKEN
    test $CARGO_REGISTRY_TOKEN
    cargo release {{args}}