import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function CareerScoresMetrics({
  title,
  description,
  min,
  mean,
  median,
  max,
}) {
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Métrica</TableHead>
              <TableHead className="text-right">Puntaje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Mínimo</TableCell>
              <TableCell className="text-right">
                {Number(min).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Media</TableCell>
              <TableCell className="text-right">
                {Number(mean).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mediana</TableCell>
              <TableCell className="text-right">
                {Number(median).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Máximo</TableCell>
              <TableCell className="text-right">{max}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
