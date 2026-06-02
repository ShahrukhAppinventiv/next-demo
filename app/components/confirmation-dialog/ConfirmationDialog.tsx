"use client";

import Button from "@/app/components/button/Button";

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  loadingLabel?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmationDialog({
  open,
  title,
  description,
  confirmLabel,
  loadingLabel = "Processing",
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmationDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white p-6 text-slate-950 shadow-2xl">
    

        <div className="mt-5">
          <h2 id="confirmation-title" className="text-xl font-semibold text-center">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <div>

          <button
            type="button"
            className="inline-flex h-11 mr-2 items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
            onClick={onCancel}
          >
            Cancel
          </button>
          <Button
            type="button"
            className="inline-flex h-11 !w-auto items-center justify-center rounded-lg px-5 py-0 text-sm shadow-sm"
            loading={loading}
            onClick={onConfirm}
          >
            {loading ? loadingLabel : confirmLabel}
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
