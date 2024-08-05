import pandas as pd
import numpy as np

# Cargar los datos
students_answers = pd.read_csv("bbdd/PREGUNTAS_CORRECTAS_ALUMNOS.csv", sep=",")
demre_code = pd.read_csv("bbdd/MATRICULA_PAES_2024.csv", sep=";", usecols=["MRUN", "CODIGO_CARRERA"])

# Realizar el merge
merged_df = pd.merge(demre_code, students_answers, on="MRUN")
merged_df.drop('MRUN', axis=1, inplace=True)

# Definir una función para calcular los promedios deseados
def custom_aggregate(group):
    # Filtrar filas donde al menos una de las columnas MAX_CBIO, MAX_CFIS, MAX_CQUI, MAX_CTP no es cero
    non_zero_science_rows = group[(group[['MAX_CBIO', 'MAX_CFIS', 'MAX_CQUI', 'MAX_CTP']] != 0).any(axis=1)]
    
    # Calcular la suma y el número de filas donde al menos una columna no es cero
    total_science_sum = non_zero_science_rows[['MAX_CBIO', 'MAX_CFIS', 'MAX_CQUI', 'MAX_CTP']].sum().sum()
    count_science_non_zero_rows = non_zero_science_rows.shape[0]
    
    # Calcular el promedio de las columnas específicas
    average_science = total_science_sum / count_science_non_zero_rows if count_science_non_zero_rows > 0 else 0

    # Calcular el promedio de MAX_M1 donde MAX_M1 no es cero
    non_zero_m1_rows = group[group['MAX_M1'] != 0]
    average_m1 = non_zero_m1_rows['MAX_M1'].mean() if not non_zero_m1_rows.empty else 0

    # Calcular el promedio de MAX_M2 donde MAX_M2 no es cero
    non_zero_m2_rows = group[group['MAX_M2'] != 0]
    average_m2 = non_zero_m2_rows['MAX_M2'].mean() if not non_zero_m2_rows.empty else 0

    # Calcular el promedio de MAX_HCS donde MAX_HCS no es cero
    non_zero_hcs_rows = group[group['MAX_HCS'] != 0]
    average_hcs = non_zero_hcs_rows['MAX_HCS'].mean() if not non_zero_hcs_rows.empty else 0

    return pd.Series({
        'AVERAGE_CIEN': average_science,
        'AVERAGE_M1': average_m1,
        'AVERAGE_M2': average_m2,
        'AVERAGE_HCS': average_hcs
    })

# Agrupar por 'CODIGO_CARRERA' y aplicar la función de agregación
average_df = merged_df.groupby('CODIGO_CARRERA').apply(custom_aggregate)

# Restablecer el índice para que 'CODIGO_CARRERA' sea una columna
average_df.reset_index(inplace=True)

# Redondear al entero superior más cercano y convertir a int
average_df = np.ceil(average_df).astype(int)

average_df.to_csv("PREGUNTAS_CORRECTAS_CARRERAS.csv", index=False)
