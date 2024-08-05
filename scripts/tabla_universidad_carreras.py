import pandas as pd

# Asignamos las columnas que queremos que estén presente en csv
columns = [
    "codigo_demre",
    "area_conocimiento",
    "anio_ing_carr_act",
    "nomb_inst",
    "nomb_sede",
]

university_info = pd.read_csv("/content/drive/MyDrive/MATRICULA_PAES_2024/MATRICULA_PAES_2024.csv", sep=";", usecols=["CODIGO_CARRERA", "NOMBRE_CARRERA"])
university_info2 = pd.read_csv("/content/drive/MyDrive/Matricula-Ed-Superior-2024/20230802_Matrícula_Ed_Superior_2024_PUBL_MRUN.csv", sep=";", usecols=columns)

university_info2 = university_info2[(university_info2["anio_ing_carr_act"] == 2024) & (~university_info2["codigo_demre"].isna())]
university_info['CODIGO_CARRERA'] = university_info['CODIGO_CARRERA'].astype(int)
university_info2['codigo_demre'] = university_info2['codigo_demre'].astype(int)


grouped_info1 = university_info.groupby('CODIGO_CARRERA', as_index=False).first()
grouped_info2 = university_info2.groupby('codigo_demre', as_index=False).first()

merged_info = pd.merge(
    grouped_info1, 
    grouped_info2, 
    left_on="CODIGO_CARRERA", 
    right_on="codigo_demre", 
    how="inner"
)

merged_info.to_csv("TABLA_UNIVERSIDAD_CARRERAS.csv", index=False)
