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
            <button className="flex h-12 w-20 cursor-pointer items-center justify-center rounded-3xl border-2 bg-slate-900 text-slate-100 hover:bg-slate-700">
              <p>Calcular</p>
            </button>
          </div>
        ) : (
          <div
            key={label}
            className="flex flex-col items-center justify-center p-2 px-6"
          >
            <p>{label}</p>
            <input
              type="text"
              className="w-20 rounded-3xl border-2 p-2 text-center text-xl text-black/85 hover:border-black"
              maxLength="4"
            />
          </div>
        ),
      )}
    </div>
  );
}
