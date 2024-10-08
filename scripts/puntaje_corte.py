import pandas as pd

# Importamos y seleccionamos sólo las columnas necesarias para calcular las estadísticas en puntajes
ptjes = pd.read_csv("bbdd/MATRICULA_PAES_2024.csv", sep=';', usecols=["CODIGO_CARRERA", "PUNTAJE_PONDERADO", "VIA_INGRESO"])

# Python interpreta las "," como string y no es posible transformar a float por lo que es necesairio reemplazarlos por puntos.
ptjes['PUNTAJE_PONDERADO'] = ptjes['PUNTAJE_PONDERADO'].str.replace(',', '.')
ptjes['PUNTAJE_PONDERADO'] = ptjes['PUNTAJE_PONDERADO'].astype(float)

# VIA_INGRESO == 1 representa a las personas que ingresaron mediante PAES.
ptjes = ptjes[ptjes["VIA_INGRESO"] == 1]
ptjes = ptjes.groupby('CODIGO_CARRERA').agg(
    PUNTAJE_CORTE=('PUNTAJE_PONDERADO', 'min'),
    PUNTAJE_MEDIANA=('PUNTAJE_PONDERADO', 'median'),
    PUNTAJE_MAXIMO=('PUNTAJE_PONDERADO', 'max'),
    PUNTAJE_PROMEDIO=('PUNTAJE_PONDERADO', 'mean'),
).reset_index()

ptjes["PUNTAJE_PROMEDIO"] = ptjes["PUNTAJE_PROMEDIO"].round(2)

# Guardamos el archivo csv con las columnas ["CODIGO_CARRERA", "PUNTAJE_CORTE", "PUNTAJE_MEDIANA", "PUNTAJE_MAXIMO", "PUNTAJE_PROMEDIO"]
ptjes.to_csv('bbdd/ESTADISTICAS_PUNTAJES_CARRERAS.csv', index=False)