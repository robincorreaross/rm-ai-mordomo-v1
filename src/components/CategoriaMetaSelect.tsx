import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useCategoriasMetas } from "@/hooks/useCategoriasMetas";
import { useToast } from "@/hooks/use-toast";

interface CategoriaMetaSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const cores = ['#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E'];

export const CategoriaMetaSelect = ({
  value,
  onChange,
  className
}: CategoriaMetaSelectProps) => {
  const { toast } = useToast();
  const {
    categoriasMetas,
    createCategoriaMeta,
    refetch
  } = useCategoriasMetas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cor: cores[0],
    descricao: ''
  });

  const categoriasAtivas = categoriasMetas.filter(cat => cat.ativa);

  const handleCreateCategoria = async () => {
    if (!formData.nome.trim()) {
      toast({
        title: "Erro",
        description: "O nome da categoria é obrigatório",
        variant: "destructive"
      });
      return;
    }

    const { error } = await createCategoriaMeta({
      nome: formData.nome,
      cor: formData.cor,
      descricao: formData.descricao,
      ativa: true
    });

    if (!error) {
      setIsModalOpen(false);
      setFormData({
        nome: '',
        cor: cores[0],
        descricao: ''
      });
      await refetch(); // Atualiza a lista de categorias
      
      // Encontra a categoria criada para selecioná-la automaticamente
      const categoriaCriada = categoriasMetas.find(cat => cat.nome === formData.nome);
      if (categoriaCriada) {
        onChange(categoriaCriada.id);
      }
    }
  };

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <select
            title="Selecionar categoria de meta"
            value={value}
            onChange={e => onChange(e.target.value)}
            className={`flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
          >
            <option value="">Selecione uma categoria</option>
            {categoriasAtivas.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="px-3"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova Categoria de Meta</DialogTitle>
            <DialogDescription>
              Crie uma nova categoria para organizar suas metas.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da categoria *</Label>
              <Input
                id="nome"
                placeholder="Ex: Emergência, Aposentadoria, Viagem..."
                value={formData.nome}
                onChange={e => setFormData({
                  ...formData,
                  nome: e.target.value
                })}
              />
            </div>

            <div className="space-y-2">
              <Label>Cor</Label>
              <div className="grid grid-cols-8 gap-2">
                {cores.map(cor => (
                  <button
                    key={cor}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.cor === cor ? 'border-gray-400 scale-110' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: cor }}
                    onClick={() => setFormData({
                      ...formData,
                      cor
                    })}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descrição da categoria..."
                value={formData.descricao}
                onChange={e => setFormData({
                  ...formData,
                  descricao: e.target.value
                })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleCreateCategoria} className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Criar Categoria
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};