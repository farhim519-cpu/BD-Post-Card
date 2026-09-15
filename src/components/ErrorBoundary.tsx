import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f0b08] text-[#fbf6ee] flex flex-col items-center justify-center p-6 text-center font-serif">
          <div className="max-w-md bg-[#18110b] border border-[#c5a059]/40 p-8 rounded-lg shadow-2xl">
            <h1 className="text-2xl font-bold text-[#dfb76c] mb-3">দুঃখিত, একটি সমস্যা হয়েছে</h1>
            <p className="text-sm text-[#d6c7b2] mb-6 leading-relaxed">
              অ্যাপ্লিকেশনটি লোড করার সময় একটি ত্রুটি দেখা দিয়েছে। নিচের বাটনে ক্লিক করে অ্যাপটি আবার রিলোড করুন।
            </p>
            {this.state.error && (
              <div className="bg-[#120c08] p-3 rounded text-left text-xs font-mono text-[#e07a5f] mb-6 overflow-auto max-h-32 border border-[#c5a059]/20">
                {this.state.error.toString()}
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="px-6 py-2.5 bg-[#9c2f3d] hover:bg-[#b03546] text-white rounded font-medium text-sm transition-colors shadow-lg cursor-pointer"
            >
              পুনরায় লোড করুন (Reload)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
