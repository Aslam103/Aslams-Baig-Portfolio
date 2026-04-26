import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Search,
  ExternalLink,
  Download,
  Upload,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  documents as staticDocuments,
  documentCategories as staticCategories,
} from "@/data/documents";
import type { DocumentType } from "@/data/documents";
import {
  type AdminDocument,
  type AccessLevel,
  createDocument,
  updateDocument,
  deleteDocument,
  listAdminDocuments,
  subscribe,
  validateFile,
  getDocumentBlobUrl,
} from "@/lib/documentStore";
import { isAuthenticated, login, logout } from "@/lib/adminAuth";

// ---------- Login Gate ----------

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      onLogin();
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md glass-panel rounded-2xl border border-white/10 p-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-cyan-300 mb-6"
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to portfolio
        </Link>
        <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-5">
          <ShieldCheck className="w-6 h-6 text-cyan-300" />
        </div>
        <h1 className="text-2xl font-bold mb-1">Admin Access</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Enter the admin password to manage documents.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="admin-password" className="text-xs uppercase tracking-wider font-mono">
              Password
            </Label>
            <div className="relative mt-2">
              <Input
                id="admin-password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Enter admin password"
                className="pr-10 bg-black/30 border-white/10"
                data-testid="input-admin-password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-white/10 text-muted-foreground"
                aria-label={show ? "Hide password" : "Show password"}
                data-testid="btn-toggle-password"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-rose-400 mt-2" data-testid="text-login-error">
                {error}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white"
            data-testid="btn-admin-login"
          >
            <Lock className="w-4 h-4 mr-2" /> Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

// ---------- Form Dialog ----------

interface FormState {
  title: string;
  description: string;
  category: string;
  type: DocumentType;
  access: AccessLevel;
  file: File | null;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  category: "",
  type: "pdf",
  access: "public",
  file: null,
};

interface DocumentFormProps {
  open: boolean;
  initial: AdminDocument | null;
  onClose: () => void;
  onSaved: () => void;
}

