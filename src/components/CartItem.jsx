import { formatCurrency } from "../utils.js";

export function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <li className="cart-item">
      <img src={item.image} alt="" />
      <div className="cart-item-copy">
        <strong>{item.name}</strong>
        <span>{formatCurrency(item.offerPrice)} c/u</span>
        <button type="button" className="remove-button" onClick={() => onRemove(item.id)}>
          Eliminar
        </button>
      </div>
      <div className="quantity" aria-label={`Cantidad de ${item.name}`}>
        <button type="button" onClick={() => onDecrement(item.id)} aria-label={`Quitar una unidad de ${item.name}`}>−</button>
        <span aria-live="polite">{item.quantity}</span>
        <button type="button" onClick={() => onIncrement(item.id)} aria-label={`Agregar una unidad de ${item.name}`}>+</button>
      </div>
      <strong className="line-total">{formatCurrency(item.offerPrice * item.quantity)}</strong>
    </li>
  );
}
