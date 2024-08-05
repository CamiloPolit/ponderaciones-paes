import cudf

# Asignamos las columnas que queremos que estén presentes en el CSV limpiado
columns = [
    "MRUN",
    "CORRECTAS_REG_CL",
    "CORRECTAS_REG_M1",
    "CORRECTAS_REG_M2",
    "CORRECTAS_REG_HCS",
    "CORRECTAS_REG_CBIO",
    "CORRECTAS_REG_CFIS",
    "CORRECTAS_REG_CQUI",
    "CORRECTAS_REG_CTP",
    "CORRECTAS_INV_CL",
    "CORRECTAS_INV_M1",
    "CORRECTAS_INV_M2",
    "CORRECTAS_INV_HCS",
    "CORRECTAS_INV_CBIO",
    "CORRECTAS_INV_CFIS",
    "CORRECTAS_INV_CQUI",
    "CORRECTAS_INV_CTP"
]

# Importamos los CSV usando CuDF
students_info = cudf.read_csv("/content/drive/MyDrive/PAES-2024-Inscritos-Puntajes/A_INSCRITOS_PUNTAJES_PAES_2024_PUB_MRUN.csv", sep=";", usecols=columns)
university_students_info = cudf.read_csv("/content/drive/MyDrive/MATRICULA_PAES_2024/MATRICULA_PAES_2024.csv", sep=";", usecols=["MRUN"])

# Hacemos merge para eliminar a los no matriculados
merged_university_students_info = students_info.merge(university_students_info, on="MRUN")

# Extraemos todos los pares de columnas que contienen _REG_ y _INV_
column_pairs = [
    (col, col.replace("_REG_", "_INV_"))
    for col in merged_university_students_info.columns if "_REG_" in col
]

# Creamos un DataFrame de resultads vacío
result = cudf.DataFrame()

# Aplicamos la función para cada par de columnas
for reg, inv in column_pairs:
    max_col_name = f"MAX_{reg.split('_REG_')[1]}"
    result[max_col_name] = merged_university_students_info[[reg, inv]].max(axis=1)

# Añadir la columna MRUN al resultado
result["MRUN"] = merged_university_students_info["MRUN"]

result.to_csv("PREGUNTAS_CORRECTAS_ALUMNOS", index=False)