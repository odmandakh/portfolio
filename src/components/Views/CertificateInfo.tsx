import React, { useEffect, useState } from 'react';
import { Copy, Check, ExternalLink, FileText } from 'lucide-react';
import { Certificate } from '../../types/portfolio';
import { isCertificateExpired } from '../../data/certificates';

interface CertificateInfoProps {
  certificate: Certificate;
}

// The selected certificate's details, shown in the preview pane beside the file list
export const CertificateInfo: React.FC<CertificateInfoProps> = ({ certificate }) => {
  const [copied, setCopied] = useState(false);
  const expired = isCertificateExpired(certificate);

  useEffect(() => {
    setCopied(false);
  }, [certificate.id]);

  const copyCredentialId = () => {
    navigator.clipboard.writeText(certificate.credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-5 text-[#93a1a1] select-text">
      <div className="flex items-start gap-4">
        <FileText className="w-12 h-12 shrink-0 text-[#b58900]" strokeWidth={1.25} />
        <div className="pt-1 min-w-0">
          <h2 className="text-lg font-semibold text-[#eee8d5] tracking-tight">{certificate.title}</h2>
          <p className="text-xs text-[#839496]">{certificate.issuer}</p>
        </div>
      </div>

      <dl className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-3 gap-y-1.5 py-3 border-y border-[#2aa198]/15 text-xs">
        <dt className="text-right text-[#586e75]">Status</dt>
        <dd className="flex items-center gap-1.5 text-[#eee8d5]">
          <span className={`w-2 h-2 rounded-full ${expired ? 'bg-[#cb4b16]' : 'bg-[#859900]'}`} />
          {expired ? 'Expired' : 'Valid'}
        </dd>
        <dt className="text-right text-[#586e75]">Issued</dt>
        <dd className="text-[#eee8d5]">{certificate.issueDate}</dd>
        {certificate.expirationDate && (
          <>
            <dt className="text-right text-[#586e75]">Expires</dt>
            <dd className="text-[#eee8d5]">{certificate.expirationDate}</dd>
          </>
        )}
        <dt className="text-right text-[#586e75]">Credential ID</dt>
        <dd className="min-w-0">
          <button
            onClick={copyCredentialId}
            className="max-w-full text-[#2aa198] font-mono flex items-center gap-1.5 hover:text-[#eee8d5] transition-colors cursor-pointer"
            title="Copy credential ID"
          >
            <span className="truncate">{certificate.credentialId}</span>
            {copied ? <Check className="w-3 h-3 shrink-0 text-[#859900]" /> : <Copy className="w-3 h-3 shrink-0" />}
          </button>
        </dd>
        {certificate.skills.length > 0 && (
          <>
            <dt className="text-right text-[#586e75]">Skills</dt>
            <dd className="text-[#eee8d5]">{certificate.skills.join(', ')}</dd>
          </>
        )}
      </dl>

      <p className="text-[13px] leading-relaxed">{certificate.description}</p>

      <a
        href={certificate.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex px-3 py-1.5 rounded-lg bg-[#2aa198] hover:bg-[#2aa198]/90 text-xs font-semibold text-[#002b36] items-center gap-1.5 transition-colors"
      >
        <span>Verify with {certificate.issuer}</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
