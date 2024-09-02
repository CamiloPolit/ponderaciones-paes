import universities from "@/app/universities.json";

export default function getUniversityAbbreviation(universityNameUppercase) {
  const universityName = universityNameUppercase.toLowerCase();

  const result = universities.Universities.find(
    (university) => university.name.toLowerCase() === universityName,
  );

  return result ? result.abbreviation : null;
}
