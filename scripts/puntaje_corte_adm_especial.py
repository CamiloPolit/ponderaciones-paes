import pandas as pd

scores = pd.read_csv("/content/drive/MyDrive/MATRICULA_PAES_2024/MATRICULA_PAES_2024.csv", sep=';', usecols=["CODIGO_CARRERA", "PUNTAJE_PONDERADO", "VIA_INGRESO"])

scores['PUNTAJE_PONDERADO'] = scores['PUNTAJE_PONDERADO'].str.replace(',', '.')
scores['PUNTAJE_PONDERADO'] = scores['PUNTAJE_PONDERADO'].astype(float)

aux1 = scores[scores["VIA_INGRESO"] == 11]
aux1 = aux1.groupby('CODIGO_CARRERA').agg(
    PUNTAJE_CORTE_MUJERES=('PUNTAJE_PONDERADO', 'min'),
).reset_index()

aux2 = scores[scores["VIA_INGRESO"] == 4]
aux2 = aux2.groupby('CODIGO_CARRERA').agg(
    PUNTAJE_CORTE_BEA=('PUNTAJE_PONDERADO', 'min'),
).reset_index()


aux3 = scores[scores["VIA_INGRESO"] == 6]
aux3 = aux3.groupby('CODIGO_CARRERA').agg(
    PUNTAJE_CORTE_PACE=('PUNTAJE_PONDERADO', 'min'),
).reset_index()

merged_scores = pd.merge(aux1, aux2, on="CODIGO_CARRERA", how="outer")
merged_scores = pd.merge(merged_scores, aux3, on="CODIGO_CARRERA", how="outer")

merged_scores.to_csv('bbdd/PUNTAJE_CORTE_ADM_ESPECIAL.csv', index=False)