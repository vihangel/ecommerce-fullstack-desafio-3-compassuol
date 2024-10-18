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

  echo "Adicionando produto: $(echo $product_data | jq -r '.name')"

  # Envia o produto e a imagem como multipart/form-data
  if [ -f "$image_path" ]; then
    curl --location --request POST "${API_BASE_URL}/products" \
      --header "Authorization: Bearer $TOKEN" \
      -F "image=@${image_path}" \
      -F "name=$(echo $product_data | jq -r '.name')" \
      -F "sku=$(echo $product_data | jq -r '.sku')" \
      -F "category_id=$(echo $product_data | jq -r '.category_id')" \
      -F "description=$(echo $product_data | jq -r '.description')" \
      -F "large_description=$(echo $product_data | jq -r '.large_description')" \
      -F "price=$(echo $product_data | jq -r '.price')" \
      -F "discount_price=$(echo $product_data | jq -r '.discount_price')" \
      -F "discount_percent=$(echo $product_data | jq -r '.discount_percent')" \
      -F "is_new=$(echo $product_data | jq -r '.is_new')"
  else
    echo "Aviso: imagem não encontrada para $product. Produto será adicionado sem imagem."
    curl --location --request POST "${API_BASE_URL}/products" \
      --header "Authorization: Bearer $TOKEN" \
      --header 'Content-Type: application/json' \
      --data-raw "$product_data"
  fi

  echo -e "\nProduto adicionado com sucesso."
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
