function Campo({ etiqueta, tipo = "text", valor, min, onCambio }) {
  return (
    <div>
      <label>{etiqueta}</label>
      <input
        type={tipo}
        value={valor}
        min={min}
        onChange={(e) => onCambio(e.target.value)}
      />
    </div>
  );
}

export default Campo;
