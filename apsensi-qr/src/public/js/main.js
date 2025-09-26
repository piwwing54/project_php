// basic behaviors for scanner + qr generation
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[id^="qr-"]').forEach(c => {
    try { QRCode.toCanvas(c, c.id.replace('qr-',''), { width: 120 }); } catch(e){}
  });

  const openBtns = [document.getElementById('openScan'), document.getElementById('openScanTop'), document.getElementById('mobileScan')].filter(Boolean);
  openBtns.forEach(b => b.addEventListener('click', startScanner));
});

let html5QrCode;
function startScanner() {
  const readerElId = 'reader';
  if (!html5QrCode) html5QrCode = new Html5Qrcode(readerElId);
  Html5Qrcode.getCameras().then(cameras => {
    if (!cameras || cameras.length === 0) return alert('No camera');
    const cameraId = cameras[0].id;
    html5QrCode.start(cameraId, { fps: 10, qrbox: 250 }, qrCodeMessage => {
      console.log('scanned', qrCodeMessage);
      fetch('/api/absen/scan', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ code: qrCodeMessage }) })
        .then(r=>r.json()).then(d=>{
          if (d.ok) alert('Absen: ' + (d.person?.name || 'terdaftar'));
          else alert('Gagal: ' + (d.message || 'unknown'));
        }).catch(()=>alert('Err'));
    }).catch(err => { console.error(err); });
  }).catch(err => { console.error(err); alert('Camera error'); });
}
