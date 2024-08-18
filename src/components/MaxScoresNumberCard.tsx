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

export default function MaxScoresNumberCard({
  title,
  description,
  clec,
  m1,
  m2,
  cien,
  hsco,
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
              <TableHead>Prueba</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>M1</TableCell>
              <TableCell className="text-right">{m1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>M2</TableCell>
              <TableCell className="text-right">{m2}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lectura</TableCell>
              <TableCell className="text-right">{clec}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Historia</TableCell>
              <TableCell className="text-right">{hsco}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ciencias</TableCell>
              <TableCell className="text-right">{cien}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
