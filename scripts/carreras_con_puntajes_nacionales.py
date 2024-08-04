import pandas as pd

# Función auxiliar que nos servirá para hacer la agragación a lo largo de las columnas, sumando los puntajes nacionales.
def sum_if_1000(series):
    return series[series == 1000].sum()

# Importamos la tabla conteniendo a los puntajes nacionales, además de las columnas MRUN y CODIGO_CARRERA de la tabla de matrículas.
enrolled_students = pd.read_csv("bbdd/MATRICULA_PAES_2024.csv", sep=";", usecols=["MRUN", "CODIGO_CARRERA"])
careers_with_maximum = pd.read_csv("bbdd/PUNTAJES_NACIONALES_MATRICULADOS.csv", sep=",", usecols=["MRUN","CLEC_MAX", "MATE1_MAX", "MATE2_MAX", "HCSOC_MAX", "CIEN_MAX"])

# Hacemos merge para obtener el código demre de las carreras con puntajes nacionales.
careers_with_maximum = pd.merge(enrolled_students, careers_with_maximum, on="MRUN")
careers_with_maximum = careers_with_maximum.drop('MRUN', axis=1)

# Agrupamos por 'CODIGO_CARRERA' y aplicamos la función de agregación
grouped_sum = careers_with_maximum.groupby('CODIGO_CARRERA').agg({
    'CLEC_MAX': sum_if_1000,
    'MATE1_MAX': sum_if_1000,
    'MATE2_MAX': sum_if_1000,
    'HCSOC_MAX': sum_if_1000,
    'CIEN_MAX': sum_if_1000
})

# Dividimos el resultado por 1000, para obtener el número de puntajes nacionales por cada prueba.
result = grouped_sum / 1000

# Restablecemos el índice para que 'CODIGO_CARRERA' no sea el índice
result.reset_index(inplace=True)

# Convertimos a int los resultados
columns_to_convert = ['CLEC_MAX', 'MATE1_MAX', 'MATE2_MAX', 'HCSOC_MAX', 'CIEN_MAX']
result[columns_to_convert] = result[columns_to_convert].astype(int)

result.to_csv("CARRERAS_CON_PUNTAJES_NACIONALES.csv", index=False)
