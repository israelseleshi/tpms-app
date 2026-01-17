'use client';

import { useState, useEffect } from 'react';
import { Loader2, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

// Import react-pdf styles
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '@/app/react-pdf.css';

// Dynamically import react-pdf components to avoid SSR issues
const Document = dynamic(
    () => import('react-pdf').then((mod) => mod.Document),
    { ssr: false }
);

const Page = dynamic(
    () => import('react-pdf').then((mod) => mod.Page),
    { ssr: false }
);

interface PdfViewerProps {
    pdfData: Uint8Array | null;
    isGenerating?: boolean;
    onDownload?: () => void;
}

export function PdfViewer({ pdfData, isGenerating = false, onDownload }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    // Set up pdfjs worker on client side only
    useEffect(() => {
        setIsClient(true);

        if (typeof window !== 'undefined') {
            // Import pdfjs from react-pdf to set the worker source
            import('react-pdf').then((reactPdf) => {
                // Use the exact version from the library to avoid mismatch errors
                reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${reactPdf.pdfjs.version}/build/pdf.worker.min.mjs`;
            });
        }
    }, []);

    useEffect(() => {
        if (pdfData) {
            // Create a blob URL from the PDF data - ensure proper type for Blob constructor
            const dataArray = new Uint8Array(pdfData);
            const blob = new Blob([dataArray], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);

            // Cleanup this specific URL when data changes or component unmounts
            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [pdfData]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const handleZoomIn = () => {
        setScale(prev => Math.min(prev + 0.2, 2.0));
    };

    const handleZoomOut = () => {
        setScale(prev => Math.max(prev - 0.2, 0.5));
    };

    // Only render PDF viewer on client side
    if (!isClient) {
        return (
            <div className="flex items-center justify-center h-full min-h-[600px] bg-slate-50 rounded-lg">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Loading viewer...</p>
                </div>
            </div>
        );
    }

    // Show initial loader only if we don't have a PDF yet
    if (isGenerating && !pdfUrl) {
        return (
            <div className="flex items-center justify-center h-full min-h-[600px] bg-slate-50 rounded-lg">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Generating preview...</p>
                </div>
            </div>
        );
    }

    if (!pdfData || !pdfUrl) {
        return (
            <div className="flex items-center justify-center h-full min-h-[600px] bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                <div className="text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="mt-2 text-sm text-slate-600">Fill in the form to see a live preview</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-3 bg-white border-b border-slate-200 rounded-t-lg">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomOut}
                        disabled={scale <= 0.5}
                    >
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-slate-600 min-w-[60px] text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomIn}
                        disabled={scale >= 2.0}
                    >
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">
                        Page {pageNumber} of {numPages}
                    </span>
                    {isGenerating && (
                        <span className="text-xs text-blue-600 animate-pulse font-medium ml-2">
                            Updating...
                        </span>
                    )}
                    {onDownload && (
                        <Button
                            variant="default"
                            size="sm"
                            onClick={onDownload}
                            className="ml-2"
                        >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                        </Button>
                    )}
                </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto bg-slate-100 p-4">
                <div className="flex justify-center">
                    <Document
                        key={pdfUrl}
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="flex items-center justify-center p-8">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                            </div>
                        }
                        error={
                            <div className="flex items-center justify-center p-8 text-red-600">
                                <p>Failed to load PDF preview</p>
                            </div>
                        }
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <div key={`page_${index + 1}`} className="mb-4 shadow-lg">
                                <Page
                                    pageNumber={index + 1}
                                    scale={scale}
                                    renderTextLayer={true}
                                    renderAnnotationLayer={true}
                                />
                            </div>
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    );
}
