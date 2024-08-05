import pandas as pd

gpa_stats = pd.read_csv("bbdd/INFORMACION_ALUMNOS_MATRICULADOS.csv", sep=",", usecols=["MRUN", "PROMEDIO_NOTAS", "PTJE_NEM", "PTJE_RANKING"])
demre_code = pd.read_csv("bbdd\\MATRICULA_PAES_2024.csv", sep=";", usecols=["MRUN", "CODIGO_CARRERA"])

# Reemplazar comas por puntos en la columna 'PROMEDIO_NOTAS'
gpa_stats['PROMEDIO_NOTAS'] = gpa_stats['PROMEDIO_NOTAS'].str.replace(',', '.')

# Convertir la columna 'PROMEDIO_NOTAS' a tipo float
gpa_stats['PROMEDIO_NOTAS'] = gpa_stats['PROMEDIO_NOTAS'].astype(float)

# Realizar el merge en la clave 'MRUN'
merged_df = pd.merge(gpa_stats, demre_code, on="MRUN")
merged_df.drop('MRUN', axis=1, inplace=True)

# Agrupar por 'CODIGO_CARRERA' y calcular el promedio de cada columna excluyendo 'CODIGO_CARRERA'
average_df = merged_df.groupby('CODIGO_CARRERA').mean(numeric_only=True).round(2)

# Redondear 'PTJE_NEM' y 'PTJE_RANKING' al entero más cercano
average_df['PTJE_NEM'] = average_df['PTJE_NEM'].round().astype(int)
average_df['PTJE_RANKING'] = average_df['PTJE_RANKING'].round().astype(int)

# Restablecer el índice para que 'CODIGO_CARRERA' sea una columna
average_df.reset_index(inplace=True)

# Mostrar el resultado
print(average_df)

gpa_stats.to_csv("bbdd/PROMEDIO_RANKING_NEM_ALUMNOS.csv", index=False, sep=',')
average_df.to_csv("bbdd/INFORMACION_ALUMNOS_PROMEDIOS_POR_CARRERA.csv", index=False, sep=',')