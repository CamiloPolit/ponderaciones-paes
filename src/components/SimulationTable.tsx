export default function SimulationTable({ labels }) {
  return (
    <div className="grid grid-cols-2">
      {labels.map((label) =>
        label === "Send" ? (
          <div
            key={label}
            className="flex flex-col items-center justify-center p-2"
          >
            <p className="cursor-default opacity-0">This have opacity 0</p>
            <div className="h-12 w-20 cursor-pointer rounded-3xl border-2 bg-slate-600"></div>
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
            />
          </div>
        ),
      )}
    </div>
  );
}
