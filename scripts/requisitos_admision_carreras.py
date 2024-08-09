import pandas as pd

columns = [
    "COD_CARRERA",
    "NEM",
    "RANKING",
    "CLEC",
    "M1",
    "HSCO",
    "CIEN",
    "M2",
    "VAC_1ER",
    "BEA",
    "PACE",
    "MC",
    "PROM_MIN_POST",
    "POND_MIN_POST"
]

university_admission = pd.read_csv("/content/drive/MyDrive/PAES-2024-Oferta-Definitiva-Programas/OFERTA_DEFINITIVA_PROGRAMAS_PAES_2024_REV.csv", sep=";", usecols=columns)
university_admission.to_csv("REQUISITOS_ADMISION_CARRERAS.csv", index=False, sep=',')