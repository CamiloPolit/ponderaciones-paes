import pandas as pd

# Import the csv and select only the people that joined the career through PAES test.
ptjes = pd.read_csv("bbdd/MATRICULA_PAES_2024.csv", sep=';', usecols=['MRUN', "CODIGO_CARRERA", 'PREFERENCIA', "PUNTAJE_PONDERADO", "LUGAR_EN_LA_LISTA", "VIA_INGRESO"])

# Replace "," for "." in 'PUNTAJE_PONDERADO' column
ptjes['PUNTAJE_PONDERADO'] = ptjes['PUNTAJE_PONDERADO'].str.replace(',', '.')

# Convert to float
ptjes['PUNTAJE_PONDERADO'] = ptjes['PUNTAJE_PONDERADO'].astype(float)

# Only accept people who joined through PAES.
ptjes = ptjes[ptjes["VIA_INGRESO"] == 11]
ptjes = ptjes.groupby('CODIGO_CARRERA').agg(
    PUNTAJE_CORTE=('PUNTAJE_PONDERADO', 'min'),
).reset_index()
