export const HeaderTable = () => {
  return (
    <thead className="hidden md:table-header-group text-[#313131] border-t-2 border-[#989595]">
      <tr className="border-b border-[#989595]">
        <th className="text-left p-3 text-lg  font-semibold">Horário</th>
        <th className="text-left   p-3 text-lg font-semibold">Pedido</th>
        <th className="text-left   text-lg p-3  font-semibold">Situação</th>
        <th className="text-left  text-lg p-3 font-semibold">Total</th>
        <th className="text-left  md:text-lg p-3 font-semibold">
          Total líquido
        </th>
      </tr>
    </thead>
  );
};
