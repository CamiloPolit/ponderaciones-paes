export default function SimulationTable({ labels }) {
  return (
    <div suppressHydrationWarning className="grid grid-cols-2 px-7">
      {labels.map((label, index) =>
        label === "Send" ? (
          <div
            key={label}
            className="flex flex-col items-center justify-center p-2"
          >
            <p className="cursor-default opacity-0">This have opacity 0</p>
            <button className="xs:translate-y-0 flex h-12 w-20 translate-y-[-12px] cursor-pointer items-center justify-center rounded-3xl border-2 bg-slate-900 text-slate-100 hover:bg-slate-700">
              <p>Calcular</p>
            </button>
          </div>
        ) : (
          <div
            key={label}
            className="flex flex-col items-center justify-center p-2 px-6"
          >
            <p className="text-center">{label}</p>
            <input
              type="text"
              className="xs:w-20 w-16 rounded-3xl border-2 p-2 text-center text-[1rem] text-black/85 hover:border-black"
              maxLength="4"
            />
          </div>
        ),
      )}
    </div>
  );
}
