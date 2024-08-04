import pandas as pd

maximum_scores = pd.read_csv("bbdd\INFORMACION_ALUMNOS_MATRICULADOS.csv", sep=",")

maximum_scores = maximum_scores[(maximum_scores["CLEC_MAX"] == 1000) | (maximum_scores["MATE1_MAX"] == 1000) | (maximum_scores["MATE2_MAX"] == 1000) | (maximum_scores["HCSOC_MAX"] == 1000) | (maximum_scores["CIEN_MAX"] == 1000) ]
maximum_scores.to_csv("PUNTAJES_NACIONALES_MATRICULADOS.csv", index=False)
