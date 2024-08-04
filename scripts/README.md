# AREA_CONOCIMIENTO, GEN_ALU, ANIO_ING_CARR_ACT, TIPO_INST_1, COD_INST, NOMB_INST, NOMB_SEDE, NOMB_CARRERA, DUR_TOTAL_CARR, VALOR_MATRICULA, VALOR_ARANCEL, CODIGO_DEMRE,AREA_CONOCIMIENTO, ACREDITADA_INST, ACRE_INST_DESDE_HASTA

# el genero del alumno nos permitirá poner estadisticas asociadas a la cuota de genero, pudiendo hacer un análisis en base al sexo en carreras STEM

# Antes de hacer todos los filtros generales, filtrar por género, para calcular la cantidad de mujeres matriculadas basándose en el código demre.

# Para filtrar a los alumnos que ingresaron el 2024, hay que filtrar por ANIO_ING_CARR_ACT == 2024

# Hay que filtrar TIPO_INST_1 == Universidades

# NOMB_INST hay que ponerlo de key en la tabla de universidades

# Hay que poner la condición al limpiar la tabla, de que la combinación de NOMB_INST sea diferente a NOMB_SEDE
