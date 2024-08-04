import pandas as pd

# Asignamos las columnas que queremos que estén presente en csv limpiado
columns = ["MRUN", "RBD", "DEPENDENCIA", "NOMBRE_COMUNA_EGRESO", "PROMEDIO_NOTAS", "PTJE_NEM", "PTJE_RANKING", "CLEC_MAX", "MATE1_MAX", "MATE2_MAX", "HCSOC_MAX", "CIEN_MAX"]

# Importamos también el csv con los alumnos matriculados en las universidades, para filtrar a los que no se matricularon
students_info = pd.read_csv("/bbdd/PAES-2024-Inscritos-Puntajes/A_INSCRITOS_PUNTAJES_PAES_2024_PUB_MRUN.csv", sep=";", usecols=columns)
university_students_info = pd.read_csv("/content/drive/MyDrive/PAES-2024-Matricula/MATRICULA_PAES_2024.csv", sep=";", usecols=["MRUN"])

# Hacemos merge para eliminar a los no matriculados
merged_university_students_info = pd.merge(students_info, university_students_info, on="MRUN")

# Guardamos el archivo csv
merged_university_students_info.to_csv("INFORMACION_ALUMNOS_MATRICULADOS.csv", index=False)
