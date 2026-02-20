import { ReportView } from "@/components/report/ReportView";
export default function ReportPage({ params }: { params: { id: string } }) {
  return <ReportView analysisId={parseInt(params.id, 10)} />;
}
