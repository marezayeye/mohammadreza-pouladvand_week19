import { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { ClipLoader } from "react-spinners";

function InventoryPagination() {
  const { page, totalPages, limit, setSearchParams } = useProducts();
  const [localLimit, setLocalLimit] = useState(limit || 10);
  const [isChanging, setIsChanging] = useState(false);

  const goToPage = async (nextPage) => {
    const safePage = Math.max(1, Math.min(totalPages || 1, Number(nextPage)));
    setIsChanging(true);
    try {
      setSearchParams({ page: String(safePage), limit: String(localLimit) });
    } finally {
      setIsChanging(false);
    }
  };

  const applyLimit = async (nextLimit) => {
    const value = Math.max(1, Number(nextLimit) || 1);
    setLocalLimit(value);
    setIsChanging(true);
    try {
      // Reset to first page when limit changes
      setSearchParams({ page: "1", limit: String(value) });
    } finally {
      setIsChanging(false);
    }
  };

  const handleLimitKeyDown = (e) => {
    if (e.key === "Enter") {
      applyLimit(e.target.value);
    }
  };

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 16 }}>
      {isChanging && <ClipLoader color="#36d7b7" size={20} />}
      {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          disabled={p === page || isChanging}
          style={p === page ? { fontWeight: 700 } : undefined}
        >
          {p}
        </button>
      ))}
      <div style={{ marginInlineStart: 16 }}>
        <label>
          تعداد در صفحه
          <input
            type="number"
            min={1}
            value={localLimit}
            onChange={(e) => setLocalLimit(e.target.value)}
            onBlur={(e) => applyLimit(e.target.value)}
            onKeyDown={handleLimitKeyDown}
            style={{ marginInlineStart: 8, width: 80 }}
            disabled={isChanging}
          />
        </label>
      </div>
    </div>
  );
}

export default InventoryPagination;

