import pandas as pd

university_map = {
    "PONTIFICIA UNIVERSIDAD CATOLICA DE CHILE": "PONTIFICIA UNIVERSIDAD CATÓLICA DE CHILE",
    "UNIVERSIDAD ADOLFO IBAÑEZ": "UNIVERSIDAD ADOLFO IBÁÑEZ",
    "UNIVERSIDAD TECNICA FEDERICO SANTA MARIA": "UNIVERSIDAD TÉCNICA FEDERICO SANTA MARÍA",
    "UNIVERSIDAD DE CONCEPCION": "UNIVERSIDAD DE CONCEPCIÓN",
    "UNIVERSIDAD ANDRES BELLO": "UNIVERSIDAD ANDRÉS BELLO",
    "UNIVERSIDAD AUTONOMA DE CHILE": "UNIVERSIDAD AUTÓNOMA DE CHILE",
    "UNIVERSIDAD CATOLICA DE LA SANTISIMA CONCEPCION": "UNIVERSIDAD CATÓLICA DE LA SANTÍSIMA CONCEPCIÓN",
    "UNIVERSIDAD CATOLICA DE TEMUCO": "UNIVERSIDAD CATÓLICA DE TEMUCO",
    "PONTIFICIA UNIVERSIDAD CATOLICA DE VALPARAISO": "PONTIFICIA UNIVERSIDAD CATÓLICA DE VALPARAÍSO",
    "UNIVERSIDAD CATOLICA DEL MAULE": "UNIVERSIDAD CATÓLICA DEL MAULE",
    "UNIVERSIDAD CATOLICA DEL NORTE": "UNIVERSIDAD CATÓLICA DEL NORTE",
    "UNIVERSIDAD CATOLICA CARDENAL RAUL SILVA HENRIQUEZ": "UNIVERSIDAD CATÓLICA CARDENAL RAÚL SILVA HENRÍQUEZ",
    "UNIVERSIDAD DE LAS AMERICAS": "UNIVERSIDAD DE LAS AMÉRICAS",
    "UNIVERSIDAD DE TARAPACA": "UNIVERSIDAD DE TARAPACÁ",
    "UNIVERSIDAD DE VALPARAISO": "UNIVERSIDAD DE VALPARAÍSO",
    "UNIVERSIDAD DEL BIO-BIO": "UNIVERSIDAD DEL BÍO-BÍO",
    "UNIVERSIDAD METROPOLITANA DE CIENCIAS DE LA EDUCACION": "UNIVERSIDAD METROPOLITANA DE CIENCIAS DE LA EDUCACIÓN",
    "UNIVERSIDAD SAN SEBASTIAN": "UNIVERSIDAD SAN SEBASTIÁN",
    "UNIVERSIDAD SANTO TOMAS": "UNIVERSIDAD SANTO TOMÁS",
    "UNIVERSIDAD TECNOLOGICA METROPOLITANA": "UNIVERSIDAD TECNOLÓGICA METROPOLITANA",
    "UNIVERSIDAD DE PLAYA ANCHA DE CIENCIAS DE LA EDUCACION": "UNIVERSIDAD DE PLAYA ANCHA DE CIENCIAS DE LA EDUCACIÓN",
}


# Asignamos las columnas que queremos que estén presente en csv limpiado
columns = [
    "codigo_demre",
    "area_conocimiento",
    "anio_ing_carr_act",
    "tipo_inst_1",
    "nomb_inst",
    "nomb_sede",
    "formato_valores",
    "dur_total_carr",
    "valor_matricula",
    "valor_arancel",
    "acreditada_inst",
    "acre_inst_desde_hasta"
]

university_info = pd.read_csv("/content/drive/MyDrive/MATRICULA_PAES_2024/MATRICULA_PAES_2024.csv", sep=";", usecols=["CODIGO_CARRERA", "NOMBRE_CARRERA"])
university_career_table = pd.read_csv("/content/drive/MyDrive/Matricula-Ed-Superior-2024/20230802_Matrícula_Ed_Superior_2024_PUBL_MRUN.csv", sep=";", usecols=columns)


# Limpiamos datos
university_career_table = university_career_table[(university_career_table["anio_ing_carr_act"] == 2024) & (~university_career_table["codigo_demre"].isna())]

university_info['CODIGO_CARRERA'] = university_info["CODIGO_CARRERA"].astype(int)
university_career_table['codigo_demre'] = university_career_table[["codigo_demre"]].astype(int)
university_career_table['valor_matricula'] = university_career_table['valor_matricula'].fillna(0).astype(int)
university_career_table['valor_arancel'] = university_career_table['valor_arancel'].fillna(0).astype(int)

# Agrupar university_info por 'CODIGO_CARRERA'
grouped_info1 = university_info.groupby('CODIGO_CARRERA', as_index=False).first()

# Agrupar university_career_table por 'codigo_demre'
grouped_info2 = university_career_table.groupby('codigo_demre', as_index=False).first()

merged_info = pd.merge(
    grouped_info1, 
    grouped_info2, 
    left_on="CODIGO_CARRERA", 
    right_on="codigo_demre", 
    how="inner"
)

merged_info['nomb_inst'] = merged_info['nomb_inst'].replace(university_map)

fetch_careers = merged_info.loc[: ,["CODIGO_CARRERA", "NOMBRE_CARRERA", "area_conocimiento","nomb_inst","nomb_sede"]]
fetch_careers = fetch_careers.drop_duplicates().reset_index(drop=True)
fetch_careers.columns = fetch_careers.columns.str.upper()


university_campus = merged_info.loc[:, ["nomb_inst", "nomb_sede"]]
university_campus = university_campus.drop_duplicates().reset_index(drop=True)
university_campus.columns = university_campus.columns.str.upper()


career_table = merged_info.loc[:, ["CODIGO_CARRERA", "formato_valores", "valor_matricula", "valor_arancel", "dur_total_carr"]]
career_table.columns = career_table.columns.str.upper()
career_table["FORMATO_VALORES"] = career_table["FORMATO_VALORES"].str.replace("Monto en ", "")

university_table = merged_info.loc[:, ["nomb_inst", "acreditada_inst", "acre_inst_desde_hasta"]]
university_table = university_table.drop_duplicates().reset_index(drop=True)
university_table.columns = university_table.columns.str.upper()

# Guardamos los csv
fetch_careers.to_csv("TABLA_FETCH_CARRERAS.csv", index=False)
university_campus.to_csv("TABLA_SEDES_UNIVERSIDADES.csv", index=False)
career_table.to_csv("TABLA_VALORES_DURACION_CARRERAS.csv", index=False)
university_table.to_csv("TABLA_ACREDITACIÓN_UNIVERSIDADES.csv", index=False)
