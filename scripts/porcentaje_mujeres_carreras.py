import pandas as pd

female_percentage = pd.read_csv("/bbdd/Matricula-Ed-Superior-2024/20230802_Matrícula_Ed_Superior_2024_PUBL_MRUN.csv", sep=";", usecols=["codigo_demre", "gen_alu"])

# Eliminar los valores NaN y 0 en 'codigo_demre', ya que pensamos usar sólo carreras adscritas a la admisión PAES.
female_percentage = female_percentage.dropna()
female_percentage = female_percentage[female_percentage["codigo_demre"] != 0]

# Agrupamos según código demre, para calcular con función de agregación el porcentaje de mujeres
group = female_percentage.groupby("codigo_demre")

# Calcular el porcentaje de 'gen_alu' igual a 2 (1 representa a los hombres, y 2 a las mujeres)
female_percentage = group['gen_alu'].apply(lambda x: (x == 2).mean() * 100).reset_index(name='porcentaje_mujeres')

# Ajustamos los datos para que queden mejor formateados
female_percentage['codigo_demre'] = female_percentage['codigo_demre'].astype(int)
female_percentage['porcentaje_mujeres'] = female_percentage['porcentaje_mujeres'].round(2)

#Guardamos el csv
female_percentage.to_csv('porcentaje_mujeres_carreras.csv', index=False)
