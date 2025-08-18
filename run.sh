#!/bin/bash

APP_NAME="pretalab-transactions-api"

# -------------------------------
# Funções utilitárias
# -------------------------------

function prepare_env() {
  if [ ! -d "node_modules" ]; then
    echo "⚙️  Ambiente não preparado, rodando setup..."
    setup
  fi
}

function prepare_build() {
  prepare_env
  if [ ! -d "dist" ]; then
    echo "⚙️  Build não encontrado, compilando..."
    build
  fi
}

# -------------------------------
# Funções principais
# -------------------------------

function clean() {
  echo "🧹 Limpando executáveis, node_modules e coverage..."
  find . -type f -executable -exec rm -v {} \;
  find . -type d -name "node_modules" -exec rm -rfv {} \;
  find . -type d -name "coverage" -exec rm -rfv {} \;
  rm -rf dist jest-cache
  echo "✅ Limpeza concluída!"
}

function setup() {
  echo "📦 Instalando dependências..."
  npm install
}

function build() {
  echo "🏗️  Compilando projeto..."
  npm run build
}

function test_all() {
  prepare_env
  echo "🧪 Rodando todos os testes..."
  npm test
}

function test_unit() {
  prepare_env
  echo "🧪 Rodando testes unitários..."
  npm run test:unit
}

function test_integration() {
  prepare_env
  echo "🧪 Rodando testes de integração..."
  npm run test:integration
}

function test_coverage() {
  prepare_env
  echo "🧪 Rodando testes com cobertura..."
  npm run test:coverage
}

function start_server() {
  prepare_build
  echo "🚀 Iniciando servidor compilado..."
  npm start
}

function dev() {
  prepare_env
  echo "⚡ Rodando em modo desenvolvimento..."
  npm run dev
}

function help_menu() {
  echo "=============================="
  echo " $APP_NAME - Script de Build "
  echo "=============================="
  echo ""
  echo "Uso: ./project.sh [comando]"
  echo ""
  echo "Comandos disponíveis:"
  echo "  setup             Instala dependências"
  echo "  clean             Remove dist/, node_modules/, coverage/"
  echo "  build             Compila o projeto"
  echo "  dev               Roda em modo desenvolvimento"
  echo "  start             Inicia o servidor compilado"
  echo ""
  echo " Testes:"
  echo "  test              Roda todos os testes"
  echo "  test:unit         Roda testes unitários"
  echo "  test:integration  Roda testes de integração"
  echo "  test:coverage     Roda testes com cobertura"
  echo ""
  echo "Execução padrão (sem args): setup + test + start"
  echo ""
  echo "Exemplo:"
  echo "  ./project.sh dev"
}

# -------------------------------
# Lógica principal
# -------------------------------

case "$1" in
  clean) clean ;;
  setup) setup ;;
  build) build ;;
  dev) dev ;;
  start) start_server ;;
  test) test_all ;;
  test:unit) test_unit ;;
  test:integration) test_integration ;;
  test:coverage) test_coverage ;;
  "" )
    echo "✨ Fluxo padrão: setup + test + start"
    prepare_env
    test_all
    start_server
    ;;
  * ) help_menu ;;
esac
