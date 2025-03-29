
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  MessageSquare, 
  CreditCard, 
  User, 
  Edit, 
  Trash2, 
  Plus,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowUpDown,
  Search
} from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

// Mock data for products
const products = [
  {
    id: 1,
    name: "Panier de légumes bio",
    price: 16350,
    inventory: 20,
    unit: "panier",
    category: "Légumes",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843"
  },
  {
    id: 2,
    name: "Miel de fleurs sauvages",
    price: 5600,
    inventory: 50,
    unit: "500g",
    category: "Miel",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
  },
  {
    id: 3,
    name: "Fromage de chèvre frais",
    price: 2750,
    inventory: 35,
    unit: "250g",
    category: "Fromage",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
  },
  {
    id: 4,
    name: "Tomates anciennes",
    price: 980,
    inventory: 15,
    unit: "kg",
    category: "Légumes",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1592924357461-a191879026f4"
  },
  {
    id: 5,
    name: "Œufs fermiers",
    price: 3200,
    inventory: 40,
    unit: "douzaine",
    category: "Œufs",
    organic: true,
    published: false,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03"
  },
  {
    id: 6,
    name: "Salade mesclun",
    price: 1200,
    inventory: 0,
    unit: "250g",
    category: "Légumes",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f"
  }
];

const FarmerProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | typeof products[0]>(null);
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer-dashboard", icon: <User size={20} /> },
    { title: "Mes produits", path: "/farmer-dashboard/products", icon: <ShoppingBag size={20} /> },
    { title: "Commandes", path: "/farmer-dashboard/orders", icon: <ShoppingBag size={20} /> },
    { title: "Messagerie", path: "/farmer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mon abonnement", path: "/farmer-dashboard/subscription", icon: <CreditCard size={20} /> },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleTogglePublish = (productId: number, currentStatus: boolean) => {
    toast({
      title: currentStatus ? "Produit masqué" : "Produit publié",
      description: currentStatus 
        ? "Le produit a été retiré de la boutique" 
        : "Le produit est maintenant visible dans la boutique",
    });
    // Dans une vraie app, mise à jour de l'état
  };
  
  const confirmDelete = () => {
    if (selectedProduct) {
      toast({
        title: "Produit supprimé",
        description: `${selectedProduct.name} a été supprimé avec succès`,
        variant: "destructive",
      });
      setShowDeleteDialog(false);
      // Dans une vraie app, mise à jour de l'état
    }
  };
  
  const openDeleteDialog = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setShowDeleteDialog(true);
  };

  return (
    <DashboardLayout
      name="Sophie Dubois"
      email="sophie.d@email.com"
      avatar={
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" alt="Sophie Dubois" />
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Mes produits</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                className="pl-8 pr-4"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Button className="bg-agrimarket-green hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Catalogue de produits</CardTitle>
            <CardDescription>
              Gérez vos produits, leurs prix et leur disponibilité
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Produit <ArrowUpDown className="inline h-4 w-4 ml-1" /></TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Bio</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Aucun produit trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-10 h-10 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.price.toLocaleString()} FCFA/{product.unit}</TableCell>
                      <TableCell>
                        <span className={`${product.inventory === 0 ? 'text-red-500 font-medium' : ''}`}>
                          {product.inventory}
                        </span>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        {product.organic ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={product.published}
                          onCheckedChange={() => handleTogglePublish(product.id, product.published)}
                        />
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" className="inline-flex items-center gap-1">
                          <Eye size={16} />
                          <span className="hidden sm:inline">Voir</span>
                        </Button>
                        <Button variant="outline" size="sm" className="inline-flex items-center gap-1 ml-2">
                          <Edit size={16} />
                          <span className="hidden sm:inline">Éditer</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="inline-flex items-center gap-1 text-red-500 hover:text-red-600 ml-2"
                          onClick={() => openDeleteDialog(product)}
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Supprimer</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques produits</CardTitle>
              <CardDescription>
                Aperçu de votre catalogue de produits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Total des produits</span>
                  <span className="text-lg font-bold">{products.length}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Produits publiés</span>
                  <span className="text-lg font-bold">{products.filter(p => p.published).length}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Produits en rupture</span>
                  <span className="text-lg font-bold text-red-500">{products.filter(p => p.inventory === 0).length}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Produits biologiques</span>
                  <span className="text-lg font-bold text-agrimarket-green">{products.filter(p => p.organic).length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produits populaires</CardTitle>
              <CardDescription>
                Vos produits les plus vendus ce mois-ci
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-agrimarket-orange text-white">1</span>
                  <div className="flex-1">
                    <p className="font-medium">Miel de fleurs sauvages</p>
                    <p className="text-sm text-gray-500">56 ventes ce mois-ci</p>
                  </div>
                  <p className="font-semibold">5 600 FCFA</p>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-gray-400 text-white">2</span>
                  <div className="flex-1">
                    <p className="font-medium">Panier de légumes bio</p>
                    <p className="text-sm text-gray-500">42 ventes ce mois-ci</p>
                  </div>
                  <p className="font-semibold">16 350 FCFA</p>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-amber-800 text-white">3</span>
                  <div className="flex-1">
                    <p className="font-medium">Fromage de chèvre frais</p>
                    <p className="text-sm text-gray-500">38 ventes ce mois-ci</p>
                  </div>
                  <p className="font-semibold">2 750 FCFA</p>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le produit "{selectedProduct?.name}" ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default FarmerProducts;
