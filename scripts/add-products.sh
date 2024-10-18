#!/bin/bash

# Caminho para salvar o token
TOKEN_FILE="./scripts/token.txt"
CATEGORIES_FILE="./json/categories.json"
PRODUCTS_FILE="./json/products.json"

# Configurações
API_BASE_URL="http://localhost:3000"
USERNAME="angel"
PASSWORD="123456"

# Função para fazer login e salvar o token
login() {
  echo "Fazendo login..."
  RESPONSE=$(curl --silent --location --request POST "${API_BASE_URL}/auth/login" \
    --header 'Content-Type: application/json' \
    --data-raw "{
      \"username\": \"${USERNAME}\",
      \"password\": \"${PASSWORD}\"
    }")

  TOKEN=$(echo $RESPONSE | jq -r '.access_token')

  if [ "$TOKEN" == "null" ]; then
    echo "Erro ao fazer login. Verifique suas credenciais."
    exit 1
  fi

  echo "$TOKEN" > "$TOKEN_FILE"
  echo "Login realizado com sucesso. Token salvo."
}

# Função para adicionar um produto
add_product() {
  local product_data=$1
  local image_path=$2

  echo "Adicionando produto: $(echo "$product_data" | jq -r '.name')"

  # Cria um arquivo temporário para os dados do produto
  temp_product_file=$(mktemp)
  echo "$product_data" > "$temp_product_file"

  # Verifica se a imagem existe
  if [ -f "$image_path" ]; then
    # Envia o produto e a imagem como multipart/form-data
    RESPONSE=$(curl --silent --location --request POST "${API_BASE_URL}/products" \
      --header "Authorization: Bearer $TOKEN" \
      -F "product_data=@${temp_product_file};type=application/json" \
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

  # Remove o arquivo temporário
  rm "$temp_product_file"
}


# Faz login e salva o token
login

# Adicionando produtos
if [ -f "$PRODUCTS_FILE" ]; then
  products=$(jq -c '.[]' "$PRODUCTS_FILE")
  for product in $products; do
    image_path="../frontend/src/assets/mock_images/$(echo $product | jq -r '.name' | tr ' ' '_' | tr '[:upper:]' '[:lower:]').png"
    add_product "$product" "$image_path"
  done
else
  echo "Arquivo de produtos não encontrado."
  exit 1
fi

echo "Script concluído com sucesso. Produtos foram adicionados."
