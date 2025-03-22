import { useState } from "react"

export const Qrcode = () => {
  const [img, setImg] = useState("")
  const [loading, setLoading] = useState(false)
  const [qrData, setQrData] = useState("https://youtube.com/")
  const [qrSize, setQrSize] = useState("150"); // Default size

  async function generateQr() {
    setLoading(true);
    try {
      const size = parseInt(qrSize, 10);
      if (isNaN(size) || size <= 0) {
        console.error("Invalid image size. Please enter a positive number.");
        return;
      }
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`;

      setImg(url);
    } catch (error) {
      console.error("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  }
  function downloadQR(){
    fetch(img) 
    .then((response)=>response.blob())
    .then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) =>{
      console.error("Error downloading QR code", error);
    })
  }
  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please Wait....</p>}
      {img && <img src={img} alt="" />}
      <div>

        <label htmlFor="dataInput" className="input-label">
          Data for QR code: 
        </label>
        <input type="text" id="dataInput" placeholder="Enter data for QR code" onChange={(e) => setQrData(e.target.value)} />
        
        <label htmlFor="sizeInput" className="input-label">
          Qr Code Size: 
        </label>
        <input type="text" value={qrSize} id="sizeInput" placeholder="(eg.,150)" onChange={(e) => setQrSize(e.target.value)} />
        
        <button className="generate-button"disabled={loading} onClick={generateQr}>Generate QR code</button>
        <button className="download-button" onClick={downloadQR}>Download QR code</button>
      </div>
    </div>
  )
}
