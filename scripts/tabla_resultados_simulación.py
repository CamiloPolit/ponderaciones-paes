import pandas as pd

requirements_table = pd.read_csv('bbdd\REQUISITOS_ADMISION_CARRERAS.csv')
program_duration_value_table = pd.read_csv('bbdd\TABLA_VALORES_DURACION_CARRERAS.csv')
correct_answers = pd.read_csv('bbdd\PREGUNTAS_CORRECTAS_CARRERAS.csv')
women_percentage = pd.read_csv('bbdd\PORCENTAJE_MUJERES_CARRERAS.csv')
scores_metrics = pd.read_csv('bbdd\ESTADISTICAS_PUNTAJES_CARRERAS.csv')


merged_df = pd.merge(program_duration_value_table, correct_answers, on='CODIGO_CARRERA', how='outer')
merged_df = pd.merge(merged_df, scores_metrics, on='CODIGO_CARRERA', how='outer')
merged_df = pd.merge(merged_df, women_percentage, left_on='CODIGO_CARRERA', right_on='codigo_demre', how='outer')
merged_df = pd.merge(merged_df, requirements_table, left_on='CODIGO_CARRERA', right_on='COD_CARRERA', how='outer')
merged_df.drop(columns=['codigo_demre', 'COD_CARRERA'], inplace=True)
merged_df.head()