export default function CareersMenu({
  isInputActive,
  activeCareerType,
  careerExamples,
  setSelectedCareer,
  setSelectedPrefix,
  setActiveCareerType,
  setIsInputActive,
  setIsCareerSelected,
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
            <div className="flex justify-around">
              {["Ing.", "Ciencias", "Humanista", "Salud"].map((type) => (
                <p
                  key={type}
                  className={`cursor-pointer px-1 ${
                    activeCareerType === type ? "text-blue-600" : "text-black"
                  }`}
                  onClick={() => handleClick(type)}
                >
                  {type}
                </p>
              ))}
            </div>
          </div>
          {careerExamples.map((career) => (
            <div
              key={career.codigo_carrera}
              className="flex cursor-pointer items-center justify-around bg-gray-50 hover:bg-gray-200"
              onMouseDown={() => {
                setSelectedCareer(career.nombre_carrera);
                setSelectedPrefix(career.area_conocimiento);
                setIsCareerSelected(true);
                setIsInputActive(false);
              }}
            >
              <div className="max-h-8 max-w-8">
                <img
                  src={`/careerIcons/${career.area_conocimiento}.png`}
                  alt={`Foto ${career.nombre_carrera}`}
                  className="object-cover"
                />
              </div>
              <div className="w-10/12 p-2">{career.nombre_carrera}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
