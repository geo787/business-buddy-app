import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, Calendar, Loader2 } from "lucide-react";
import { supabase, Project } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ro } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MyProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProjects(data || []);
    } catch (error: any) {
      console.error('Eroare la încărcarea proiectelor:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut încărca proiectele. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setDeletingId(id);
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setProjects(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Proiect șters",
        description: "Proiectul a fost șters cu succes.",
        variant: "default",
      });
    } catch (error: any) {
      console.error('Eroare la ștergerea proiectului:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut șterge proiectul. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const getProjectTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'logistics': 'Logistică',
      'lean_canvas': 'Lean Canvas',
      'idea_validation': 'Validare Idee',
      'ai_chat': 'Chat AI'
    };
    return types[type] || type;
  };

  const getProjectTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'logistics': 'bg-blue-500',
      'lean_canvas': 'bg-green-500',
      'idea_validation': 'bg-purple-500',
      'ai_chat': 'bg-orange-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const renderProjectContent = (project: Project) => {
    switch (project.type) {
      case 'logistics':
        return (
          <div className="space-y-2 text-sm">
            <p><strong>Costuri estimate:</strong> {project.content.costuri_estimate} RON</p>
            <p><strong>Timp estimat:</strong> {project.content.timp_estimat} zile</p>
            {project.content.resurse_necesare && (
              <p><strong>Resurse:</strong> {project.content.resurse_necesare.substring(0, 100)}...</p>
            )}
          </div>
        );
      case 'lean_canvas':
        return (
          <div className="space-y-2 text-sm">
            {project.content.unique_value_proposition && (
              <p><strong>Propunerea de valoare:</strong> {project.content.unique_value_proposition.substring(0, 100)}...</p>
            )}
            {project.content.problem && (
              <p><strong>Problemă:</strong> {project.content.problem.substring(0, 100)}...</p>
            )}
          </div>
        );
      case 'idea_validation':
        return (
          <div className="space-y-2 text-sm">
            {project.content.validation_result && (
              <p><strong>Scor validare:</strong> {project.content.validation_result.score}/10</p>
            )}
            {project.content.form_data?.idea_description && (
              <p><strong>Ideea:</strong> {project.content.form_data.idea_description.substring(0, 100)}...</p>
            )}
          </div>
        );
      default:
        return (
          <div className="text-sm text-muted-foreground">
            Date JSON salvate pentru acest proiect
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Proiectele Mele</h1>
        <p className="text-muted-foreground">
          Toate proiectele tale salvate din Business Buddy
        </p>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Nu ai proiecte salvate încă</h3>
              <p className="text-muted-foreground mb-4">
                Creează primul tău proiect în Business Buddy pentru a-l vedea aici.
              </p>
              <Button asChild>
                <a href="/business-buddy">Începe un proiect nou</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge className={`${getProjectTypeColor(project.type)} text-white`}>
                      {getProjectTypeLabel(project.type)}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {formatDistanceToNow(new Date(project.created_at), {
                        addSuffix: true,
                        locale: ro
                      })}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                {renderProjectContent(project)}
                
                <div className="flex gap-2 mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Vezi
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {getProjectTypeLabel(project.type)} - Detalii
                        </DialogTitle>
                        <DialogDescription>
                          Proiect creat {formatDistanceToNow(new Date(project.created_at), {
                            addSuffix: true,
                            locale: ro
                          })}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                          {JSON.stringify(project.content, null, 2)}
                        </pre>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        disabled={deletingId === project.id}
                      >
                        {deletingId === project.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Ștergi proiectul?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Această acțiune nu poate fi anulată. Proiectul va fi șters permanent din baza de date.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Anulează</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteProject(project.id)}>
                          Șterge
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProjects;