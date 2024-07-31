export default function CareersMenu({
  isInputActive,
  activeCareerType,
  careerExamples,
  setSelectedCareer,
  setSelectedPrefix,
  setActiveCareerType,
  setIsInputActive,
}) {
  const handleClick = (type) => {
    setActiveCareerType(type);
    setIsInputActive(true);
  };

  return (
    <div className="scrollable-container absolute max-h-48 w-full overflow-auto">
      {isInputActive && (
        <div>
          <div className="flex justify-between bg-gray-100 px-1 text-xs">
            <div>Tipo de carrera:</div>
            <div className="flex">
              {["Todo", "Ingeniería", "Ciencias", "Humanista", "Salud"].map(
                (type) => (
                  <p
                    key={type}
                    className={`cursor-pointer px-1 ${
                      activeCareerType === type ? "text-blue-600" : "text-black"
                    }`}
                    onClick={() => handleClick(type)}
                  >
                    {type}
                  </p>
                ),
              )}
            </div>
          </div>
          {careerExamples.map((career) => (
            <div
              key={career.number}
              className="flex cursor-pointer items-center justify-around bg-gray-50 hover:bg-gray-200"
              onMouseDown={() => {
                setSelectedCareer(career.name);
                setSelectedPrefix(career.prefix);
                setIsInputActive(false); // Cierra el dropdown al seleccionar una carrera
              }}
            >
              <div className="max-h-8 max-w-8">
                <img
                  src={`/careerIcons/${career.prefix.toLowerCase()}.png`}
                  alt={`Foto ${career.prefix}`}
                />
              </div>
              <div className="w-10/12 p-2">{career.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}