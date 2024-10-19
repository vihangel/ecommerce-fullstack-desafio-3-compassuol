#!/bin/bash

# Configurações
API_BASE_URL="http://localhost:3000"
USERNAME="angel"
PASSWORD="123456"
TOKEN_FILE="./scripts/token.txt"

# Faz login e salva o token
echo "Fazendo login..."
RESPONSE=$(curl --silent --location --request POST "${API_BASE_URL}/auth/login" \
  --header 'Content-Type: application/json' \
  --data-raw "{
    \"username\": \"${USERNAME}\",
    \"password\": \"${PASSWORD}\"
  }")

TOKEN=$(echo "$RESPONSE" | jq -r '.access_token')

if [ "$TOKEN" == "null" ]; then
  echo "Erro ao fazer login. Verifique suas credenciais."
  exit 1
fi

# Salva o token em um arquivo
echo "$TOKEN" > "$TOKEN_FILE"
echo "Login realizado com sucesso. Token salvo."

# Deletar todos os produtos
echo "Deletando todos os produtos..."
curl --location --request DELETE "${API_BASE_URL}/products" \
  --header "Authorization: Bearer $TOKEN" \
  --header 'Content-Type: application/json'
echo -e "\nTodos os produtos foram deletados."

# Deletar todas as categorias
echo "Deletando todas as categorias..."
curl --location --request DELETE "${API_BASE_URL}/categories" \
  --header "Authorization: Bearer $TOKEN" \
  --header 'Content-Type: application/json'
echo -e "\nTodas as categorias foram deletadas."
