import pandas as pd

fetch_table = pd.read_csv('/content/drive/MyDrive/bbdd/TABLA_FETCH_CARRERAS.csv')
requirements_table = pd.read_csv('/content/drive/MyDrive/bbdd/REQUISITOS_ADMISION_CARRERAS.csv')
program_duration_value_table = pd.read_csv('/content/drive/MyDrive/bbdd/TABLA_VALORES_DURACION_CARRERAS.csv')
correct_answers = pd.read_csv('/content/drive/MyDrive/bbdd/PREGUNTAS_CORRECTAS_CARRERAS.csv')
special_admission = pd.read_csv('/content/drive/MyDrive/bbdd/PUNTAJE_CORTE_ADM_ESPECIAL.csv')
scores_metrics = pd.read_csv('/content/drive/MyDrive/bbdd/ESTADISTICAS_PUNTAJES_CARRERAS.csv')
grades_table = pd.read_csv('/content/drive/MyDrive/bbdd/INFORMACION_ALUMNOS_PROMEDIOS_POR_CARRERA.csv')
universities_location = pd.read_csv('/content/drive/MyDrive/bbdd/TABLA_SEDES_UNIVERSIDADES.csv')


max_scores = pd.read_csv('/content/drive/MyDrive/bbdd/CARRERAS_CON_PUNTAJES_NACIONALES.csv')
last_woman_admitted_score = pd.read_csv('/content/drive/MyDrive/bbdd/ESTADISTICAS_PUNTAJES_MUJERES.csv')
last_woman_admitted_score.rename(columns={'PUNTAJE_CORTE': 'PUNTAJE_CORTE_MUJERES'}, inplace=True)

merged_df = pd.merge(fetch_table, universities_location, left_on=['NOMB_INST','NOMB_SEDE'], right_on=['NOMB_INST','NOMB_SEDE'], how='inner')
merged_df = pd.merge(merged_df, program_duration_value_table, on='CODIGO_CARRERA', how='inner')
merged_df = pd.merge(merged_df, requirements_table, left_on='CODIGO_CARRERA', right_on='COD_CARRERA', how='inner')
merged_df = pd.merge(merged_df, grades_table, on='CODIGO_CARRERA', how='inner')
merged_df = pd.merge(merged_df, scores_metrics, on='CODIGO_CARRERA', how='inner')
merged_df = pd.merge(merged_df, correct_answers, on='CODIGO_CARRERA', how='inner')
merged_df = pd.merge(merged_df, max_scores, on='CODIGO_CARRERA', how='left')
merged_df = pd.merge(merged_df, requirements_table, left_on='CODIGO_CARRERA', right_on='COD_CARRERA', how='inner')
merged_df = pd.merge(merged_df, special_admission, left_on='CODIGO_CARRERA', right_on='codigo_demre', how='inner')

# Realiza el merge con last_woman_admitted_score, rellenando con ceros si no hay coincidencias
merged_df = pd.merge(merged_df, last_woman_admitted_score, on='CODIGO_CARRERA', how='left')
merged_df.fillna(0, inplace=True)

merged_df = merged_df.rename(columns={'PTJE_NEM': 'NEM_PROMEDIO', 'PTJE_RANKING': 'RANKING_PROMEDIO'})

merged_df.to_csv('TABLA_RESULTADOS_SIMULACIÓN.csv', index=False)