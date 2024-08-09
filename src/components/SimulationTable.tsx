export default function SimulationTable({ labels }) {
  return (
    <div suppressHydrationWarning className="grid grid-cols-2 px-7">
      {labels.map((label) =>
        label === "Send" ? (
          <div
            key={label}
            className="flex flex-col items-center justify-center p-2"
          >
            <p className="cursor-default opacity-0">This have opacity 0</p>
            <button className="flex h-12 w-20 translate-y-[-12px] cursor-pointer items-center justify-center rounded-xl border-2 bg-slate-900 text-slate-100 hover:bg-slate-700 sm:w-24 sm:translate-y-0">
              <p>Calcular</p>
            </button>
          </div>
        ) : (
          <div
            key={label}
            className="flex flex-col items-center justify-center p-2 px-6"
          >
            <p className="text-center font-semibold">{label}</p>
            <input
              type="text"
              className="w-20 rounded-xl border-2 p-2 text-center text-[1rem] text-black/85 hover:border-black sm:w-24"
              maxLength="4"
            />
          </div>
        ),
      )}
    </div>
  );
}
