#!/bin/bash

# Configurações
API_BASE_URL="http://localhost:3000"
USERNAME="angel"
PASSWORD="123456"
TOKEN_FILE="./scripts/token.txt"
PRODUCTS_FILE="/Users/angel/Documents/GitHub/uol/ecommerce-backend-desafio-3-compassuol/scripts/json/products.json"
IMAGES_DIR="/Users/angel/Documents/GitHub/uol/ecommerce-backend-desafio-3-compassuol/frontend/src/assets/mock_images"

# Função para fazer login e salvar o token
login() {
  echo "Fazendo login..."
  RESPONSE=$(curl --silent --location --request POST "${API_BASE_URL}/auth/login" \
    --header 'Content-Type: application/json' \
    --data-raw "{
      \"username\": \"${USERNAME}\",
      \"password\": \"${PASSWORD}\"
    }")

  # Extrai o token da resposta
  TOKEN=$(echo "$RESPONSE" | jq -r '.access_token')

  # Verifica se o login foi bem-sucedido
  if [ "$TOKEN" == "null" ]; then
    echo "Erro ao fazer login. Verifique suas credenciais."
    exit 1
  fi

  # Cria a pasta se não existir
  mkdir -p "$(dirname "$TOKEN_FILE")"

  # Salva o token em um arquivo
  echo "$TOKEN" > "$TOKEN_FILE"
  echo "Login realizado com sucesso. Token salvo."
}

# Função para adicionar um produto
add_product() {
  local product_data=$1
  local image_path=$2

  echo "Adicionando produto: $(echo "$product_data" | jq -r '.name')"

  if [ -f "$image_path" ]; then
    # Envia o produto e a imagem como multipart/form-data
    RESPONSE=$(curl --silent --location --request POST "${API_BASE_URL}/products" \
      --header "Authorization: Bearer $TOKEN" \
      -F "product_data=$(echo "$product_data")" \
      -F "image=@${image_path}")
  else
    # Caso não exista imagem, envia apenas o produto
    RESPONSE=$(curl --silent --location --request POST "${API_BASE_URL}/products" \
      --header "Authorization: Bearer $TOKEN" \
      --header 'Content-Type: application/json' \
      --data-raw "$product_data")
  fi

  echo "Resposta: $RESPONSE"
  echo -e "\nProduto adicionado com sucesso."
}

# Faz login e salva o token
login

# Adicionando produtos
if [ -f "$PRODUCTS_FILE" ]; then
  jq -c '.[]' "$PRODUCTS_FILE" | while IFS= read -r product; do
    # Ajustar o caminho das imagens com base no nome do produto
    image_name=$(echo "$product" | jq -r '.name' | tr ' ' '_' | tr '[:upper:]' '[:lower:]')
    image_path="${IMAGES_DIR}/${image_name}.png"

    if [ ! -f "$image_path" ]; then
      echo "Aviso: imagem não encontrada para $(echo "$product" | jq -r '.name'). Produto será adicionado sem imagem."
      add_product "$product" ""
    else
      add_product "$product" "$image_path"
    fi
  done
else
  echo "Arquivo de produtos não encontrado."
  exit 1
fi

echo "Script concluído com sucesso. Produtos foram adicionados."
