import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StockMovement } from '@/hooks/useInventory';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type StockMovementsTableProps = {
  movements: StockMovement[];
};

const reasonToFrench = (reason: StockMovement['reason']) => {
  const map = {
    'initial_stock': 'Stock initial',
    'sale': 'Vente',
    'return': 'Retour',
    'adjustment_add': 'Ajustement (Ajout)',
    'adjustment_remove': 'Ajustement (Retrait)',
    'damage': 'Péremption/Perte'
  };
  return map[reason] || reason;
}

const getReasonVariant = (reason: StockMovement['reason']) => {
  switch (reason) {
    case 'sale':
    case 'adjustment_remove':
    case 'damage':
      return 'destructive';
    case 'initial_stock':
    case 'adjustment_add':
      return 'default';
    case 'return':
      return 'outline';
    default:
      return 'secondary';
  }
}

const StockMovementsTable = ({ movements }: StockMovementsTableProps) => {
  return (
    <Table>
      <TableCaption>Historique des 30 derniers jours de mouvements de stock.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Produit</TableHead>
          <TableHead>Variante</TableHead>
          <TableHead>Type de mouvement</TableHead>
          <TableHead className="text-right">Quantité</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movements.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              Aucun mouvement de stock enregistré.
            </TableCell>
          </TableRow>
        ) : (
          movements.map((movement) => (
            <TableRow key={movement.id}>
              <TableCell>{format(new Date(movement.created_at), 'dd MMM yyyy, HH:mm', { locale: fr })}</TableCell>
              <TableCell className="font-medium">{movement.product_name}</TableCell>
              <TableCell>{movement.variant_options?.name || 'Défaut'}</TableCell>
              <TableCell>
                <Badge variant={getReasonVariant(movement.reason)}>
                  {reasonToFrench(movement.reason)}
                </Badge>
              </TableCell>
              <TableCell className={`text-right font-semibold ${movement.change_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {movement.change_quantity > 0 ? `+${movement.change_quantity}` : movement.change_quantity}
              </TableCell>
              <TableCell>{movement.notes || '-'}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default StockMovementsTable;
