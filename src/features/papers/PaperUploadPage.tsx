import { useState, useCallback, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FileText, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { usePollPaper } from '@/hooks/usePollPaper';
import { papersApi } from '@/api/papers';
import type { Paper } from '@/types/models';

export default function PaperUploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState('');
  const [mode, setMode] = useState<'file' | 'paste'>('file');
  const [uploading, setUploading] = useState(false);
  const [paperId, setPaperId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [sourceType, setSourceType] = useState('PREPRINT');
  const [publicationDate, setPublicationDate] = useState('');

  const { data: paper } = usePollPaper(paperId ?? undefined, !!paperId);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && (dropped.type === 'application/pdf' || dropped.name.endsWith('.pdf'))) {
      setFile(dropped);
      setError(null);
    } else {
      setError('Please upload a PDF file');
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'file' && !file) {
      setError('Please select a file to upload');
      return;
    }

    if (mode === 'paste' && !pasteText.trim()) {
      setError('Please paste some research text');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('sourceType', sourceType);
      if (authors.trim()) {
        formData.append('authors', authors);
      }
      if (publicationDate) {
        formData.append('publicationDate', publicationDate);
      }

      if (mode === 'file' && file) {
        formData.append('file', file);
      } else if (mode === 'paste' && pasteText.trim()) {
        formData.append('rawText', pasteText);
      }

      const result: Paper = await papersApi.upload(formData);
      setPaperId(result.id);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (paper && (paper.status === 'COMPLETED' || paper.status === 'FAILED')) {
    navigate(`/papers/${paper.id}`, { replace: true });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-navy-900 md:text-3xl">
          Upload Paper
        </h1>
        <p className="mt-1 text-sm text-navy-500">
          Upload a research paper or paste raw text for molecule scanning
        </p>
      </motion.div>

      <GlassCard variant="strong">
        <div className="mb-6 flex gap-2 rounded-xl bg-navy-50/50 dark:bg-zinc-900/50 p-1 border border-navy-100/10 dark:border-zinc-800/30">
          <button
            onClick={() => setMode('file')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
              mode === 'file'
                ? 'bg-white dark:bg-zinc-800 text-navy-900 dark:text-white shadow-sm'
                : 'text-navy-500 dark:text-zinc-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            <Upload className="mr-1.5 inline h-4 w-4" />
            File Upload
          </button>
          <button
            onClick={() => setMode('paste')}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
              mode === 'paste'
                ? 'bg-white dark:bg-zinc-800 text-navy-900 dark:text-white shadow-sm'
                : 'text-navy-500 dark:text-zinc-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            <FileText className="mr-1.5 inline h-4 w-4" />
            Paste Text
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="title"
              label="Paper Title"
              type="text"
              placeholder="e.g. Synthesis of Novel Anti-malarial Agents"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 text-navy-900 dark:text-white placeholder:text-navy-300 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <Input
              id="authors"
              label="Authors"
              type="text"
              placeholder="e.g. Jane Doe, John Smith"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              className="bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 text-navy-900 dark:text-white placeholder:text-navy-300 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="sourceType"
                className="mb-1.5 block text-sm font-medium text-navy-700 dark:text-zinc-300"
              >
                Source Type
              </label>
              <select
                id="sourceType"
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value)}
                required
                className="glass w-full rounded-xl px-4 py-2.5 text-sm text-navy-900 dark:text-white bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 focus:border-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-100 transition-all cursor-pointer"
              >
                <option value="PREPRINT" className="text-navy-950 dark:text-white dark:bg-zinc-900">Preprint</option>
                <option value="JOURNAL" className="text-navy-950 dark:text-white dark:bg-zinc-900">Journal</option>
                <option value="THESIS" className="text-navy-950 dark:text-white dark:bg-zinc-900">Thesis</option>
                <option value="CONFERENCE" className="text-navy-950 dark:text-white dark:bg-zinc-900">Conference</option>
              </select>
            </div>
            <Input
              id="publicationDate"
              label="Publication Date"
              type="date"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              className="bg-white/40 dark:bg-zinc-900/40 border border-navy-100 dark:border-zinc-800 text-navy-900 dark:text-white placeholder:text-navy-300 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {mode === 'file' ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-navy-200 p-10 text-center transition-colors hover:border-saffron-300 hover:bg-saffron-50/30"
            >
              {!file ? (
                <>
                  <Upload className="mb-3 h-10 w-10 text-navy-300" />
                  <p className="text-sm font-medium text-navy-600">
                    Drag & drop your file here
                  </p>
                  <p className="mt-1 text-xs text-navy-400">
                    PDF files up to 50MB
                  </p>
                  <label className="mt-4">
                    <span className="inline-flex cursor-pointer rounded-xl bg-saffron-500 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-saffron-600">
                      Browse files
                    </span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) { setFile(f); setError(null); }
                      }}
                    />
                  </label>
                </>
              ) : (
                <div className="flex w-full items-center gap-3 rounded-xl bg-navy-50 p-4">
                  <FileText className="h-8 w-8 shrink-0 text-saffron-500" />
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-sm font-medium text-navy-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-navy-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="shrink-0 rounded-lg p-1 text-navy-400 hover:bg-navy-100 hover:text-navy-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Paste research paper text here... Include chemical names, SMILES notations, and molecular descriptions."
              rows={12}
              className="glass w-full resize-none rounded-2xl p-4 text-sm leading-relaxed focus:border-saffron-400 focus:outline-none focus:ring-2 focus:ring-saffron-100"
            />
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={uploading}
            className="w-full"
          >
            {uploading ? 'Scanning molecules...' : 'Start Molecule Scan'}
          </Button>
        </form>
      </GlassCard>

      {paperId && paper?.status === 'PROCESSING' && (
        <GlassCard variant="saffron" className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-saffron-500 border-t-transparent" />
          <div>
            <p className="text-sm font-semibold text-saffron-700">
              Processing your paper
            </p>
            <p className="text-xs text-saffron-600">
              Extracting molecular structures...
            </p>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