function DocumentForm({ open, initial, onClose, onSaved }: DocumentFormProps) {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      if (initial) {
        setForm({
          title: initial.title,
          description: initial.description,
          category: initial.category,
          type: initial.type,
          access: initial.access,
          file: null,
        });
      } else {
        setForm(EMPTY_FORM);
      }
      setErrors({});
    }
  }, [open, initial]);

  const isEdit = Boolean(initial);

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (!form.category.trim()) e.category = "Category is required.";
    if (!isEdit && !form.file) e.file = "A PDF or PPT/PPTX file is required.";
    if (form.file) {
      const v = validateFile(form.file);
      if (!v.ok) e.file = v.reason ?? "Invalid file.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (isEdit && initial) {
        await updateDocument({
          id: initial.id,
          title: form.title,
          description: form.description,
          category: form.category,
          type: form.type,
          access: form.access,
          file: form.file,
        });
        toast({ title: "Document updated", description: form.title });
      } else if (form.file) {
        await createDocument({
          title: form.title,
          description: form.description,
          category: form.category,
          type: form.type,
          access: form.access,
          file: form.file,
        });
        toast({ title: "Document added", description: form.title });
      }
      onSaved();
      onClose();
    } catch (err) {
      toast({
        title: "Save failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-document-form">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Document" : "Add Document"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the document details. Replace the file only if needed."
              : "Upload a new PDF or PPT/PPTX and fill in its details."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. AI Foundations Curriculum"
              data-testid="input-title"
            />
            {errors.title && <p className="text-xs text-rose-400">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Short summary shown on the public card."
              rows={3}
              data-testid="input-description"
            />
            {errors.description && (
              <p className="text-xs text-rose-400">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                list="category-suggestions"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="e.g. Curriculum"
                data-testid="input-category"
              />
              <datalist id="category-suggestions">
                {staticCategories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              {errors.category && (
                <p className="text-xs text-rose-400">{errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm((f) => ({ ...f, type: v as DocumentType }))}
              >
                <SelectTrigger id="type" data-testid="select-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="ppt">PPT / PPTX</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 p-3">
            <div>
              <Label htmlFor="access" className="text-sm font-semibold">
                Public visibility
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                {form.access === "public"
                  ? "Visible on the public Resources section."
                  : "Hidden from the public site (admin-only)."}
              </p>
            </div>
            <Switch
              id="access"
              checked={form.access === "public"}
              onCheckedChange={(v) =>
                setForm((f) => ({ ...f, access: v ? "public" : "private" }))
              }
              data-testid="switch-access"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">
              File {isEdit ? "(leave empty to keep current)" : "*"}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                ref={fileInputRef}
                type="file"
                accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                onChange={(e) =>
                  setForm((f) => ({ ...f, file: e.target.files?.[0] ?? null }))
                }
                className="bg-black/30 border-white/10 file:text-cyan-300 file:bg-cyan-500/15 file:border-0 file:rounded file:px-2 file:py-1 file:mr-3"
                data-testid="input-file"
              />
            </div>
            {form.file && (
              <p className="text-xs text-muted-foreground" data-testid="text-file-info">
                {form.file.name} · {(form.file.size / 1024).toFixed(1)} KB
              </p>
            )}
            {isEdit && initial?.fileName && !form.file && (
              <p className="text-xs text-muted-foreground">
                Current: <span className="text-foreground/80">{initial.fileName}</span>
              </p>
            )}
            {errors.file && <p className="text-xs text-rose-400">{errors.file}</p>}
            <p className="text-[11px] text-muted-foreground/70">
              Accepted: PDF, PPT, PPTX. Max 50 MB.
            </p>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
              data-testid="btn-cancel-form"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-500 text-white"
              disabled={submitting}
              data-testid="btn-submit-form"
            >
              {submitting ? "Saving…" : isEdit ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ---------- Admin Panel ----------

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [adminDocs, setAdminDocs] = useState<AdminDocument[]>(() => listAdminDocuments());
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | DocumentType>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminDocument | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AdminDocument | null>(null);

  useEffect(() => {
    const unsub = subscribe(() => setAdminDocs(listAdminDocuments()));
    return () => {
      unsub();
    };
  }, []);

  const allCategories = useMemo(() => {
    const set = new Set<string>(staticCategories);
    for (const d of adminDocs) set.add(d.category);
    return Array.from(set).sort();
  }, [adminDocs]);

  // Combined list for the table: built-in (read-only) + admin docs.
  type RowDoc = {
    id: string;
    title: string;
    description: string;
    category: string;
    type: DocumentType;
    access: AccessLevel;
    source: "builtin" | "admin";
    fileUrl: string;
    fileName?: string;
  };

  const rows: RowDoc[] = useMemo(() => {
    const builtin: RowDoc[] = staticDocuments.map((d) => ({
      id: d.id,
      title: d.title,
      description: d.description,
      category: d.category,
      type: d.type,
      access: "public",
      source: "builtin",
      fileUrl: d.fileUrl,
    }));
    const admin: RowDoc[] = adminDocs.map((d) => ({
      id: d.id,
      title: d.title,
      description: d.description,
      category: d.category,
      type: d.type,
      access: d.access,
      source: "admin",
      fileUrl: d.fileUrl,
      fileName: d.fileName,
    }));
    return [...admin, ...builtin];
  }, [adminDocs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q);
      const matchesCat = categoryFilter === "all" || r.category === categoryFilter;
      const matchesType = typeFilter === "all" || r.type === typeFilter;
      return matchesQ && matchesCat && matchesType;
    });
  }, [rows, search, categoryFilter, typeFilter]);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (doc: AdminDocument) => {
    setEditing(doc);
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const view = async (row: RowDoc) => {
    if (row.fileUrl.startsWith("idb:")) {
      const url = await getDocumentBlobUrl(row.fileUrl.slice(4));
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      }
    } else if (row.fileUrl && row.fileUrl !== "#") {
      window.open(row.fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  const download = async (row: RowDoc) => {
    if (row.fileUrl.startsWith("idb:")) {
      const url = await getDocumentBlobUrl(row.fileUrl.slice(4));
      if (!url) return;
      const a = document.createElement("a");
      a.href = url;
      a.download = row.fileName ?? `${row.title}.${row.type === "pdf" ? "pdf" : "pptx"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5_000);
    } else if (row.fileUrl && row.fileUrl !== "#") {
      window.open(row.fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    await deleteDocument(confirmDelete.id);
    setConfirmDelete(null);
  };

  const adminCount = adminDocs.length;
  const publicAdminCount = adminDocs.filter((d) => d.access === "public").length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-cyan-300"
              data-testid="link-back-home"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Portfolio
            </Link>
            <div className="w-px h-5 bg-white/10" />
            <div>
              <h1 className="text-lg font-bold leading-tight flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-300" /> Document Admin
              </h1>
              <p className="text-[11px] text-muted-foreground font-mono">
                {adminCount} admin · {publicAdminCount} public · {staticDocuments.length} built-in
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={openAdd}
              className="bg-cyan-600 hover:bg-cyan-500 text-white"
              data-testid="btn-add-document"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Document
            </Button>
            <Button
              variant="outline"
              onClick={onLogout}
              className="border-white/10"
              data-testid="btn-logout"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="container mx-auto px-4 py-6">
        <div className="glass-panel rounded-2xl border border-white/10 p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or description…"
              className="pl-9 bg-black/30 border-white/10"
              data-testid="input-admin-search"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="md:w-48" data-testid="select-admin-category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {allCategories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={typeFilter}
            onValueChange={(v) => setTypeFilter(v as "all" | DocumentType)}
          >
            <SelectTrigger className="md:w-36" data-testid="select-admin-type">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="ppt">PPT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center" data-testid="text-admin-empty">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No documents match your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="hidden md:table-cell">Access</TableHead>
                    <TableHead className="hidden lg:table-cell">Source</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((row) => (
                    <TableRow
                      key={`${row.source}-${row.id}`}
                      className="border-white/5 hover:bg-white/5"
                      data-testid={`row-doc-${row.id}`}
                    >
                      <TableCell className="max-w-[280px]">
                        <div className="font-semibold truncate" title={row.title}>
                          {row.title}
                        </div>
                        <div
                          className="text-xs text-muted-foreground truncate"
                          title={row.description}
                        >
                          {row.description}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border border-violet-500/30 bg-violet-500/10 text-violet-300">
                          {row.category}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${
                            row.type === "pdf"
                              ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
                              : "border-amber-500/30 bg-amber-500/10 text-amber-300"
                          }`}
                        >
                          {row.type}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {row.access === "public" ? (
                          <span className="text-xs text-emerald-300 font-mono">Public</span>
                        ) : (
                          <span className="text-xs text-amber-300 font-mono">Restricted</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                            row.source === "admin"
                              ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                              : "border-white/10 bg-white/5 text-muted-foreground"
                          }`}
                        >
                          {row.source === "admin" ? "Admin" : "Built-in"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => view(row)}
                            disabled={!row.fileUrl || row.fileUrl === "#"}
                            title="View"
                            data-testid={`btn-admin-view-${row.id}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => download(row)}
                            disabled={!row.fileUrl || row.fileUrl === "#"}
                            title="Download"
                            data-testid={`btn-admin-download-${row.id}`}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          {row.source === "admin" ? (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  openEdit(adminDocs.find((d) => d.id === row.id)!)
                                }
                                title="Edit"
                                data-testid={`btn-admin-edit-${row.id}`}
                              >
                                <Pencil className="w-4 h-4 text-cyan-300" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  setConfirmDelete(adminDocs.find((d) => d.id === row.id)!)
                                }
                                title="Delete"
                                data-testid={`btn-admin-delete-${row.id}`}
                              >
                                <Trash2 className="w-4 h-4 text-rose-300" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled
                              title="Built-in (edit in src/data/documents.ts)"
                            >
                              <Lock className="w-4 h-4 text-muted-foreground/50" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <p className="text-[11px] text-muted-foreground/70 mt-4 max-w-3xl">
          <Upload className="inline w-3 h-3 mr-1 -mt-0.5" />
          Admin uploads are stored in this browser (IndexedDB). They appear on this device's
          public Resources section. To make a document permanently visible to all visitors, edit{" "}
          <code className="text-cyan-300">src/data/documents.ts</code>. Built-in entries are
          read-only here.
        </p>
      </div>

      {/* Add / Edit dialog */}
      <DocumentForm
        open={formOpen}
        initial={editing}
        onClose={closeForm}
        onSaved={() => {
          /* state syncs via subscribe() */
        }}
      />

      {/* Delete confirm */}
      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent data-testid="dialog-confirm-delete">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this document?</AlertDialogTitle>
            <AlertDialogDescription>
              "{confirmDelete?.title}" will be permanently removed from this admin store and the
              uploaded file will be deleted from your browser.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="btn-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-rose-600 hover:bg-rose-500 text-white"
              data-testid="btn-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ---------- Page entry ----------

export default function Admin() {
  const [authed, setAuthed] = useState<boolean>(() => isAuthenticated());

  if (!authed) return <LoginGate onLogin={() => setAuthed(true)} />;
  return (
    <AdminPanel
      onLogout={() => {
        logout();
        setAuthed(false);
      }}
    />
  );
}
