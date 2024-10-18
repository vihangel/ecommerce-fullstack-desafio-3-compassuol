#!/bin/bash

# Configurações
API_BASE_URL="http://localhost:3000"
USERNAME="angel"
PASSWORD="123456"
TOKEN_FILE="./scripts/token.txt"
CATEGORIES_FILE="./json/categories.json"
PRODUCTS_FILE="./json/products.json"

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

# Função para adicionar uma categoria
add_category() {
  local category_data=$1
  echo "Adicionando categoria: $(echo "$category_data" | jq -r '.name')"

  RESPONSE=$(curl --silent --location --request POST "${API_BASE_URL}/categories" \
    --header "Authorization: Bearer $TOKEN" \
    --header 'Content-Type: application/json' \
    --data-raw "$category_data")

  echo "Resposta: $RESPONSE"
  echo -e "\nCategoria adicionada com sucesso."
}

# Função para adicionar um produto
add_product() {
  local product_data=$1
  local image_path=$2

  echo "Adicionando produto: $(echo "$product_data" | jq -r '.name')"

  # Cria um arquivo temporário para os dados do produto
  temp_product_file=$(mktemp)
  echo "$product_data" > "$temp_product_file"

  # Envia o produto e a imagem como multipart/form-data
  RESPONSE=$(curl --silent --location --request POST "${API_BASE_URL}/products" \
    --header "Authorization: Bearer $TOKEN" \
    -F "product_data=@${temp_product_file}" \
    -F "image=@${image_path}")

  echo "Resposta: $RESPONSE"
  echo -e "\nProduto adicionado com sucesso."

  # Remove o arquivo temporário
  rm "$temp_product_file"
}

# Faz login e salva o token
login

# Adicionando categorias
if [ -f "$CATEGORIES_FILE" ]; then
  jq -c '.[]' "$CATEGORIES_FILE" | while IFS= read -r category; do
    add_category "$category"
  done
else
  echo "Arquivo de categorias não encontrado."
  exit 1
fi

# Adicionando produtos
if [ -f "$PRODUCTS_FILE" ]; then
  jq -c '.[]' "$PRODUCTS_FILE" | while IFS= read -r product; do
    # Supondo que as imagens estão na pasta "../frontend/src/assets/mock_images/"
    image_path="../frontend/src/assets/mock_images/$(echo "$product" | jq -r '.name' | tr ' ' '_' | tr '[:upper:]' '[:lower:]').png"
    if [ ! -f "$image_path" ]; then
      echo "Aviso: imagem não encontrada para $(echo "$product" | jq -r '.name'). Produto será adicionado sem imagem."
    fi
    add_product "$product" "$image_path"
  done
else
  echo "Arquivo de produtos não encontrado."
  exit 1
fi

echo "Script concluído com sucesso. Produtos e categorias foram adicionados."
