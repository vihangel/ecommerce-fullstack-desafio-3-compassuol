#!/bin/bash

# Caminho para salvar o token
TOKEN_FILE="./scripts/token.txt"

# Configurações
API_BASE_URL="http://localhost:3000"
USERNAME="angel"
PASSWORD="123456"

# Faz login e salva o token
echo "Fazendo login..."
RESPONSE=$(curl --silent --location --request POST "${API_BASE_URL}/auth/login" \
  --header 'Content-Type: application/json' \
  --data-raw "{
    \"username\": \"${USERNAME}\",
    \"password\": \"${PASSWORD}\"
  }")

# Extrai o token da resposta
TOKEN=$(echo $RESPONSE | jq -r '.access_token')

# Verifica se o login foi bem-sucedido
if [ "$TOKEN" == "null" ]; then
  echo "Erro ao fazer login. Verifique suas credenciais."
  exit 1
fi

# Salva o token em um arquivo
mkdir -p "$(dirname "$TOKEN_FILE")"
echo "$TOKEN" > "$TOKEN_FILE"
echo "Login realizado com sucesso. Token salvo em $TOKEN_FILE."

# Exemplo de uso do token salvo: listar todos os produtos
echo "Listando todos os produtos com o token salvo..."

curl --location --request GET "${API_BASE_URL}/products" \
  --header "Authorization: Bearer $TOKEN" \
  --header 'Content-Type: application/json'

echo -e "\nProdutos listados com sucesso."
