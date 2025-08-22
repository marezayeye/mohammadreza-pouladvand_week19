// ProductsContext.js
import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import { api } from "../services/httpRequests";
import { useSearchParams } from "react-router-dom";

const ProductsContext = createContext();

const initialState = {
  products: [],
  totalProducts: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  loading: false,
  error: null,
};

function productsReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload.data,
        totalProducts: action.payload.totalProducts,
        page: action.payload.page,
        limit: action.payload.limit,
        totalPages: action.payload.totalPages,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [action.payload, ...state.products] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case "DELETE_MULTIPLE":
      return {
        ...state,
        products: state.products.filter((p) => !action.payload.includes(p.id)),
      };
    default:
      return state;
  }
}

export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || 1);
  const limit = parseInt(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await api.get("/products", {
          params: { page, limit, search },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };
    fetchProducts();
  }, [page, limit, search]);

  const addProduct = async (newProduct) => {
    const res = await api.post("/products", newProduct);
    dispatch({ type: "ADD_PRODUCT", payload: res.data });
  };

  const updateProduct = async (id, updatedProduct) => {
    const res = await api.put(`/products/${String(id)}`, updatedProduct);
    dispatch({ type: "UPDATE_PRODUCT", payload: res.data });
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${String(id)}`);
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  const deleteMultiple = async (ids) => {
    await api.post(`/products/bulk-delete`, { ids });
    dispatch({ type: "DELETE_MULTIPLE", payload: ids });
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        addProduct,
        updateProduct,
        deleteProduct,
        deleteMultiple,
        setSearchParams,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
