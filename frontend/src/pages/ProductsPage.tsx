// src/pages/ProductsPage.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  image_data?: string; // Assumindo que seja base64 ou uma URL
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products'); // Altere para o endpoint do seu backend
        setProducts(response.data);
      } catch (err) {
        setError('Erro ao buscar produtos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Produtos</h1>
      <div className="products-container">
        {products.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Preço: R$ {product.discount_price ?? product.price}</p>
              {product.image_data && (
                <img
                  src={product.image_data}
                  alt={product.name}
                  style={{ width: '200px', height: 'auto' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
