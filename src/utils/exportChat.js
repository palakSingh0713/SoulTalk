import { jsPDF } from 'jspdf';

export const exportChatAsTXT = (messages, characterName) => {
  const content = messages.map(msg => {
    const sender = msg.sender === 'user' ? 'You' : characterName;
    const timestamp = new Date(msg.timestamp).toLocaleString();
    return `[${timestamp}] ${sender}:\n${msg.text}\n`;
  }).join('\n');

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${characterName}-chat-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportChatAsPDF = (messages, characterName) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`Chat with ${characterName}`, margin, yPosition);
  yPosition += 10;

  // Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text(`Exported: ${new Date().toLocaleString()}`, margin, yPosition);
  yPosition += 15;

  // Messages
  doc.setTextColor(0);
  doc.setFontSize(11);

  messages.forEach(msg => {
    const sender = msg.sender === 'user' ? 'You' : characterName;
    const timestamp = new Date(msg.timestamp).toLocaleTimeString();
    
    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = margin;
    }

    // Sender and timestamp
    doc.setFont('helvetica', 'bold');
    doc.text(`${sender} (${timestamp})`, margin, yPosition);
    yPosition += 6;

    // Message text
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(msg.text, maxWidth);
    lines.forEach(line => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });

    yPosition += 5; 
  });

  doc.save(`${characterName}-chat-${Date.now()}.pdf`);
};