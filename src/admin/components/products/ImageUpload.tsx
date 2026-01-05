"use client";

import { useEffect, useState } from "react";
import { X, ImagePlus } from "lucide-react";

type Props = {
  image?: File;
  onChange: (file?: File) => void;
};

const MAX_IMAGE_SIZE_MB = 3;

export function ImageUpload({ image, onChange }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleFile(file?: File) {
    if (!file) return;

    const sizeInMB = file.size / 1024 / 1024;
    if (sizeInMB > MAX_IMAGE_SIZE_MB) {
      alert(`A imagem deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB`);
      return;
    }

    onChange(file);
  }

  // controla preview corretamente
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(image);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Imagem do produto{" "}
        <span className="text-gray-400">(opcional)</span>
      </label>

      <div className="flex items-center gap-4">
        {/* UPLOAD */}
        <label
          htmlFor="image-upload"
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed cursor-pointer hover:border-black transition"
        >
          <ImagePlus className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-600">
            {image ? "Trocar imagem" : "Adicionar imagem"}
          </span>
        </label>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {/* PREVIEW COMPACTO */}
        {previewUrl && (
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-lg overflow-hidden border bg-gray-50">
              <img
                src={previewUrl}
                alt="Prévia da imagem"
                className="w-full h-full object-cover"
              />
            </div>

            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="text-gray-400 hover:text-black"
              title="Remover imagem"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400">
        JPG ou PNG • até {MAX_IMAGE_SIZE_MB}MB
      </p>
    </div>
  );
}
