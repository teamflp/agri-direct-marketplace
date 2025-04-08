
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileSpreadsheet, Pencil, Trash2, Upload, Plus } from 'lucide-react';
import { toast } from 'sonner';

// Schéma de validation pour le formulaire de ressource
const resourceFormSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre doit contenir au moins 3 caractères.",
  }),
  fileType: z.string().min(1, {
    message: "Veuillez sélectionner un type de fichier.",
  }),
  fileSize: z.string().min(1, {
    message: "Veuillez spécifier la taille du fichier.",
  }),
  category: z.string().min(1, {
    message: "Veuillez sélectionner une catégorie.",
  }),
  description: z.string().optional(),
});

// Données de démonstration
const initialResources = [
  {
    id: 1, 
    title: "Guide d'utilisation de la plateforme",
    fileType: "PDF",
    fileSize: "2.4 MB",
    category: "Guides",
    downloads: 234,
    lastUpdated: "2025-03-15"
  },
  {
    id: 2,
    title: "Calendrier des cultures saisonnières",
    fileType: "PDF",
    fileSize: "1.8 MB",
    category: "Ressources agricoles",
    downloads: 382,
    lastUpdated: "2025-02-28"
  },
  {
    id: 3,
    title: "Modèle de plan d'affaires agricole",
    fileType: "Excel",
    fileSize: "850 KB",
    category: "Business",
    downloads: 156,
    lastUpdated: "2025-03-05"
  },
  {
    id: 4,
    title: "Guide des certifications disponibles",
    fileType: "PDF",
    fileSize: "3.1 MB",
    category: "Certifications",
    downloads: 97,
    lastUpdated: "2025-03-10"
  },
  {
    id: 5,
    title: "Tutoriel - Inscription et création de profil",
    fileType: "Vidéo",
    fileSize: "42 MB",
    category: "Tutoriels",
    downloads: 201,
    lastUpdated: "2025-03-01"
  },
];

const AdminResourcesTab = () => {
  const [resources, setResources] = useState(initialResources);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Formulaire pour ajouter/modifier une ressource
  const form = useForm<z.infer<typeof resourceFormSchema>>({
    resolver: zodResolver(resourceFormSchema),
    defaultValues: {
      title: "",
      fileType: "",
      fileSize: "",
      category: "",
      description: "",
    }
  });
  
  // Gérer la soumission du formulaire d'ajout
  const handleAddResource = (values: z.infer<typeof resourceFormSchema>) => {
    const newResource = {
      id: resources.length + 1,
      title: values.title,
      fileType: values.fileType,
      fileSize: values.fileSize,
      category: values.category,
      downloads: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setResources([...resources, newResource]);
    setIsAddDialogOpen(false);
    form.reset();
    setSelectedFile(null);
    toast.success("Ressource ajoutée avec succès");
  };
  
  // Gérer la soumission du formulaire de modification
  const handleEditResource = (values: z.infer<typeof resourceFormSchema>) => {
    if (!selectedResource) return;
    
    const updatedResources = resources.map(resource => {
      if (resource.id === selectedResource.id) {
        return {
          ...resource,
          title: values.title,
          fileType: values.fileType,
          fileSize: values.fileSize,
          category: values.category,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return resource;
    });
    
    setResources(updatedResources);
    setIsEditDialogOpen(false);
    setSelectedResource(null);
    form.reset();
    setSelectedFile(null);
    toast.success("Ressource mise à jour avec succès");
  };
  
  // Préparer le formulaire pour l'édition
  const handleOpenEditDialog = (resource: any) => {
    setSelectedResource(resource);
    form.reset({
      title: resource.title,
      fileType: resource.fileType,
      fileSize: resource.fileSize,
      category: resource.category,
      description: resource.description || "",
    });
    setIsEditDialogOpen(true);
  };
  
  // Supprimer une ressource
  const handleDeleteResource = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette ressource ?")) {
      setResources(resources.filter(resource => resource.id !== id));
      toast.success("Ressource supprimée avec succès");
    }
  };
  
  // Gérer l'upload de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Mise à jour automatique des champs liés au fichier
      form.setValue("fileType", file.type.split('/')[1].toUpperCase());
      form.setValue("fileSize", `${Math.round(file.size / 1024)} KB`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestion des ressources documentaires</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Ajouter une ressource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle ressource</DialogTitle>
              <DialogDescription>
                Téléchargez un document et ajoutez les informations nécessaires.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddResource)} className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez</p>
                      <p className="text-xs text-gray-500">PDF, DOCX, XLSX, MP4 (MAX. 10MB)</p>
                    </div>
                    <Input 
                      id="dropzone-file" 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                
                {selectedFile && (
                  <div className="flex items-center p-2 bg-gray-50 rounded">
                    <FileSpreadsheet className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm">{selectedFile.name}</span>
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Titre du document" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fileType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de fichier</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PDF">PDF</SelectItem>
                            <SelectItem value="DOCX">DOCX</SelectItem>
                            <SelectItem value="XLSX">XLSX</SelectItem>
                            <SelectItem value="MP4">MP4</SelectItem>
                            <SelectItem value="JPG">JPG</SelectItem>
                            <SelectItem value="PNG">PNG</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fileSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taille</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: 1.2 MB" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Guides">Guides</SelectItem>
                          <SelectItem value="Ressources agricoles">Ressources agricoles</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Certifications">Certifications</SelectItem>
                          <SelectItem value="Tutoriels">Tutoriels</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="submit" 
                    className="w-full"
                  >
                    Ajouter la ressource
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {/* Dialog d'édition */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Modifier la ressource</DialogTitle>
              <DialogDescription>
                Mettez à jour les informations de la ressource.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleEditResource)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Titre du document" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fileType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de fichier</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PDF">PDF</SelectItem>
                            <SelectItem value="DOCX">DOCX</SelectItem>
                            <SelectItem value="XLSX">XLSX</SelectItem>
                            <SelectItem value="MP4">MP4</SelectItem>
                            <SelectItem value="JPG">JPG</SelectItem>
                            <SelectItem value="PNG">PNG</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fileSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taille</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: 1.2 MB" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Guides">Guides</SelectItem>
                          <SelectItem value="Ressources agricoles">Ressources agricoles</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Certifications">Certifications</SelectItem>
                          <SelectItem value="Tutoriels">Tutoriels</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="submit" 
                    className="w-full"
                  >
                    Mettre à jour
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Taille</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Téléchargements</TableHead>
            <TableHead>Dernière mise à jour</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.title}</TableCell>
              <TableCell>{resource.fileType}</TableCell>
              <TableCell>{resource.fileSize}</TableCell>
              <TableCell>{resource.category}</TableCell>
              <TableCell>{resource.downloads}</TableCell>
              <TableCell>{resource.lastUpdated}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleOpenEditDialog(resource)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-900 hover:bg-red-50"
                    onClick={() => handleDeleteResource(resource.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminResourcesTab;
