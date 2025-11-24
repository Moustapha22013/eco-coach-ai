import { EcoScoreReport as ReportType } from '@/types';
import { Award, CheckCircle, AlertTriangle } from 'lucide-react';

interface EcoScoreReportProps {
    report: ReportType;
    onReset: () => void;
}

export const EcoScoreReport = ({ report, onReset }: EcoScoreReportProps) => {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-500';
        if (score >= 50) return 'text-amber-500';
        return 'text-red-500';
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 text-center border-b border-border">
                <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
                    <Award size={48} className={getScoreColor(report.score)} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Votre Eco-Score Numérique</h2>
                <div className={`text-5xl font-black ${getScoreColor(report.score)} mb-2`}>
                    {report.score}/100
                </div>
                <p className="text-muted-foreground">
                    {report.score >= 80 ? "Excellent ! Votre projet est très éco-responsable." :
                        report.score >= 50 ? "Bien, mais des améliorations sont possibles." :
                            "Attention, votre empreinte numérique est élevée."}
                </p>
            </div>

            <div className="p-6 bg-muted/30">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle size={20} className="text-primary" />
                    Analyse détaillée
                </h3>
                <div className="grid gap-3 mb-8">
                    {report.breakdown.map((item, idx) => (
                        <div key={idx} className="p-4 bg-card rounded-lg border border-border">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-lg">{item.category}</span>
                                <span className="font-bold text-primary text-lg">+{item.points}/{item.maxPoints} pts</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.feedback}</p>
                            <div className="mt-2 w-full bg-muted rounded-full h-2">
                                <div 
                                    className="bg-primary h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(item.points / item.maxPoints) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                    {report.breakdown.length === 0 && (
                        <div className="p-4 bg-card rounded-lg border border-border text-center">
                            <p className="text-sm text-muted-foreground italic mb-2">Aucun point fort détecté pour le moment.</p>
                            <p className="text-xs text-muted-foreground">Posez des questions à l'assistant pour obtenir des recommandations personnalisées !</p>
                        </div>
                    )}
                </div>

                {report.recommendations.length > 0 && (
                    <>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <AlertTriangle size={20} className="text-amber-500" />
                            Recommandations pour améliorer votre score
                        </h3>
                        <ul className="space-y-3 mb-8">
                            {report.recommendations.map((rec, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
                                    <span className="text-amber-500 mt-0.5 font-bold">→</span>
                                    <span className="text-sm text-foreground/90 flex-1">{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <button
                    onClick={onReset}
                    className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
                >
                    Nouvelle Consultation
                </button>
            </div>
        </div>
    );
};
